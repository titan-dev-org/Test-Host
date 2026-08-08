export interface RegionCheck {
  location: string;
  flag: string;
  status: number;
  statusText: string;
  responseTime: number;
  isUp: boolean;
  timestamp: string;
}

export interface CheckResult {
  url: string;
  regions: RegionCheck[];
  screenshot?: string;
  checkedAt: string;
}
