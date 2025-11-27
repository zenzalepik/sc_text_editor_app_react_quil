// Konfigurasi Quill Editor
export const quillConfig = {
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
  formats: [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'font', 'size',
    'align',
    'list', 'indent',
    'link', 'image', 'blockquote', 'code-block'
  ],
  placeholder: 'Ketik teks Anda di sini...'
};

// Custom CSS untuk Quill
export const quillStyles = `
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