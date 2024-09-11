import { writable } from "svelte/store"

const decryptionInput = writable({
    stateDecrypting: false,
    // shares: [],
    // image: undefined,
    canCreate: false
})

export default decryptionInput // to choose image and shares for encryption
