'use client';

import { useState } from 'react';
import { Camera, Loader2, ExternalLink } from 'lucide-react';

interface ScreenshotPreviewProps {
  url: string;
}

export default function ScreenshotPreview({ url }: ScreenshotPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const screenshotUrl = `https://api.screenshotlayer.com/api/capture?access_key=demo&url=${encodeURIComponent(url)}&fullpage=1&viewport=1440x900`;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Preview Website</h3>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
          >
            Buka langsung <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        
        <div className="relative bg-gray-100 min-h-[300px] flex items-center justify-center">
          {isLoading && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
              <p className="text-gray-500 text-sm">Memuat screenshot...</p>
            </div>
          )}
          
          {hasError ? (
            <div className="text-center p-8">
              <p className="text-gray-500">Gagal memuat screenshot</p>
              <p className="text-sm text-gray-400 mt-2">Website mungkin tidak mengizinkan akses</p>
            </div>
          ) : (
            <img
              src={screenshotUrl}
              alt={`Screenshot ${url}`}
              className={`w-full object-cover max-h-[600px] transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
