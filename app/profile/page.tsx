'use client';

import Link from 'next/link';
import { useState } from 'react';

// Mock user data
const MOCK_USER = {
  username: 'collins_dev',
  avatar: '🥷',
  level: 28,
  currentXP: 6420,
  nextLevelXP: 10000,
  rank: 127,
  totalPoints: 8945,
  joinedDate: 'Jan 2026',
  country: 'France',
  bio: 'Cybersecurity enthusiast | JUNIA student | Bug bounty hunter',
  plan: 'PRO',
  stats: {
    totalScans: 89,
    vulnsFound: 234,
    criticalVulns: 12,
    highVulns: 45,
    mediumVulns: 89,
    lowVulns: 88,
    avgScanTime: '2m 34s',
    favoriteTarget: 'example.com',
    scansThisMonth: 23,
    streak: 15 // jours consécutifs
  }
};

const ACHIEVEMENTS = [
  {
    id: 'first_scan',
    name: 'First Blood',
    description: 'Complete your first scan',
    icon: '🎯',
    unlocked: true,
    unlockedDate: 'Jan 15, 2026',
    rarity: 'COMMON',
    points: 10
  },
  {
    id: 'scan_10',
    name: 'Scanner Apprentice',
    description: 'Complete 10 scans',
    icon: '📡',
    unlocked: true,
    unlockedDate: 'Jan 20, 2026',
    rarity: 'COMMON',
    points: 25
  },
  {
    id: 'vuln_100',
    name: 'Bug Hunter',
    description: 'Find 100 vulnerabilities',
    icon: '🐛',
    unlocked: true,
    unlockedDate: 'Feb 5, 2026',
    rarity: 'UNCOMMON',
    points: 50
  },
  {
    id: 'critical_vuln',
    name: 'Critical Eye',
    description: 'Discover a CRITICAL vulnerability',
    icon: '🔴',
    unlocked: true,
    unlockedDate: 'Feb 12, 2026',
    rarity: 'RARE',
    points: 100
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: '7-day scanning streak',
    icon: '🔥',
    unlocked: true,
    unlockedDate: 'Feb 18, 2026',
    rarity: 'UNCOMMON',
    points: 75
  },
  {
    id: 'streak_30',
    name: 'Month Master',
    description: '30-day scanning streak',
    icon: '⚡',
    unlocked: false,
    rarity: 'EPIC',
    points: 250
  },
  {
    id: 'perfect_scan',
    name: 'Flawless Victory',
    description: 'Find all vulnerabilities in one scan',
    icon: '💎',
    unlocked: false,
    rarity: 'EPIC',
    points: 200
  },
  {
    id: 'top_10',
    name: 'Elite 10',
    description: 'Reach top 10 on leaderboard',
    icon: '👑',
    unlocked: false,
    rarity: 'LEGENDARY',
    points: 500
  },
  {
    id: 'pentester_pro',
    name: 'Pentester Pro',
    description: 'Complete 500 scans',
    icon: '🛡️',
    unlocked: false,
    rarity: 'LEGENDARY',
    points: 1000
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'activity'>('overview');

  const xpPercentage = (MOCK_USER.currentXP / MOCK_USER.nextLevelXP) * 100;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'COMMON': return 'text-gray-400';
      case 'UNCOMMON': return 'text-green-400';
      case 'RARE': return 'text-blue-400';
      case 'EPIC': return 'text-purple-400';
      case 'LEGENDARY': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="terminal-border-strong bg-gradient-to-r from-purple-900/30 to-black/50 backdrop-blur p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            {/* Avatar & Info */}
            <div className="flex items-center gap-6">
              <div className="text-8xl">{MOCK_USER.avatar}</div>
              <div>
                <h1 className="text-4xl font-bold glow-title mb-2">{MOCK_USER.username}</h1>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm opacity-50">{MOCK_USER.country}</span>
                  <span className="text-sm opacity-50">•</span>
                  <span className="text-sm opacity-50">Joined {MOCK_USER.joinedDate}</span>
                  <span className="text-sm opacity-50">•</span>
                  <span className="text-sm bg-purple-600 px-2 py-1 font-bold">{MOCK_USER.plan}</span>
                </div>
                <p className="text-sm opacity-70 max-w-md">{MOCK_USER.bio}</p>
              </div>
            </div>

            {/* Level & XP */}
            <div className="flex-1 lg:ml-auto">
              <div className="terminal-border bg-black/80 p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm opacity-50">LEVEL</span>
                  <span className="text-4xl font-bold text-purple-400">{MOCK_USER.level}</span>
                </div>
                <div className="mb-2">
                  <div className="h-4 bg-gray-800 terminal-border overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
                      style={{ width: `${xpPercentage}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs opacity-50">
                  <span>{MOCK_USER.currentXP.toLocaleString()} XP</span>
                  <span>{MOCK_USER.nextLevelXP.toLocaleString()} XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="terminal-border bg-black/50 p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{MOCK_USER.totalPoints.toLocaleString()}</div>
              <div className="text-xs opacity-50">TOTAL POINTS</div>
            </div>
            <div className="terminal-border bg-black/50 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">#{MOCK_USER.rank}</div>
              <div className="text-xs opacity-50">GLOBAL RANK</div>
            </div>
            <div className="terminal-border bg-black/50 p-4 text-center">
              <div className="text-3xl font-bold text-orange-400">{MOCK_USER.stats.totalScans}</div>
              <div className="text-xs opacity-50">TOTAL SCANS</div>
            </div>
            <div className="terminal-border bg-black/50 p-4 text-center">
              <div className="text-3xl font-bold text-red-400">{MOCK_USER.stats.vulnsFound}</div>
              <div className="text-xs opacity-50">VULNS FOUND</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {(['overview', 'achievements', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-bold transition-all ${
                activeTab === tab
                  ? 'bg-purple-600 border-2 border-purple-400 glow-accent'
                  : 'bg-black border-2 border-purple-600 hover:border-purple-400'
              }`}
            >
              [{tab.toUpperCase()}]
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Detailed Stats */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6">
              <h2 className="text-2xl font-bold mb-6 glow-header">&gt; DETAILED STATISTICS</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-purple-900">
                  <span className="opacity-70">Scans this month</span>
                  <span className="font-bold text-purple-400">{MOCK_USER.stats.scansThisMonth}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-purple-900">
                  <span className="opacity-70">Current streak</span>
                  <span className="font-bold text-orange-400">{MOCK_USER.stats.streak} days 🔥</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-purple-900">
                  <span className="opacity-70">Avg scan time</span>
                  <span className="font-bold">{MOCK_USER.stats.avgScanTime}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-purple-900">
                  <span className="opacity-70">Favorite target</span>
                  <span className="font-bold text-green-400">{MOCK_USER.stats.favoriteTarget}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4 glow-accent">VULNERABILITY BREAKDOWN</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-400">CRITICAL</span>
                    <span>{MOCK_USER.stats.criticalVulns}</span>
                  </div>
                  <div className="h-2 bg-gray-800 overflow-hidden">
                    <div className="h-full bg-red-600" style={{ width: '10%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-orange-400">HIGH</span>
                    <span>{MOCK_USER.stats.highVulns}</span>
                  </div>
                  <div className="h-2 bg-gray-800 overflow-hidden">
                    <div className="h-full bg-orange-600" style={{ width: '25%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-yellow-400">MEDIUM</span>
                    <span>{MOCK_USER.stats.mediumVulns}</span>
                  </div>
                  <div className="h-2 bg-gray-800 overflow-hidden">
                    <div className="h-full bg-yellow-600" style={{ width: '45%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-400">LOW</span>
                    <span>{MOCK_USER.stats.lowVulns}</span>
                  </div>
                  <div className="h-2 bg-gray-800 overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold glow-header">&gt; RECENT ACHIEVEMENTS</h2>
                <span className="text-sm opacity-50">{unlockedCount}/{ACHIEVEMENTS.length}</span>
              </div>
              <div className="space-y-3">
                {ACHIEVEMENTS.filter(a => a.unlocked).slice(-5).reverse().map((achievement) => (
                  <div key={achievement.id} className="terminal-border bg-purple-900/20 p-4 hover:bg-purple-900/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-bold glow-accent mb-1">{achievement.name}</div>
                        <div className="text-xs opacity-70">{achievement.description}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs font-bold ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </span>
                          <span className="text-xs opacity-50">•</span>
                          <span className="text-xs text-green-400">+{achievement.points} pts</span>
                          <span className="text-xs opacity-50">•</span>
                          <span className="text-xs opacity-50">{achievement.unlockedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/profile?tab=achievements"
                onClick={() => setActiveTab('achievements')}
                className="block mt-4 text-center py-2 border-2 border-purple-600 hover:bg-purple-900/20 transition-all font-bold"
              >
                [VIEW ALL ACHIEVEMENTS]
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <div className="mb-6 text-center">
              <div className="text-6xl font-bold glow-title mb-2">{unlockedCount}/{ACHIEVEMENTS.length}</div>
              <div className="opacity-50">Achievements Unlocked</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACHIEVEMENTS.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`terminal-border p-6 text-center transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-b from-purple-900/30 to-black/50 hover:scale-105'
                      : 'bg-black/50 opacity-50 grayscale'
                  }`}
                >
                  <div className="text-6xl mb-4">{achievement.icon}</div>
                  <h3 className="text-xl font-bold glow-accent mb-2">{achievement.name}</h3>
                  <p className="text-sm opacity-70 mb-4">{achievement.description}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-3 py-1 bg-black/50 ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 bg-green-900/50 text-green-400">
                      +{achievement.points} PTS
                    </span>
                  </div>
                  {achievement.unlocked && achievement.unlockedDate && (
                    <div className="text-xs opacity-50 mt-2">Unlocked {achievement.unlockedDate}</div>
                  )}
                  {!achievement.unlocked && (
                    <div className="text-xs text-gray-500 mt-2">[LOCKED]</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="terminal-border bg-black/80 backdrop-blur p-6">
            <h2 className="text-2xl font-bold mb-6 glow-header">&gt; RECENT ACTIVITY</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-purple-900/10 border-l-4 border-purple-600">
                <span className="text-2xl">🎯</span>
                <div className="flex-1">
                  <div className="font-bold">Completed scan on example.com</div>
                  <div className="text-xs opacity-50">2 hours ago</div>
                </div>
                <span className="text-green-400 font-bold">+25 XP</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-purple-900/10 border-l-4 border-yellow-600">
                <span className="text-2xl">🏆</span>
                <div className="flex-1">
                  <div className="font-bold">Unlocked "Week Warrior" achievement</div>
                  <div className="text-xs opacity-50">1 day ago</div>
                </div>
                <span className="text-yellow-400 font-bold">+75 XP</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-purple-900/10 border-l-4 border-red-600">
                <span className="text-2xl">🔴</span>
                <div className="flex-1">
                  <div className="font-bold">Found CRITICAL vulnerability</div>
                  <div className="text-xs opacity-50">2 days ago</div>
                </div>
                <span className="text-red-400 font-bold">+100 XP</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
