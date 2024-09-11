import { writable } from "svelte/store"

const images = writable(new Map())

export default images // hash values