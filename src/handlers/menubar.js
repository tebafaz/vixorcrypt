import { get } from "svelte/store"
import { createCanvasModal } from "../constants/modals"
import modal from "../stores/modals"
import encResults from "../stores/encrypt/results"
import shareSvc from "../db/encShareService"
import { createRawBlobFromArray, getRandomizedPixelArray, xorPixels } from "../utils/imageEncryption"
import encCanvasProps from "../stores/encrypt/canvas"
import encImgSvc from "../db/encImageService"
import * as zip from "@zip.js/zip.js"
import decImages from "../stores/decrypt/images"
import encImages from "../stores/encrypt/images"
import shares from "../stores/encrypt/shares"
import decImgSvc from "../db/decImageService"
import decCanvasProps from "../stores/decrypt/canvas"
import decResults from "../stores/decrypt/results";
import decResSvc from "../db/decResultService"
import encResSvc from "../db/encResultService"
import loading from "../stores/loading"

export const createCanvasHandler = () => {
  modal.set(createCanvasModal)
}

export const editCanvasSizeHandler = () => {
  modal.set(createCanvasModal)
}

export const openGithubPage = () => {
  window.open("https://github.com/tebafaz/vixorcrypt", "_blank")
}

export const removeCanvasHandler = () => {
  if (confirm("Do you want to clear encryption of this project along with shares, images and results?")) {
    const emptyMap = new Map()
    shares.set(emptyMap)
    encImages.set(emptyMap)
    encImgSvc.deleteAllExceptByHash(['current'])
    encResSvc.deleteAll()
    encResults.set(emptyMap)
    encCanvasProps.set({
      initialized: false,
      sizeX: -1,
      sizeY: -1
    })
  }
  
}

export const encExportAsHandler = async () => {
  loading.inc()
  const canvasData = get(encCanvasProps)
  const currentencResults = get(encResults)
  if (currentencResults.size === 0) {
    alert('no results to export')
    loading.dec()
    return
  }

  const zipper = new zip.ZipWriter(new zip.BlobWriter("application/zip"))
  let textShares = ""
  for (let [key, res] of currentencResults) {
    let xoredData
    
    for (let shr of res.shares) {
      if (shr === res.lastShare) {
        const data = await encResSvc.getEncResultByHash(key)
        const pixelData = xorPixels(xoredData, data.image)
        const blob = await createRawBlobFromArray(pixelData, canvasData)
        await shareSvc.insertShare(shr, pixelData)
        await zipper.add(`share-${shr}.png`, new zip.BlobReader(blob))
        continue
      }
      const exists = await shareSvc.existsShare(shr)
      if (!exists) {
        const pixelData = getRandomizedPixelArray(canvasData.sizeX, canvasData.sizeY)
        await shareSvc.insertShare(shr, pixelData)
        const blob = await createRawBlobFromArray(pixelData, canvasData)
        await zipper.add(`share-${shr}.png`, new zip.BlobReader(blob))
        if (!xoredData) {
          xoredData = pixelData
        } else {
          xoredData = xorPixels(xoredData, pixelData)
        }
      } else {
        const row = await shareSvc.getShare(shr)
        if (!xoredData) {
          xoredData = row.uint8Arr
        } else {
          xoredData = xorPixels(xoredData, row.uint8Arr)
        }
      }
    }
    textShares += res.shares.join(", ")
    textShares += " -> " + res.filename + "\n"
  }
  await zipper.add('hint.txt', new zip.TextReader(textShares))
  await shareSvc.removeAllShares()
  const zipBlob = await zipper.close()
  const a = document.createElement('a')
  a.href = URL.createObjectURL(zipBlob)
  a.download = "shares.zip"
  a.click()
  loading.dec()
}

export const decExportAsHandler = async () => {
  loading.inc()
  const canvasData = get(decCanvasProps)
  const results = get(decResults)
  if (results.size === 0) {
    alert('No results to export')
    loading.dec()
    return
  }
  const zipper = new zip.ZipWriter(new zip.BlobWriter("application/zip"))
  for (const [key, val] of results) {
    const row = await decResSvc.getDecResultByHash(key)
    const blob = await createRawBlobFromArray(row.image, canvasData)
    await zipper.add(`${val.filename}`, new zip.BlobReader(blob))
  }
  const zipBlob = await zipper.close()
  const a = document.createElement('a')
  a.href = URL.createObjectURL(zipBlob)
  a.download = "decryptionResults.zip"
  a.click()
  loading.dec()
}

export const openDocsHandler = () => {

}

export const decRemoveCanvasHandler = () => {
  if (confirm("Do you want to clear decryption of this project along with images and results?")) {
    const emptyMap = new Map()
    decImages.set(emptyMap)
    decImgSvc.deleteAll()
    decResSvc.deleteAll()
    decResults.set(emptyMap)
    decCanvasProps.set({
      initialized: false,
      sizeX: -1,
      sizeY: -1
    })
  }
}