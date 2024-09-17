import { writable } from "svelte/store"

const results = writable(new Map())

export default results // decryptionInput result