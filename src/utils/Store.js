const storage = window.localStorage

/**
 * Storage for api results already fetched once
 */
class Store {

  set(key, value) {
    storage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    const val = storage.getItem(key);
    if(val !== null) {
      return JSON.parse(val);
    }
    else {
      return null;
    }
  }
}

export default Store