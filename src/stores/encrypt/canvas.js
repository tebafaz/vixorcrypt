import { writable } from "svelte/store";

const canvasProps = writable({
    initialized: false,
    sizeX: -1,
    sizeY: -1,
});

export default canvasProps;