import React, { useRef } from "react";
import { useQuillEditor } from "../hooks/useQuillEditor";
import { useFileHandling } from "../hooks/useFileHandling";
import Strings from "../utils/strings";
import ZaWarning from "./ZaWarning";
import ZaHeader from "./ZaHeader";
import ZaIntructions from "./ZaIntructions";

const QuillEditor = () => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  // Gunakan custom hooks
  const { quillInstance, wordCount, charCount } = useQuillEditor(editorRef);
  const {
    fileName,
    setFileName,
    handleFileSelect,
    downloadHTML,
    downloadText,
    clearEditor,
  } = useFileHandling(quillInstance);

  const importFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <ZaWarning />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ZaHeader 
            fileName={fileName}
            setFileName={setFileName}
            importFile={importFile}
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            downloadHTML={downloadHTML}
            downloadText={downloadText}
            clearEditor={clearEditor}
            />

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
                <span className="text-green-300">
                  ✅ Format partial tersedia!
                </span>
              </div>
            </div>
          </div>

          {/* Quill Editor Container */}
          <div
            ref={editorRef}
            className="quill-editor-wrapper"
            style={{ minHeight: "500px" }}
          />
        </div>

        {/* Instructions */}
        <ZaIntructions />
      </div>
    </div>
  );
};

export default QuillEditor;
