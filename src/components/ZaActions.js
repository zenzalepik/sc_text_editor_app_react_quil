"use client";

import React from "react";

export default function ZaActions({
  fileName,
  setFileName,
  handleFileSelect,
  downloadHTML,
  downloadText,
  clearEditor,
  fileInputRef,
  importFile,
  isFullscreen,
  toggleFullscreen,
  forceSave,
}) {
  return (
    <div className="border-t bg-gray-50 p-4">
      <div
        className="flex gap-3 justify-center flex-wrap"
        style={{ transform: "scale(0.8)", transformOrigin: "center center" }}
      >
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".html,.txt,text/html,text/plain"
          style={{ display: "none" }}
        />

        {/* Fullscreen Toggle Button */}
        <button
          onClick={toggleFullscreen}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? "🗗 Exit Fullscreen" : "⛶ Fullscreen"}
        </button>

        {/* Manual Save Button */}
        <button
          onClick={forceSave}
          className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium flex items-center gap-2"
          title="Simpan sekarang"
        >
          💾 Save Draft
        </button>

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
          ⬇️ Download HTML
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
  );
}


