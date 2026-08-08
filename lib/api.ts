import { CheckResult, RegionCheck } from '@/types';

// Region mapping untuk display
const regionMap = [
  { id: 'na-east', flag: '🇺🇸', name: 'North America (East)' },
  { id: 'na-west', flag: '🇺🇸', name: 'North America (West)' },
  { id: 'eu-central', flag: '🇪🇺', name: 'Europe (Central)' },
  { id: 'eu-west', flag: '🇪🇺', name: 'Europe (West)' },
  { id: 'ap-southeast', flag: '🌏', name: 'Asia Pacific' },
  { id: 'ap-northeast', flag: '🇯🇵', name: 'Japan' },
  { id: 'sa-east', flag: '🇧🇷', name: 'South America' },
  { id: 'af-south', flag: '🌍', name: 'Africa' },
  { id: 'me-south', flag: '🇦🇪', name: 'Middle East' },
];

export async function checkWebsite(url: string): Promise<CheckResult> {
  let cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  try {
    // PAKAI API WORLDWIDE UPTIME - FORMAT ASLI
    const response = await fetch(
      `https://api.worldwideuptime.com/check?url=${encodeURIComponent(cleanUrl)}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; CheckHostBot/1.0)'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('📦 Raw API Response:', data);

    // FORMAT ASLI: data langsung objek, bukan array
    // Cek apakah ada data.error
    if (data.error) {
      // Kalau error (seperti 429 dari Google)
      return {
        url: cleanUrl,
        regions: [{
          location: data.region?.name || 'Unknown',
          flag: data.region?.flag || '🌐',
          status: data.httpStatus || 0,
          statusText: data.error?.message || 'Error',
          responseTime: data.timings?.totalMs || 0,
          isUp: false,
          timestamp: data.checkedAt || new Date().toISOString()
        }],
        checkedAt: new Date().toISOString()
      };
    }

    // Kalau sukses, format dari API mungkin beda
    // Kita bungkus dalam array biar konsisten
    const regions: RegionCheck[] = [{
      location: data.region?.name || 'Global',
      flag: data.region?.flag || '🌐',
      status: data.httpStatus || 200,
      statusText: data.status || 'OK',
      responseTime: data.timings?.totalMs || 0,
      isUp: data.status === 'up' || data.status === 'online',
      timestamp: data.checkedAt || new Date().toISOString()
    }];

    return {
      url: cleanUrl,
      regions: regions,
      checkedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error('❌ Error:', error);
    throw new Error(`Gagal mengecek: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
      }
