import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RotateCcw, Lock, Unlock, Maximize2, Image as ImageIcon } from 'lucide-react';

export const ImageResizer: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('sample-image.jpg');
  const [origWidth, setOrigWidth] = useState<number>(1200);
  const [origHeight, setOrigHeight] = useState<number>(800);
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(533);
  const [lockRatio, setLockRatio] = useState<boolean>(true);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [quality, setQuality] = useState<number>(85);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load sample image on mount
  useEffect(() => {
    loadSample();
  }, []);

  const loadSample = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, 1200, 800);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#3b82f6');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 800);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px sans-serif';
    ctx.fillText('ToolNest Image Resizer', 100, 380);
    ctx.font = '24px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('1200 × 800 Original Canvas Reference', 100, 440);

    const url = canvas.toDataURL('image/jpeg', 0.9);
    setImageSrc(url);
    setFileName('toolnest-banner.jpg');
    setOrigWidth(1200);
    setOrigHeight(800);
    setTargetWidth(800);
    setTargetHeight(533);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          setOrigWidth(img.naturalWidth);
          setOrigHeight(img.naturalHeight);
          setTargetWidth(img.naturalWidth);
          setTargetHeight(img.naturalHeight);
          setImageSrc(dataUrl);
        };
      }
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    if (lockRatio && origWidth > 0) {
      const calculatedHeight = Math.round((val / origWidth) * origHeight);
      setTargetHeight(calculatedHeight);
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    if (lockRatio && origHeight > 0) {
      const calculatedWidth = Math.round((val / origHeight) * origWidth);
      setTargetWidth(calculatedWidth);
    }
  };

  const applyPreset = (w: number, h: number) => {
    setTargetWidth(w);
    setTargetHeight(h);
    setLockRatio(false);
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/png' ? 'png' : 'webp';
      const cleanName = fileName.replace(/\.[^/.]+$/, '');
      const downloadName = `${cleanName}_${targetWidth}x${targetHeight}.${ext}`;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = downloadName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
          setIsProcessing(false);
        },
        format,
        quality / 100
      );
    };
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
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-slate-800">
          Upload image to resize
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Supports JPEG, PNG, WebP, GIF. All processing happens in your browser.
        </p>
      </div>

      {imageSrc && (
        <div className="mt-8 space-y-6">
          {/* Quick Presets */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
              Common Presets
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyPreset(1920, 1080)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition-colors"
              >
                1080p FHD (1920×1080)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(1080, 1080)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition-colors"
              >
                Square (1080×1080)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(1200, 630)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition-colors"
              >
                Social Share (1200×630)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(300, 300)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition-colors"
              >
                Thumbnail (300×300)
              </button>
            </div>
          </div>

          {/* Dimension Controls */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label htmlFor="targetWidthInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Width (Pixels)
                </label>
                <input
                  id="targetWidthInput"
                  type="number"
                  min="10"
                  max="10000"
                  value={targetWidth}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums font-mono font-medium"
                />
              </div>

              <div>
                <label htmlFor="targetHeightInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Height (Pixels)
                </label>
                <input
                  id="targetHeightInput"
                  type="number"
                  min="10"
                  max="10000"
                  value={targetHeight}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums font-mono font-medium"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/60">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={lockRatio}
                  onChange={(e) => setLockRatio(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span className="flex items-center gap-1">
                  {lockRatio ? <Lock className="w-3.5 h-3.5 text-indigo-600" /> : <Unlock className="w-3.5 h-3.5 text-slate-400" />}
                  <span>Lock Aspect Ratio (Original: {origWidth}×{origHeight})</span>
                </span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Format:</span>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="image/jpeg">JPEG (.jpg)</option>
                  <option value="image/png">PNG (.png)</option>
                  <option value="image/webp">WebP (.webp)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action & Download Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isProcessing || targetWidth <= 0 || targetHeight <= 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Download Resized Image ({targetWidth}×{targetHeight}px)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTargetWidth(origWidth);
                setTargetHeight(origHeight);
                setLockRatio(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Original Dimensions</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
