import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { quillConfig, quillStyles } from '../utils/quillConfig';

export const useQuillEditor = (editorRef) => {
  const quillInstance = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      // Hapus semua child elements yang ada
      while (editorRef.current.firstChild) {
        editorRef.current.removeChild(editorRef.current.firstChild);
      }

      // Buat container untuk editor
      const container = document.createElement('div');
      container.className = 'quill-container';
      editorRef.current.appendChild(container);

      // Initialize Quill
      quillInstance.current = new Quill(container, quillConfig);

      // Add custom styles
      const style = document.createElement('style');
      style.textContent = quillStyles;
      document.head.appendChild(style);

      // Handle text change untuk word count
      quillInstance.current.on('text-change', () => {
        const text = quillInstance.current.getText();
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const characters = text.length;
        setWordCount(words);
        setCharCount(characters);
      });

      // Set initial content
      quillInstance.current.root.innerHTML = `
        <h1>Selamat Datang di Rich Text Editor!</h1>
        <p>Ini adalah editor teks yang powerful dengan <strong>Quill.js</strong></p>
        <p><em>Coba blok teks dan format sesuai keinginan!</em></p>
        <p>Fitur yang tersedia:</p>
        <ul>
          <li>Format teks (bold, italic, underline)</li>
          <li>Ganti warna teks dan background</li>
          <li>Multiple font family dan size</li>
          <li>Lists dan alignment</li>
          <li>Insert link dan gambar</li>
          <li>Import/Export file</li>
        </ul>
      `;
    }

    return () => {
      // Cleanup
      if (quillInstance.current) {
        quillInstance.current = null;
      }
    };
  }, [editorRef]);

  return {
    quillInstance,
    wordCount,
    charCount
  };
};