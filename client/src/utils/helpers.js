export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
};

export function idbPromise(storeName, method, object) {
  return new Promise ((resolve, reject) => {
    // open connection to the databawe 'shop-shop' with version of 1
    const request = window.indexedDB.open('shop-shop', 1);

    let db, tx, store;

    // if version has changed or if first time using database run this method
    request.onupgradeneeded = function(e) {
      const db = request.result;
      // create objet store for each type of data and set 'primary' key index to be the '_id' of the data
      db.createObjectStore('products', { keyPath: '_id '});
      db.createObjectStore('categories', { keyPath: '_id'});
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    // handle any errors with connecting
    request.onerror = function(e) {
      console.log('There was an error');
    };

    // on database open success
    request.onsuccess = function(e) {
      // save a reference of the database to the 'db' variable
      db = request.result;
      // open a transaction to whatever we pass into `storeName`
      tx = db.transaction(storeName, 'readwrite');
      // save a reference to that object store
      store = tx.objectStore(storeName);

      // if there's any errors
      db.onerror = function(e) {
        console.log('error', e);
      };

      // check which method was passed in and perform it on the object store
      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      // when the transaction is complete, close connection
      tx.oncomplete = function(e) {
        db.close();
      }
    }
  });
}
