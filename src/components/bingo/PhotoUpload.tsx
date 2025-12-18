import { useState, useRef } from "react";
import heic2any from "heic2any";

interface PhotoUploadProps {
  onUpload: (photoData: string) => void;
}

export default function PhotoUpload({ onUpload }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isHeicFile = (file: File): boolean => {
    return (
      file.type === "image/heic" ||
      file.type === "image/heif" ||
      file.name.toLowerCase().endsWith(".heic") ||
      file.name.toLowerCase().endsWith(".heif")
    );
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (isHeicFile(file)) {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        });

        const convertedFile = Array.isArray(convertedBlob)
          ? convertedBlob[0]
          : convertedBlob;

        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          cropToCircle(result);
        };
        reader.readAsDataURL(convertedFile as Blob);
        return;
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          cropToCircle(result);
        };
        reader.readAsDataURL(file);
      }
    } catch {
      alert("Failed to process image. Please try a different format.");
    }
  };

  const cropToCircle = (imageData: string) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const x = (img.width - size) / 2;
      const y = (img.height - size) / 2;

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      ctx.clip();

      ctx.drawImage(img, x, y, size, size, 0, 0, size, size);

      const croppedDataUrl = canvas.toDataURL("image/png");
      setPreview(croppedDataUrl);
    };
    img.src = imageData;
  };

  const handleUpload = () => {
    if (preview) {
      onUpload(preview);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-6 sm:py-12 px-4 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6">
          Add Your Photo
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
          Upload a photo to personalize your bingo card
        </p>

        <div className="mb-6 sm:mb-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.heic,.heif"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload"
          />
          <label
            htmlFor="photo-upload"
            className="inline-block bg-kulagreen text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-sm shadow-brutal active:shadow-brutal-sm active:translate-x-1 active:translate-y-1 transition-all duration-150 text-base sm:text-lg border-4 border-black cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation w-full sm:w-auto"
          >
            Choose Photo
          </label>
        </div>

        {preview && (
          <div className="mb-6 sm:mb-8">
            <div className="inline-block border-4 border-black shadow-brutal p-2 bg-white">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full border-4 border-black"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  setPreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="bg-gray-200 text-gray-900 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-sm shadow-brutal-sm active:shadow-brutal-sm active:translate-x-1 active:translate-y-1 transition-all duration-150 text-sm sm:text-base border-4 border-black touch-manipulation"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          {preview && (
            <button
              onClick={handleUpload}
              className="bg-kulagreen text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-sm shadow-brutal active:shadow-brutal-sm active:translate-x-1 active:translate-y-1 transition-all duration-150 text-base sm:text-lg border-4 border-black touch-manipulation w-full sm:w-auto"
            >
              Use This Photo
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
