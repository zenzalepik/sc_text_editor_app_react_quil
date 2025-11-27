"use client";

import React from "react";
import Strings from "../utils/strings.js";
import ZaActions from "./ZaActions";

export default function ZaHeader({
  fileName,
  setFileName,
  importFile,
  fileInputRef,
  handleFileSelect,
  downloadHTML,
  downloadText,
  clearEditor,
}) {
  return (
    <div className="flex items-center gap-8 mb-8 justify-between">
      <div className="flex items-center gap-4">
        <img
          src="/images/logo-color-small.svg"
          alt="Logo"
          className="w-16 h-16" // Atur ukuran fixed
        />
        <div className="text-left">
          <h1 className="text-4xl font-bold mb-2 za_colors_primary">
            {Strings.APP_NAME.toUpperCase()}
          </h1>
          <p className="text-gray-600">{Strings.APP_TAGLINE}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <ZaActions
        fileName={fileName}
        setFileName={setFileName}
        importFile={importFile}
        fileInputRef={fileInputRef}
        handleFileSelect={handleFileSelect}
        downloadHTML={downloadHTML}
        downloadText={downloadText}
        clearEditor={clearEditor}
      />
    </div>
  );
}
