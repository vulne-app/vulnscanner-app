'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import TokenDisplay from '@/components/TokenDisplay';
import ScanHistoryItem from '@/components/ScanHistoryItem';

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30 DAYS');
  const [loading, setLoading] = useState(true);

  // User data state
  const [userData, setUserData] = useState<any>({
    level: 1,
    current_xp: 0,
    next_level_xp: 10000,
    rank: 0,
    total_points: 0,
    streak: 0,
    tokens: 50,
    plan: 'FREE',
    stats: {
      total_scans: 0,
      completed_scans: 0,
      achievements_unlocked: 0,
      total_achievements: 0
    }
  });

  const [achievements, setAchievements] = useState<any[]>([]);
  const [recentScans, setRecentScans] = useState<any[]>([]);

  // Load user data on mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load user data
      const userRes = await fetch('/api/user');
      if (userRes.ok) {
        const data = await userRes.json();
        setUserData({
          level: data.level || 1,
          current_xp: data.current_xp || 0,
          next_level_xp: data.next_level_xp || 10000,
          rank: data.rank || 0,
          total_points: data.total_points || 0,
          streak: data.streak || 0,
          tokens: data.tokens || 50,
          plan: data.plan || 'FREE',
          stats: data.stats || {
            total_scans: 0,
            completed_scans: 0,
            achievements_unlocked: 0,
            total_achievements: 0
          }
        });
      }

      // Load achievements
      const achievementsRes = await fetch('/api/achievements');
      if (achievementsRes.ok) {
        const data = await achievementsRes.json();
        // Get only unlocked achievements, sorted by unlock date
        const unlocked = data
          .filter((a: any) => a.unlocked_at)
          .sort((a: any, b: any) => b.unlocked_at - a.unlocked_at)
          .slice(0, 2); // Only show 2 most recent
        setAchievements(unlocked);
      }

      // Load recent scans (mock for now, will use real API later)
      // TODO: Add /api/scans endpoint
      setRecentScans([]);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const xpPercentage = (userData.current_xp / userData.next_level_xp) * 100;
  const tokensLimit = userData.plan === 'PRO' ? 500 : userData.plan === 'PREMIUM' ? 1000 : 100;

  const getBadgeFromLevel = (level: number): string => {
    if (level >= 50) return 'LEGEND';
    if (level >= 40) return 'MASTER';
    if (level >= 30) return 'EXPERT';
    if (level >= 20) return 'ADVANCED';
    if (level >= 10) return 'INTERMEDIATE';
    return 'BEGINNER';
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'COMMON': return 'bg-gray-600 border-gray-400';
      case 'UNCOMMON': return 'bg-green-600 border-green-400';
      case 'RARE': return 'bg-blue-600 border-blue-400';
      case 'EPIC': return 'bg-purple-600 border-purple-400';
      case 'LEGENDARY': return 'bg-yellow-600 border-yellow-400';
      default: return 'bg-gray-600 border-gray-400';
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 glow-purple">[DASHBOARD]</h1>
          <p className="text-sm opacity-50">Monitor your security scanning activity</p>
        </div>

        {/* Gamification Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Level & XP Card */}
            <div className="terminal-border-strong bg-gradient-to-br from-purple-900/30 to-black/80 backdrop-blur p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs opacity-50 mb-1">YOUR LEVEL</div>
                  <div className="text-5xl font-bold glow-title">{userData.level}</div>
                </div>
                <div className="text-6xl">⚡</div>
              </div>

              {/* XP Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="opacity-50">XP</span>
                  <span className="text-purple-400">{userData.current_xp} / {userData.next_level_xp}</span>
                </div>
                <div className="h-3 bg-black border-2 border-purple-600 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
                <div className="text-xs text-center text-purple-400 mt-1">
                  {Math.round(xpPercentage)}% to Level {userData.level + 1}
                </div>
              </div>

              <Link
                href="/profile"
                className="block w-full py-2 mt-4 text-center bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all text-sm"
              >
                [VIEW PROFILE]
              </Link>
            </div>

            {/* Leaderboard Rank Card */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs opacity-50 mb-1">GLOBAL RANK</div>
                  <div className="text-4xl font-bold text-yellow-400">#{userData.rank || 'N/A'}</div>
                </div>
                <div className="text-5xl">🏆</div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="opacity-50">Total Points:</span>
                  <span className="text-green-400 font-bold">{userData.total_points.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-50">Current Badge:</span>
                  <span className="text-purple-400 font-bold">{getBadgeFromLevel(userData.level)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-50">Streak:</span>
                  <span className="text-orange-400 font-bold">{userData.streak} days 🔥</span>
                </div>
              </div>

              <Link
                href="/leaderboard"
                className="block w-full py-2 text-center bg-yellow-600 hover:bg-yellow-500 border-2 border-yellow-400 font-bold transition-all text-sm"
              >
                [VIEW LEADERBOARD]
              </Link>
            </div>

            {/* Recent Achievements Card */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6">
              <h3 className="text-lg font-bold glow-accent mb-4">RECENT ACHIEVEMENTS</h3>

              <div className="space-y-3 mb-4">
                {achievements.length > 0 ? (
                  achievements.map((achievement) => (
                    <div key={achievement.achievement_id} className="terminal-border bg-purple-900/10 p-3">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-3xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <div className="font-bold text-sm glow-accent">{achievement.name}</div>
                          <div className="text-xs opacity-50">
                            {new Date(achievement.unlocked_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 font-bold ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm opacity-50 py-4">
                    No achievements unlocked yet. Start scanning to earn achievements!
                  </div>
                )}
              </div>

              <Link
                href="/profile"
                className="block w-full py-2 text-center bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all text-sm"
              >
                [VIEW ALL ACHIEVEMENTS]
              </Link>
            </div>
          </div>
        </section>

        {/* Account Overview Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 glow-purple">&gt; ACCOUNT OVERVIEW</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Plan */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6">
              <h3 className="text-sm opacity-50 mb-2">CURRENT PLAN</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-bold glow-purple">{userData.plan}</span>
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
                current={userData.tokens}
                limit={tokensLimit}
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
              <div className="text-5xl font-bold glow-green mb-2">{userData.stats.total_scans}</div>
              <div className="text-sm opacity-50">TOTAL SCANS</div>
              <div className="text-xs text-green-400 mt-1">{userData.stats.completed_scans} completed</div>
            </div>

            {/* Achievements */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6 text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">{userData.stats.achievements_unlocked}</div>
              <div className="text-sm opacity-50">ACHIEVEMENTS UNLOCKED</div>
              <div className="text-xs text-purple-400 mt-1">{userData.stats.total_achievements} total available</div>
            </div>

            {/* Total Points */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6 text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">{userData.total_points}</div>
              <div className="text-sm opacity-50">TOTAL POINTS</div>
              <div className="text-xs text-yellow-400 mt-1">Rank #{userData.rank || 'N/A'}</div>
            </div>

            {/* Tokens */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6 text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">{userData.tokens}</div>
              <div className="text-sm opacity-50">AVAILABLE TOKENS</div>
              <div className="text-xs text-green-400 mt-1">{tokensLimit - userData.tokens} used</div>
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
            {recentScans.length > 0 ? (
              recentScans.map((scan) => (
                <ScanHistoryItem key={scan.id} {...scan} />
              ))
            ) : (
              <div className="terminal-border bg-black/80 backdrop-blur p-8 text-center">
                <p className="text-sm opacity-50 mb-4">No scans yet. Start your first security scan!</p>
                <Link
                  href="/scan"
                  className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all"
                >
                  [START YOUR FIRST SCAN]
                </Link>
              </div>
            )}
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
              <h3 className="text-xl font-bold glow-purple mb-2">ACCOUNT SUMMARY</h3>
              <p className="text-sm opacity-70">
                Level <span className="text-green-400 font-bold">{userData.level}</span> • {userData.total_points.toLocaleString()} points
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{userData.tokens}</div>
                <div className="text-xs opacity-50">tokens left</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{tokensLimit - userData.tokens}</div>
                <div className="text-xs opacity-50">tokens used</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
