class HashMapChain {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  display() {
    this._hashTable.forEach((item) => {
      if (item) {
        console.log(item);
        while (item.next) {
          console.log(item.next);
          item = item.next;
        }
      }
    });
  }

  get(key) {
    const index = this._findSlot(key);

    let currItem = this._hashTable[index];

    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }

    while (currItem.key !== key) {
      currItem = currItem.next;
    }

    return currItem.value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;

    if (loadRatio > HashMapChain.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMapChain.SIZE_RATIO);
    }
    const index = this._findSlot(key);

    let currItem = this._hashTable[index];

    if (!currItem) {
      this.length++;

      this._hashTable[index] = {
        key,
        value,
        next: null,
        DELETED: false,
      };
    } else {
      while (currItem.key !== key) {
        if (currItem.next === null) {
          currItem.next = {
            key,
            value,
            next: null,
            DELETED: false,
          };
          this.length++;
          return;
        }
      }

      currItem.value = value;
    }
  }

  delete(key) {
    const index = this._findSlot(key);
    let slot = this._hashTable[index];

    while (slot.key !== key && slot) {
      slot = slot.next;
    }

    if (!slot) {
      throw new Error('Key error');
    }
    slot.DELETED = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMapChain._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;

      const slot = this._hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }

      return index;
    }
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (let slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        while (slot !== null) {
          this.set(slot.key, slot.value);
          slot = slot.next;
        }
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}
