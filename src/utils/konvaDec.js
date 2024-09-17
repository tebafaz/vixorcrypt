import Konva from "konva"
import decImgSvc from "../db/decImageService"
import { xorPixels } from "./imageEncryption"
import images from "../stores/decrypt/images"
import { get } from "svelte/store"
import { uint8arrToImage } from "./images"

export const handleDecKonvaImage = async (group, state, imgs) => {
  if (group && state) {
    const share = group.findOne('.share')
    let picked = false
    if (share) {
      for (let [key, val] of imgs) {
        if (val.picked) {
          picked = true
        }
        if ((val.picked && !val.xored) || (val.xored && !val.picked)) {
          // xor
          const row = await decImgSvc.getDecImageByHash(key)
          const rowXored = await decImgSvc.getDecImageByHash('currentXored')
          const newXored = xorPixels(row.image, rowXored.image)
          // const canvas = document.createElement('canvas')
          // canvas.width = val.width
          // canvas.height = val.height
          // const ctx = canvas.getContext('2d')
          // const imageData = new ImageData(newXored, val.width, val.height)
          // ctx.putImageData(imageData, 0, 0)
          // const img = new Image()
          const img = uint8arrToImage(newXored, val.width, val.height)
          img.onload = () => {
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
      }
      if (!picked) {
        const share = group.findOne('.share')
        if (share) {
          share.destroy()
          await decImgSvc.removeDecImageByHash('currentXored')
        }
      }
    } else {
      for (const [key, val] of imgs) {
        if (val.picked) {
          const row = await decImgSvc.getDecImageByHash(key)
          // const canvas = document.createElement('canvas')
          // canvas.width = val.width
          // canvas.height = val.height
          // const ctx = canvas.getContext('2d')
          // const imageData = new ImageData(row.image, val.width, val.height)
          // ctx.putImageData(imageData, 0, 0)
          // const img = new Image()
          // img.src = canvas.toDataURL()
          const img = uint8arrToImage(row.image, val.width, val.height)
          img.onload = () => {
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
            decImgSvc.insertDecImage('currentXored', row.image)
            
            val.xored = true
            const newMap = get(images)
            newMap.set(key, val)
            images.set(newMap)
          }
          break
        }
      }
    }
  }
}