// strings.js - Katalog variabel strings untuk aplikasi

// =============================================
// GENERAL / COMMON STRINGS
// =============================================
export const APP_NAME = "Zatulis";
export const APP_TAGLINE = "Tulis hal penting yang perlu kamu tulis";
export const APP_DESCRIPTION = "Aplikasi teks editing berbasih HTML";
export const APP_WARNING =
  "Gunuakan aplikasi ini hanya untuk hal-hal yang diridhai oleh Allah";
export const APP_VERSION = "1.0.0";

// =============================================
// UI TEXT & LABELS
// =============================================
export const BUTTON_TEXT = {
  SAVE: "Simpan",
  CANCEL: "Batal",
  DELETE: "Hapus",
  EDIT: "Edit",
  ADD: "Tambah",
  SUBMIT: "Kirim",
  RESET: "Reset",
  CONFIRM: "Konfirmasi",
  CLOSE: "Tutup",
};

export const PLACEHOLDERS = {
  SEARCH: "Cari...",
  TITLE: "Masukkan judul...",
  CONTENT: "Ketik konten Anda di sini...",
  FILENAME: "nama-file.txt",
};

// =============================================
// MESSAGES & NOTIFICATIONS
// =============================================
export const MESSAGES = {
  SUCCESS: {
    SAVE: "Dokumen berhasil disimpan!",
    DELETE: "Dokumen berhasil dihapus!",
    UPDATE: "Perubahan berhasil disimpan!",
  },
  ERROR: {
    SAVE: "Gagal menyimpan dokumen!",
    DELETE: "Gagal menghapus dokumen!",
    LOAD: "Gagal memuat dokumen!",
    EMPTY_TITLE: "Judul tidak boleh kosong!",
    EMPTY_CONTENT: "Konten tidak boleh kosong!",
  },
  CONFIRM: {
    DELETE: "Apakah Anda yakin ingin menghapus dokumen ini?",
    UNSAVED_CHANGES:
      "Anda memiliki perubahan yang belum disimpan. Yakin ingin keluar?",
  },
};

// =============================================
// TEXT EDITOR SPECIFIC STRINGS
// =============================================
export const EDITOR = {
  TOOLBAR: {
    BOLD: "Tebal",
    ITALIC: "Miring",
    UNDERLINE: "Garis Bawah",
    STRIKE: "Coret",
    HEADER: "Header",
    FONT_SIZE: "Ukuran Font",
    COLOR: "Warna Teks",
    BACKGROUND: "Warna Latar",
    LIST_ORDERED: "List Berurut",
    LIST_BULLET: "List Bullet",
    INDENT: "Tambah Indent",
    OUTDENT: "Kurangi Indent",
    ALIGN_LEFT: "Rata Kiri",
    ALIGN_CENTER: "Rata Tengah",
    ALIGN_RIGHT: "Rata Kanan",
    LINK: "Tautan",
    IMAGE: "Gambar",
    VIDEO: "Video",
    CODE: "Kode",
    CLEAN: "Bersihkan Format",
  },
  PLACEHOLDER: "Ketik sesuatu yang menginspirasi...",
  EMPTY_CONTENT: "Dokumen kosong. Mulai menulis!",
};

// =============================================
// NAVIGATION & MENU
// =============================================
export const NAVIGATION = {
  HOME: "Beranda",
  DOCUMENTS: "Dokumen",
  SETTINGS: "Pengaturan",
  ABOUT: "Tentang",
  NEW_DOCUMENT: "Dokumen Baru",
  EXPORT: "Ekspor",
  IMPORT: "Impor",
};

// =============================================
// SETTINGS & PREFERENCES
// =============================================
export const SETTINGS = {
  THEME: {
    LABEL: "Tema",
    LIGHT: "Terang",
    DARK: "Gelap",
    AUTO: "Otomatis",
  },
  LANGUAGE: {
    LABEL: "Bahasa",
    INDONESIAN: "Bahasa Indonesia",
    ENGLISH: "English",
  },
  FONT: {
    LABEL: "Font Default",
    ARIAL: "Arial",
    TIMES: "Times New Roman",
    COURIER: "Courier New",
    GEORGIA: "Georgia",
  },
};

// =============================================
// FILE OPERATIONS
// =============================================
export const FILE = {
  ACTIONS: {
    NEW: "Buat Baru",
    OPEN: "Buka",
    SAVE: "Simpan",
    SAVE_AS: "Simpan Sebagai",
    EXPORT_PDF: "Ekspor PDF",
    EXPORT_HTML: "Ekspor HTML",
    EXPORT_TXT: "Ekspor Teks",
  },
  TYPES: {
    PDF: "PDF Document",
    HTML: "HTML File",
    TXT: "Text File",
    DOCX: "Word Document",
  },
};

// =============================================
// ERROR MESSAGES
// =============================================
export const ERRORS = {
  NETWORK: "Koneksi jaringan bermasalah. Periksa koneksi internet Anda.",
  UNAUTHORIZED: "Anda tidak memiliki akses untuk melakukan operasi ini.",
  NOT_FOUND: "Data yang diminta tidak ditemukan.",
  GENERIC: "Terjadi kesalahan. Silakan coba lagi.",
};

// =============================================
// SUCCESS MESSAGES
// =============================================
export const SUCCESS = {
  OPERATION_COMPLETE: "Operasi berhasil diselesaikan.",
  CHANGES_SAVED: "Perubahan berhasil disimpan.",
  FILE_CREATED: "File berhasil dibuat.",
};

// =============================================
// DEFAULT VALUES
// =============================================
export const DEFAULTS = {
  DOCUMENT_TITLE: "Dokumen Tanpa Judul",
  FONT_SIZE: "14px",
  FONT_FAMILY: "Arial, sans-serif",
  THEME: "light",
};

// =============================================
// EXPORT AS DEFAULT OBJECT (alternative)
// =============================================
const Strings = {
  APP_NAME,
  APP_TAGLINE,
  APP_DESCRIPTION,
  APP_WARNING,
  BUTTON_TEXT,
  MESSAGES,
  EDITOR,
  NAVIGATION,
  SETTINGS,
  FILE,
  ERRORS,
  SUCCESS,
  DEFAULTS,
  PLACEHOLDERS,
};

export default Strings;
