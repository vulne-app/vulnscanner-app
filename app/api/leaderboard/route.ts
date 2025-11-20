import { NextResponse } from 'next/server';
import { getLeaderboard, getUserRank } from '@/app/lib/db';

const DEFAULT_USER_ID = 'default_user';

/**
 * GET /api/leaderboard
 * Get global leaderboard
 */
export async function GET() {
  try {
    const leaderboard = getLeaderboard(50);
    const userRank = getUserRank(DEFAULT_USER_ID);

    return NextResponse.json({
      leaderboard: leaderboard.map((user: any, index) => ({
        rank: index + 1,
        user_id: user.user_id,
        username: user.username,
        avatar: user.avatar,
        level: user.level,
        total_points: user.total_points,
        country: user.country,
        scans_count: user.scans_count,
        achievements_count: user.achievements_count,
        badge: user.level >= 50 ? 'MASTER' : user.level >= 25 ? 'EXPERT' : user.level >= 10 ? 'PRO' : 'ADVANCED'
      })),
      user_rank: userRank
    });

  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
