// Import HTML content
export const importHTMLContent = (htmlContent, filename, setFileName, quillInstance) => {
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
    
    return true;
  } catch (error) {
    console.error('Error importing HTML:', error);
    return false;
  }
};

// Import TXT content
export const importTXTContent = (textContent, filename, setFileName, quillInstance) => {
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
    
    return true;
  } catch (error) {
    console.error('Error importing TXT:', error);
    return false;
  }
};

// Download file
export const downloadFile = (content, fileName, type = 'text/html') => {
  const element = document.createElement('a');
  const file = new Blob([content], { type });
  element.href = URL.createObjectURL(file);
  element.download = fileName;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};