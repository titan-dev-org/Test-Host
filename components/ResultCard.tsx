'use client';

import { CheckResult } from '@/types';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResultCardProps {
  result: CheckResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const totalRegions = result.regions.length;
  const upRegions = result.regions.filter(r => r.isUp).length;
  const downRegions = totalRegions - upRegions;
  const isFullyUp = downRegions === 0;
  const isFullyDown = upRegions === 0;

  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-800 truncate max-w-md">
                {result.url}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Dicek: {new Date(result.checkedAt).toLocaleString('id-ID')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">{upRegions}</span>
              </div>
              <div className="flex items-center gap-1 text-red-600">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">{downRegions}</span>
              </div>
              <div className={`px-4 py-1.5 rounded-full font-bold text-sm ${
                isFullyUp ? 'bg-green-100 text-green-700' :
                isFullyDown ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {isFullyUp ? '✅ Semua Akses' :
                 isFullyDown ? '❌ Tidak Akses' :
                 '⚠️ Sebagian'}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.regions.map((region, index) => (
              <RegionItem key={index} region={region} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RegionItem({ region }: { region: any }) {
  const statusColor = region.isUp 
    ? 'border-green-200 bg-green-50' 
    : 'border-red-200 bg-red-50';
  const statusIcon = region.isUp 
    ? <CheckCircle className="w-5 h-5 text-green-600" />
    : <XCircle className="w-5 h-5 text-red-600" />;

  return (
    <div className={`p-4 rounded-xl border-2 ${statusColor} transition-all hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{region.flag}</span>
          <div>
            <p className="font-semibold text-gray-800">{region.location}</p>
            <p className="text-sm text-gray-500">{region.timestamp}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            {statusIcon}
            <span className="font-bold text-sm">
              {region.isUp ? 'Online' : 'Offline'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {region.status} {region.statusText}
          </p>
          <p className="text-xs text-gray-400">
            ⏱ {region.responseTime} ms
          </p>
        </div>
      </div>
    </div>
  );
    }
