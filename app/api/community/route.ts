import { NextRequest, NextResponse } from 'next/server';
import { getCommunityPosts, createCommunityPost, likePost } from '@/app/lib/db';

const DEFAULT_USER_ID = 'default_user';

/**
 * GET /api/community
 * Get community posts
 */
export async function GET() {
  try {
    const posts = getCommunityPosts(50);

    return NextResponse.json({
      posts
    });

  } catch (error) {
    console.error('Error fetching community posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/community
 * Create a new community post
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, tags } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'title and content are required' },
        { status: 400 }
      );
    }

    const postId = createCommunityPost(DEFAULT_USER_ID, title, content, tags || []);

    return NextResponse.json({
      success: true,
      post_id: postId,
      message: 'Post created successfully'
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/community
 * Like a post
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { post_id, action } = body;

    if (!post_id || action !== 'like') {
      return NextResponse.json(
        { error: 'post_id and action=like are required' },
        { status: 400 }
      );
    }

    likePost(post_id);

    return NextResponse.json({
      success: true,
      message: 'Post liked successfully'
    });

  } catch (error) {
    console.error('Error liking post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
