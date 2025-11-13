import React from 'react';
import QuillEditor from './QuillEditor';

function App() {
  return <QuillEditor />;
}

export default App;

// import React, { useState, useRef, useEffect } from "react";

// function App() {
//   const [content, setContent] = useState(
//     "Hai! Mulai mengetik di sini...\n\nIni adalah text editor sederhana.\nGunakan Enter untuk baris baru."
//   );
//   const [fileName, setFileName] = useState("document-saya");
//   const [textColor, setTextColor] = useState("#000000");
//   const [fontSize, setFontSize] = useState("16");
//   const [fontFamily, setFontFamily] = useState("Arial");
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);
//   const [wordCount, setWordCount] = useState(0);
//   const [charCount, setCharCount] = useState(0);

//   const textareaRef = useRef(null);

//   // Warna yang tersedia
//   const colors = [
//     "#000000",
//     "#ff0000",
//     "#00ff00",
//     "#0000ff",
//     "#ffff00",
//     "#ff00ff",
//     "#00ffff",
//     "#ffa500",
//     "#800080",
//     "#008000",
//     "#000080",
//     "#800000",
//   ];

//   // Update word count
//   useEffect(() => {
//     const words = content.trim() ? content.trim().split(/\s+/).length : 0;
//     const characters = content.length;
//     setWordCount(words);
//     setCharCount(characters);
//   }, [content]);

//   // Apply formatting untuk HTML export
//   const applyFormatting = () => {
//     let formattedContent = content;

//     // Replace newlines with <br> tags
//     formattedContent = formattedContent.replace(/\n/g, "<br>");

//     if (isBold) {
//       formattedContent = `<strong>${formattedContent}</strong>`;
//     }
//     if (isItalic) {
//       formattedContent = `<em>${formattedContent}</em>`;
//     }
//     if (isUnderline) {
//       formattedContent = `<u>${formattedContent}</u>`;
//     }

//     return formattedContent;
//   };

//   // Download sebagai HTML
//   const downloadHTML = () => {
//     const element = document.createElement("a");
//     const formattedContent = applyFormatting();

//     const fileContent = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8">
//     <title>${fileName}</title>
//     <style>
//         body {
//             font-family: ${fontFamily};
//             font-size: ${fontSize}px;
//             color: ${textColor};
//             line-height: 1.6;
//             padding: 20px;
//             max-width: 800px;
//             margin: 0 auto;
//             background-color: #f9fafb;
//         }
//         .content {
//             background: white;
//             padding: 30px;
//             border-radius: 10px;
//             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//             ${isBold ? "font-weight: bold;" : ""}
//             ${isItalic ? "font-style: italic;" : ""}
//             ${isUnderline ? "text-decoration: underline;" : ""}
//         }
//     </style>
// </head>
// <body>
//     <div class="content">
//         ${formattedContent}
//     </div>
//     <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
//         Dibuat dengan React Text Editor - ${new Date().toLocaleDateString(
//           "id-ID"
//         )}
//     </div>
// </body>
// </html>`;

//     const file = new Blob([fileContent], { type: "text/html" });
//     element.href = URL.createObjectURL(file);
//     element.download = `${fileName}.html`;
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//   };

//   // Download sebagai Text
//   const downloadText = () => {
//     const element = document.createElement("a");
//     const file = new Blob([content], { type: "text/plain" });
//     element.href = URL.createObjectURL(file);
//     element.download = `${fileName}.txt`;
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//   };

//   // Clear editor
//   const clearEditor = () => {
//     if (window.confirm("Yakin ingin menghapus semua teks?")) {
//       setContent("");
//       setIsBold(false);
//       setIsItalic(false);
//       setIsUnderline(false);
//     }
//   };

//   // Focus ke textarea ketika component mount
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.focus();
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">
//             ✏️ Simple Text Editor
//           </h1>
//           <p className="text-gray-600">
//             Text editor stabil dengan formatting dasar
//           </p>
//         </div>

//         {/* Main Container */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* File Info & Stats */}
//           <div className="bg-gray-800 text-white p-4">
//             <div className="flex items-center justify-between flex-wrap gap-4">
//               <input
//                 type="text"
//                 value={fileName}
//                 onChange={(e) => setFileName(e.target.value)}
//                 className="bg-gray-700 text-white px-3 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="nama-file"
//               />
//               <div className="flex gap-4 text-sm">
//                 <span>Kata: {wordCount}</span>
//                 <span>Karakter: {charCount}</span>
//               </div>
//             </div>
//           </div>

//           {/* Toolbar */}
//           <div className="border-b bg-gray-50 p-4">
//             <div className="flex flex-wrap gap-3 items-center">
//               {/* Font Controls */}
//               <div className="flex items-center gap-2">
//                 <label className="text-sm font-medium">Font:</label>
//                 <select
//                   value={fontFamily}
//                   onChange={(e) => setFontFamily(e.target.value)}
//                   className="border rounded px-2 py-1 text-sm"
//                 >
//                   <option value="Arial">Arial</option>
//                   <option value="Helvetica">Helvetica</option>
//                   <option value="Times New Roman">Times New Roman</option>
//                   <option value="Courier New">Courier New</option>
//                   <option value="Verdana">Verdana</option>
//                   <option value="Georgia">Georgia</option>
//                 </select>
//               </div>

//               <div className="flex items-center gap-2">
//                 <label className="text-sm font-medium">Size:</label>
//                 <select
//                   value={fontSize}
//                   onChange={(e) => setFontSize(e.target.value)}
//                   className="border rounded px-2 py-1 text-sm"
//                 >
//                   <option value="12">12px</option>
//                   <option value="14">14px</option>
//                   <option value="16">16px</option>
//                   <option value="18">18px</option>
//                   <option value="20">20px</option>
//                   <option value="24">24px</option>
//                 </select>
//               </div>

//               {/* Text Formatting */}
//               <div className="flex gap-1">
//                 <button
//                   onClick={() => setIsBold(!isBold)}
//                   className={`px-3 py-2 border rounded transition-colors ${
//                     isBold
//                       ? "bg-blue-500 text-white"
//                       : "bg-white hover:bg-gray-100"
//                   }`}
//                   title="Bold"
//                 >
//                   <span className="font-bold">B</span>
//                 </button>

//                 <button
//                   onClick={() => setIsItalic(!isItalic)}
//                   className={`px-3 py-2 border rounded transition-colors ${
//                     isItalic
//                       ? "bg-blue-500 text-white"
//                       : "bg-white hover:bg-gray-100"
//                   }`}
//                   title="Italic"
//                 >
//                   <span className="italic">I</span>
//                 </button>

//                 <button
//                   onClick={() => setIsUnderline(!isUnderline)}
//                   className={`px-3 py-2 border rounded transition-colors ${
//                     isUnderline
//                       ? "bg-blue-500 text-white"
//                       : "bg-white hover:bg-gray-100"
//                   }`}
//                   title="Underline"
//                 >
//                   <span className="underline">U</span>
//                 </button>
//               </div>

//               {/* Color Picker */}
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium">Color:</span>
//                 <div className="flex gap-1">
//                   {colors.map((color) => (
//                     <div
//                       key={color}
//                       className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
//                         textColor === color
//                           ? "border-gray-800"
//                           : "border-transparent"
//                       }`}
//                       style={{ backgroundColor: color }}
//                       onClick={() => setTextColor(color)}
//                       title={color}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Editor Area - TEXTAREA STABIL */}
//           <div className="p-4 bg-white">
//             <textarea
//               ref={textareaRef}
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="w-full min-h-[400px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
//               style={{
//                 color: textColor,
//                 fontFamily: fontFamily,
//                 fontSize: `${fontSize}px`,
//                 fontWeight: isBold ? "bold" : "normal",
//                 fontStyle: isItalic ? "italic" : "normal",
//                 textDecoration: isUnderline ? "underline" : "none",
//                 lineHeight: "1.6",
//               }}
//               placeholder="Ketik teks Anda di sini... Gunakan Enter untuk baris baru."
//             />
//           </div>

//           {/* Preview Info */}
//           <div className="border-t border-gray-200 p-4 bg-gray-50">
//             <h3 className="text-sm font-medium text-gray-700 mb-2">
//               Formatting Preview:
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-3 h-3 rounded-full ${
//                     isBold ? "bg-green-500" : "bg-gray-300"
//                   }`}
//                 ></div>
//                 <span>Bold: {isBold ? "ON" : "OFF"}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-3 h-3 rounded-full ${
//                     isItalic ? "bg-green-500" : "bg-gray-300"
//                   }`}
//                 ></div>
//                 <span>Italic: {isItalic ? "ON" : "OFF"}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-3 h-3 rounded-full ${
//                     isUnderline ? "bg-green-500" : "bg-gray-300"
//                   }`}
//                 ></div>
//                 <span>Underline: {isUnderline ? "ON" : "OFF"}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div
//                   className="w-3 h-3 rounded-full"
//                   style={{ backgroundColor: textColor }}
//                 ></div>
//                 <span>Color: {textColor}</span>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="border-t bg-gray-50 p-4">
//             <div className="flex gap-3 justify-center flex-wrap">
//               <button
//                 onClick={downloadHTML}
//                 className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
//               >
//                 💾 Download HTML
//               </button>

//               <button
//                 onClick={downloadText}
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
//               >
//                 📄 Download TXT
//               </button>

//               <button
//                 onClick={clearEditor}
//                 className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
//               >
//                 🗑️ Clear All
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Instructions */}
//         <div className="mt-6 text-center text-gray-600 text-sm">
//           <div className="bg-white rounded-lg p-4 shadow">
//             <p className="font-semibold mb-2">
//               ✅ Text Editor Stabil dengan Fitur:
//             </p>
//             <div className="grid md:grid-cols-2 gap-2">
//               <div>• Ganti font family & size</div>
//               <div>• Bold, Italic, Underline</div>
//               <div>• Ganti warna teks</div>
//               <div>• Word & character counter</div>
//               <div>• Enter untuk baris baru</div>
//               <div>• Download HTML & TXT</div>
//             </div>
//             <p className="mt-3 text-amber-600">
//               ⚠️ <strong>Catatan:</strong> Formatting berlaku untuk semua teks
//               (tidak partial)
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
