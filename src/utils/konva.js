import Konva from "konva"

export const resizeStage = (konvaStage, wrapper, innerCanvas, canvasProps) => {
  if (wrapper && konvaStage) {
    konvaStage.width(wrapper.clientWidth)
    konvaStage.height(wrapper.clientHeight)

    let scale = 1 // assuming y is the same
    for (let i = scale; i > 0.1; i -= 0.1) {
      if (wrapper.clientHeight > canvasProps.sizeY * i) {
        scale = i
        break
      }
    }
    for (let i = scale; i > 0.1; i -= 0.1) {
      if (wrapper.clientWidth > canvasProps.sizeX * i) {
        scale = i
        break
      }
    }

    const canvasPos = {
      x: (wrapper.clientWidth - canvasProps.sizeX * scale) / 2,
      y: (wrapper.clientHeight - canvasProps.sizeY * scale) / 2
    }
    innerCanvas.position(canvasPos)
    innerCanvas.scale({x: scale, y: scale})
    konvaStage.batchDraw()
  }
}

export const initKonva = (wrapper, canvasProps) => {
  let konvaStage = new Konva.Stage({
    container: wrapper,
    width: wrapper.clientWidth,
    height: wrapper.clientHeight,
  })

  let layer = new Konva.Layer()
  konvaStage.add(layer)

  let scale = 1
  for (let i = scale; i > 0.1; i -= 0.1) {
    if (wrapper.clientHeight > canvasProps.sizeY * i) {
      scale = i
      break
    }
  }
  for (let i = scale; i > 0.1; i -= 0.1) {
    if (wrapper.clientWidth > canvasProps.sizeX * i) {
      scale = i
      break
    }
  }

  let group = new Konva.Group({
    x: (wrapper.clientWidth - canvasProps.sizeX * scale) / 2,
    y: (wrapper.clientHeight - canvasProps.sizeY * scale) / 2,
    width: canvasProps.sizeX,
    height: canvasProps.sizeY,
    draggable: false,
    scale: {x: scale, y: scale},
    clipFunc: (ctx) => {
      ctx.rect(0, 0, canvasProps.sizeX, canvasProps.sizeY);
    },
  })
  
  const border = new Konva.Rect({
    x: 0,
    y: 0,
    width: canvasProps.sizeX,
    height: canvasProps.sizeY,
    stroke: 'white',
    strokeWidth: 2,
    listening: false,
    fill: 'black',
    name: 'border'
  })
  group.add(border)

  layer.add(group)
  layer.draw()

  return [konvaStage, group, border]
}
