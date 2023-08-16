import { type ImgAttr } from '../models/image'

export const getMaxWH = (images: ImgAttr[]): { maxH: number, maxW: number } => {
  let maxH = 0; let maxW = 0
  images.forEach((value): void => {
    if (value.height > maxH) {
      maxH = value.height
    }
    if (value.width > maxW) {
      maxW = value.width
    }
  })
  // default canvas size
  if (images.length < 1) {
    maxH = 150
    maxW = 300
  }
  return { maxH, maxW }
}

export const imageExists = (images: ImgAttr[], hash: string): boolean => {
  let exists = false
  images.forEach((value): void => {
    if (value.hash === hash) {
      exists = true
    }
  })
  return exists
}

export const isOverflown = (smaller: CSSStyleDeclaration, larger: CSSStyleDeclaration): boolean => {
  const smallerHeight = parseInt(smaller.height.replaceAll('px', ''))
  const smallerWidth = parseInt(smaller.width.replaceAll('px', ''))
  const largerHeight = parseInt(larger.height.replaceAll('px', ''))
  const largerWidth = parseInt(larger.width.replaceAll('px', ''))
  return smallerHeight > largerHeight || smallerWidth > largerWidth
}

export const getHeightWidth = async (dataURL: string): Promise<{ width: number, height: number }> => await new Promise<{ width: number, height: number }>((resolve): void => {
  const img = new Image()
  img.onload = () => {
    resolve({
      height: img.height,
      width: img.width
    })
  }
  img.src = dataURL
})
