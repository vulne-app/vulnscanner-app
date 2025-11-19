'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const SplineViewer = dynamic(() => import('@/components/SplineViewer'), {
  ssr: false,
  loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-purple-400 animate-pulse">Loading 3D...</div>
      </div>
  ),
});

export default function LandingPage() {
  return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-8 py-20 relative">
          <div className="max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="space-y-6">
                {/* Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold glow-title">
                  TEKTON
                </h1>

                <p className="text-xl md:text-2xl opacity-80">
                  Advanced Web Security Testing Platform
                </p>

                <p className="text-sm md:text-base opacity-50 max-w-xl">
                  Detect vulnerabilities, scan ports, find XSS & SQLi exploits with cutting-edge automated scanning technology
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
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

              {/* Right Side - 3D Spline Visualization */}
              <div className="h-[500px] lg:h-[600px] w-full relative bg-transparent overflow-hidden">
                <SplineViewer />
              </div>
            </div>

          </div>
        </section>

        {/* Features Section - OWASP Top 10 Coverage */}
        <section data-section-features className="py-20 px-8 border-t-2 border-purple-600">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 glow-purple">
              [COMPREHENSIVE SECURITY TESTING]
            </h2>
            <p className="text-center opacity-50 mb-4">
              Full OWASP Top 10 vulnerability detection powered by advanced automation
            </p>

            {/* OWASP Badge */}
            <div className="flex justify-center mb-12">
              <div className="terminal-border bg-purple-900/20 px-6 py-3">
                <span className="text-sm font-bold text-purple-400">OWASP TOP 10 COMPLIANT</span>
              </div>
            </div>

            {/* Main Capabilities Grid - 3 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Capability 1: Injection Attacks */}
              <div className="terminal-border bg-black/80 backdrop-blur p-6 hover:scale-105 transition-all">
                <div className="placeholder-3d-icon bg-purple-900/20 h-20 w-20 mx-auto mb-4 flex items-center justify-center border border-purple-600">
                  <span className="text-2xl">{'[>>]'}</span>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 glow-purple">INJECTION ATTACKS</h3>
                <p className="text-xs opacity-70 text-center mb-3">
                  Detect SQL, NoSQL, OS command, and LDAP injection vulnerabilities
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-xs bg-purple-900/30 px-2 py-1 border border-purple-600">SQLi</span>
                  <span className="text-xs bg-purple-900/30 px-2 py-1 border border-purple-600">NoSQLi</span>
                  <span className="text-xs bg-purple-900/30 px-2 py-1 border border-purple-600">Command</span>
                </div>
              </div>

              {/* Capability 2: Authentication & Access */}
              <div className="terminal-border bg-black/80 backdrop-blur p-6 hover:scale-105 transition-all">
                <div className="placeholder-3d-icon bg-purple-900/20 h-20 w-20 mx-auto mb-4 flex items-center justify-center border border-purple-600">
                  <span className="text-2xl">[#]</span>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 glow-purple">AUTH & ACCESS</h3>
                <p className="text-xs opacity-70 text-center mb-3">
                  Test authentication, session management, and access control flaws
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-xs bg-purple-900/30 px-2 py-1 border border-purple-600">Broken Auth</span>
                  <span className="text-xs bg-purple-900/30 px-2 py-1 border border-purple-600">IDOR</span>
                  <span className="text-xs bg-purple-900/30 px-2 py-1 border border-purple-600">JWT</span>
                </div>
              </div>

              {/* Capability 3: XSS & Client-Side */}
              <div className="terminal-border-strong bg-black/80 backdrop-blur p-6 hover:scale-105 transition-all">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 px-4 py-1 text-xs font-bold animate-pulse">
                  MOST COMMON
                </div>
                <div className="placeholder-3d-icon bg-purple-900/20 h-20 w-20 mx-auto mb-4 flex items-center justify-center border border-purple-600">
                  <span className="text-2xl">[!]</span>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 glow-purple">XSS & CLIENT-SIDE</h3>
                <p className="text-xs opacity-70 text-center mb-3">
                  Identify Cross-Site Scripting and client-side injection vulnerabilities
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-xs bg-purple-900/30 px-2 py-1 border border-purple-600">Reflected XSS</span>
                  <span className="text-xs bg-purple-900/30 px-2 py-1 border border-purple-600">Stored XSS</span>
                  <span className="text-xs bg-purple-900/30 px-2 py-1 border border-purple-600">DOM XSS</span>
                </div>
              </div>
            </div>

            {/* OWASP Top 10 Comprehensive List */}
            <div className="terminal-border bg-black/80 backdrop-blur p-8">
              <h3 className="text-2xl font-bold text-center mb-6 glow-header">
                &gt; FULL OWASP TOP 10 COVERAGE
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto">
                {/* OWASP 1 */}
                <div className="flex items-start gap-3 group hover:bg-purple-900/10 p-3 transition-all">
                  <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-purple-400 group-hover:glow-accent">A01: Broken Access Control</h4>
                    <p className="text-xs opacity-60">IDOR, privilege escalation, path traversal</p>
                  </div>
                </div>

                {/* OWASP 2 */}
                <div className="flex items-start gap-3 group hover:bg-purple-900/10 p-3 transition-all">
                  <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-purple-400 group-hover:glow-accent">A02: Cryptographic Failures</h4>
                    <p className="text-xs opacity-60">Weak encryption, exposed sensitive data</p>
                  </div>
                </div>

                {/* OWASP 3 */}
                <div className="flex items-start gap-3 group hover:bg-purple-900/10 p-3 transition-all">
                  <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-purple-400 group-hover:glow-accent">A03: Injection</h4>
                    <p className="text-xs opacity-60">SQL, NoSQL, OS command, LDAP injection</p>
                  </div>
                </div>

                {/* OWASP 4 */}
                <div className="flex items-start gap-3 group hover:bg-purple-900/10 p-3 transition-all">
                  <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-purple-400 group-hover:glow-accent">A04: Insecure Design</h4>
                    <p className="text-xs opacity-60">Missing security controls, threat modeling</p>
                  </div>
                </div>

                {/* OWASP 5 */}
                <div className="flex items-start gap-3 group hover:bg-purple-900/10 p-3 transition-all">
                  <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-purple-400 group-hover:glow-accent">A05: Security Misconfiguration</h4>
                    <p className="text-xs opacity-60">Default configs, unnecessary features</p>
                  </div>
                </div>

                {/* OWASP 6 */}
                <div className="flex items-start gap-3 group hover:bg-purple-900/10 p-3 transition-all">
                  <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-purple-400 group-hover:glow-accent">A06: Vulnerable Components</h4>
                    <p className="text-xs opacity-60">Outdated libraries, known CVEs</p>
                  </div>
                </div>

                {/* OWASP 7 */}
                <div className="flex items-start gap-3 group hover:bg-purple-900/10 p-3 transition-all">
                  <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-purple-400 group-hover:glow-accent">A07: Auth & Session Failures</h4>
                    <p className="text-xs opacity-60">Broken authentication, session hijacking</p>
                  </div>
                </div>

                {/* OWASP 8 */}
                <div className="flex items-start gap-3 group hover:bg-purple-900/10 p-3 transition-all">
                  <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-purple-400 group-hover:glow-accent">A08: Software & Data Integrity</h4>
                    <p className="text-xs opacity-60">Insecure CI/CD, untrusted sources</p>
                  </div>
                </div>

                {/* OWASP 9 */}
                <div className="flex items-start gap-3 group hover:bg-purple-900/10 p-3 transition-all">
                  <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-purple-400 group-hover:glow-accent">A09: Security Logging Failures</h4>
                    <p className="text-xs opacity-60">Insufficient logging and monitoring</p>
                  </div>
                </div>

                {/* OWASP 10 */}
                <div className="flex items-start gap-3 group hover:bg-purple-900/10 p-3 transition-all">
                  <span className="text-green-400 font-bold text-sm mt-0.5">✓</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-purple-400 group-hover:glow-accent">A10: Server-Side Request Forgery</h4>
                    <p className="text-xs opacity-60">SSRF attacks, internal service abuse</p>
                  </div>
                </div>
              </div>

              {/* Additional Coverage */}
              <div className="mt-8 pt-6 border-t border-purple-600">
                <p className="text-center text-xs opacity-50">
                  + Port scanning, technology detection, SSL/TLS analysis, HTTP security headers, and more
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Advantage Section - À ajouter avant les Stats */}
        <section className="py-20 px-8 border-t-2 border-purple-600">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 glow-purple">
              [WHY CHOOSE TEKTON?]
            </h2>
            <p className="text-center opacity-50 mb-12">
              See how we compare to traditional security scanners
            </p>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* TEKTON Side - Left */}
              <div className="terminal-border-strong bg-purple-900/20 backdrop-blur p-8">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold glow-title mb-2">TEKTON</h3>
                  <span className="text-xs bg-green-500 text-black px-3 py-1 font-bold">NEXT-GEN SCANNER</span>
                </div>

                <div className="space-y-4">
                  {/* Feature 1 */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-bold text-purple-400 mb-1">Full OWASP Top 10 Coverage</h4>
                      <p className="text-xs opacity-70">Complete protection against all modern web vulnerabilities</p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-bold text-purple-400 mb-1">Real-Time Results</h4>
                      <p className="text-xs opacity-70">Live scanning progress with instant vulnerability detection</p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-bold text-purple-400 mb-1">Pay-As-You-Scan Token System</h4>
                      <p className="text-xs opacity-70">No monthly commitments, scan only when you need</p>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-bold text-purple-400 mb-1">Automated Technology Detection</h4>
                      <p className="text-xs opacity-70">Identifies frameworks, servers, and versions automatically</p>
                    </div>
                  </div>

                  {/* Feature 5 */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-bold text-purple-400 mb-1">Modern Terminal UI</h4>
                      <p className="text-xs opacity-70">Intuitive cyberpunk interface designed for security professionals</p>
                    </div>
                  </div>

                  {/* Feature 6 */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-bold text-purple-400 mb-1">Detailed Remediation Guides</h4>
                      <p className="text-xs opacity-70">Step-by-step fixes with code examples for each vulnerability</p>
                    </div>
                  </div>

                  {/* Feature 7 */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-bold text-purple-400 mb-1">API-First Architecture</h4>
                      <p className="text-xs opacity-70">Integrate scans into your CI/CD pipeline effortlessly</p>
                    </div>
                  </div>

                  {/* Feature 8 */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-bold text-purple-400 mb-1">Zero False Positives Focus</h4>
                      <p className="text-xs opacity-70">Advanced verification to minimize noise and wasted time</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Traditional Scanners Side - Right */}
              <div className="terminal-border bg-black/80 backdrop-blur p-8 relative">
                {/* Overlay for "outdated" effect */}
                <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 text-xs font-bold rotate-12">
                  LEGACY TOOLS
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold opacity-50 mb-2">Traditional Scanners</h3>
                  <span className="text-xs bg-gray-700 text-gray-400 px-3 py-1 font-bold">OLD APPROACH</span>
                </div>

                <div className="space-y-4 opacity-60">
                  {/* Limitation 1 */}
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 text-xl mt-1">✗</span>
                    <div>
                      <h4 className="font-bold text-gray-400 mb-1">Partial Vulnerability Coverage</h4>
                      <p className="text-xs opacity-70">Often miss modern attack vectors and new CVEs</p>
                    </div>
                  </div>

                  {/* Limitation 2 */}
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 text-xl mt-1">✗</span>
                    <div>
                      <h4 className="font-bold text-gray-400 mb-1">Delayed Reporting</h4>
                      <p className="text-xs opacity-70">Results available hours or days after scan completion</p>
                    </div>
                  </div>

                  {/* Limitation 3 */}
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 text-xl mt-1">✗</span>
                    <div>
                      <h4 className="font-bold text-gray-400 mb-1">Expensive Monthly Subscriptions</h4>
                      <p className="text-xs opacity-70">Locked into costly plans even with occasional use</p>
                    </div>
                  </div>

                  {/* Limitation 4 */}
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 text-xl mt-1">✗</span>
                    <div>
                      <h4 className="font-bold text-gray-400 mb-1">Manual Configuration Required</h4>
                      <p className="text-xs opacity-70">Requires extensive setup for each target application</p>
                    </div>
                  </div>

                  {/* Limitation 5 */}
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 text-xl mt-1">✗</span>
                    <div>
                      <h4 className="font-bold text-gray-400 mb-1">Outdated Interface</h4>
                      <p className="text-xs opacity-70">Clunky dashboards designed decades ago</p>
                    </div>
                  </div>

                  {/* Limitation 6 */}
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 text-xl mt-1">✗</span>
                    <div>
                      <h4 className="font-bold text-gray-400 mb-1">Generic Fix Recommendations</h4>
                      <p className="text-xs opacity-70">Vague advice without actionable code samples</p>
                    </div>
                  </div>

                  {/* Limitation 7 */}
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 text-xl mt-1">✗</span>
                    <div>
                      <h4 className="font-bold text-gray-400 mb-1">Complex API Integration</h4>
                      <p className="text-xs opacity-70">Difficult to automate and integrate with modern DevOps</p>
                    </div>
                  </div>

                  {/* Limitation 8 */}
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 text-xl mt-1">✗</span>
                    <div>
                      <h4 className="font-bold text-gray-400 mb-1">High False Positive Rate</h4>
                      <p className="text-xs opacity-70">Wastes time investigating non-existent vulnerabilities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <div className="terminal-border bg-purple-900/20 backdrop-blur p-6 inline-block">
                <p className="text-lg font-bold text-purple-400 mb-4">
                  Ready to experience the difference?
                </p>
                <Link
                    href="/scan"
                    className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all hover:scale-105"
                >
                  [TRY TEKTON NOW]
                </Link>
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