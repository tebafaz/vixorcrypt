import { dbInstance } from "./dexie"

class ShareService {
  constructor(db) {
    this.db = db
  }

  async insertShare(num, uint8Arr) {
    try {
      await this.db.shares.add({ num, uint8Arr })
      // console.log('share with num added:', num)
    } catch (error) {
      console.error('Failed to add share:', error)
    }
  }

  async getShare(num) {
    try {
      const img = await this.db.shares.get(num)
      return img
    } catch (error) {
      console.error('Failed to get share:', error)
    }
  }

  async removeShare(num) {
    try {
      await this.db.shares.delete(num)
    } catch (error) {
      console.error('Failed to remove share:', error)
    }
  }
  async removeAllShares() {
    try {
      await this.db.shares.clear()
    } catch (error) {
      console.error('Failed to remove share:', error)
    }
  }
  async existsShare(num) {
    try {
      const count = await this.db.shares.where('num').equals(num).count()
      return count > 0
    } catch (error) {
      console.error('Failed to exist share:', error)
    }
  }
}

const shareSvc = new ShareService(dbInstance)

export default shareSvc
