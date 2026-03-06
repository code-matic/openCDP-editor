import React, { useRef, useState, useEffect } from "react";
import { Modal, Tooltip } from "antd";
import type { ImageAsset } from "../types";

interface ImagePickerModalProps {
  show: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
  onFetchImages?: () => Promise<ImageAsset[]>;
  onUploadImage?: (file: File) => Promise<string>;
  onDeleteImage?: (path: string) => Promise<void>;
}

const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  show,
  onClose,
  onSelectImage,
  onFetchImages,
  onUploadImage,
  onDeleteImage,
}) => {
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tab, setTab] = useState<"library" | "url">("library");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show && onFetchImages) {
      setIsLoading(true);
      setError(null);
      onFetchImages()
        .then((data) => setImages(data))
        .catch(() => setError("Failed to load images."))
        .finally(() => setIsLoading(false));
    }
  }, [show, onFetchImages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }
    if (!onUploadImage) {
      alert("Image upload handler not configured.");
      return;
    }
    setIsUploading(true);
    try {
      const url = await onUploadImage(file);
      onSelectImage(url);
      onClose();
    } catch {
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleUrlInsert = () => {
    if (imageUrl.trim()) {
      onSelectImage(imageUrl.trim());
      onClose();
      setImageUrl("");
    }
  };

  const filteredImages = images.filter(
    (img) => !img.isFolder && img.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal
      open={show}
      onCancel={onClose}
      title="Insert Image"
      footer={null}
      width={700}
      destroyOnHidden
    >
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setTab("library")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            tab === "library"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Image Library
        </button>
        <button
          onClick={() => setTab("url")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            tab === "url"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Image URL
        </button>
      </div>

      {tab === "url" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Paste a public image URL to insert it directly.</p>
          <div className="flex gap-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.png"
              className="flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              onKeyDown={(e) => e.key === "Enter" && handleUrlInsert()}
            />
            <button
              onClick={handleUrlInsert}
              disabled={!imageUrl.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700"
            >
              Insert
            </button>
          </div>
          {imageUrl && (
            <div className="border rounded p-2 text-center">
              <img src={imageUrl} alt="preview" className="max-h-48 mx-auto object-contain" />
            </div>
          )}
        </div>
      )}

      {tab === "library" && (
        <div>
          <div className="flex justify-between items-center mb-3 gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search images…"
              className="flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {onUploadImage && (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700 whitespace-nowrap"
                >
                  {isUploading ? "Uploading…" : "+ Upload"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>

          {isLoading && (
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-100 animate-pulse rounded" />
              ))}
            </div>
          )}

          {error && <p className="text-red-500 text-sm py-8 text-center">{error}</p>}

          {!isLoading && !error && filteredImages.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              {onFetchImages ? "No images found. Upload one to get started." : "No image library connected. Use the URL tab to insert images."}
            </div>
          )}

          {!isLoading && !error && filteredImages.length > 0 && (
            <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1">
              {filteredImages.map((img) => (
                <div
                  key={img.path}
                  className="group relative border rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all"
                  onClick={() => { onSelectImage(img.url); onClose(); }}
                >
                  <img
                    src={img.url}
                    alt={img.filename}
                    className="w-full h-28 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      className="bg-white text-gray-800 text-xs px-2 py-1 rounded font-medium"
                      onClick={(e) => { e.stopPropagation(); onSelectImage(img.url); onClose(); }}
                    >
                      Select
                    </button>
                    {onDeleteImage && (
                      <button
                        className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium"
                        onClick={async (e) => {
                          e.stopPropagation();
                          await onDeleteImage(img.path);
                          setImages((prev) => prev.filter((i) => i.path !== img.path));
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <Tooltip title={img.filename.split("/").pop()}>
                    <p className="text-xs text-gray-600 truncate px-2 py-1 bg-white">
                      {img.filename.split("/").pop()}
                    </p>
                  </Tooltip>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ImagePickerModal;
