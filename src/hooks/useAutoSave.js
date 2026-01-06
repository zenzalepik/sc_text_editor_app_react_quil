import { useEffect, useRef, useState, useCallback } from 'react';
import { saveDocument, getDocument, clearDocument } from '../utils/indexedDBHelper';

const AUTO_SAVE_DELAY = 3000; // 3 detik

export const useAutoSave = (quillInstance, fileName, setFileName) => {
    const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, saved, error
    const [lastSaved, setLastSaved] = useState(null);
    const saveTimeoutRef = useRef(null);
    const isInitializedRef = useRef(false);

    // Muat dokumen dari IndexedDB saat pertama kali
    useEffect(() => {
        const loadSavedDocument = async () => {
            try {
                const savedDoc = await getDocument();
                if (savedDoc && quillInstance.current) {
                    quillInstance.current.root.innerHTML = savedDoc.content;
                    if (savedDoc.fileName && setFileName) {
                        setFileName(savedDoc.fileName);
                    }
                    setLastSaved(new Date(savedDoc.lastSaved));
                    setSaveStatus('saved');
                }
                isInitializedRef.current = true;
            } catch (error) {
                console.error('Error loading saved document:', error);
                isInitializedRef.current = true;
            }
        };

        // Tunggu quill instance ter-inisialisasi
        const checkQuill = setInterval(() => {
            if (quillInstance.current) {
                clearInterval(checkQuill);
                loadSavedDocument();
            }
        }, 100);

        return () => clearInterval(checkQuill);
    }, [quillInstance, setFileName]);

    // Fungsi untuk menyimpan ke IndexedDB
    const saveToIndexedDB = useCallback(async () => {
        if (!quillInstance.current || !isInitializedRef.current) return;

        try {
            setSaveStatus('saving');
            const content = quillInstance.current.root.innerHTML;
            await saveDocument(content, fileName);
            setLastSaved(new Date());
            setSaveStatus('saved');
        } catch (error) {
            console.error('Error auto-saving:', error);
            setSaveStatus('error');
        }
    }, [quillInstance, fileName]);

    // Set up auto-save dengan debounce 3 detik
    useEffect(() => {
        if (!quillInstance.current || !isInitializedRef.current) return;

        const quill = quillInstance.current;

        const handleTextChange = () => {
            setSaveStatus('idle');

            // Clear timeout sebelumnya
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }

            // Set timeout baru untuk auto-save setelah 3 detik idle
            saveTimeoutRef.current = setTimeout(() => {
                saveToIndexedDB();
            }, AUTO_SAVE_DELAY);
        };

        quill.on('text-change', handleTextChange);

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
            quill.off('text-change', handleTextChange);
        };
    }, [quillInstance, saveToIndexedDB]);

    // Juga simpan ketika fileName berubah
    useEffect(() => {
        if (!isInitializedRef.current) return;

        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(() => {
            saveToIndexedDB();
        }, AUTO_SAVE_DELAY);

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [fileName, saveToIndexedDB]);

    // Fungsi untuk menghapus dokumen tersimpan
    const clearSavedDocument = useCallback(async () => {
        try {
            await clearDocument();
            setSaveStatus('idle');
            setLastSaved(null);
        } catch (error) {
            console.error('Error clearing saved document:', error);
        }
    }, []);

    // Force save (manual)
    const forceSave = useCallback(() => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        saveToIndexedDB();
    }, [saveToIndexedDB]);

    return {
        saveStatus,
        lastSaved,
        forceSave,
        clearSavedDocument
    };
};
