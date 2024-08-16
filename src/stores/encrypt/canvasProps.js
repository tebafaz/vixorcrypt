import { writable } from "svelte/store";

const canvasProps = writable({
    sizeX: 0,
    sizeY: 0,
});

export default canvasProps;