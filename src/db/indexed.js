export const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('imagesDB', 1);
  
      request.onupgradeneeded = event => {
        const db = request.result;
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images', { keyPath: 'hash' });
        }
      };
  
      request.onsuccess = event => {
        resolve(request.result);
      };
  
      request.onerror = event => {
        reject('Database failed to open: ' + request.error);
      };
    });
  }
  
  export const addImage = (db, imageObj) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('images', 'readwrite');
      const store = transaction.objectStore('images');
      const request = store.put(imageObj);
  
      request.onsuccess = () => {
        resolve('Image added');
      };
  
      request.onerror = () => {
        reject('Failed to add image');
      };
    });
  }
  
  export const getImageByHash = (db, hash) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('images', 'readonly');
      const store = transaction.objectStore('images');
      const request = store.get(hash);
  
      request.onsuccess = () => {
        resolve(request.result);
      };
  
      request.onerror = () => {
        reject('Failed to retrieve image');
      };
    });
  }

  export const removeImage = (db, hash) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('images', 'readwrite');
      const store = transaction.objectStore('images');
      const request = store.delete(hash);  // Remove the image by hash
  
      request.onsuccess = () => {
        resolve('Image deleted');
      };
  
      request.onerror = () => {
        reject('Failed to delete image');
      };
    });
  }