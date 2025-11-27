// Convert class-based styles to inline styles untuk export
export const convertToInlineStyles = (htmlContent) => {
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

// Generate HTML template untuk export
export const generateHTMLTemplate = (fileName, content) => {
  return `
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
};