import { useState } from 'react';
import { 
  importHTMLContent, 
  importTXTContent, 
  downloadFile 
} from '../utils/fileHandlers';
import { convertToInlineStyles, generateHTMLTemplate } from '../utils/htmlConverter';

export const useFileHandling = (quillInstance) => {
  const [fileName, setFileName] = useState('document-saya');

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target.result;
      let success = false;
      let message = '';
      
      if (file.type === 'text/html' || file.name.endsWith('.html')) {
        success = importHTMLContent(content, file.name, setFileName, quillInstance);
        message = success ? 'File HTML berhasil diimpor!' : 'Gagal mengimpor file HTML.';
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        success = importTXTContent(content, file.name, setFileName, quillInstance);
        message = success ? 'File TXT berhasil diimpor!' : 'Gagal mengimpor file TXT.';
      } else {
        message = 'Format file tidak didukung. Silakan pilih file HTML atau TXT.';
      }
      
      alert(message);
    };
    
    reader.readAsText(file);
    event.target.value = '';
  };

  // Download sebagai HTML
  const downloadHTML = () => {
    if (!quillInstance.current) return;
    
    let content = quillInstance.current.root.innerHTML;
    content = convertToInlineStyles(content);
    const fileContent = generateHTMLTemplate(fileName, content);
    
    downloadFile(fileContent, `${fileName}.html`, 'text/html');
  };

  // Download sebagai Text
  const downloadText = () => {
    if (!quillInstance.current) return;
    
    const textContent = quillInstance.current.getText();
    downloadFile(textContent, `${fileName}.txt`, 'text/plain');
  };

  // Clear editor
  const clearEditor = () => {
    if (window.confirm('Yakin ingin menghapus semua teks?')) {
      quillInstance.current.setText('');
      setFileName('document-saya');
    }
  };

  return {
    fileName,
    setFileName,
    handleFileSelect,
    downloadHTML,
    downloadText,
    clearEditor
  };
};