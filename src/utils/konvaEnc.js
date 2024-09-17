import Konva from "konva"
import encImgSvc from "../db/encImageService"

export const handleEncKonvaImage = async (group, state, imgs) => {
  if (group && state) {
    for (const [key, val] of imgs) {
      const imageIfExist = group.findOne(`.${key}`)
      if (imageIfExist && !val.picked) {
        imageIfExist.destroy()
      }
      if (val.picked) {
        const row = await encImgSvc.getEncImageByHash(key)
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
            draggable: true,
            image: img,
            name: key
          })
          // image.filters([Konva.Filters.Pixelate])
          // image.pixelSize(1)
          const imgToAdd = group.findOne(`.${key}`)
          if (!imgToAdd) {
            group.add(image)
          }

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
        }
      }
    }
  }
  if (group && !state) {
    for (const [key, val] of imgs) {
      const image = group.findOne(`.${key}`)
      if (image) {
        image.destroy()
      }
    }
  }
}