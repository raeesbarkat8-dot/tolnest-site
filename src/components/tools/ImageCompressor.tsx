import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RotateCcw, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';

export const ImageCompressor: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('sample-image.jpg');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(75);
  const [compressedDataUrl, setCompressedDataUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load a crisp sample image initially so user can test immediately
  useEffect(() => {
    loadSampleImage();
  }, []);

  const loadSampleImage = () => {
    // Generate a sample synthetic high-resolution image using canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw rich gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 800);
    grad.addColorStop(0, '#4338ca');
    grad.addColorStop(0.5, '#6366f1');
    grad.addColorStop(1, '#06b6d4');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 800);

    // Decorative geometric shapes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.arc(300, 250, 180, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(900, 550, 240, 0, Math.PI * 2);
    ctx.fill();

    // Typography
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px sans-serif';
    ctx.fillText('ToolNest Image Compressor', 120, 380);
    ctx.font = '28px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText('100% Client-side Browser Compression · High Fidelity', 120, 440);

    canvas.toBlob((blob) => {
      if (blob) {
        setOriginalSize(blob.size);
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
        setFileName('toolnest-demo-image.jpg');
      }
    }, 'image/jpeg', 0.95);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageSrc(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Compress image on quality change or new image
  useEffect(() => {
    if (!imageSrc) return;

    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      ctx.drawImage(img, 0, 0);

      const q = quality / 100;
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            const compressedUrl = URL.createObjectURL(blob);
            setCompressedDataUrl(compressedUrl);
          }
          setIsProcessing(false);
        },
        'image/jpeg',
        q
      );
    };
  }, [imageSrc, quality]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const reductionPercentage =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
      : 0;

  const handleDownload = () => {
    if (!compressedDataUrl) return;
    const link = document.createElement('a');
    link.href = compressedDataUrl;
    link.download = `compressed_${fileName.replace(/\.[^/.]+$/, '')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-6 sm:p-8 text-center cursor-pointer bg-slate-50/60 hover:bg-indigo-50/30 transition-all"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileUpload}
          className="hidden"
        />
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-slate-800">
          Click to choose an image or drag & drop here
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Supports JPG, PNG, and WebP (up to 25MB). Processed 100% locally.
        </p>
      </div>

      {imageSrc && (
        <div className="mt-8 space-y-6">
          {/* Quality Slider Control */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="qualitySlider" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Compression Quality
              </label>
              <span className="text-xs font-bold text-indigo-700 tabular-nums font-mono bg-indigo-50 px-2 py-0.5 rounded">
                {quality}%
              </span>
            </div>
            <input
              id="qualitySlider"
              type="range"
              min="10"
              max="95"
              step="5"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
              <span>Smallest Size (10%)</span>
              <span>Balanced (70%)</span>
              <span>Highest Quality (95%)</span>
            </div>
          </div>

          {/* Metrics comparison card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4">
              <span className="text-[11px] font-medium text-slate-500 uppercase">Original Size</span>
              <p className="text-xl font-bold text-slate-800 tabular-nums mt-1 font-mono">
                {formatBytes(originalSize)}
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <span className="text-[11px] font-medium text-emerald-700 uppercase">Compressed Size</span>
              <p className="text-xl font-bold text-emerald-800 tabular-nums mt-1 font-mono">
                {isProcessing ? 'Optimizing...' : formatBytes(compressedSize)}
              </p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <span className="text-[11px] font-medium text-indigo-700 uppercase">Reduction</span>
              <p className="text-xl font-bold text-indigo-800 tabular-nums mt-1 font-mono">
                -{reductionPercentage}% saved
              </p>
            </div>
          </div>

          {/* Image Preview & Download */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                <span>Compressed Preview ({fileName})</span>
              </span>
              <button
                type="button"
                onClick={loadSampleImage}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                Reset to Sample
              </button>
            </div>

            <div className="max-h-72 rounded-lg overflow-hidden flex items-center justify-center bg-slate-900/5 p-2">
              {compressedDataUrl ? (
                <img
                  src={compressedDataUrl}
                  alt="Compressed output preview"
                  className="max-h-64 object-contain rounded shadow-sm"
                />
              ) : (
                <div className="text-xs text-slate-400 py-12">Rendering preview...</div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDownload}
                disabled={!compressedDataUrl || isProcessing}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Download Compressed Image</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Another Image</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
