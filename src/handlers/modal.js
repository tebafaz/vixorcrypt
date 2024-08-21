import modal from "../stores/modals";
import shares from "../stores/encrypt/shares";
import canvas from "../stores/encrypt/canvas";
import { createCanvasModal, createSharesModal } from "../constants/modals";

export const openCreateCanvas = () => {
  console.log("createCanvas")
  modal.set(createCanvasModal)
}

export const openCreateShares = () => {
  console.log("createShares")
  modal.set(createSharesModal)
}

export const createCanvas = (width, height) => {
  let tempCanvas = {
    initialized: true,
    sizeX: width,
    sizeY: height,
  }
  canvas.set(tempCanvas)
}

export const createShares = (shareNumber) => {
  let tempShares = new(Map);
  for (let i = 0; i < shareNumber; i++) {
    tempShares.set(i, 0)
  }
  shares.set(tempShares)
}
