'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock community data
const DISCORD_STATS = {
  members: 12453,
  online: 3241,
  channels: 24,
  messages: 156234
};

const COMMUNITY_POSTS = [
  {
    id: '1',
    author: 'CyberNinja',
    avatar: '🥷',
    title: 'Best practices for XSS detection in modern SPAs',
    content: 'Just wanted to share my experience scanning React applications. Here are some tips...',
    likes: 42,
    replies: 15,
    timestamp: '2 hours ago',
    tags: ['xss', 'react', 'tips']
  },
  {
    id: '2',
    author: 'SecurityPro',
    avatar: '🛡️',
    title: 'New SQLi patterns discovered in legacy PHP apps',
    content: 'Found some interesting SQL injection vectors while scanning old codebases...',
    likes: 38,
    replies: 12,
    timestamp: '5 hours ago',
    tags: ['sqli', 'php', 'research']
  },
  {
    id: '3',
    author: 'BugHunter99',
    avatar: '🐛',
    title: 'How I earned 10,000 points in one month',
    content: 'Sharing my strategy for climbing the leaderboard quickly. Focus on...',
    likes: 67,
    replies: 28,
    timestamp: '1 day ago',
    tags: ['tips', 'leaderboard', 'gamification']
  }
];

const FEATURED_RESOURCES = [
  {
    id: '1',
    title: 'TEKTON API Documentation',
    description: 'Complete API reference and integration guides',
    icon: '📚',
    link: '/docs/api'
  },
  {
    id: '2',
    title: 'Video Tutorials',
    description: 'Learn how to use TEKTON effectively',
    icon: '🎥',
    link: '/tutorials'
  },
  {
    id: '3',
    title: 'Security Blog',
    description: 'Latest vulnerabilities and security trends',
    icon: '📝',
    link: '/blog'
  },
  {
    id: '4',
    title: 'Bug Bounty Program',
    description: 'Report vulnerabilities and earn rewards',
    icon: '💰',
    link: '/bounty'
  }
];

const TEAM_MEMBERS = [
  {
    name: 'Collins',
    role: 'Founder & CEO',
    avatar: '👨‍💻',
    bio: 'Cybersecurity expert, JUNIA student'
  },
  {
    name: 'Alex',
    role: 'CTO',
    avatar: '🧑‍💼',
    bio: 'Full-stack developer, security researcher'
  },
  {
    name: 'Sarah',
    role: 'Head of Security',
    avatar: '👩‍💻',
    bio: 'Former pentester, bug bounty hunter'
  }
];

const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'Weekly Security Webinar',
    date: 'Every Friday at 18:00 CET',
    description: 'Join us for live demos and Q&A sessions',
    type: 'webinar'
  },
  {
    id: '2',
    title: 'TEKTON CTF Challenge',
    date: 'March 15-17, 2026',
    description: 'Compete for prizes and exclusive badges',
    type: 'competition'
  },
  {
    id: '3',
    title: 'Community Meetup - Paris',
    date: 'April 5, 2026',
    description: 'In-person networking event for security enthusiasts',
    type: 'meetup'
  }
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'forum' | 'discord' | 'resources' | 'events'>('forum');

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 glow-title">[COMMUNITY]</h1>
          <p className="text-xl opacity-70 mb-2">Join thousands of security researchers worldwide</p>
          <p className="text-sm opacity-50">Share knowledge, compete, and grow together</p>
        </div>

        {/* Discord Banner */}
        <div className="terminal-border-strong bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="text-7xl">🎮</div>
              <div>
                <h2 className="text-3xl font-bold mb-2 glow-header">JOIN OUR DISCORD</h2>
                <p className="text-lg opacity-70 mb-1">Connect with the community in real-time</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-400">● {DISCORD_STATS.online.toLocaleString()} online</span>
                  <span className="opacity-50">{DISCORD_STATS.members.toLocaleString()} members</span>
                </div>
              </div>
            </div>
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold text-lg transition-all">
              [JOIN DISCORD]
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="terminal-border bg-black/80 backdrop-blur p-4 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">{DISCORD_STATS.members.toLocaleString()}</div>
            <div className="text-xs opacity-50">MEMBERS</div>
          </div>
          <div className="terminal-border bg-black/80 backdrop-blur p-4 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{DISCORD_STATS.online.toLocaleString()}</div>
            <div className="text-xs opacity-50">ONLINE</div>
          </div>
          <div className="terminal-border bg-black/80 backdrop-blur p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">{DISCORD_STATS.channels}</div>
            <div className="text-xs opacity-50">CHANNELS</div>
          </div>
          <div className="terminal-border bg-black/80 backdrop-blur p-4 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-1">{DISCORD_STATS.messages.toLocaleString()}</div>
            <div className="text-xs opacity-50">MESSAGES</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="terminal-border bg-black/80 backdrop-blur p-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(['forum', 'discord', 'resources', 'events'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-purple-600 border-2 border-purple-400'
                    : 'bg-black border-2 border-purple-600 hover:border-purple-400'
                }`}
              >
                [{tab.toUpperCase()}]
              </button>
            ))}
          </div>
        </div>

        {/* Forum Tab */}
        {activeTab === 'forum' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold glow-header">COMMUNITY FORUM</h2>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all">
                [+ NEW POST]
              </button>
            </div>

            <div className="space-y-4">
              {COMMUNITY_POSTS.map((post) => (
                <div key={post.id} className="terminal-border bg-black/80 backdrop-blur p-6 hover:bg-purple-900/20 transition-all">
                  <div className="flex gap-4">
                    <div className="text-4xl">{post.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold glow-accent">{post.title}</h3>
                        <span className="text-xs opacity-50">{post.timestamp}</span>
                      </div>
                      <div className="text-sm opacity-70 mb-1">by {post.author}</div>
                      <p className="text-sm opacity-80 mb-3">{post.content}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-purple-600/30 border border-purple-600 font-mono">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-6 text-sm">
                        <button className="flex items-center gap-2 hover:text-purple-400 transition-all">
                          <span>👍</span>
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-purple-400 transition-all">
                          <span>💬</span>
                          <span>{post.replies} replies</span>
                        </button>
                        <button className="hover:text-purple-400 transition-all">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all">
                [LOAD MORE POSTS]
              </button>
            </div>
          </div>
        )}

        {/* Discord Tab */}
        {activeTab === 'discord' && (
          <div>
            <h2 className="text-3xl font-bold glow-header mb-6">DISCORD CHANNELS</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { name: '💬 #general', desc: 'General discussion and introductions', members: 8234 },
                { name: '🔒 #security-research', desc: 'Deep dive into security topics', members: 3421 },
                { name: '🐛 #bug-reports', desc: 'Report bugs and issues', members: 1567 },
                { name: '💡 #feature-requests', desc: 'Suggest new features', members: 2134 },
                { name: '🎯 #scan-results', desc: 'Share your scan findings', members: 4523 },
                { name: '🏆 #leaderboard', desc: 'Compete and celebrate achievements', members: 5678 },
                { name: '📚 #tutorials', desc: 'Learn and teach', members: 3892 },
                { name: '🎮 #ctf-challenges', desc: 'Capture the flag discussions', members: 2901 }
              ].map((channel) => (
                <div key={channel.name} className="terminal-border bg-black/80 backdrop-blur p-6">
                  <h3 className="text-xl font-bold glow-accent mb-2">{channel.name}</h3>
                  <p className="text-sm opacity-70 mb-3">{channel.desc}</p>
                  <div className="text-xs opacity-50">{channel.members.toLocaleString()} members</div>
                </div>
              ))}
            </div>

            <div className="terminal-border bg-purple-900/20 backdrop-blur p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 glow-header">READY TO JOIN?</h3>
              <p className="text-lg opacity-70 mb-6">Get instant access to all channels and start connecting</p>
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold text-lg transition-all">
                [JOIN DISCORD SERVER]
              </button>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div>
            <h2 className="text-3xl font-bold glow-header mb-6">LEARNING RESOURCES</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {FEATURED_RESOURCES.map((resource) => (
                <Link
                  key={resource.id}
                  href={resource.link}
                  className="terminal-border bg-black/80 backdrop-blur p-6 hover:bg-purple-900/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{resource.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold glow-accent mb-2">{resource.title}</h3>
                      <p className="text-sm opacity-70">{resource.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Team Section */}
            <div className="terminal-border bg-black/80 backdrop-blur p-8 mb-8">
              <h3 className="text-2xl font-bold glow-header mb-6">MEET THE TEAM</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TEAM_MEMBERS.map((member) => (
                  <div key={member.name} className="terminal-border bg-purple-900/10 p-6 text-center">
                    <div className="text-6xl mb-3">{member.avatar}</div>
                    <h4 className="text-xl font-bold glow-accent mb-1">{member.name}</h4>
                    <div className="text-sm text-purple-400 mb-3">{member.role}</div>
                    <p className="text-xs opacity-70">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentation Links */}
            <div className="terminal-border bg-black/80 backdrop-blur p-8">
              <h3 className="text-2xl font-bold glow-header mb-6">DOCUMENTATION</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Getting Started Guide',
                  'API Reference',
                  'Scanner Types Explained',
                  'Interpreting Results',
                  'Best Practices',
                  'Troubleshooting',
                  'Integration Guides',
                  'Security Policy'
                ].map((doc) => (
                  <Link
                    key={doc}
                    href="#"
                    className="flex items-center gap-3 p-3 bg-purple-900/10 border border-purple-600 hover:bg-purple-900/20 transition-all"
                  >
                    <span className="text-purple-400">{'[>>]'}</span>
                    <span className="text-sm">{doc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <h2 className="text-3xl font-bold glow-header mb-6">UPCOMING EVENTS</h2>

            <div className="space-y-6">
              {UPCOMING_EVENTS.map((event) => (
                <div key={event.id} className="terminal-border bg-black/80 backdrop-blur p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold glow-accent">{event.title}</h3>
                        <span className={`text-xs px-3 py-1 font-bold ${
                          event.type === 'competition' ? 'bg-yellow-600 border border-yellow-400' :
                          event.type === 'webinar' ? 'bg-blue-600 border border-blue-400' :
                          'bg-green-600 border border-green-400'
                        }`}>
                          {event.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm opacity-50 mb-3">📅 {event.date}</div>
                      <p className="text-sm opacity-80">{event.description}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all">
                    [REGISTER]
                  </button>
                </div>
              ))}
            </div>

            {/* Calendar */}
            <div className="mt-8 terminal-border bg-purple-900/20 backdrop-blur p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 glow-header">COMMUNITY CALENDAR</h3>
              <p className="text-lg opacity-70 mb-6">Subscribe to get notified about all upcoming events</p>
              <div className="flex gap-4 justify-center">
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all">
                  [ADD TO GOOGLE CALENDAR]
                </button>
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 border-2 border-purple-400 font-bold transition-all">
                  [DOWNLOAD .ICS]
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
