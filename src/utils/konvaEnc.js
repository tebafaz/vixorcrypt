import Konva from "konva"
import encImgSvc from "../db/encImageService"
import { uint8arrToImage } from "./images"
import { get } from "svelte/store"
import encryptionInput from "../stores/encrypt/encryption"
import canvasProps from "../stores/encrypt/canvas"
import loading from "../stores/loading"

export const handleEncKonvaImage = async (group, imgs) => {
  loading.inc()
  const state = get(encryptionInput).stateEncrypting
  if (group && state) {
    for (const [key, val] of imgs) {
      if (val.picked) {
        const row = await encImgSvc.getEncImageByHash(key)
        const img = await uint8arrToImage(row.image, val.width, val.height)
        let image = new Konva.Image({
          x: 0,
          y: 0,
          width: img.width,
          height: img.height,
          draggable: true,
          image: img,
          name: key
        })
        const imgToAdd = group.findOne(`.${key}`)
        if (!imgToAdd) {
          group.add(image)
        }
        const canvasProp = get(canvasProps)
        
        const groupClone = group.clone()
        groupClone.scaleX(1)
        groupClone.scaleY(1)
        groupClone.x(0)
        groupClone.y(0)

        const border = groupClone.findOne('.border')
        border.strokeEnabled(false)
        

        const offscreenContainer = document.createElement('div')
        const offscreenStage = new Konva.Stage({
          container: offscreenContainer,
          width: canvasProp.sizeX,
          height: canvasProp.sizeY,
        })
        const offscreenLayer = new Konva.Layer()
        offscreenStage.add(offscreenLayer)
        offscreenLayer.add(groupClone)
        offscreenLayer.draw()
        
        const canvas = groupClone.toCanvas({
          x: 0,
          y: 0,
          imageSmoothingEnabled: false,
          width: canvasProp.sizeX,
          height: canvasProp.sizeY
        })

        const context = canvas.getContext('2d')
        const imageData = context.getImageData(0, 0, canvasProp.sizeX, canvasProp.sizeY)
        await encImgSvc.updateEncImageByHash('current', imageData.data)
        offscreenStage.destroy()
        const snapThreshold = 10
        image.on('dragmove', () => {
          group.find('Shape').forEach(other => {
            if (other === image) return

            if (Math.abs(image.x() - other.x()) < snapThreshold) {
              image.x(other.x())
            }
            if (Math.abs((image.x() + image.width()) - (other.x() + other.width())) < snapThreshold) {
              image.x(other.x() + other.width() - image.width())
            }

            if (Math.abs(image.y() - other.y()) < snapThreshold) {
              image.y(other.y())
            }
            if (Math.abs((image.y() + image.height()) - (other.y() + other.height())) < snapThreshold) {
              image.y(other.y() + other.height() - image.height())
            }
          })
        })
        image.on('dragend', async () => {
          const canvasProp = get(canvasProps)
          const groupClone = group.clone()
          groupClone.scaleX(1)
          groupClone.scaleY(1)
          groupClone.x(0)
          groupClone.y(0)

          const border = groupClone.findOne('.border')
          border.strokeEnabled(false)

          const offscreenContainer = document.createElement('div')
          const offscreenStage = new Konva.Stage({
            container: offscreenContainer,
            width: canvasProp.sizeX,
            height: canvasProp.sizeY,
          })
          const offscreenLayer = new Konva.Layer()
          offscreenStage.add(offscreenLayer)
          offscreenLayer.add(groupClone)
          offscreenLayer.draw()
          
          const canvas = groupClone.toCanvas({
            x: 0,
            y: 0,
            imageSmoothingEnabled: false,
            width: canvasProp.sizeX,
            height: canvasProp.sizeY
          })

          const context = canvas.getContext('2d')
          const imageData = context.getImageData(0, 0, canvasProp.sizeX, canvasProp.sizeY)
          await encImgSvc.updateEncImageByHash('current', imageData.data)
          offscreenStage.destroy()
        })
      }
    }
  }
  loading.dec()
}