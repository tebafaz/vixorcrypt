import { get } from "svelte/store"
import { createCanvasModal } from "../constants/modals"
import modal from "../stores/modals"
import results from "../stores/encrypt/results"
import shareSvc from "../db/encShareService"
import { createRawBlobFromArray, getRandomizedPixelArray, xorPixels } from "../utils/imageEncryption"
import canvasProps from "../stores/encrypt/canvas"
import encImgSvc from "../db/encImageService"
import { createZip } from "../utils/zipper"
import * as zip from "@zip.js/zip.js"

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

}

export const encExportAsHandler = async () => {
  const canvasData = get(canvasProps)
  const currentResults = get(results)
  const sortedRes = Array.from(currentResults.values()).sort((a, b) => a.lastShare - b.lastShare)

  const zipper = new zip.ZipWriter(new zip.BlobWriter("application/zip"))
  
  for (let res of sortedRes) {
    let xoredData
    for (let shr of res.shares) {
      if (shr === res.lastShare) {
        const data = await encImgSvc.getEncImageByHash(res.imgHash)
        const pixelData = xorPixels(xoredData, data.image)
        const blob = await createRawBlobFromArray(pixelData)
        await shareSvc.insertShare(shr, pixelData)
        await zipper.add(`share-${shr}.png`, new zip.BlobReader(blob))
        continue
      }
      const exists = await shareSvc.existsShare(shr)
      if (!exists) {
        const pixelData = getRandomizedPixelArray(canvasData.sizeX, canvasData.sizeY)
        await shareSvc.insertShare(shr, pixelData)
        const blob = await createRawBlobFromArray(pixelData)
        await zipper.add(`share-${shr}.png`, new zip.BlobReader(blob))
        if (!xoredData) {
          xoredData = pixelData
        } else {
          xoredData = xorPixels(xoredData, pixelData)
        }
      } else {
        const pixelData = await shareSvc.getShare(shr)
        if (!xoredData) {
          xoredData = pixelData.uint8Arr
        } else {
          xoredData = xorPixels(xoredData, pixelData.uint8Arr)
        }
      }
    }
  }
  await shareSvc.removeAllShares()
  const zipBlob = await zipper.close()
  const a = document.createElement('a')
  a.href = URL.createObjectURL(zipBlob)
  a.download = "shares.zip"
  a.click()
}

export const decExportAsHandler = () => {
    
}

export const openDocsHandler = () => {

}
