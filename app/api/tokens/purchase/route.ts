import { NextRequest, NextResponse } from 'next/server';
import { createTokenPurchase, getUser } from '@/app/lib/db';

const DEFAULT_USER_ID = 'default_user';

/**
 * POST /api/tokens/purchase
 * Purchase tokens (simulated - no real payment)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { package_id } = body;

    // Define token packages
    const packages: any = {
      'starter': { tokens: 100, price: 9.99 },
      'pro': { tokens: 500, price: 39.99 },
      'business': { tokens: 1500, price: 99.99 },
      'enterprise': { tokens: 5000, price: 299.99 }
    };

    if (!package_id || !packages[package_id]) {
      return NextResponse.json(
        { error: 'Invalid package_id' },
        { status: 400 }
      );
    }

    const pkg = packages[package_id];

    // Simulate purchase (in real app, this would call Stripe)
    const purchaseId = createTokenPurchase(
      DEFAULT_USER_ID,
      1, // amount of packages
      pkg.tokens,
      pkg.price,
      'simulated'
    );

    const user = getUser(DEFAULT_USER_ID) as any;

    return NextResponse.json({
      success: true,
      purchase_id: purchaseId,
      tokens_added: pkg.tokens,
      new_balance: user.tokens,
      message: `Successfully purchased ${pkg.tokens} tokens!`
    });

  } catch (error) {
    console.error('Error purchasing tokens:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
