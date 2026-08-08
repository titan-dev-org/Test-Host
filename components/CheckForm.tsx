'use client';

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface CheckFormProps {
  onCheck: (url: string) => void;
  isLoading: boolean;
}

export default function CheckForm({ onCheck, isLoading }: CheckFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onCheck(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Masukkan URL website (contoh: google.com)"
            className="w-full px-5 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors bg-white/90 backdrop-blur-sm shadow-sm"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Cek...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Cek Status
            </>
          )}
        </button>
      </div>
    </form>
  );
}
