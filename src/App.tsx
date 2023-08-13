import React, { useEffect, useState } from 'react'
import sha1 from 'crypto-js/sha1'
import './css/style.css'
import type { ImgAttr } from './models/image'
import Images from './components/images'
import { getHeightWidth, getMaxWH, imageExists, isOverflown } from './utils/image'
import EncryptionLayers from './components/encryption_layers'
import LayersToImages from './components/layers_to_images'
import type { LayerAttr } from './models/layer'
import { fillBgRandPxl } from './utils/canvas'
import TopBar from './components/top_bar'
import * as id from './constants/ids'
import { MenuBar } from './menubar/jdmenubar'
import './constants/menubar'
import { menuItems } from './constants/menubar'

const App: React.FC = () => {
  const [ctrlPressed, setCtrlPressed] = useState(false)

  const [canvasScale, setCanvasScale] = useState(1)

  const [canvasW, setCanvasW] = useState(300)
  const [canvasH, setCanvasH] = useState(150)

  const [layerAttrs, setLayerAttrs] = useState<LayerAttr[]>([])

  const [isEncrypting, setIsEncrypting] = useState(false)

  const [images, setImages] = useState<ImgAttr[]>([])

  // useEffect(() => {
  //   document.addEventListener('keydown', (e) => { if (e.ctrlKey) { setCtrlPressed(true) } })
  //   document.addEventListener('keyup', () => { setCtrlPressed(false) })
  //   window.addEventListener('wheel', (e) => { if (e.ctrlKey) { e.preventDefault() } }, { passive: false })
  // }, [])

  // useEffect(() => {
  //   const { maxH, maxW } = getMaxWH(images)
  //   const canvasHolder = document.getElementsByTagName('div').namedItem(id.canvasHolder1)
  //   if (canvasHolder == null) {
  //     console.error(`${id.canvasHolder1} is null`)
  //     return
  //   }
  //   const canvas = document.getElementsByTagName('canvas').namedItem(id.mainCanvas)
  //   if (canvas == null) {
  //     return
  //   }

  //   canvas.height = maxH
  //   canvas.width = maxW
  //   canvasHolder.style.height = `${maxH}px`
  //   canvasHolder.style.width = `${maxW}px`

  //   setCanvasW(maxW)
  //   setCanvasH(maxH)
  //   fillBgRandPxl(canvas, maxW, maxH)
  // }, [images])
  
  window.onload = () => {
    const menuBar = document.getElementById('menu-bar')
    if (menuBar == null) {
      return
    }
    const menubar = new MenuBar(menuBar, menuItems)
  }

  const mouseOnWheelHandler = (e: React.WheelEvent<HTMLDivElement>): void => {
    if (ctrlPressed) {
      const canvas = document.getElementsByTagName('canvas').namedItem(id.mainCanvas)
      let scale = canvasScale
      if (e.deltaY < 1) {
        scale += 0.1
      } else {
        scale -= 0.1
      }
      if (scale < 0.2) {
        scale = 0.2
      }

      if (canvas == null) {
        return
      }
      canvas.style.scale = `${scale}`
      setCanvasScale(scale)
      const canvasHolder = document.getElementsByTagName('div').namedItem(id.canvasHolder1)
      const canvasStyle = getComputedStyle(canvas)
      const height = parseInt(canvasStyle.height.replaceAll('px', ''))
      const width = parseInt(canvasStyle.width.replaceAll('px', ''))

      if (canvasHolder == null) {
        return
      }
      canvasHolder.style.height = `${scale * height}px`
      canvasHolder.style.width = `${scale * width}px`
      canvas.style.imageRendering = 'pixelated'

      const canvasHolder2 = document.getElementsByTagName('div').namedItem(id.canvasHolder2)
      const canvasHolderStyle = getComputedStyle(canvasHolder)
      if (canvasHolder2 == null) {
        return
      }
      const canvasHolder2Style = getComputedStyle(canvasHolder2)

      if (isOverflown(canvasHolderStyle, canvasHolder2Style)) {
        canvas.style.marginTop = '0px'
        canvasHolder.style.marginTop = '0px'
      } else {
        canvas.style.marginTop = 'auto'
        canvasHolder.style.marginTop = 'auto'
      }
    }
  }

  const importImages = (e: React.MouseEvent): void => {
    const input = document.getElementsByTagName('input').namedItem('image-input')
    input?.click()
  }

  const setFileHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files == null) {
      return
    }
    if (e.currentTarget.files == null) {
      return
    }
    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader()
      const file = e.currentTarget.files.item(i)
      reader.readAsDataURL(file as Blob)
      reader.onload = async function () {
        const readerResultStr = (reader.result as string).toString()
        const wh = await getHeightWidth(readerResultStr)
        if (file == null) {
          return
        }
        const image: ImgAttr = {
          base64: readerResultStr,
          hash: sha1(readerResultStr).toString(),
          filename: file.name,
          width: wh.width,
          height: wh.height
        }
        if (imageExists(images, image.hash)) {
          console.log('image exist')
          return
        }
        setImages(existing => [...existing, image])
      }
    }
  }

  return (
    <>
    <input multiple type='file' hidden accept='image/*' id={ id.imageInput } onChange={ setFileHandler }/>
      <div className='w-full h-screen flex flex-col'>
        <TopBar/>
        { /* start workspace */ }
        <div className='flex-auto'>
          <div className='w-full h-full flex flex-row'>
            { /* start main canvas panel */ }
            <div className='flex-1 bg-blueGray-medium-dark border-t-2 border-r-2 border-stone-900'>
              <div className='flex flex-col h-full'>
                <div className='flex flex-row h-full w-full'>
                  <div className='flex-auto relative overflow-scroll' id={id.canvasHolder2} onWheel={ mouseOnWheelHandler }>
                    <div className='absolute m-auto inset-0 grid content-center justify-center outline-dashed outline-1 outline-stone-900' id={ id.canvasHolder1 }>
                      <canvas className='align-top' id={id.mainCanvas}>
                        { /* canvas */ }
                      </canvas>
                    </div>
                  </div>
                </div>
                <div className='flex-none h-7 bg-blueGray-light font-light text-sm'>
                  <span className='pl-2 text-sm text-white'>Algorithm: { 'xor-c' } Mode: { 'Generate' } Canvas size: { canvasW }x{ canvasH }</span>
                </div>
              </div>
            </div>
            { /* end main canvas panel */ }
            { /* start layers panel */ }
            <div className='flex-none w-96 h-full bg-stone-300'>
              <EncryptionLayers isEncrypting={ isEncrypting } layerAttrs={ layerAttrs } setLayerAttrs={ setLayerAttrs }></EncryptionLayers>
              <Images isEncrypting={ isEncrypting } importImages={ importImages } images={ images }></Images>
              <LayersToImages isEncrypting={ isEncrypting } setIsEncrypting={ setIsEncrypting }></LayersToImages>
            </div>
            { /* end layers panel */ }
          </div>
        </div>
        { /* end workspace */ }
      </div>
    </>
  )
}

export default App
