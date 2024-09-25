import { writable } from "svelte/store"

const initLoading = () => {
  const { set, subscribe, update } = writable(0)
  return {
    subscribe,
    set,
    inc: () => update(n => n + 1),
    dec: () => update(n => n - 1)
  }
}

const loading = initLoading()

export default loading
