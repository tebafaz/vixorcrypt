import { dbInstance } from "./dexie"

class EncResultService {
  constructor(db) {
    this.db = db
  }

  async insertEncResult(hash, uint8Arr) {
    try {
      await this.db.encRes.add({ key: hash, image: uint8Arr })
      // console.log('EncRes with hash added:', hash)
    } catch (error) {
      console.error('Failed to add EncRes:', error)
    }
  }

  async getEncResultByHash(hash) {
    try {
      const img = await this.db.encRes.get(hash)
      return img
    } catch (error) {
      console.error('Failed to get EncRes:', error)
    }
  }

  async updateEncResultByHash(hash, newResultData) {
    try {
      await this.db.encRes.update(hash, { image: newResultData })
    } catch (error) {
      console.error('Failed to update EncRes:', error)
    }
  }

  async removeEncResultByHash(hash) {
    try {
      await this.db.encRes.delete(hash)
    } catch (error) {
      console.error('Failed to remove EncRes:', error)
    }
  }

  async deleteAll() {
    try {
      await this.db.encRes.clear()
      // console.log('Deleted all EncRes')
    } catch (error) {
      console.error('Error during deletion:', error)
    }
  }

  async deleteAllExceptByHash(hashes) {
    try {
      const allHashes = await this.db.encRes.toCollection().primaryKeys()
      const hashesToDelete = allHashes.filter(hash => !hashes.includes(hash))
      await this.db.encRes.bulkDelete(hashesToDelete)
      // console.log(`Deleted all EncRes except: ${hashes.join(', ')}`)
    } catch (error) {
      console.error('Error during deletion:', error)
    }
  }
}

const encResSvc = new EncResultService(dbInstance)

export default encResSvc
