import { writable } from "svelte/store";

const encryptionInput = writable({
    stateEncrypting: false,
    shares: [],
    images: []
});

export default encryptionInput; // to choose image and shares for encryption