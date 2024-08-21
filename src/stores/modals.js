import { writable } from "svelte/store";
import { closeModal } from "../constants/modals";

const modal = writable(closeModal);

export default modal
