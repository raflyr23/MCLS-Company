"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createProgram, updateProgram } from "./actions";

type Program = {
  id: string;
  title: string;
  duration: string;
  description: string;
  imageSrc: string;
  price: number; // Pastikan tipe data price ada di sini
};

export default function ProgramForm({ program }: { program?: Program }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string>(program?.imageSrc || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditMode = !!program;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      if (isEditMode) {
        await updateProgram(formData);
      } else {
        await createProgram(formData);
      }
      setIsOpen(false);
      if (!isEditMode) setPreview(""); 
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isEditMode ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded text-sm font-medium transition"
        >
          Edit
        </button>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
            setPreview("");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-sm"
        >
          <span>+</span> Tambah Program
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          {/* PERUBAHAN: w-[95%] sm:w-full */}
          <div className="bg-white rounded-xl shadow-2xl w-[95%] sm:w-full max-w-lg overflow-hidden transform transition-all max-h-[90vh] overflow-y-auto">
            
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
              <h3 className="font-bold text-lg text-gray-800">
                {isEditMode ? "Edit Program Pelatihan" : "Tambah Program Baru"}
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition font-bold text-xl">
                &times;
              </button>
            </div>

            <form action={handleSubmit} className="p-6 space-y-4">
              {isEditMode && <input type="hidden" name="id" value={program?.id} />}

              {/* Judul */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Program</label>
                <input
                  name="title"
                  type="text"
                  required
                  defaultValue={program?.title}
                  placeholder="Contoh: Digital Marketing"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              {/* Grid Durasi & Harga (BARU) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durasi</label>
                  <input
                    name="duration"
                    type="text"
                    required
                    defaultValue={program?.duration}
                    placeholder="Contoh: 3 Bulan"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                
                {/* INPUT HARGA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                  <input
                    name="price"
                    type="number"
                    required
                    min="1000" // Minimal 1000 perak agar valid di Midtrans
                    defaultValue={program?.price || 0}
                    placeholder="Contoh: 500000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Input Gambar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Program</label>
                {preview && (
                  <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden border border-gray-200">
                    <Image src={preview} alt="Preview" fill style={{ objectFit: 'cover' }} />
                  </div>
                )}
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  required={!isEditMode}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  name="description"
                  required
                  rows={5}
                  defaultValue={program?.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition font-medium">
                  Batal
                </button>
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm disabled:opacity-70 flex items-center gap-2 font-medium">
                  {isLoading && <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>}
                  {isEditMode ? "Simpan Perubahan" : "Buat Program"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}