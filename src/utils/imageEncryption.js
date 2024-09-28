export const getRandomizedPixelArray = (width, height) => {
  const imageData = new Uint8ClampedArray(width * height * 4)
  const chunkSize = 65536
  for (let i = 0; i < imageData.length; i += chunkSize) {
    const end = Math.min(i + chunkSize, imageData.length)
    const chunk = new Uint8ClampedArray(imageData.buffer, i, end - i)

    crypto.getRandomValues(chunk)
  }
  for (let i = 3; i < imageData.length; i += 4) {
    imageData[i] = 255
  }
  return imageData
}

export const xorPixels = (imageData1, imageData2) => {
  if (imageData1.length !== imageData2.length) {
    console.error("imageData lengths are not same", imageData1, imageData2)
    return
  }
  const imageData = new Uint8ClampedArray(imageData1.length)
  for (let i = 0; i < imageData1.length; i += 4) {
    imageData[i] = imageData1[i] ^ imageData2[i]
    imageData[i + 1] = imageData1[i + 1] ^ imageData2[i + 1]
    imageData[i + 2] = imageData1[i + 2] ^ imageData2[i + 2]
    imageData[i + 3] = 255
  }
  return imageData
}

export const createRawBlobFromArray = (pixelArray, canvasData) => {
  let canvas = document.createElement("canvas")
  canvas.width = canvasData.sizeX
  canvas.height = canvasData.sizeY
  let ctx = canvas.getContext("2d")
  const imageData = new ImageData(pixelArray, canvasData.sizeX, canvasData.sizeY)
  ctx.putImageData(imageData, 0, 0)

  return new Promise((resolve) => {
        canvas.toBlob(resolve)
  })
}

export const fileToUint8ClampedArray = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
        img.src = e.target.result
    }

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, img.width, img.height)
      resolve(imageData.data)
    }

    img.onerror = (error) => {
        reject(error)
    }

    reader.readAsDataURL(file)
  })
}