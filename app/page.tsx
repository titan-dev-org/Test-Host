'use client';

import { useState } from 'react';
import CheckForm from '@/components/CheckForm';
import ResultCard from '@/components/ResultCard';
import ScreenshotPreview from '@/components/ScreenshotPreview';
import { checkWebsite } from '@/lib/api';
import { CheckResult } from '@/types';
import { Globe, Zap } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await checkWebsite(url);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengecek website');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Check Host Net
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cek status website dari <span className="font-semibold text-blue-600">9 lokasi global</span> sekaligus.
            Ketahui apakah website-mu bisa diakses dari seluruh dunia.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">🇺🇸 USA</span>
            <span className="flex items-center gap-1">🇪🇺 Eropa</span>
            <span className="flex items-center gap-1">🌏 Asia</span>
            <span className="flex items-center gap-1">🇯🇵 Jepang</span>
            <span className="flex items-center gap-1">🇧🇷 Brazil</span>
            <span className="flex items-center gap-1">🌍 Afrika</span>
            <span className="flex items-center gap-1">🇦🇪 Timur Tengah</span>
          </div>
        </div>

        <CheckForm onCheck={handleCheck} isLoading={isLoading} />

        {error && (
          <div className="mt-6 max-w-3xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
            ⚠️ {error}
          </div>
        )}

        {result && (
          <>
            <div className="mt-8">
              <ResultCard result={result} />
            </div>
            <ScreenshotPreview url={result.url} />
          </>
        )}

        <div className="mt-16 text-center text-sm text-gray-400 border-t border-gray-200 pt-8">
          <p className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            Data real-time dari Worldwide Uptime API
          </p>
          <p className="mt-1">© {new Date().getFullYear()} Check Host Net</p>
        </div>
      </div>
    </main>
  );
}
