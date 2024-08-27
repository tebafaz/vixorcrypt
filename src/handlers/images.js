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
          // @ts-ignore
          img.src = fileReader.result
        }
        fileReader.readAsDataURL(image)
      } catch (e) {
        reject(e)
      }
    })
  }