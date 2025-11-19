'use client';

interface ScanHistoryItemProps {
  url: string;
  date: string;
  status: 'completed' | 'failed' | 'running';
  vulnerabilities?: {
    high: number;
    medium: number;
    low?: number;
  };
  cost: number;
}

export default function ScanHistoryItem({
  url,
  date,
  status,
  vulnerabilities,
  cost
}: ScanHistoryItemProps) {
  const statusConfig = {
    completed: { color: 'text-green-400', icon: '✓', label: 'COMPLETED' },
    failed: { color: 'text-red-400', icon: '✗', label: 'FAILED' },
    running: { color: 'text-purple-400', icon: '⟳', label: 'RUNNING' }
  };

  const config = statusConfig[status];

  return (
    <div className="terminal-border bg-black/80 backdrop-blur p-4 hover:border-purple-300 transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: URL & Date */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-bold ${config.color}`}>{config.icon}</span>
            <h4 className="font-bold glow-purple">{url}</h4>
          </div>
          <p className="text-xs opacity-50">{date}</p>
        </div>

        {/* Middle: Vulnerabilities */}
        {vulnerabilities && status === 'completed' && (
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-red-400">{vulnerabilities.high}</div>
              <div className="text-xs opacity-50">HIGH</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-400">{vulnerabilities.medium}</div>
              <div className="text-xs opacity-50">MEDIUM</div>
            </div>
            {vulnerabilities.low !== undefined && (
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">{vulnerabilities.low}</div>
                <div className="text-xs opacity-50">LOW</div>
              </div>
            )}
          </div>
        )}

        {/* Right: Cost & Actions */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-sm text-purple-400 font-bold">{cost} ⚡</div>
            <div className="text-xs opacity-50">tokens</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => console.log('TODO: View report')}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-500 border border-purple-400 text-xs font-bold transition-all"
            >
              [VIEW]
            </button>
            <button
              onClick={() => console.log('TODO: Re-scan')}
              className="px-3 py-1 bg-black hover:bg-gray-900 border border-purple-400 text-xs font-bold transition-all"
            >
              [RE-SCAN]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
