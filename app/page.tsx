'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 py-20">
        <div className="max-w-6xl w-full text-center">
          {/* ASCII Art Title */}
          <pre className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 glow-purple leading-tight">
{`╔═══════════════════════════════╗
║                               ║
║         T E K T O N           ║
║                               ║
║    VULNERABILITY SCANNER      ║
║                               ║
╚═══════════════════════════════╝`}
          </pre>

          <p className="text-xl md:text-2xl mb-4 opacity-80">
            Advanced Web Security Testing Platform
          </p>
          <p className="text-sm md:text-base opacity-50 mb-12 max-w-2xl mx-auto">
            Detect vulnerabilities, scan ports, find XSS & SQLi exploits with cutting-edge automated scanning technology
          </p>

          {/* 3D Placeholder */}
          <div className="placeholder-3d-icon bg-purple-900/20 h-64 w-full max-w-2xl mx-auto mb-12 flex items-center justify-center terminal-border">
            <div className="text-center">
              <span className="text-6xl mb-4 block">⚡</span>
              <span className="text-sm opacity-50">[Future 3D Visualization]</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/scan"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold text-lg transition-all glow-purple hover:scale-105"
            >
              [START FREE SCAN]
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-black hover:bg-gray-900 border-2 border-purple-400 font-bold text-lg transition-all hover:scale-105"
            >
              [VIEW PRICING]
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 border-t-2 border-purple-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 glow-purple">
            [CORE FEATURES]
          </h2>
          <p className="text-center opacity-50 mb-12">
            Military-grade scanning technology at your fingertips
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Port Scan */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6 hover:scale-105 transition-all">
              <div className="placeholder-3d-icon bg-purple-900/20 h-32 w-32 mx-auto mb-4 flex items-center justify-center border border-purple-600">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-center mb-3 glow-purple">PORT SCAN</h3>
              <p className="text-sm opacity-70 text-center mb-4">
                Detect open ports and running services on target systems
              </p>
              <ul className="text-xs space-y-2 opacity-70">
                <li>• TCP/UDP scanning</li>
                <li>• Service detection</li>
                <li>• Real-time results</li>
              </ul>
            </div>

            {/* Feature 2: XSS Detection */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6 hover:scale-105 transition-all border-4 border-purple-400">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 px-4 py-1 text-xs font-bold animate-pulse">
                MOST POPULAR
              </div>
              <div className="placeholder-3d-icon bg-purple-900/20 h-32 w-32 mx-auto mb-4 flex items-center justify-center border border-purple-600">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-bold text-center mb-3 glow-purple">XSS DETECTION</h3>
              <p className="text-sm opacity-70 text-center mb-4">
                Find Cross-Site Scripting vulnerabilities automatically
              </p>
              <ul className="text-xs space-y-2 opacity-70">
                <li>• Reflected XSS</li>
                <li>• Stored XSS</li>
                <li>• DOM-based XSS</li>
              </ul>
            </div>

            {/* Feature 3: SQLi Testing */}
            <div className="terminal-border bg-black/80 backdrop-blur p-6 hover:scale-105 transition-all">
              <div className="placeholder-3d-icon bg-purple-900/20 h-32 w-32 mx-auto mb-4 flex items-center justify-center border border-purple-600">
                <span className="text-3xl">💉</span>
              </div>
              <h3 className="text-2xl font-bold text-center mb-3 glow-purple">SQLI TESTING</h3>
              <p className="text-sm opacity-70 text-center mb-4">
                Identify SQL injection points and database vulnerabilities
              </p>
              <ul className="text-xs space-y-2 opacity-70">
                <li>• Error-based SQLi</li>
                <li>• Blind SQLi</li>
                <li>• Time-based detection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-8 border-t-2 border-purple-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 glow-purple">
            [TRUSTED BY SECURITY PROFESSIONALS]
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="terminal-border bg-black/80 backdrop-blur p-8 text-center">
              <div className="text-6xl font-bold glow-green mb-2">10,000+</div>
              <div className="text-sm opacity-50">SCANS PERFORMED</div>
            </div>

            {/* Stat 2 */}
            <div className="terminal-border bg-black/80 backdrop-blur p-8 text-center">
              <div className="text-6xl font-bold glow-green mb-2">50,000+</div>
              <div className="text-sm opacity-50">VULNERABILITIES FOUND</div>
            </div>

            {/* Stat 3 */}
            <div className="terminal-border bg-black/80 backdrop-blur p-8 text-center">
              <div className="text-6xl font-bold glow-green mb-2">99.9%</div>
              <div className="text-sm opacity-50">UPTIME</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-8 border-t-2 border-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-purple">
            READY TO SECURE YOUR INFRASTRUCTURE?
          </h2>
          <p className="text-lg opacity-70 mb-8">
            Start scanning in seconds. No credit card required.
          </p>
          <Link
            href="/scan"
            className="inline-block px-12 py-5 bg-purple-600 hover:bg-purple-500 border-4 border-purple-400 font-bold text-xl transition-all glow-purple hover:scale-110 animate-pulse"
          >
            [LAUNCH SCANNER]
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t-2 border-purple-600 text-center text-xs opacity-50">
        <p>⚠ For educational and authorized security testing only.</p>
        <p className="mt-2">Do not scan websites without explicit permission.</p>
        <p className="mt-4">Master 2 - Cloud Computing Project</p>
      </footer>
    </div>
  );
}
