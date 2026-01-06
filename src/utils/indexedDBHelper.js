// IndexedDB Helper untuk Auto Save

const DB_NAME = 'ScTextEditorDB';
const DB_VERSION = 1;
const STORE_NAME = 'documents';

// Buka atau buat database
export const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            reject(request.error);
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
    });
};

// Simpan dokumen
export const saveDocument = async (content, fileName) => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const document = {
            id: 'current_document', // Kunci tetap untuk dokumen saat ini
            content,
            fileName,
            lastSaved: new Date().toISOString()
        };

        return new Promise((resolve, reject) => {
            const request = store.put(document);
            request.onsuccess = () => {
                resolve(true);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    } catch (error) {
        console.error('Error saving document:', error);
        throw error;
    }
};

// Ambil dokumen terakhir
export const getDocument = async () => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.get('current_document');
            request.onsuccess = () => {
                resolve(request.result || null);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
};

// Hapus dokumen
export const clearDocument = async () => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.delete('current_document');
            request.onsuccess = () => {
                resolve(true);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    } catch (error) {
        console.error('Error clearing document:', error);
        throw error;
    }
};
