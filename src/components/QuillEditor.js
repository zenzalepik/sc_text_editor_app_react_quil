import React, { useRef, useState } from "react";
import { useQuillEditor } from "../hooks/useQuillEditor";
import { useFileHandling } from "../hooks/useFileHandling";
import { useAutoSave } from "../hooks/useAutoSave";
import { useFullscreen } from "../hooks/useFullscreen";
import ZaWarning from "./ZaWarning";
import ZaHeader from "./ZaHeader";
import ZaIntructions from "./ZaIntructions";

const QuillEditor = () => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [focusMode, setFocusMode] = useState(false);

  // Gunakan custom hooks
  const { quillInstance, wordCount, charCount } = useQuillEditor(editorRef);
  const {
    fileName,
    setFileName,
    handleFileSelect,
    downloadHTML,
    downloadText,
    clearEditor: originalClearEditor,
  } = useFileHandling(quillInstance);

  // Auto-save hook
  const { saveStatus, lastSaved, forceSave, clearSavedDocument } = useAutoSave(
    quillInstance,
    fileName,
    setFileName
  );

  // Fullscreen hook
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  // Clear editor dengan juga menghapus dari IndexedDB
  const clearEditor = () => {
    originalClearEditor();
    clearSavedDocument();
  };

  const importFile = () => {
    fileInputRef.current?.click();
  };

  // Toggle focus mode
  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  // Format waktu terakhir disimpan
  const formatLastSaved = (date) => {
    if (!date) return null;
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Status save indicator
  const getSaveIndicator = () => {
    switch (saveStatus) {
      case 'saving':
        return <span className="text-yellow-300 animate-pulse">💾 Menyimpan...</span>;
      case 'saved':
        return (
          <span className="text-green-300">
            ✅ Tersimpan {lastSaved ? `(${formatLastSaved(lastSaved)})` : ''}
          </span>
        );
      case 'error':
        return <span className="text-red-300">❌ Gagal menyimpan</span>;
      default:
        return <span className="text-gray-400">⏳ Menunggu...</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      {/* Fixed Position Buttons - Top Right */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {/* Focus Mode Toggle Button */}
        <button
          onClick={toggleFocusMode}
          className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 font-medium flex items-center gap-2 text-sm"
          style={{
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
          }}
          title={focusMode ? "Tampilkan Header" : "Sembunyikan Header"}
        >
          {/* {focusMode ? "☰ Tampilkan" : "🎯 Mode Fokus"} */}
          {focusMode ? "☰" : "Fokus"}
        </button>

        {/* Fullscreen Toggle Button */}
        <button
          onClick={toggleFullscreen}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-medium flex items-center gap-2 text-sm"
          style={{
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
          }}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? "🗗" : "⛶"}
        </button>

        {/* Download HTML Button */}
        <button
          onClick={downloadHTML}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium flex items-center gap-2 text-sm"
          style={{
            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
          }}
          title="Download HTML"
        >
          ⬇️
        </button>
      </div>

      <ZaWarning />
      <div className="max-w-6xl mx-auto">
        {/* Header - Hidden when focusMode is true */}
        <div
          style={{
            maxHeight: focusMode ? '0px' : '500px',
            opacity: focusMode ? 0 : 1,
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <ZaHeader
            fileName={fileName}
            setFileName={setFileName}
            importFile={importFile}
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            downloadHTML={downloadHTML}
            downloadText={downloadText}
            clearEditor={clearEditor}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
            forceSave={forceSave}
          />
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* File Info & Stats - Hidden when focusMode is true */}
          <div
            style={{
              maxHeight: focusMode ? '0px' : '100px',
              opacity: focusMode ? 0 : 1,
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <div className="bg-gray-800 text-white p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 min-w-0"
                  placeholder="nama-file"
                />
                <div className="flex gap-4 text-sm flex-wrap items-center">
                  <span>Kata: {wordCount}</span>
                  <span>Karakter: {charCount}</span>
                  {getSaveIndicator()}
                </div>
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

        {/* Instructions - Hidden when focusMode is true */}
        <div
          style={{
            maxHeight: focusMode ? '0px' : '500px',
            opacity: focusMode ? 0 : 1,
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <ZaIntructions />
        </div>
      </div>
    </div>
  );
};

export default QuillEditor;

