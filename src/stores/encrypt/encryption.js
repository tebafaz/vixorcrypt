import { writable } from "svelte/store";

const encryptionInput = writable({
    stateEncrypting: false,
    // shares: [],
    // image: undefined,
    canCreate: false
});

export default encryptionInput; // to choose image and shares for encryption
