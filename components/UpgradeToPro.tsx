'use client';

import Link from 'next/link';

interface Props {
  onClose: () => void;
}

export default function UpgradeToPro({ onClose }: Props) {
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="terminal-border bg-black/95 p-8 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-3xl font-bold glow-purple mb-2">
            Fonctionnalité Premium
          </h2>
          <p className="text-gray-400">
            Passez en mode PRO pour débloquer les explications IA
          </p>
        </div>

        {/* Avantages */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 bg-purple-900/20 border border-purple-600 rounded-lg p-4">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-purple-400 mb-1">
                Explications détaillées par IA
              </h3>
              <p className="text-sm text-gray-400">
                Comprenez comment exploiter chaque vulnérabilité et comment la corriger
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-purple-900/20 border border-purple-600 rounded-lg p-4">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-purple-400 mb-1">
                Scénarios d'attaque
              </h3>
              <p className="text-sm text-gray-400">
                Visualisez comment un hacker pourrait exploiter vos failles
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-purple-900/20 border border-purple-600 rounded-lg p-4">
            <span className="text-2xl">🛡️</span>
            <div>
              <h3 className="font-bold text-purple-400 mb-1">
                Recommandations de correction
              </h3>
              <p className="text-sm text-gray-400">
                Solutions concrètes et code d'exemple pour corriger chaque vulnérabilité
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-purple-900/20 border border-purple-600 rounded-lg p-4">
            <span className="text-2xl">🚀</span>
            <div>
              <h3 className="font-bold text-purple-400 mb-1">
                Scans illimités
              </h3>
              <p className="text-sm text-gray-400">
                Scannez autant de sites que vous voulez sans limite
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500 rounded-lg p-6 mb-8">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold glow-purple">Mode PRO</h3>
              <p className="text-gray-400 text-sm">Accès complet à toutes les fonctionnalités</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold glow-purple">1000</div>
              <div className="text-sm text-gray-400">tokens</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">9.99€</div>
            <div className="text-sm text-gray-400">Paiement unique</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Plus tard
          </button>
          <Link
            href="/pricing"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all glow-purple text-center font-bold"
          >
            Passer en PRO →
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>✓ Paiement sécurisé • ✓ Accès immédiat • ✓ Support 24/7</p>
        </div>
      </div>
    </div>
  );
}
