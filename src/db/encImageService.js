import { dbInstance } from "./dexie"

class EncImageService {
  constructor(db) {
    this.db = db
  }

  async insertEncImage(hash, uint8Arr) {
    try {
      // const blob = new Blob([file], { type: file.type })
      // await this.db.encImgs.add({ hash, image: blob })
      await this.db.encImgs.add({ hash, image: uint8Arr })
      // console.log('encImg with hash added:', hash)
    } catch (error) {
      console.error('Failed to add encImg:', error)
    }
  }

  async getEncImageByHash(hash) {
    try {
      const img = await this.db.encImgs.get(hash)
      return img
    } catch (error) {
      console.error('Failed to get encImg:', error)
    }
  }

  async removeEncImageByHash(hash) {
    try {
      await this.db.encImgs.delete(hash)
    } catch (error) {
      console.error('Failed to remove encImg:', error)
    }
  }
  async existsEncImageByHash(hash) {
    try {
      const img = await this.db.encImgs.get(hash)
    return !!img
    } catch (error) {
      console.error('Failed to exist encImg:', error)
    }
  }

  async deleteAllExceptByHash(hashes) {
    try {
      const allHashes = await this.db.encImgs.toCollection().primaryKeys()
      const hashesToDelete = allHashes.filter(hash => !hashes.includes(hash))
      await this.db.encImgs.bulkDelete(hashesToDelete)
      // console.log(`Deleted all encImgs except: ${hashes.join(', ')}`)
    } catch (error) {
      console.error('Error during deletion:', error)
    }
  }

  async updateEncImageByHash(hash, newImageData) {
    try {
      const success = await this.db.encImgs.update(hash, { image: newImageData })
    } catch (error) {
      console.error('Failed to update EncImg:', error)
    }
  }
}

const encImgSvc = new EncImageService(dbInstance)

export default encImgSvc
