import { dbInstance } from "./dexie"

class DecImageService {
  constructor(db) {
    this.db = db
  }

  async insertDecImage(hash, uint8Arr) {
    try {
      await this.db.decImgs.add({ hash, image: uint8Arr })
      // console.log('DecImg with hash added:', hash)
    } catch (error) {
      console.error('Failed to add DecImg:', error)
    }
  }

  async getDecImageByHash(hash) {
    try {
      const img = await this.db.decImgs.get(hash)
      return img
    } catch (error) {
      console.error('Failed to get DecImg:', error)
    }
  }

  async updateDecImageByHash(hash, newImageData) {
    try {
      await this.db.decImgs.update(hash, { image: newImageData })
    } catch (error) {
      console.error('Failed to update DecImg:', error)
    }
  }

  async removeDecImageByHash(hash) {
    try {
      await this.db.decImgs.delete(hash)
      // console.log('Deleted DecImg:', hash)
    } catch (error) {
      console.error('Failed to remove DecImg:', error)
    }
  }
  async existsDecImageByHash(hash) {
    try {
      const count = await this.db.decImgs.equals(hash).count()
      return count > 0
    } catch (error) {
      console.error('Failed to exist DecImg:', error)
    }
  }

  async deleteAll() {
    try {
      await this.db.decImgs.clear()
      // console.log('Deleted all DecImgs')
    } catch (error) {
      console.error('Error during deletion:', error)
    }
  }

  async deleteAllExceptByHash(hashes) {
    try {
      const allHashes = await this.db.decImgs.toCollection().primaryKeys()
      const hashesToDelete = allHashes.filter(hash => !hashes.includes(hash))
      await this.db.decImgs.bulkDelete(hashesToDelete)
      // console.log(`Deleted all DecImgs except: ${hashes.join(', ')}`)
    } catch (error) {
      console.error('Error during deletion:', error)
    }
  }
}

const decImgSvc = new DecImageService(dbInstance)

export default decImgSvc
