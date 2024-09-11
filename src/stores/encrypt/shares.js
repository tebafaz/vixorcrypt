import { writable } from "svelte/store"

const shares = writable(new Map())

export default shares