import { NextRequest, NextResponse } from 'next/server';
import { getUser, updateUser, getUserRank, getUserAchievements, getAllScans } from '@/app/lib/db';
import { getUserFromSession } from '@/app/lib/auth';

/**
 * GET /api/user
 * Get current user profile with stats
 */
export async function GET() {
  try {
    const userId = await getUserFromSession();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = getUser(userId) as any;

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get additional stats
    const rank = getUserRank(userId);
    const achievements = getUserAchievements(userId);
    const scans = getAllScans(userId);

    const unlockedAchievements = achievements.filter((a: any) => a.unlocked_at);
    const totalAchievements = achievements.length;

    // Calculate next level XP
    const nextLevelXP = 10000; // Fixed XP per level

    return NextResponse.json({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      country: user.country,
      github: user.github,
      twitter: user.twitter,
      level: user.level,
      current_xp: user.current_xp,
      next_level_xp: nextLevelXP,
      total_points: user.total_points,
      tokens: user.tokens,
      plan: user.plan,
      streak: user.streak,
      rank,
      stats: {
        total_scans: scans.length,
        completed_scans: scans.filter((s: any) => s.status === 'completed').length,
        achievements_unlocked: unlockedAchievements.length,
        total_achievements: totalAchievements
      }
    });

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user
 * Update user profile
 */
export async function PATCH(request: NextRequest) {
  try {
    const userId = await getUserFromSession();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const allowedFields = ['username', 'bio', 'country', 'github', 'twitter', 'avatar'];
    const updates: any = {};

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    updateUser(userId, updates);

    const updatedUser = getUser(userId);

    return NextResponse.json({
      success: true,
      user: updatedUser
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
