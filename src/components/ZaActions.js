"use client";

import React, { useRef, useState, useEffect } from "react";
import Strings from "../utils/strings.js";

export default function ZaActions({
  fileName,
  setFileName,
  handleFileSelect,
  downloadHTML,
  downloadText,
  clearEditor,
  fileInputRef,
  importFile,
}) {
  return (
    <div className="border-t bg-gray-50 p-4">
      <div className="flex gap-3 justify-center flex-wrap">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".html,.txt,text/html,text/plain"
          style={{ display: "none" }}
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
  );
}
