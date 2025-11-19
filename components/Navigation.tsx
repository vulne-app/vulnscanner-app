'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const mockTokens = 327;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTokenTooltip, setShowTokenTooltip] = useState(false);

  const isActive = (path: string) => {
    return pathname === path ? 'text-purple-400 glow-purple' : 'text-gray-400 hover:text-purple-300';
  };

  return (
    <nav className="sticky top-0 z-50 terminal-border bg-black/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src='/logo.png'
              alt='TEKTON Logo'
              width={80}
              height={80}
              className='object-contain'
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/scan" className={`font-bold transition-colors ${isActive('/scan')}`}>
              SCAN
            </Link>
            <Link href="/pricing" className={`font-bold transition-colors ${isActive('/pricing')}`}>
              PRICING
            </Link>
            <Link href="/dashboard" className={`font-bold transition-colors ${isActive('/dashboard')}`}>
              DASHBOARD
            </Link>
          </div>

          {/* Token Display */}
          <div className="flex items-center gap-7">
            <div
              className="relative"
              onMouseEnter={() => setShowTokenTooltip(true)}
              onMouseLeave={() => setShowTokenTooltip(false)}
            >
              <div className="terminal-border bg-black/50 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-50">TOKENS:</span>
                  <span className={`text-lg font-bold ${
                    mockTokens > 200 ? 'glow-green' :
                    mockTokens > 50 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {mockTokens}
                  </span>
                  <span className="text-purple-400">[⚡]</span>
                </div>
              </div>

              {/* Tooltip */}
              {showTokenTooltip && (
                <div className="absolute top-full mt-2 right-0 w-64 terminal-border bg-black p-4 z-50">
                  <div className="text-xs space-y-2">
                    <div className="text-purple-400 font-bold mb-2">SCAN COSTS:</div>
                    <div>• Port Scan: 10 tokens</div>
                    <div>• Tech Detection: 15 tokens</div>
                    <div>• XSS Scanner: 30 tokens</div>
                    <div>• SQLi Scanner: 45 tokens</div>
                    <div className="border-t border-purple-600 mt-2 pt-2">
                      <div className="text-purple-400">Your plan: 500 tokens/month</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/tokens"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all"
            >
              [BUY MORE]
            </Link>
          </div>
        </div>

        {/* Hamburger Button - Mobile Only */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden absolute top-4 right-4 z-50 p-2 terminal-border bg-black"
        >
          <div className="flex flex-col gap-1">
            <span className="block w-6 h-0.5 bg-purple-400"></span>
            <span className="block w-6 h-0.5 bg-purple-400"></span>
            <span className="block w-6 h-0.5 bg-purple-400"></span>
          </div>
        </button>

        {/* Mobile Menu - Slide Down */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md terminal-border animate-slideDown">
            <div className="flex flex-col gap-4 p-4">
              <Link href="/scan" onClick={() => setMobileMenuOpen(false)} className={`text-sm ${isActive('/scan')}`}>
                [SCAN]
              </Link>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className={`text-sm ${isActive('/pricing')}`}>
                [PRICING]
              </Link>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className={`text-sm ${isActive('/dashboard')}`}>
                [DASHBOARD]
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
