import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './QuillEditor.css';

const QuillEditor = () => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [fileName, setFileName] = useState('document-saya');
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

      // Initialize Quill dengan custom toolbar
      quillInstance.current = new Quill(container, {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              // Format Group
              [{ 'header': [1, 2, 3, false] }],
              
              // Text Formatting
              ['bold', 'italic', 'underline', 'strike'],
              
              // Color & Background
              [{ 'color': [] }, { 'background': [] }],
              
              // Font & Size
              [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
              
              // Alignment
              [{ 'align': [] }],
              
              // Lists
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              
              // Indent
              [{ 'indent': '-1'}, { 'indent': '+1' }],
              
              // Insert
              ['link', 'image', 'blockquote', 'code-block'],
              
              // Clean
              ['clean']
            ],
            handlers: {
              // Custom handler untuk image
              'image': function() {
                const url = prompt('Enter image URL:');
                if (url) {
                  const range = this.quill.getSelection();
                  this.quill.insertEmbed(range.index, 'image', url);
                }
              }
            }
          }
        },
        placeholder: 'Ketik teks Anda di sini...',
        formats: [
          'header',
          'bold', 'italic', 'underline', 'strike',
          'color', 'background',
          'font', 'size',
          'align',
          'list', 'indent',
          'link', 'image', 'blockquote', 'code-block'
        ]
      });

      // Custom CSS untuk toolbar
      const style = document.createElement('style');
      style.textContent = `
        .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          padding: 12px;
        }
        
        .ql-container.ql-snow {
          border: none;
          font-size: 16px;
          font-family: Arial, sans-serif;
        }
        
        .ql-editor {
          min-height: 400px;
          padding: 24px;
          line-height: 1.6;
        }
        
        .ql-toolbar .ql-formats {
          margin-right: 16px;
        }
        
        .ql-toolbar button {
          border-radius: 4px;
          margin: 2px;
        }
        
        .ql-toolbar button:hover {
          background-color: #e5e7eb;
        }
        
        .ql-snow .ql-picker.ql-expanded .ql-picker-options {
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `;
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
        </ul>
      `;
    }

    return () => {
      // Cleanup
      if (quillInstance.current) {
        quillInstance.current = null;
      }
    };
  }, []);

  // Download sebagai HTML
 // Download sebagai HTML - VERSI DIPERBAIKI
const downloadHTML = () => {
  if (!quillInstance.current) return;

  const element = document.createElement('a');
  const content = quillInstance.current.root.innerHTML;
  
  // Ambil semua CSS dari Quill
  const quillStyles = Array.from(document.styleSheets)
    .filter(sheet => sheet.href === null || sheet.href.includes('quill'))
    .map(sheet => {
      try {
        return Array.from(sheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n');
      } catch (e) {
        return '';
      }
    })
    .join('\n');

  const fileContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${fileName}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* QUILL CORE STYLES */
        .ql-editor {
          box-sizing: border-box;
          line-height: 1.42;
          height: 100%;
          outline: none;
          overflow-y: auto;
          padding: 12px 15px;
          tab-size: 4;
          -moz-tab-size: 4;
          text-align: left;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .ql-editor p,
        .ql-editor ol,
        .ql-editor ul,
        .ql-editor pre,
        .ql-editor blockquote,
        .ql-editor h1,
        .ql-editor h2,
        .ql-editor h3,
        .ql-editor h4,
        .ql-editor h5,
        .ql-editor h6 {
          margin: 0;
          padding: 0;
          counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
        }

        .ql-editor ol,
        .ql-editor ul {
          padding-left: 1.5em;
        }

        .ql-editor ol > li,
        .ql-editor ul > li {
          list-style-type: none;
        }

        .ql-editor ul > li::before {
          content: '\\2022';
        }

        .ql-editor ul[data-checked=true],
        .ql-editor ul[data-checked=false] {
          pointer-events: none;
        }

        .ql-editor ul[data-checked=true] > li *,
        .ql-editor ul[data-checked=false] > li * {
          pointer-events: all;
        }

        .ql-editor ul[data-checked=true] > li::before,
        .ql-editor ul[data-checked=false] > li::before {
          color: #777;
          cursor: pointer;
          pointer-events: all;
        }

        .ql-editor ul[data-checked=true] > li::before {
          content: '\\\\2611';
        }

        .ql-editor ul[data-checked=false] > li::before {
          content: '\\\\2610';
        }

        .ql-editor li::before {
          display: inline-block;
          white-space: nowrap;
          width: 1.2em;
        }

        .ql-editor li:not(.ql-direction-rtl)::before {
          margin-left: -1.5em;
          margin-right: 0.3em;
          text-align: right;
        }

        .ql-editor ol li:not(.ql-direction-rtl),
        .ql-editor ul li:not(.ql-direction-rtl) {
          padding-left: 1.5em;
        }

        .ql-editor ol li {
          counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
          counter-increment: list-0;
        }

        .ql-editor ol li:before {
          content: counter(list-0, decimal) '. ';
        }

        .ql-editor ol li.ql-indent-1 {
          counter-increment: list-1;
        }

        .ql-editor ol li.ql-indent-1:before {
          content: counter(list-1, lower-alpha) '. ';
        }

        .ql-editor ol li.ql-indent-2 {
          counter-increment: list-2;
        }

        .ql-editor ol li.ql-indent-2:before {
          content: counter(list-2, lower-roman) '. ';
        }

        /* TEXT FORMATTING */
        .ql-editor .ql-font-arial { font-family: Arial, sans-serif; }
        .ql-editor .ql-font-times-new-roman { font-family: 'Times New Roman', serif; }
        .ql-editor .ql-font-courier-new { font-family: 'Courier New', monospace; }
        .ql-editor .ql-font-georgia { font-family: Georgia, serif; }
        
        .ql-editor .ql-size-small { font-size: 0.75em; }
        .ql-editor .ql-size-large { font-size: 1.5em; }
        .ql-editor .ql-size-huge { font-size: 2.5em; }
        
        .ql-editor strong { font-weight: bold; }
        .ql-editor em { font-style: italic; }
        .ql-editor u { text-decoration: underline; }
        .ql-editor strike { text-decoration: line-through; }

        /* ALIGNMENT */
        .ql-editor .ql-align-center { text-align: center; }
        .ql-editor .ql-align-justify { text-align: justify; }
        .ql-editor .ql-align-right { text-align: right; }

        /* HEADERS */
        .ql-editor h1 { 
          font-size: 2em; 
          font-weight: bold;
          margin-bottom: 0.5em;
          color: #1f2937;
        }
        .ql-editor h2 { 
          font-size: 1.5em; 
          font-weight: bold;
          margin-bottom: 0.5em;
          color: #374151;
        }
        .ql-editor h3 { 
          font-size: 1.17em; 
          font-weight: bold;
          margin-bottom: 0.5em;
          color: #4b5563;
        }

        /* LISTS */
        .ql-editor ol, .ql-editor ul {
          margin-bottom: 1em;
          margin-left: 1.5em;
        }
        
        .ql-editor li {
          margin-bottom: 0.25em;
        }

        /* BLOCKQUOTE */
        .ql-editor blockquote {
          border-left: 4px solid #3b82f6;
          margin: 1em 0;
          padding-left: 1em;
          color: #6b7280;
          font-style: italic;
        }

        /* CODE */
        .ql-editor .ql-code-block-container {
          background: #f3f4f6;
          border-radius: 4px;
          margin: 1em 0;
          padding: 1em;
        }

        .ql-editor .ql-syntax {
          background-color: #1f2937;
          color: #f3f4f6;
          overflow: visible;
          font-family: 'Courier New', monospace;
          padding: 1em;
          border-radius: 4px;
        }

        /* CUSTOM STYLES FOR EXPORT */
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          background-color: #f9fafb;
          color: #374151;
        }
        
        .editor-content {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }
        
        .editor-content .ql-editor {
          padding: 0 !important;
          background: transparent !important;
        }
        
        .editor-content p {
          margin-bottom: 1em;
        }
        
        .editor-content ul, .editor-content ol {
          margin-bottom: 1em;
        }
    </style>
</head>
<body>
    <div class="editor-content">
        <div class="ql-editor">
            ${content}
        </div>
    </div>
    <div style="text-align: center; margin-top: 30px; color: #9ca3af; font-size: 14px;">
        Dibuat dengan Quill.js Rich Text Editor - ${new Date().toLocaleDateString('id-ID')}
    </div>
</body>
</html>`;
  
  const file = new Blob([fileContent], { type: 'text/html' });
  element.href = URL.createObjectURL(file);
  element.download = `${fileName}.html`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

  // Download sebagai Text
  const downloadText = () => {
    if (!quillInstance.current) return;

    const element = document.createElement('a');
    const textContent = quillInstance.current.getText();
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Clear editor
  const clearEditor = () => {
    if (window.confirm('Yakin ingin menghapus semua teks?')) {
      quillInstance.current.setText('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🚀 Rich Text Editor
          </h1>
          <p className="text-gray-600">
            Powered by Quill.js - Format partial text dengan mudah!
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* File Info & Stats */}
          <div className="bg-gray-800 text-white p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="bg-gray-700 text-white px-3 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 min-w-0"
                placeholder="nama-file"
              />
              <div className="flex gap-4 text-sm flex-wrap">
                <span>Kata: {wordCount}</span>
                <span>Karakter: {charCount}</span>
                <span className="text-green-300">✅ Format partial tersedia!</span>
              </div>
            </div>
          </div>

          {/* Quill Editor Container */}
          <div 
            ref={editorRef} 
            className="quill-editor-wrapper"
            style={{ minHeight: '500px' }}
          />

          {/* Action Buttons */}
          <div className="border-t bg-gray-50 p-4">
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={downloadHTML}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
              >
                💾 Download HTML
              </button>
              
              <button
                onClick={downloadText}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                📄 Download TXT
              </button>
              
              <button
                onClick={clearEditor}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
              >
                🗑️ Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-gray-600">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-bold mb-4 text-lg">🎯 Cara Menggunakan:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">1</div>
                <div>
                  <strong>Blok teks</strong> yang ingin diformat dengan mouse
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">2</div>
                <div>
                  <strong>Pilih tool</strong> dari toolbar di atas
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">3</div>
                <div>
                  <strong>Hanya teks terblok</strong> yang akan berubah formatnya
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">4</div>
                <div>
                  <strong>Download</strong> hasil sebagai HTML atau TXT
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 text-sm">
                <strong>💡 Tips:</strong> Coba blok beberapa kata, lalu ganti warna, font size, atau tambahkan bold/italic!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuillEditor;