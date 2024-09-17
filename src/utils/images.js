import { sha224 } from "js-sha256"


export const getImageProps = (image) => {
  return new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          let hash = sha224.hex(event.target.result.toString())
          resolve({ hash: hash, width: img.width, height: img.height })
        }
        img.src = fileReader.result
      }
      fileReader.readAsDataURL(image)
    } catch (e) {
      reject(e)
    }
  })
}

export const getMaxWidthAndHeight = (imageProps) => {
  let maxWidth = 0
  let maxHeight = 0
  for(let val of imageProps.values()) {
    if (maxHeight < val.height) {
      maxHeight = val.height
    }
    if (maxWidth < val.width) {
      maxWidth = val.width
    }
  }
  return {maxWidth, maxHeight}
}

export const uint8arrToImage = (uint8arr, width, height) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  const imageData = new ImageData(uint8arr, width, height)
  ctx.putImageData(imageData, 0, 0)
  const img = new Image()
  img.src = canvas.toDataURL()
  return img
}
