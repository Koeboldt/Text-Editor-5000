import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('putting stuff in the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const storage = tx.objectStore('jate');
  const request = storage.put({ id: 1, content });
  const result = await request;
  console.log('Data saved to the database', result);
};

export const getDb = async () => {
  console.log('getting stuff from database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const storage= tx.objectStore('jate');
  const request = storage.getAll();
  const result = await request;
  return result;
};

initdb();
