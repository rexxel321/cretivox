'use client'

import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import LoginModal from '@/components/ui/LoginModal'

interface SecretProjectsState {
  isUnlocked: boolean
  showModal: boolean
}

export default function SecretProjects() {
  const [state, setState] = useState<SecretProjectsState>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('cretivox_token')) {
      return { isUnlocked: true, showModal: false }
    }
    return { isUnlocked: false, showModal: false }
  })
  const sectionRef = useRef<HTMLElement>(null)
  const lockRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Lock click handler
  const handleLockClick = () => {
    if (!state.isUnlocked) {
      setState(prev => ({ ...prev, showModal: true }))
    }
  }

  // Handle successful login
  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('cretivox_token', token)
    setState(prev => ({ ...prev, isUnlocked: true, showModal: false }))
    
    // Trigger unlock animation
    if (lockRef.current && contentRef.current) {
      animateUnlock()
    }
  }

  // Unlock animation - lock opens + content reveals
  const animateUnlock = () => {
    if (!lockRef.current || !contentRef.current || !containerRef.current) return

    const tl = gsap.timeline()

    // Phase 1: Lock opens (rotate + fade out)
    tl.to(
      lockRef.current,
      {
        duration: 0.6,
        rotateZ: 45,
        opacity: 0,
        scale: 0.8,
        ease: 'power2.out',
      },
      0
    )

    // Phase 2: Container glow effect (portal effect)
    tl.to(
      containerRef.current,
      {
        duration: 0.5,
        boxShadow: '0 0 40px rgba(232, 232, 232, 0.6), 0 0 80px rgba(212, 197, 169, 0.3)',
        ease: 'power2.out',
      },
      0
    )

    // Phase 3: Content reveal with clip-path (bottom to top)
    tl.to(
      contentRef.current,
      {
        duration: 0.8,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        opacity: 1,
        ease: 'power2.inOut',
      },
      0.3
    )

    // Phase 4: Stagger in individual project cards
    const cards = contentRef.current.querySelectorAll('.secret-project-card')
    tl.to(
      cards,
      {
        duration: 0.6,
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: 'power2.out',
      },
      0.8
    )

    // Phase 5: Reset glow
    tl.to(
      containerRef.current,
      {
        duration: 0.4,
        boxShadow: '0 0 20px rgba(232, 232, 232, 0.2)',
        ease: 'power2.out',
      },
      1.2
    )
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-20 px-8">
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl transition-all duration-300"
        style={{
          boxShadow: '0 0 20px rgba(232, 232, 232, 0.2)',
        }}
      >
        {/* Locked State */}
        {!state.isUnlocked && (
          <div
            className="relative w-full aspect-square flex flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg)] cursor-pointer group overflow-hidden"
            onClick={handleLockClick}
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-warm)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Lock Icon */}
            <div
              ref={lockRef}
              className="relative z-10 flex flex-col items-center gap-6"
            >
              {/* SVG Lock Icon */}
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="text-[var(--accent-warm)] drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
              >
                <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {/* Lock shackle */}
                  <path d="M 30 55 Q 30 30 60 30 Q 90 30 90 55" />
                  
                  {/* Lock body */}
                  <rect x="25" y="55" width="70" height="50" rx="4" />
                  
                  {/* Keyhole */}
                  <circle cx="60" cy="80" r="6" fill="currentColor" />
                  <rect x="58" y="86" width="4" height="12" fill="currentColor" />
                </g>
              </svg>

              {/* Text */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  RESTRICTED ACCESS
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Click to unlock exclusive projects
                </p>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {/* Border glow on hover */}
            <div className="absolute inset-0 rounded-2xl border border-[var(--accent-warm)]/0 group-hover:border-[var(--accent-warm)]/30 transition-colors duration-300" />
          </div>
        )}

        {/* Unlocked Content */}
        {state.isUnlocked && (
          <div
            ref={contentRef}
            className="space-y-6"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[var(--accent-warm)] mb-2">
                🔓 HIDDEN VAULT UNLOCKED
              </h2>
              <p className="text-[var(--text-secondary)]">
                Welcome to the exclusive project archive
              </p>
            </div>

            {/* Secret Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SECRET_PROJECTS.map((project, idx) => (
                <div
                  key={idx}
                  className="secret-project-card p-6 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] opacity-0 translate-y-8 hover:border-[var(--accent-warm)]/50 transition-all duration-300 group"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent}15 0%, transparent 100%)`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="text-3xl font-bold text-[var(--accent-warm)]/40 flex-shrink-0"
                    >
                      {project.num}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">
                        {project.subtitle}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {project.desc}
                      </p>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded bg-[var(--accent-warm)]/10 text-[var(--accent-warm)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Personal Contact Card */}
            <div className="secret-project-card p-8 rounded-lg border border-[var(--border)] bg-gradient-to-br from-[var(--accent-warm)]/10 to-transparent opacity-0 translate-y-8 mt-6">
              <h3 className="text-2xl font-bold text-[var(--accent-warm)] mb-4">
                👤 Direct Contact
              </h3>
              <div className="space-y-2 text-[var(--text-secondary)]">
                <p>📧 personal@cretivox.dev</p>
                <p>💬 Available for freelance & collaboration</p>
                <p className="text-xs text-[var(--text-muted)] mt-4">
                  This section is protected because these are premium, unreleased, or confidential projects.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {state.showModal && (
        <LoginModal
          onClose={() => setState(prev => ({ ...prev, showModal: false }))}
          onSuccess={handleLoginSuccess}
        />
      )}
    </section>
  )
}

const SECRET_PROJECTS = [
  {
    num: '🔐',
    title: 'Project Alpha',
    subtitle: 'Confidential ML Pipeline',
    desc: 'Advanced machine learning pipeline for predictive analytics. Built with PyTorch, deployed on Kubernetes with real-time inference.',
    tags: ['PyTorch', 'Kubernetes', 'FastAPI', 'MLOPS'],
    accent: '#c7a86e',
  },
  {
    num: '🎯',
    title: 'Project Beta',
    subtitle: 'Real-time Collaboration Platform',
    desc: 'WebSocket-based collaborative workspace. Supports live code editing, voice communication, and AI-powered code suggestions.',
    tags: ['Next.js', 'WebSocket', 'Node.js', 'AI'],
    accent: '#a67c52',
  },
  {
    num: '⚡',
    title: 'Project Gamma',
    subtitle: 'Blockchain Identity System',
    desc: 'Decentralized identity verification using blockchain technology. Zero-knowledge proofs for privacy-preserving authentication.',
    tags: ['Solidity', 'React', 'Web3', 'ZK-Proofs'],
    accent: '#8b6f47',
  },
  {
    num: '🚀',
    title: 'Project Delta',
    subtitle: 'Autonomous Agent Framework',
    desc: 'Multi-agent AI framework for complex task automation. Agents communicate, negotiate, and collaborate to achieve goals.',
    tags: ['Python', 'LangChain', 'GPT-4', 'Ray'],
    accent: '#d4a574',
  },
]
