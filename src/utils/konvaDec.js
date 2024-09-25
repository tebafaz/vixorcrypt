import Konva from "konva"
import decImgSvc from "../db/decImageService"
import { xorPixels } from "./imageEncryption"
import images from "../stores/decrypt/images"
import { get } from "svelte/store"
import { uint8arrToImage } from "./images"
import decryptionInput from "../stores/decrypt/decryption"
import loading from "../stores/loading"

export const handleDecKonvaImage = async (group, imgs) => {
  loading.inc()
  const state = get(decryptionInput).stateDecrypting
  if (group && !state) {
    await decImgSvc.removeDecImageByHash('currentXored')
    const image = group.findOne('.share')
    if (image) {
      image.destroy()
    }
  }
  if (group && state) {
    let picked = false
    const share = group.findOne('.share')
    if (share) {
      for (let [key, val] of imgs) {
        if (val.picked) {
          picked = true
        }
        if ((val.picked && !val.xored) || (val.xored && !val.picked)) {
          const row = await decImgSvc.getDecImageByHash(key)
          const rowXored = await decImgSvc.getDecImageByHash('currentXored')
          const newXored = xorPixels(row.image, rowXored.image)
          const img = await uint8arrToImage(newXored, val.width, val.height)
          share.image(img)
          decImgSvc.updateDecImageByHash('currentXored', newXored)
          if (val.picked) {
            val.xored = true
          }
          if (!val.picked) {
            val.xored = false
          }
          const newMap = get(images)
          newMap.set(key, val)
          images.set(newMap)
        }
      }
    } else {
      for (const [key, val] of imgs) {
        if (val.picked && !val.xored) {
          const row = await decImgSvc.getDecImageByHash(key)
          const img = await uint8arrToImage(row.image, val.width, val.height)
          let image = new Konva.Image({
            x: 0,
            y: 0,
            width: img.width,
            height: img.height,
            draggable: false,
            image: img,
            name: 'share'
          })
          group.add(image)
          await decImgSvc.insertDecImage('currentXored', row.image)
          val.xored = true
          const newMap = get(images)
          newMap.set(key, val)
          images.set(newMap)
          loading.dec()
          return
        }
      }
    }
    if (!picked) {
      const share = group.findOne('.share')
      if (share) {
        share.destroy()
        await decImgSvc.removeDecImageByHash('currentXored')
      }
    }
  }
  loading.dec()
}
