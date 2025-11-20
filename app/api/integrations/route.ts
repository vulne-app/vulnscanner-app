import { NextRequest, NextResponse } from 'next/server';
import { getIntegrations, createIntegration, deleteIntegration } from '@/app/lib/db';

const DEFAULT_USER_ID = 'default_user';

/**
 * GET /api/integrations
 * Get all integrations for current user
 */
export async function GET() {
  try {
    const integrations = getIntegrations(DEFAULT_USER_ID);

    return NextResponse.json({
      integrations
    });

  } catch (error) {
    console.error('Error fetching integrations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/integrations
 * Create a new integration
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service, config } = body;

    if (!service || !config) {
      return NextResponse.json(
        { error: 'service and config are required' },
        { status: 400 }
      );
    }

    const integrationId = createIntegration(DEFAULT_USER_ID, service, config);

    return NextResponse.json({
      success: true,
      integration_id: integrationId,
      message: 'Integration created successfully'
    });

  } catch (error) {
    console.error('Error creating integration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/integrations
 * Delete an integration
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { integration_id } = body;

    if (!integration_id) {
      return NextResponse.json(
        { error: 'integration_id is required' },
        { status: 400 }
      );
    }

    deleteIntegration(integration_id, DEFAULT_USER_ID);

    return NextResponse.json({
      success: true,
      message: 'Integration deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting integration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
