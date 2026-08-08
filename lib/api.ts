import { CheckResult, RegionCheck } from '@/types';

const regionMap: Record<string, { flag: string; name: string }> = {
  'us-east': { flag: '🇺🇸', name: 'USA (East)' },
  'us-west': { flag: '🇺🇸', name: 'USA (West)' },
  'eu-central': { flag: '🇪🇺', name: 'Europe (Central)' },
  'eu-west': { flag: '🇪🇺', name: 'Europe (West)' },
  'ap-southeast': { flag: '🌏', name: 'Asia Pacific' },
  'ap-northeast': { flag: '🇯🇵', name: 'Japan' },
  'sa-east': { flag: '🇧🇷', name: 'South America' },
  'af-south': { flag: '🌍', name: 'Africa' },
  'me-south': { flag: '🇦🇪', name: 'Middle East' },
};

export async function checkWebsite(url: string): Promise<CheckResult> {
  let cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  try {
    const response = await fetch(
      `https://api.worldwideuptime.com/check?url=${encodeURIComponent(cleanUrl)}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    const regions: RegionCheck[] = data.results.map((item: any) => {
      const location = item.location || 'unknown';
      const regionInfo = regionMap[location] || { flag: '🌐', name: location };
      
      return {
        location: regionInfo.name,
        flag: regionInfo.flag,
        status: item.statusCode || 0,
        statusText: item.statusText || 'Unknown',
        responseTime: item.responseTime || 0,
        isUp: item.isUp || false,
        timestamp: item.timestamp || new Date().toISOString(),
      };
    });

    return {
      url: cleanUrl,
      regions,
      screenshot: data.screenshot || undefined,
      checkedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error checking website:', error);
    throw error;
  }
}

export async function getScreenshot(url: string): Promise<string> {
  const accessKey = process.env.NEXT_PUBLIC_SCREENSHOT_API_KEY || 'demo';
  return `https://api.screenshotlayer.com/api/capture?access_key=${accessKey}&url=${encodeURIComponent(url)}&fullpage=1&viewport=1440x900`;
                                   }
