'use client';

interface TestOptionProps {
  name: string;
  description: string;
  cost: number;
  selected: boolean;
  locked?: boolean;
  lockReason?: string;
  onToggle: () => void;
}

export default function TestOption({
  name,
  description,
  cost,
  selected,
  locked = false,
  lockReason,
  onToggle
}: TestOptionProps) {
  return (
    <div
      onClick={locked ? undefined : onToggle}
      className={`
        terminal-border bg-black/80 backdrop-blur p-4 relative transition-all cursor-pointer
        ${selected ? 'border-green-400 bg-green-900/20' : 'hover:border-purple-300'}
        ${locked ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {/* Lock Overlay */}
      {locked && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 terminal-border">
          <span className="text-3xl mb-2">🔒</span>
          <span className="text-xs font-bold bg-red-600 px-3 py-1">{lockReason}</span>
        </div>
      )}

      {/* Checkbox */}
      <div className="absolute top-4 right-4">
        <div className={`w-6 h-6 border-2 ${selected ? 'bg-green-400 border-green-400' : 'border-purple-400'} flex items-center justify-center`}>
          {selected && <span className="text-black font-bold">✓</span>}
        </div>
      </div>

      {/* 3D Icon Placeholder */}
      <div className="placeholder-3d-icon bg-purple-900/20 h-20 w-20 mx-auto mb-3 flex items-center justify-center border border-purple-600">
        <span className="text-xs opacity-50">[3D]</span>
      </div>

      {/* Name */}
      <h4 className="text-lg font-bold text-center mb-1 glow-purple">{name}</h4>

      {/* Description */}
      <p className="text-xs opacity-70 text-center mb-3">{description}</p>

      {/* Cost */}
      <div className="text-center">
        <span className="text-purple-400 font-bold">{cost}</span>
        <span className="text-xs opacity-50"> tokens</span>
      </div>
    </div>
  );
}
