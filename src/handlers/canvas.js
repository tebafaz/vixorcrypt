import { createCanvasModal } from "../constants/modals";
import modal from "../stores/modals";

export const openCreateCanvas = () => {
  console.log("createCanvas")
  modal.set(createCanvasModal)
}