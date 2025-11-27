import React from "react";

export default function ZaIntructions() {
    return(<div className="mt-6 text-center text-gray-600">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-bold mb-4 text-3xl uppercase za_color_black">🎯 Cara Menggunakan:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">
                  1
                </div>
                <div>
                  <strong>Import File</strong> HTML/TXT yang sebelumnya diexport
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">
                  2
                </div>
                <div>
                  <strong>Blok teks</strong> yang ingin diformat dengan mouse
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">
                  3
                </div>
                <div>
                  <strong>Pilih tool</strong> dari toolbar di atas
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mt-1 flex-shrink-0">
                  4
                </div>
                <div>
                  <strong>Download</strong> hasil sebagai HTML atau TXT
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                <strong>🔄 Fitur Baru:</strong> Sekarang bisa import file
                HTML/TXT yang sebelumnya diexport dari editor ini! Formatting
                akan dipertahankan saat import/export.
              </p>
            </div>
          </div>
        </div>)
}