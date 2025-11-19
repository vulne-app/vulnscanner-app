'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";

export default function Navigation() {
  const pathname = usePathname();
  const mockTokens = 327;

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
              width={120}
              height={120}
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
            <div className="terminal-border bg-black/50 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-50">TOKENS:</span>
                <span className="text-lg font-bold glow-green">{mockTokens}</span>
                <span className="text-purple-400">⚡</span>
              </div>
            </div>
            <Link
              href="/tokens"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all"
            >
              [BUY MORE]
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex justify-center gap-4 mt-4 pt-4 border-t border-purple-600">
          <Link href="/scan" className={`text-sm ${isActive('/scan')}`}>
            [SCAN]
          </Link>
          <Link href="/pricing" className={`text-sm ${isActive('/pricing')}`}>
            [PRICING]
          </Link>
          <Link href="/dashboard" className={`text-sm ${isActive('/dashboard')}`}>
            [DASHBOARD]
          </Link>
        </div>
      </div>
    </nav>
  );
}
