import Konva from "konva"

export const resizeStage = (konvaStage, wrapper, verticalBar, horizontalBar, innerCanvas, canvasProps) => {
  if (wrapper && konvaStage) {
    konvaStage.width(wrapper.clientWidth)
    konvaStage.height(wrapper.clientHeight)
    const canvasPos = {
      x: (wrapper.clientWidth - canvasProps.sizeX) / 2,
      y: (wrapper.clientHeight - canvasProps.sizeY) / 2
    }
    innerCanvas.position(canvasPos)
    konvaStage.batchDraw()
    const PADDING = 5
    const verticalBarPos = {
      x: konvaStage.width() - PADDING - 10,
      y: PADDING,
    }
    const horizontalBarPos = {
      x: PADDING,
      y: konvaStage.height() - PADDING - 10,
    }
    verticalBar.position(verticalBarPos)
    horizontalBar.position(horizontalBarPos)

    if (innerCanvas.y() < 0 || innerCanvas.y() + innerCanvas.height() > konvaStage.height()) {
      verticalBar.visible(true)
    } else {
      verticalBar.visible(false)
    }
    if (innerCanvas.x() < 0 || innerCanvas.x() + innerCanvas.width() > konvaStage.width()) {
      horizontalBar.visible(true)
    } else {
      horizontalBar.visible(false)
    }
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

  let innerCanvasBox = new Konva.Rect({
    x: (wrapper.clientWidth - canvasProps.sizeX) / 2,
    y: (wrapper.clientHeight - canvasProps.sizeY) / 2,
    width: canvasProps.sizeX,
    height: canvasProps.sizeY,
    stroke: 'white',
    strokeWidth: 1,
    draggable: false,
    
  })

  // innerCanvasBox.cache()
  innerCanvasBox.filters([Konva.Filters.Pixelate])
  innerCanvasBox.pixelSize(1)

  layer.add(innerCanvasBox)
  layer.draw()
  var scrollLayers = new Konva.Layer()
      konvaStage.add(scrollLayers)

      const PADDING = 5

      var verticalBar = new Konva.Rect({
        width: 10,
        height: 100,
        fill: 'grey',
        opacity: 0.8,
        x: konvaStage.width() - PADDING - 10,
        y: PADDING,
        draggable: true,
        dragBoundFunc: function (pos) {
          pos.x = konvaStage.width() - PADDING - 10
          pos.y = Math.max(
            Math.min(pos.y, konvaStage.height() - this.height() - PADDING),
            PADDING
          )
          return pos
        },
        // visible: false
      })
      scrollLayers.add(verticalBar)

      verticalBar.on('dragmove', function () {
        // delta in %
        const availableHeight =
          konvaStage.height() - PADDING * 2 - verticalBar.height()
        var delta = (verticalBar.y() - PADDING) / availableHeight

        layer.y(-(canvasProps.sizeY - konvaStage.height()) * delta)
      })

      var horizontalBar = new Konva.Rect({
        width: 100,
        height: 10,
        fill: 'grey',
        opacity: 0.8,
        x: PADDING,
        y: konvaStage.height() - PADDING - 10,
        draggable: true,
        dragBoundFunc: function (pos) {
          pos.x = Math.max(
            Math.min(pos.x, konvaStage.width() - this.width() - PADDING),
            PADDING
          )
          pos.y = konvaStage.height() - PADDING - 10

          return pos
        },
        // visible: false
      })
      if (konvaStage.height() > innerCanvasBox.height()) {
        verticalBar.visible(false)
      }
      if (konvaStage.width() > innerCanvasBox.width()) {
        horizontalBar.visible(false)
      }
      scrollLayers.add(horizontalBar)
      // scrollLayers.draw()

      horizontalBar.on('dragmove', function () {
        // delta in %
        const availableWidth =
          konvaStage.width() - PADDING * 2 - horizontalBar.width()
        var delta = (horizontalBar.x() - PADDING) / availableWidth

        layer.x(-(canvasProps.sizeX - konvaStage.width()) * delta)
      })

  let currentScale = 1
  konvaStage.on('wheel', (e) => {
    e.evt.preventDefault()

    if (e.evt.ctrlKey) {
      currentScale = onCtrlWheel(konvaStage, innerCanvasBox, verticalBar, horizontalBar, currentScale, e.evt.deltaY < 0, scrollLayers)
    }

    if (!e.evt.ctrlKey) {
      return
    }
  })

  return [konvaStage, innerCanvasBox, verticalBar, horizontalBar]
}

const onCtrlWheel = (konvaStage, innerCanvasBox, verticalBar, horizontalBar, currentScale, isZoomIn, scrollLayers) => {
  let oldScale = konvaStage.scaleX()
  let pointer = konvaStage.getPointerPosition()
  let pos = innerCanvasBox.getAbsolutePosition()
  pointer.x = Math.min(Math.max(pointer.x, pos.x), pos.x + innerCanvasBox.width() * oldScale)
  pointer.y = Math.min(Math.max(pointer.y, pos.y), pos.y + innerCanvasBox.height() * oldScale)

  let mousePointTo = {
    x: (pointer.x - konvaStage.x()) / oldScale,
    y: (pointer.y - konvaStage.y()) / oldScale,
  }
  if (isZoomIn) {
    currentScale += 0.1
  } else {
    currentScale -= 0.1
  }
  currentScale = Math.min(Math.max(currentScale, 0.5), 3)

  innerCanvasBox.scale({ x: currentScale, y: currentScale })

  let newPos = {
    x: pointer.x - mousePointTo.x * currentScale,
    y: pointer.y - mousePointTo.y * currentScale,
  }
  // konvaStage.position(newPos)

  const PADDING = 5
  const verticalBarPos = {
    x: konvaStage.width() - PADDING - 10,
    y: PADDING+1000,
  }
  const horizontalBarPos = {
    x: PADDING,
    y: konvaStage.height() - PADDING - 10,
  }
  verticalBar.visible(true)
  horizontalBar.visible(true)
  verticalBar.position(verticalBarPos)
  horizontalBar.position(horizontalBarPos)
  scrollLayers.draw()
  return currentScale
}

const onWheel = () => {
  const dx = e.evt.deltaX
  const dy = e.evt.deltaY

  const minX = -(canvasProps.sizeX - stage.width())
  const maxX = 0

  const x = Math.max(minX, Math.min(layer.x() - dx, maxX))

  const minY = -(canvasProps.sizeY - stage.height())
  const maxY = 0

  const y = Math.max(minY, Math.min(layer.y() - dy, maxY))
  layer.position({ x, y })

  const availableHeight =
    stage.height() - PADDING * 2 - verticalBar.height()
  const vy =
    (layer.y() / (-canvasProps.sizeY + stage.height())) * availableHeight + PADDING
  verticalBar.y(vy)

  const availableWidth =
    stage.width() - PADDING * 2 - horizontalBar.width()

  const hx =
    (layer.x() / (-canvasProps.sizeX + stage.width())) * availableWidth + PADDING
  horizontalBar.x(hx)
}

const onShiftWheel = () => {

}