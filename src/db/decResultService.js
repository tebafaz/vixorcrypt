import { dbInstance } from "./dexie"

class DecResultService {
  constructor(db) {
    this.db = db
  }

  async insertDecResult(hash, uint8Arr) {
    try {
      await this.db.decRes.add({ key: hash, image: uint8Arr })
      // console.log('DecRes with hash added:', hash)
    } catch (error) {
      console.error('Failed to add DecRes:', error)
    }
  }

  async getDecResultByHash(hash) {
    try {
      const img = await this.db.decRes.get(hash)
      return img
    } catch (error) {
      console.error('Failed to get DecRes:', error)
    }
  }

  async updateDecResultByHash(hash, newResultData) {
    try {
      await this.db.decRes.update(hash, { image: newResultData })
    } catch (error) {
      console.error('Failed to update DecRes:', error)
    }
  }

  async removeDecResultByHash(hash) {
    try {
      await this.db.decRes.delete(hash)
    } catch (error) {
      console.error('Failed to remove DecRes:', error)
    }
  }
  async existsDecResultByHash(hash) {
    try {
      const count = await this.db.decRes.equals(hash).count()
      return count > 0
    } catch (error) {
      console.error('Failed to exist DecRes:', error)
    }
  }

  async deleteAll() {
    try {
      await this.db.decRes.clear()
      // console.log('Deleted all DecRes')
    } catch (error) {
      console.error('Error during deletion:', error)
    }
  }

  async deleteAllExceptByHash(hashes) {
    try {
      const allHashes = await this.db.decRes.toCollection().primaryKeys()
      const hashesToDelete = allHashes.filter(hash => !hashes.includes(hash))
      await this.db.decRes.bulkDelete(hashesToDelete)
      // console.log(`Deleted all DecRes except: ${hashes.join(', ')}`)
    } catch (error) {
      console.error('Error during deletion:', error)
    }
  }
}

const decResSvc = new DecResultService(dbInstance)

export default decResSvc
