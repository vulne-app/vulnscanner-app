'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data pour le leaderboard
const MOCK_LEADERBOARD = [
  {
    rank: 1,
    username: 'CyberNinja',
    avatar: '🥷',
    points: 15420,
    scansCount: 287,
    vulnsFound: 1243,
    level: 42,
    badge: 'LEGEND',
    country: 'FR'
  },
  {
    rank: 2,
    username: 'SecurityPro',
    avatar: '🛡️',
    points: 14890,
    scansCount: 256,
    vulnsFound: 1108,
    level: 40,
    badge: 'MASTER',
    country: 'US'
  },
  {
    rank: 3,
    username: 'HackTheBox',
    avatar: '📦',
    points: 13200,
    scansCount: 198,
    vulnsFound: 987,
    level: 38,
    badge: 'MASTER',
    country: 'UK'
  },
  {
    rank: 4,
    username: 'PentestKing',
    avatar: '👑',
    points: 12100,
    scansCount: 176,
    vulnsFound: 856,
    level: 36,
    badge: 'EXPERT',
    country: 'DE'
  },
  {
    rank: 5,
    username: 'BugHunter99',
    avatar: '🐛',
    points: 11450,
    scansCount: 164,
    vulnsFound: 792,
    level: 35,
    badge: 'EXPERT',
    country: 'CA'
  },
  // Top 10
  ...Array.from({ length: 5 }, (_, i) => ({
    rank: i + 6,
    username: `User${i + 6}`,
    avatar: '🔍',
    points: 10000 - i * 500,
    scansCount: 150 - i * 10,
    vulnsFound: 700 - i * 50,
    level: 30 - i,
    badge: 'EXPERT',
    country: 'FR'
  })),
  // Top 50
  ...Array.from({ length: 40 }, (_, i) => ({
    rank: i + 11,
    username: `User${i + 11}`,
    avatar: '⚡',
    points: 9000 - i * 100,
    scansCount: 120 - i * 2,
    vulnsFound: 600 - i * 10,
    level: 25 - Math.floor(i / 5),
    badge: i < 15 ? 'PRO' : 'ADVANCED',
    country: 'FR'
  }))
];

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'all' | 'month' | 'week'>('all');
  const [category, setCategory] = useState<'points' | 'scans' | 'vulns'>('points');

  const currentUserRank = 127; // Mock: rang de l'utilisateur actuel

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'LEGEND': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'MASTER': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'EXPERT': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'PRO': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 glow-title">[LEADERBOARD]</h1>
          <p className="text-xl opacity-70 mb-2">Compete with the best security researchers worldwide</p>
          <p className="text-sm opacity-50">Climb the ranks, earn badges, become a legend</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Timeframe */}
          <div className="terminal-border bg-black/80 backdrop-blur p-4">
            <div className="text-xs opacity-50 mb-2">TIMEFRAME</div>
            <div className="flex gap-2">
              {(['all', 'month', 'week'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`flex-1 py-2 font-bold transition-all ${
                    timeframe === tf
                      ? 'bg-purple-600 border-2 border-purple-400'
                      : 'bg-black border-2 border-purple-600 hover:border-purple-400'
                  }`}
                >
                  [{tf.toUpperCase()}]
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="terminal-border bg-black/80 backdrop-blur p-4">
            <div className="text-xs opacity-50 mb-2">CATEGORY</div>
            <div className="flex gap-2">
              <button
                onClick={() => setCategory('points')}
                className={`flex-1 py-2 font-bold transition-all ${
                  category === 'points'
                    ? 'bg-purple-600 border-2 border-purple-400'
                    : 'bg-black border-2 border-purple-600 hover:border-purple-400'
                }`}
              >
                [POINTS]
              </button>
              <button
                onClick={() => setCategory('scans')}
                className={`flex-1 py-2 font-bold transition-all ${
                  category === 'scans'
                    ? 'bg-purple-600 border-2 border-purple-400'
                    : 'bg-black border-2 border-purple-600 hover:border-purple-400'
                }`}
              >
                [SCANS]
              </button>
              <button
                onClick={() => setCategory('vulns')}
                className={`flex-1 py-2 font-bold transition-all ${
                  category === 'vulns'
                    ? 'bg-purple-600 border-2 border-purple-400'
                    : 'bg-black border-2 border-purple-600 hover:border-purple-400'
                }`}
              >
                [VULNS]
              </button>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <div className="terminal-border bg-gray-800/50 backdrop-blur p-6 text-center flex flex-col items-center justify-end">
              <div className="text-6xl mb-2">🥈</div>
              <div className="text-4xl mb-2">{MOCK_LEADERBOARD[1].avatar}</div>
              <div className="font-bold text-xl glow-header mb-1">{MOCK_LEADERBOARD[1].username}</div>
              <div className="text-sm opacity-50 mb-2">LEVEL {MOCK_LEADERBOARD[1].level}</div>
              <div className={`text-xs px-3 py-1 ${getBadgeColor(MOCK_LEADERBOARD[1].badge)} font-bold mb-3`}>
                {MOCK_LEADERBOARD[1].badge}
              </div>
              <div className="text-3xl font-bold text-green-400">{MOCK_LEADERBOARD[1].points.toLocaleString()}</div>
              <div className="text-xs opacity-50">points</div>
            </div>

            {/* 1st Place */}
            <div className="terminal-border-strong bg-gradient-to-b from-yellow-900/30 to-black/50 backdrop-blur p-6 text-center flex flex-col items-center justify-end transform scale-110">
              <div className="text-8xl mb-2 animate-pulse">👑</div>
              <div className="text-6xl mb-2">{MOCK_LEADERBOARD[0].avatar}</div>
              <div className="font-bold text-2xl glow-title mb-1">{MOCK_LEADERBOARD[0].username}</div>
              <div className="text-sm opacity-50 mb-2">LEVEL {MOCK_LEADERBOARD[0].level}</div>
              <div className={`text-xs px-3 py-1 ${getBadgeColor(MOCK_LEADERBOARD[0].badge)} font-bold mb-3`}>
                {MOCK_LEADERBOARD[0].badge}
              </div>
              <div className="text-4xl font-bold text-yellow-400">{MOCK_LEADERBOARD[0].points.toLocaleString()}</div>
              <div className="text-xs opacity-50">points</div>
            </div>

            {/* 3rd Place */}
            <div className="terminal-border bg-orange-900/30 backdrop-blur p-6 text-center flex flex-col items-center justify-end">
              <div className="text-6xl mb-2">🥉</div>
              <div className="text-4xl mb-2">{MOCK_LEADERBOARD[2].avatar}</div>
              <div className="font-bold text-xl glow-header mb-1">{MOCK_LEADERBOARD[2].username}</div>
              <div className="text-sm opacity-50 mb-2">LEVEL {MOCK_LEADERBOARD[2].level}</div>
              <div className={`text-xs px-3 py-1 ${getBadgeColor(MOCK_LEADERBOARD[2].badge)} font-bold mb-3`}>
                {MOCK_LEADERBOARD[2].badge}
              </div>
              <div className="text-3xl font-bold text-orange-400">{MOCK_LEADERBOARD[2].points.toLocaleString()}</div>
              <div className="text-xs opacity-50">points</div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className="terminal-border bg-black/80 backdrop-blur overflow-hidden">
          <div className="bg-purple-900/30 px-6 py-3 border-b-2 border-purple-600">
            <h2 className="text-xl font-bold glow-header">FULL RANKINGS</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/50">
                <tr className="text-left">
                  <th className="px-6 py-4 text-xs font-bold text-purple-400">RANK</th>
                  <th className="px-6 py-4 text-xs font-bold text-purple-400">USER</th>
                  <th className="px-6 py-4 text-xs font-bold text-purple-400">LEVEL</th>
                  <th className="px-6 py-4 text-xs font-bold text-purple-400">BADGE</th>
                  <th className="px-6 py-4 text-xs font-bold text-purple-400">POINTS</th>
                  <th className="px-6 py-4 text-xs font-bold text-purple-400">SCANS</th>
                  <th className="px-6 py-4 text-xs font-bold text-purple-400">VULNS</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_LEADERBOARD.map((user, index) => (
                  <tr
                    key={user.rank}
                    className={`border-b border-purple-900/30 hover:bg-purple-900/20 transition-all ${
                      user.rank <= 3 ? 'bg-yellow-900/10' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.rank <= 3 && (
                          <span className="text-2xl">
                            {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        )}
                        <span className="text-2xl font-bold">{user.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{user.avatar}</span>
                        <div>
                          <div className="font-bold glow-accent">{user.username}</div>
                          <div className="text-xs opacity-50">{user.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-purple-400">{user.level}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-xs px-3 py-1 ${getBadgeColor(user.badge)} font-bold inline-block`}>
                        {user.badge}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-green-400">{user.points.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 text-sm opacity-70">{user.scansCount}</td>
                    <td className="px-6 py-4 text-sm opacity-70">{user.vulnsFound}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Rank */}
        <div className="mt-8 terminal-border-strong bg-purple-900/20 backdrop-blur p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-50 mb-1">YOUR CURRENT RANK</div>
              <div className="text-4xl font-bold glow-title">#{currentUserRank}</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-50 mb-1">POINTS TO NEXT RANK</div>
              <div className="text-2xl font-bold text-purple-400">+156</div>
            </div>
            <Link
              href="/scan"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all"
            >
              [EARN MORE POINTS]
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
