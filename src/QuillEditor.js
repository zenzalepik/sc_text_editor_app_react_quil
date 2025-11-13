import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = () => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const fileInputRef = useRef(null);
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
                const url = prompt('Masukkan URL gambar:');
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
  }, []);

  // Import file HTML atau TXT
  const importFile = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target.result;
      
      if (file.type === 'text/html' || file.name.endsWith('.html')) {
        // Import HTML file
        importHTMLContent(content, file.name);
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        // Import TXT file
        importTXTContent(content, file.name);
      } else {
        alert('Format file tidak didukung. Silakan pilih file HTML atau TXT.');
      }
    };
    
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  };

  // Import HTML content
  const importHTMLContent = (htmlContent, filename) => {
    try {
      // Extract content from HTML file
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      // Try to find content in different possible locations
      let content = '';
      
      // Look for .ql-editor first (Quill format)
      const quillEditor = tempDiv.querySelector('.ql-editor');
      if (quillEditor) {
        content = quillEditor.innerHTML;
      } 
      // Look for .editor-content
      else if (tempDiv.querySelector('.editor-content')) {
        content = tempDiv.querySelector('.editor-content').innerHTML;
      }
      // Look for body content directly
      else if (tempDiv.querySelector('body')) {
        const bodyContent = tempDiv.querySelector('body').innerHTML;
        // Remove footer if exists
        content = bodyContent.replace(/<div style="text-align: center[^>]*>.*?<\/div>/g, '');
      }
      // Fallback to entire content
      else {
        content = htmlContent;
      }
      
      // Clean up the filename for display
      const cleanFileName = filename.replace('.html', '').replace('.txt', '');
      setFileName(cleanFileName);
      
      // Set content to editor
      if (quillInstance.current) {
        quillInstance.current.root.innerHTML = content;
      }
      
      alert('File HTML berhasil diimpor!');
    } catch (error) {
      console.error('Error importing HTML:', error);
      alert('Gagal mengimpor file HTML. Pastikan file berasal dari export editor ini.');
    }
  };

  // Import TXT content
  const importTXTContent = (textContent, filename) => {
    try {
      // Clean up the filename for display
      const cleanFileName = filename.replace('.html', '').replace('.txt', '');
      setFileName(cleanFileName);
      
      // Convert plain text to HTML (basic conversion)
      const htmlContent = textContent
        .split('\n')
        .map(line => {
          if (line.trim() === '') return '<p><br></p>';
          return `<p>${line}</p>`;
        })
        .join('');
      
      // Set content to editor
      if (quillInstance.current) {
        quillInstance.current.root.innerHTML = htmlContent;
      }
      
      alert('File TXT berhasil diimpor!');
    } catch (error) {
      console.error('Error importing TXT:', error);
      alert('Gagal mengimpor file TXT.');
    }
  };

  // Convert class-based styles to inline styles untuk export
  const convertToInlineStyles = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const applyInlineStyles = (element) => {
      // Font families
      if (element.classList.contains('ql-font-arial')) {
        element.style.fontFamily = 'Arial, sans-serif';
      }
      if (element.classList.contains('ql-font-times-new-roman')) {
        element.style.fontFamily = "'Times New Roman', serif";
      }
      if (element.classList.contains('ql-font-courier-new')) {
        element.style.fontFamily = "'Courier New', monospace";
      }
      if (element.classList.contains('ql-font-georgia')) {
        element.style.fontFamily = 'Georgia, serif';
      }

      // Font sizes
      if (element.classList.contains('ql-size-small')) {
        element.style.fontSize = '0.75em';
      }
      if (element.classList.contains('ql-size-large')) {
        element.style.fontSize = '1.5em';
      }
      if (element.classList.contains('ql-size-huge')) {
        element.style.fontSize = '2.5em';
      }

      // Alignment
      if (element.classList.contains('ql-align-center')) {
        element.style.textAlign = 'center';
      }
      if (element.classList.contains('ql-align-right')) {
        element.style.textAlign = 'right';
      }
      if (element.classList.contains('ql-align-justify')) {
        element.style.textAlign = 'justify';
      }

      // Process child elements
      Array.from(element.children).forEach(applyInlineStyles);
    };

    applyInlineStyles(tempDiv);
    return tempDiv.innerHTML;
  };

  // Download sebagai HTML
  const downloadHTML = () => {
    if (!quillInstance.current) return;

    const element = document.createElement('a');
    let content = quillInstance.current.root.innerHTML;
    
    // Convert class-based styles to inline styles
    content = convertToInlineStyles(content);

    const fileContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${fileName}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
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
        
        h1 { 
            font-size: 2em; 
            font-weight: bold;
            margin-bottom: 0.5em;
            color: #1f2937;
        }
        
        h2 { 
            font-size: 1.5em; 
            font-weight: bold;
            margin-bottom: 0.5em;
            color: #374151;
        }
        
        h3 { 
            font-size: 1.17em; 
            font-weight: bold;
            margin-bottom: 0.5em;
            color: #4b5563;
        }
        
        p {
            margin-bottom: 1em;
        }
        
        ul, ol {
            margin-bottom: 1em;
            margin-left: 1.5em;
        }
        
        li {
            margin-bottom: 0.25em;
        }
        
        strong { 
            font-weight: bold; 
            color: #1f2937;
        }
        
        em { 
            font-style: italic; 
            color: #6b7280;
        }
        
        u { 
            text-decoration: underline; 
        }
        
        blockquote {
            border-left: 4px solid #3b82f6;
            margin: 1em 0;
            padding-left: 1em;
            color: #6b7280;
            font-style: italic;
        }
        
        code {
            background: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="editor-content">
        ${content}
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
      setFileName('document-saya');
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
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".html,.txt,text/html,text/plain"
                style={{ display: 'none' }}
              />
              
              <button
                onClick={importFile}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
              >
                📂 Import File
              </button>
              
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
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">1</div>
                <div>
                  <strong>Import File</strong> HTML/TXT yang sebelumnya diexport
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">2</div>
                <div>
                  <strong>Blok teks</strong> yang ingin diformat dengan mouse
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">3</div>
                <div>
                  <strong>Pilih tool</strong> dari toolbar di atas
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">4</div>
                <div>
                  <strong>Download</strong> hasil sebagai HTML atau TXT
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                <strong>🔄 Fitur Baru:</strong> Sekarang bisa import file HTML/TXT yang sebelumnya diexport dari editor ini!
                Formatting akan dipertahankan saat import/export.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuillEditor;