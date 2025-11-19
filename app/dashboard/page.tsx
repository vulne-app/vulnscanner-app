'use client';

import Link from 'next/link';
import { useState } from 'react';
import TokenDisplay from '@/components/TokenDisplay';
import ScanHistoryItem from '@/components/ScanHistoryItem';

// Mock data
const MOCK_USER = {
  plan: 'PRO',
  tokens: 327,
  tokensLimit: 500,
  scansToday: 3,
};

const MOCK_SCANS = [
  {
    id: '1',
    url: 'bonjour.cm',
    date: 'Nov 19, 2025 - 14:32',
    status: 'completed' as const,
    vulnerabilities: { high: 3, medium: 1 },
    cost: 40
  },
  {
    id: '2',
    url: 'example.com',
    date: 'Nov 18, 2025 - 09:15',
    status: 'completed' as const,
    vulnerabilities: { high: 0, medium: 0 },
    cost: 40
  },
  {
    id: '3',
    url: 'testsite.io',
    date: 'Nov 17, 2025 - 16:45',
    status: 'completed' as const,
    vulnerabilities: { high: 2, medium: 5, low: 3 },
    cost: 100
  }
];

const MOCK_STATS = {
  totalScans: 47,
  vulnsFound: 156,
  mostCommon: 'XSS (45%)',
  tokensUsed: 173
};

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30 DAYS');

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 glow-purple">[DASHBOARD]</h1>
          <p className="text-sm opacity-50">Monitor your security scanning activity</p>
        </div>

        {/* Account Overview Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 glow-purple">&gt; ACCOUNT OVERVIEW</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Plan */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6">
              <h3 className="text-sm opacity-50 mb-2">CURRENT PLAN</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-bold glow-purple">{MOCK_USER.plan}</span>
                <span className="text-2xl">[◆]</span>
              </div>
              <Link
                href="/pricing"
                className="block w-full py-2 text-center bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all"
              >
                [UPGRADE]
              </Link>
            </div>

            {/* Tokens */}
            <div className="lg:col-span-2">
              <TokenDisplay
                current={MOCK_USER.tokens}
                limit={MOCK_USER.tokensLimit}
                showProgress={true}
              />
              <div className="mt-4 flex gap-4">
                <Link
                  href="/tokens"
                  className="flex-1 py-2 text-center bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all"
                >
                  [BUY TOKENS]
                </Link>
                <Link
                  href="/scan"
                  className="flex-1 py-2 text-center bg-black hover:bg-gray-900 border-2 border-purple-400 font-bold transition-all"
                >
                  [START SCAN]
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 glow-purple">&gt; STATISTICS</h2>

          {/* Period Selector */}
          <div className="flex justify-center gap-4 mb-6">
            {['7 DAYS', '30 DAYS', 'ALL TIME'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 font-bold transition-all ${
                  period === selectedPeriod
                    ? 'bg-purple-600 border-2 border-purple-400 glow-accent'
                    : 'bg-black border-2 border-purple-400 hover:bg-gray-900'
                }`}
              >
                [{period}]
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Scans */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6 text-center">
              <div className="text-5xl font-bold glow-green mb-2">{MOCK_STATS.totalScans}</div>
              <div className="text-sm opacity-50">SCANS (LAST {selectedPeriod === 'ALL TIME' ? 'ALL TIME' : selectedPeriod})</div>
              <div className="text-xs text-green-400 mt-1">+12% vs previous period</div>
            </div>

            {/* Vulnerabilities Found */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6 text-center">
              <div className="text-5xl font-bold text-red-400 mb-2">{MOCK_STATS.vulnsFound}</div>
              <div className="text-sm opacity-50">VULNERABILITIES FOUND</div>
              <div className="text-xs text-red-400 mt-1">+8% vs previous period</div>
            </div>

            {/* Most Common Type */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">{MOCK_STATS.mostCommon}</div>
              <div className="text-sm opacity-50">MOST COMMON TYPE</div>
              <div className="text-xs text-purple-400 mt-1">Consistent trend</div>
            </div>

            {/* Tokens Used */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6 text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">{MOCK_STATS.tokensUsed}</div>
              <div className="text-sm opacity-50">TOKENS USED THIS MONTH</div>
              <div className="text-xs text-yellow-400 mt-1">+5% vs previous period</div>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="mt-6 terminal-border bg-black/80 backdrop-blur p-8">
            <div className="placeholder-3d-icon bg-purple-900/20 h-64 w-full flex items-center justify-center border border-purple-600">
              <div className="text-center">
                <span className="text-4xl mb-2 block">[CHART]</span>
                <span className="text-sm opacity-50">[Future 3D Analytics Chart]</span>
              </div>
            </div>
          </div>
        </section>

        {/* Scan History Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold glow-purple">&gt; SCAN HISTORY</h2>
            <Link
              href="/scan"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all"
            >
              [NEW SCAN]
            </Link>
          </div>

          <div className="space-y-4">
            {MOCK_SCANS.map((scan) => (
              <ScanHistoryItem key={scan.id} {...scan} />
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => console.log('TODO: Load more scans')}
              className="px-8 py-3 bg-black hover:bg-gray-900 border-2 border-purple-400 font-bold transition-all"
            >
              [LOAD MORE]
            </button>
          </div>
        </section>

        {/* Activity Summary */}
        <section className="mt-12 terminal-border bg-purple-900/20 backdrop-blur p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold glow-purple mb-2">TODAY'S ACTIVITY</h3>
              <p className="text-sm opacity-70">
                You've performed <span className="text-green-400 font-bold">{MOCK_USER.scansToday}</span> scans today
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{MOCK_USER.tokens}</div>
                <div className="text-xs opacity-50">tokens left</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{MOCK_USER.tokensLimit - MOCK_USER.tokens}</div>
                <div className="text-xs opacity-50">tokens used</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
