import { defaultState } from "../constants/shareState"
import shares from "../stores/encrypt/shares"

export const removeShares = (oldShares, ids) => {
  let tempShares = new Map(oldShares)
  for (let [key, _] of ids.entries()) {
    if (tempShares.has(key) && tempShares.get(key) === defaultState) {
      tempShares.delete(key)
    }
  }
  shares.set(tempShares)
}
