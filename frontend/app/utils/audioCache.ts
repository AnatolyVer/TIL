import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'AudioDB';
const STORE_NAME = 'audios';
let DB_VERSION = 2;

const getDB = async (): Promise<IDBPDatabase> => {
    let db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        },
    });

    if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.close();
        DB_VERSION++;
        db = await openDB(DB_NAME, DB_VERSION, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            },
        });
    }

    return db;
};

export const saveBlobToIndexedDB = async (id: string, blob: Blob) => {
    try {
        const db = await getDB();
        await db.put(STORE_NAME, blob, id);
    } catch (error) {
        console.error('Error saving audio to IndexedDB:', error);
        throw error;
    }
};

export const getBlobFromIndexedDB = async (id: string): Promise<Blob | null> => {
    try {
        const db = await getDB();
        const result = await db.get(STORE_NAME, id);
        return result || null;
    } catch (error) {
        console.error('Error retrieving audio from IndexedDB:', error);
        return null;
    }
};