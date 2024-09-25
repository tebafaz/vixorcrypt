import { Dexie } from "dexie"

const createDBName = () => {
  const array = new Uint32Array(4)
  window.crypto.getRandomValues(array)
  return `vixorcrypt:${Array.from(array).map(val => val.toString(36)).join('-')}`
}

const openDatabase = (dbName) => {
  const db = new Dexie(dbName)
  db.version(1).stores({
    encImgs: 'hash',
    shares: 'num',
    decImgs: 'hash',
    encRes: 'key',
    decRes: 'key'
  })
  return db
}
export const dbName = createDBName()
export const dbInstance = openDatabase(dbName)

export const deleteDatabase = () => {
  dbInstance.delete()
}
