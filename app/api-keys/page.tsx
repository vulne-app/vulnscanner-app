'use client';

import { useState } from 'react';

// Mock API keys data
const MOCK_API_KEYS = [
  {
    id: '1',
    name: 'Production API',
    key: 'tk_live_a8f3d9c2b1e4f6g7h8i9j0k1',
    created: '2026-01-15',
    lastUsed: '2 hours ago',
    requests: 15234,
    status: 'active'
  },
  {
    id: '2',
    name: 'Development Testing',
    key: 'tk_test_x9y8z7w6v5u4t3s2r1q0p9o8',
    created: '2026-02-20',
    lastUsed: '5 minutes ago',
    requests: 8921,
    status: 'active'
  },
  {
    id: '3',
    name: 'CI/CD Pipeline',
    key: 'tk_live_m7n6o5p4q3r2s1t0u9v8w7x6',
    created: '2025-12-10',
    lastUsed: 'Never',
    requests: 0,
    status: 'inactive'
  }
];

const CODE_EXAMPLES = {
  curl: `curl -X POST https://api.tekton.io/v1/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "scan_types": ["port", "xss", "sqli"]
  }'`,
  python: `import requests

url = "https://api.tekton.io/v1/scan"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "url": "https://example.com",
    "scan_types": ["port", "xss", "sqli"]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
  javascript: `const response = await fetch('https://api.tekton.io/v1/scan', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com',
    scan_types: ['port', 'xss', 'sqli']
  })
});

const data = await response.json();
console.log(data);`,
  php: `<?php
$url = 'https://api.tekton.io/v1/scan';
$headers = [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
];
$data = json_encode([
    'url' => 'https://example.com',
    'scan_types' => ['port', 'xss', 'sqli']
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>`
};

export default function ApiKeysPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'curl' | 'python' | 'javascript' | 'php'>('curl');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCreateKey = () => {
    const newKey = `tk_live_${Math.random().toString(36).substring(2, 26)}`;
    setGeneratedKey(newKey);
    setShowCreateModal(false);
    setShowKeyModal(true);
  };

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskKey = (key: string) => {
    return key.substring(0, 12) + '•'.repeat(20);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 glow-title">[API KEYS]</h1>
          <p className="text-xl opacity-70 mb-2">Manage your API access and integration keys</p>
          <p className="text-sm opacity-50">Use these keys to integrate TEKTON scans into your applications</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="terminal-border bg-black/80 backdrop-blur p-6">
            <div className="text-xs opacity-50 mb-2">TOTAL KEYS</div>
            <div className="text-4xl font-bold glow-accent">3</div>
          </div>
          <div className="terminal-border bg-black/80 backdrop-blur p-6">
            <div className="text-xs opacity-50 mb-2">ACTIVE KEYS</div>
            <div className="text-4xl font-bold text-green-400">2</div>
          </div>
          <div className="terminal-border bg-black/80 backdrop-blur p-6">
            <div className="text-xs opacity-50 mb-2">TOTAL REQUESTS</div>
            <div className="text-4xl font-bold text-purple-400">24,155</div>
          </div>
          <div className="terminal-border bg-black/80 backdrop-blur p-6">
            <div className="text-xs opacity-50 mb-2">RATE LIMIT</div>
            <div className="text-4xl font-bold text-yellow-400">1000/h</div>
          </div>
        </div>

        {/* API Keys List */}
        <div className="terminal-border bg-black/80 backdrop-blur mb-8">
          <div className="bg-purple-900/30 px-6 py-4 border-b-2 border-purple-600 flex justify-between items-center">
            <h2 className="text-2xl font-bold glow-header">YOUR API KEYS</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all"
            >
              [+ CREATE NEW KEY]
            </button>
          </div>

          <div className="p-6 space-y-4">
            {MOCK_API_KEYS.map((apiKey) => (
              <div
                key={apiKey.id}
                className="terminal-border bg-purple-900/10 p-6 hover:bg-purple-900/20 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold glow-accent">{apiKey.name}</h3>
                      <span className={`text-xs px-3 py-1 font-bold ${
                        apiKey.status === 'active'
                          ? 'bg-green-600 border border-green-400'
                          : 'bg-gray-600 border border-gray-400'
                      }`}>
                        {apiKey.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="font-mono text-sm opacity-70 mb-2">{maskKey(apiKey.key)}</div>
                    <div className="text-xs opacity-50">
                      Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-500 border border-purple-400 font-bold text-xs transition-all"
                    >
                      {copiedKey === apiKey.id ? '[✓ COPIED]' : '[COPY]'}
                    </button>
                    <button className="px-3 py-2 bg-yellow-600 hover:bg-yellow-500 border border-yellow-400 font-bold text-xs transition-all">
                      [REGENERATE]
                    </button>
                    <button className="px-3 py-2 bg-red-600 hover:bg-red-500 border border-red-400 font-bold text-xs transition-all">
                      [REVOKE]
                    </button>
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-purple-600">
                  <div>
                    <div className="text-xs opacity-50">TOTAL REQUESTS</div>
                    <div className="text-lg font-bold text-green-400">{apiKey.requests.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-50">SUCCESS RATE</div>
                    <div className="text-lg font-bold text-green-400">99.8%</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-50">AVG RESPONSE</div>
                    <div className="text-lg font-bold text-purple-400">245ms</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <div className="terminal-border bg-black/80 backdrop-blur mb-8">
          <div className="bg-purple-900/30 px-6 py-4 border-b-2 border-purple-600">
            <h2 className="text-2xl font-bold glow-header">CODE EXAMPLES</h2>
          </div>

          <div className="p-6">
            {/* Language Selector */}
            <div className="flex gap-2 mb-4">
              {(['curl', 'python', 'javascript', 'php'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-2 font-bold transition-all ${
                    selectedLanguage === lang
                      ? 'bg-purple-600 border-2 border-purple-400'
                      : 'bg-black border-2 border-purple-600 hover:border-purple-400'
                  }`}
                >
                  [{lang.toUpperCase()}]
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="relative">
              <button
                onClick={() => copyToClipboard(CODE_EXAMPLES[selectedLanguage], 'code-example')}
                className="absolute top-4 right-4 px-3 py-1 bg-purple-600 hover:bg-purple-500 border border-purple-400 font-bold text-xs transition-all z-10"
              >
                {copiedKey === 'code-example' ? '[✓ COPIED]' : '[COPY]'}
              </button>
              <pre className="bg-black border-2 border-purple-600 p-6 overflow-x-auto font-mono text-sm text-green-400">
                {CODE_EXAMPLES[selectedLanguage]}
              </pre>
            </div>
          </div>
        </div>

        {/* API Documentation */}
        <div className="terminal-border bg-black/80 backdrop-blur">
          <div className="bg-purple-900/30 px-6 py-4 border-b-2 border-purple-600">
            <h2 className="text-2xl font-bold glow-header">API ENDPOINTS</h2>
          </div>

          <div className="p-6 space-y-4">
            {[
              {
                method: 'POST',
                endpoint: '/v1/scan',
                description: 'Initiate a new vulnerability scan',
                color: 'text-green-400'
              },
              {
                method: 'GET',
                endpoint: '/v1/scan/:id',
                description: 'Retrieve scan results by ID',
                color: 'text-blue-400'
              },
              {
                method: 'GET',
                endpoint: '/v1/scans',
                description: 'List all your scans with pagination',
                color: 'text-blue-400'
              },
              {
                method: 'DELETE',
                endpoint: '/v1/scan/:id',
                description: 'Delete a scan and its results',
                color: 'text-red-400'
              },
              {
                method: 'GET',
                endpoint: '/v1/usage',
                description: 'Get your current token usage and limits',
                color: 'text-blue-400'
              }
            ].map((endpoint, index) => (
              <div key={index} className="terminal-border bg-purple-900/10 p-4 hover:bg-purple-900/20 transition-all">
                <div className="flex items-center gap-4 mb-2">
                  <span className={`font-bold ${endpoint.color} text-sm px-3 py-1 bg-black border border-purple-600`}>
                    {endpoint.method}
                  </span>
                  <code className="font-mono text-purple-400">{endpoint.endpoint}</code>
                </div>
                <p className="text-sm opacity-70 ml-20">{endpoint.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rate Limits Info */}
        <div className="mt-8 terminal-border bg-yellow-900/20 backdrop-blur p-6">
          <h3 className="text-xl font-bold mb-4 text-yellow-400">⚠️ RATE LIMITS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-bold mb-1">FREE TIER</div>
              <div className="opacity-70">100 requests/hour</div>
            </div>
            <div>
              <div className="font-bold mb-1">INDIE/PRO TIER</div>
              <div className="opacity-70">1,000 requests/hour</div>
            </div>
            <div>
              <div className="font-bold mb-1">ENTERPRISE TIER</div>
              <div className="opacity-70">Custom limits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="terminal-border-strong bg-black p-8 max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 glow-header">[CREATE API KEY]</h2>

            <div className="mb-6">
              <label className="block text-sm opacity-50 mb-2">KEY NAME</label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Production API"
                className="w-full bg-black border-2 border-purple-600 px-4 py-3 font-mono focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="mb-6 terminal-border bg-yellow-900/20 p-4">
              <div className="text-yellow-400 font-bold mb-2">⚠️ SECURITY WARNING</div>
              <div className="text-xs opacity-70">
                Make sure to copy your API key now. You won't be able to see it again!
                Store it securely and never commit it to version control.
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCreateKey}
                disabled={!newKeyName}
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                [CREATE]
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewKeyName('');
                }}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 border-2 border-red-400 font-bold transition-all"
              >
                [CANCEL]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Key Generated Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="terminal-border-strong bg-black p-8 max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 glow-header text-green-400">[✓ KEY CREATED]</h2>

            <div className="mb-6">
              <div className="text-sm opacity-50 mb-2">YOUR NEW API KEY</div>
              <div className="bg-black border-2 border-green-600 px-4 py-3 font-mono text-green-400 break-all">
                {generatedKey}
              </div>
            </div>

            <div className="mb-6 terminal-border bg-red-900/20 p-4">
              <div className="text-red-400 font-bold mb-2">⚠️ COPY THIS NOW</div>
              <div className="text-xs opacity-70">
                This is the only time you'll see this key. Make sure to copy it to a secure location.
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  copyToClipboard(generatedKey, 'new-key');
                  setTimeout(() => setShowKeyModal(false), 1500);
                }}
                className="flex-1 py-3 bg-green-600 hover:bg-green-500 border-2 border-green-400 font-bold transition-all"
              >
                {copiedKey === 'new-key' ? '[✓ COPIED]' : '[COPY KEY]'}
              </button>
              <button
                onClick={() => setShowKeyModal(false)}
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all"
              >
                [DONE]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
