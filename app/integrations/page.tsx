'use client';

import { useState } from 'react';

// Mock integrations data
const AVAILABLE_INTEGRATIONS = [
  {
    id: 'slack',
    name: 'Slack',
    icon: '💬',
    description: 'Get scan notifications and alerts in your Slack channels',
    category: 'Communication',
    connected: true,
    config: {
      workspace: 'TEKTON Security',
      channel: '#security-alerts'
    }
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '🎮',
    description: 'Receive real-time scan updates in your Discord server',
    category: 'Communication',
    connected: true,
    config: {
      server: 'TEKTON Community',
      channel: '#scan-results'
    }
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    description: 'Automatically create issues when vulnerabilities are found',
    category: 'Development',
    connected: false,
    config: null
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    icon: '🦊',
    description: 'Integrate scans into your GitLab CI/CD pipelines',
    category: 'Development',
    connected: false,
    config: null
  },
  {
    id: 'jira',
    name: 'Jira',
    icon: '📋',
    description: 'Create tickets for security issues automatically',
    category: 'Project Management',
    connected: false,
    config: null
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    icon: '⚙️',
    description: 'Run security scans as part of your Jenkins builds',
    category: 'CI/CD',
    connected: false,
    config: null
  },
  {
    id: 'circleci',
    name: 'CircleCI',
    icon: '🔄',
    description: 'Add TEKTON scans to your CircleCI workflows',
    category: 'CI/CD',
    connected: false,
    config: null
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    icon: '🔗',
    description: 'Send scan events to custom endpoints',
    category: 'Custom',
    connected: true,
    config: {
      endpoints: 2
    }
  }
];

const WEBHOOK_ENDPOINTS = [
  {
    id: '1',
    name: 'Production Alerts',
    url: 'https://api.myapp.com/tekton/webhooks',
    events: ['scan.completed', 'vulnerability.critical'],
    status: 'active',
    lastTriggered: '2 hours ago'
  },
  {
    id: '2',
    name: 'Slack Custom Integration',
    url: 'https://hooks.slack.com/services/T00/B00/XXX',
    events: ['scan.completed', 'scan.failed'],
    status: 'active',
    lastTriggered: '1 day ago'
  }
];

const AVAILABLE_EVENTS = [
  'scan.started',
  'scan.completed',
  'scan.failed',
  'vulnerability.critical',
  'vulnerability.high',
  'vulnerability.medium',
  'vulnerability.low',
  'tokens.low',
  'tokens.depleted'
];

export default function IntegrationsPage() {
  const [filter, setFilter] = useState<'all' | 'connected' | 'available'>('all');
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const filteredIntegrations = AVAILABLE_INTEGRATIONS.filter(integration => {
    if (filter === 'connected') return integration.connected;
    if (filter === 'available') return !integration.connected;
    return true;
  });

  const connectedCount = AVAILABLE_INTEGRATIONS.filter(i => i.connected).length;

  const handleConnect = (integrationId: string) => {
    setSelectedIntegration(integrationId);
    setShowConnectModal(true);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 glow-title">[INTEGRATIONS]</h1>
          <p className="text-xl opacity-70 mb-2">Connect TEKTON with your favorite tools and platforms</p>
          <p className="text-sm opacity-50">Automate your security workflow with powerful integrations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="terminal-border bg-black/80 backdrop-blur p-6">
            <div className="text-xs opacity-50 mb-2">CONNECTED</div>
            <div className="text-4xl font-bold text-green-400">{connectedCount}</div>
          </div>
          <div className="terminal-border bg-black/80 backdrop-blur p-6">
            <div className="text-xs opacity-50 mb-2">AVAILABLE</div>
            <div className="text-4xl font-bold text-purple-400">{AVAILABLE_INTEGRATIONS.length}</div>
          </div>
          <div className="terminal-border bg-black/80 backdrop-blur p-6">
            <div className="text-xs opacity-50 mb-2">WEBHOOKS ACTIVE</div>
            <div className="text-4xl font-bold text-yellow-400">{WEBHOOK_ENDPOINTS.length}</div>
          </div>
        </div>

        {/* Filter */}
        <div className="terminal-border bg-black/80 backdrop-blur p-4 mb-8">
          <div className="flex gap-2">
            {(['all', 'connected', 'available'] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`flex-1 py-2 font-bold transition-all ${
                  filter === filterOption
                    ? 'bg-purple-600 border-2 border-purple-400'
                    : 'bg-black border-2 border-purple-600 hover:border-purple-400'
                }`}
              >
                [{filterOption.toUpperCase()}]
              </button>
            ))}
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredIntegrations.map((integration) => (
            <div
              key={integration.id}
              className={`terminal-border p-6 transition-all ${
                integration.connected
                  ? 'bg-green-900/20 hover:bg-green-900/30'
                  : 'bg-black/80 backdrop-blur hover:bg-purple-900/20'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{integration.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold glow-accent">{integration.name}</h3>
                    <div className="text-xs opacity-50">{integration.category}</div>
                  </div>
                </div>
                {integration.connected && (
                  <span className="text-xs px-2 py-1 bg-green-600 border border-green-400 font-bold">
                    ACTIVE
                  </span>
                )}
              </div>

              <p className="text-sm opacity-70 mb-4">{integration.description}</p>

              {integration.connected && integration.config && (
                <div className="mb-4 p-3 bg-black/50 border border-purple-600">
                  <div className="text-xs space-y-1">
                    {Object.entries(integration.config).map(([key, value]) => (
                      <div key={key}>
                        <span className="opacity-50">{key}:</span>{' '}
                        <span className="text-purple-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {integration.connected ? (
                  <>
                    <button className="flex-1 py-2 bg-yellow-600 hover:bg-yellow-500 border border-yellow-400 font-bold text-xs transition-all">
                      [CONFIGURE]
                    </button>
                    <button className="flex-1 py-2 bg-red-600 hover:bg-red-500 border border-red-400 font-bold text-xs transition-all">
                      [DISCONNECT]
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleConnect(integration.id)}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold text-sm transition-all"
                  >
                    [CONNECT]
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Webhooks Section */}
        <div className="terminal-border bg-black/80 backdrop-blur mb-8">
          <div className="bg-purple-900/30 px-6 py-4 border-b-2 border-purple-600 flex justify-between items-center">
            <h2 className="text-2xl font-bold glow-header">WEBHOOK ENDPOINTS</h2>
            <button
              onClick={() => setShowWebhookModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all"
            >
              [+ ADD WEBHOOK]
            </button>
          </div>

          <div className="p-6 space-y-4">
            {WEBHOOK_ENDPOINTS.map((webhook) => (
              <div key={webhook.id} className="terminal-border bg-purple-900/10 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold glow-accent">{webhook.name}</h3>
                      <span className={`text-xs px-3 py-1 font-bold ${
                        webhook.status === 'active'
                          ? 'bg-green-600 border border-green-400'
                          : 'bg-gray-600 border border-gray-400'
                      }`}>
                        {webhook.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="font-mono text-sm opacity-70 mb-2">{webhook.url}</div>
                    <div className="text-xs opacity-50">Last triggered: {webhook.lastTriggered}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 bg-purple-600 hover:bg-purple-500 border border-purple-400 font-bold text-xs transition-all">
                      [TEST]
                    </button>
                    <button className="px-3 py-2 bg-yellow-600 hover:bg-yellow-500 border border-yellow-400 font-bold text-xs transition-all">
                      [EDIT]
                    </button>
                    <button className="px-3 py-2 bg-red-600 hover:bg-red-500 border border-red-400 font-bold text-xs transition-all">
                      [DELETE]
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-600">
                  <div className="text-xs opacity-50 mb-2">SUBSCRIBED EVENTS:</div>
                  <div className="flex flex-wrap gap-2">
                    {webhook.events.map((event) => (
                      <span
                        key={event}
                        className="text-xs px-2 py-1 bg-purple-600/30 border border-purple-600 font-mono"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CI/CD Integration Guide */}
        <div className="terminal-border bg-black/80 backdrop-blur">
          <div className="bg-purple-900/30 px-6 py-4 border-b-2 border-purple-600">
            <h2 className="text-2xl font-bold glow-header">CI/CD INTEGRATION EXAMPLE</h2>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-purple-400 mb-2">GitHub Actions</h3>
              <pre className="bg-black border-2 border-purple-600 p-4 overflow-x-auto font-mono text-sm text-green-400">
{`name: TEKTON Security Scan

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run TEKTON scan
        run: |
          curl -X POST https://api.tekton.io/v1/scan \\
            -H "Authorization: Bearer \${{ secrets.TEKTON_API_KEY }}" \\
            -H "Content-Type: application/json" \\
            -d '{
              "url": "https://staging.myapp.com",
              "scan_types": ["port", "xss", "sqli"],
              "notify": true
            }'`}
              </pre>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-purple-400 mb-2">GitLab CI/CD</h3>
              <pre className="bg-black border-2 border-purple-600 p-4 overflow-x-auto font-mono text-sm text-green-400">
{`security_scan:
  stage: security
  script:
    - curl -X POST https://api.tekton.io/v1/scan
      -H "Authorization: Bearer $TEKTON_API_KEY"
      -H "Content-Type: application/json"
      -d '{
        "url": "https://staging.myapp.com",
        "scan_types": ["port", "xss", "sqli"],
        "notify": true
      }'
  only:
    - main
    - develop`}
              </pre>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="terminal-border bg-purple-900/20 backdrop-blur p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-bold mb-2 glow-accent">AUTOMATION</h3>
            <p className="text-sm opacity-70">
              Automate security scans in your CI/CD pipeline and get instant feedback
            </p>
          </div>
          <div className="terminal-border bg-purple-900/20 backdrop-blur p-6">
            <div className="text-3xl mb-3">🔔</div>
            <h3 className="text-lg font-bold mb-2 glow-accent">REAL-TIME ALERTS</h3>
            <p className="text-sm opacity-70">
              Get notified immediately when critical vulnerabilities are detected
            </p>
          </div>
          <div className="terminal-border bg-purple-900/20 backdrop-blur p-6">
            <div className="text-3xl mb-3">🔗</div>
            <h3 className="text-lg font-bold mb-2 glow-accent">SEAMLESS WORKFLOW</h3>
            <p className="text-sm opacity-70">
              Integrate security into your existing tools and processes effortlessly
            </p>
          </div>
        </div>
      </div>

      {/* Add Webhook Modal */}
      {showWebhookModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="terminal-border-strong bg-black p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 glow-header">[CREATE WEBHOOK]</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm opacity-50 mb-2">WEBHOOK NAME</label>
                <input
                  type="text"
                  placeholder="e.g., Production Alerts"
                  className="w-full bg-black border-2 border-purple-600 px-4 py-3 font-mono focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm opacity-50 mb-2">ENDPOINT URL</label>
                <input
                  type="url"
                  placeholder="https://your-api.com/webhooks/tekton"
                  className="w-full bg-black border-2 border-purple-600 px-4 py-3 font-mono focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm opacity-50 mb-2">SELECT EVENTS</label>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 bg-black/50 border border-purple-600">
                  {AVAILABLE_EVENTS.map((event) => (
                    <label key={event} className="flex items-center gap-2 p-2 hover:bg-purple-900/20 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-xs font-mono">{event}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm opacity-50 mb-2">SECRET (OPTIONAL)</label>
                <input
                  type="password"
                  placeholder="Webhook signing secret"
                  className="w-full bg-black border-2 border-purple-600 px-4 py-3 font-mono focus:outline-none focus:border-purple-400"
                />
                <div className="text-xs opacity-50 mt-1">
                  Used to verify webhook authenticity
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all">
                [CREATE WEBHOOK]
              </button>
              <button
                onClick={() => setShowWebhookModal(false)}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 border-2 border-red-400 font-bold transition-all"
              >
                [CANCEL]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connect Integration Modal */}
      {showConnectModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="terminal-border-strong bg-black p-8 max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 glow-header">
              [CONNECT {AVAILABLE_INTEGRATIONS.find(i => i.id === selectedIntegration)?.name.toUpperCase()}]
            </h2>

            <div className="mb-6 terminal-border bg-purple-900/20 p-4">
              <div className="text-sm opacity-70">
                You will be redirected to authorize TEKTON to access your{' '}
                {AVAILABLE_INTEGRATIONS.find(i => i.id === selectedIntegration)?.name} account.
              </div>
            </div>

            <div className="mb-6 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Read and write access</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Send notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Create issues/tickets</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all">
                [AUTHORIZE]
              </button>
              <button
                onClick={() => {
                  setShowConnectModal(false);
                  setSelectedIntegration(null);
                }}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 border-2 border-red-400 font-bold transition-all"
              >
                [CANCEL]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
