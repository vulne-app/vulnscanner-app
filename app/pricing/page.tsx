'use client';

import PricingCard from '@/components/PricingCard';

export default function PricingPage() {
  const plans = [
    {
      name: 'BASIC',
      price: 'FREE',
      tokens: 100,
      features: [
        'Basic port scanning',
        'Up to 5 scans/day',
        'Community support',
        'Email reports',
        'Basic vulnerability detection'
      ],
      accentColor: 'border-cyan-400'
    },
    {
      name: 'PRO',
      price: '29€',
      tokens: 500,
      badge: 'POPULAR',
      badgeColor: 'bg-purple-600',
      popular: true,
      features: [
        'All BASIC features',
        'Advanced XSS detection',
        'SQLi testing',
        'Unlimited scans',
        'Priority support',
        'API access',
        'Detailed PDF reports',
        'Custom scan profiles'
      ],
      accentColor: 'border-purple-400'
    },
    {
      name: 'EXPERT',
      price: '99€',
      tokens: 2000,
      badge: 'BEST VALUE',
      badgeColor: 'bg-yellow-600',
      features: [
        'All PRO features',
        'Deep vulnerability scanning',
        'Zero-day detection',
        'Unlimited API calls',
        '24/7 Premium support',
        'Custom integrations',
        'Team collaboration',
        'Advanced analytics',
        'Compliance reports',
        'Dedicated account manager'
      ],
      accentColor: 'border-yellow-400'
    }
  ];

  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-purple">
            [PRICING PLANS]
          </h1>
          <p className="text-xl opacity-70 mb-2">
            Choose the perfect plan for your security needs
          </p>
          <p className="text-sm opacity-50">
            All plans include automatic updates and new features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        {/* FAQ / Additional Info */}
        <div className="terminal-border bg-black/80 backdrop-blur p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 glow-purple text-center">
            [FREQUENTLY ASKED QUESTIONS]
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-2">
                What are tokens?
              </h3>
              <p className="text-sm opacity-70">
                Tokens are the currency used to perform scans. Different scan types consume different amounts of tokens.
                Basic port scans cost 5 tokens, while deep vulnerability scans cost 100 tokens.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-2">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-sm opacity-70">
                Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll receive the additional tokens immediately.
                When downgrading, changes take effect at the start of your next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-2">
                Do tokens expire?
              </h3>
              <p className="text-sm opacity-70">
                Monthly tokens reset at the start of each billing cycle. However, any additional tokens purchased separately
                never expire and roll over indefinitely.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-sm opacity-70">
                We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and cryptocurrency payments (BTC, ETH, USDT).
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 terminal-border bg-purple-900/20 backdrop-blur p-12 text-center">
          <h2 className="text-4xl font-bold mb-4 glow-purple">
            NEED ENTERPRISE SOLUTIONS?
          </h2>
          <p className="text-lg opacity-70 mb-6">
            Custom plans available for large teams and organizations
          </p>
          <button
            onClick={() => console.log('TODO: Contact sales')}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all"
          >
            [CONTACT SALES]
          </button>
        </div>
      </div>
    </div>
  );
}
