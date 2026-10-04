import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Check, RotateCcw, QrCode, Palette, Link2, Wifi } from 'lucide-react';

export const QrCodeGenerator: React.FC = () => {
  const [qrType, setQrType] = useState<'url' | 'text' | 'wifi'>('url');
  const [textValue, setTextValue] = useState<string>('https://toolnest.app');
  const [wifiSsid, setWifiSsid] = useState<string>('MyHomeNetwork');
  const [wifiPassword, setWifiPassword] = useState<string>('SecurePass123!');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  const [fgColor, setFgColor] = useState<string>('#0f172a');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [size, setSize] = useState<number>(300);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Compute raw payload based on type
  const getPayload = () => {
    if (qrType === 'wifi') {
      return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
    }
    return textValue;
  };

  const generateQRCode = async () => {
    const payload = getPayload();
    if (!payload.trim()) {
      setQrDataUrl('');
      return;
    }

    try {
      const url = await QRCode.toDataURL(payload, {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor
        },
        errorCorrectionLevel: errorLevel
      });
      setQrDataUrl(url);

      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, payload, {
          width: size,
          margin: 2,
          color: {
            dark: fgColor,
            light: bgColor
          },
          errorCorrectionLevel: errorLevel
        });
      }
    } catch (err) {
      console.error('Failed to generate QR code', err);
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [qrType, textValue, wifiSsid, wifiPassword, wifiEncryption, fgColor, bgColor, size, errorLevel]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `toolnest_qrcode_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getPayload());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setQrType('url');
    setTextValue('https://toolnest.app');
    setFgColor('#0f172a');
    setBgColor('#ffffff');
    setSize(300);
    setErrorLevel('M');
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Type Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mb-6 overflow-x-auto">
        <button
          type="button"
          onClick={() => {
            setQrType('url');
            setTextValue('https://toolnest.app');
          }}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            qrType === 'url' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Website URL</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setQrType('text');
            setTextValue('Welcome to ToolNest free online tools suite.');
          }}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            qrType === 'text' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Plain Text / Note</span>
        </button>

        <button
          type="button"
          onClick={() => setQrType('wifi')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            qrType === 'wifi' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wifi className="w-3.5 h-3.5" />
          <span>WiFi Access</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input & Customization Form */}
        <div className="lg:col-span-7 space-y-5">
          {qrType === 'url' && (
            <div>
              <label htmlFor="urlInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Website URL
              </label>
              <input
                id="urlInput"
                type="url"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {qrType === 'text' && (
            <div>
              <label htmlFor="textNotesInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Text or Notes to Encode
              </label>
              <textarea
                id="textNotesInput"
                rows={3}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Enter any text, address, message..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {qrType === 'wifi' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="wifiSsidInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Network Name (SSID)
                </label>
                <input
                  id="wifiSsidInput"
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="e.g. Home_WiFi_5G"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="wifiPassInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  WiFi Password
                </label>
                <input
                  id="wifiPassInput"
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="Network password"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="wifiEncSelect" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Security Encryption
                </label>
                <select
                  id="wifiEncSelect"
                  value={wifiEncryption}
                  onChange={(e) => setWifiEncryption(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="WPA">WPA/WPA2/WPA3 (Standard)</option>
                  <option value="WEP">WEP (Legacy)</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>
            </div>
          )}

          {/* Color & Size Customization */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fgColorPicker" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Foreground Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="fgColorPicker"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-24 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bgColorPicker" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="bgColorPicker"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-24 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="sizeSelect" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Resolution Size
                </label>
                <select
                  id="sizeSelect"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={200}>200 × 200 px (Standard)</option>
                  <option value={300}>300 × 300 px (Medium)</option>
                  <option value={450}>450 × 450 px (High-Res)</option>
                  <option value={600}>600 × 600 px (Ultra Print)</option>
                </select>
              </div>

              <div>
                <label htmlFor="errorLevelSelect" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Error Correction
                </label>
                <select
                  id="errorLevelSelect"
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="L">Level L (7% recovery)</option>
                  <option value="M">Level M (15% standard)</option>
                  <option value="Q">Level Q (25% high)</option>
                  <option value="H">Level H (30% best)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* QR Code Preview & Download Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-50/70 border border-slate-200 rounded-2xl p-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Live Preview
          </span>

          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200/80 mb-4">
            <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg" />
          </div>

          <div className="w-full space-y-2 mt-2">
            <button
              type="button"
              onClick={handleDownload}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG Image</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Encoded Payload'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
