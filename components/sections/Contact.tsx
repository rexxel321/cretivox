'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LoginModal from '@/components/ui/LoginModal'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = [
  { name: 'GitHub', url: 'https://github.com/rexxel321', label: 'github.com/rexxel321' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/muhammaddhiyaulhaq---', label: 'linkedin.com/in/muhammaddhiyaulhaq' },
  { name: 'Instagram', url: 'https://www.instagram.com/muhammaddhiya._/', label: '@muhammaddhiya._' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const lockRef = useRef<HTMLDivElement>(null)
  const socialLinksRef = useRef<HTMLDivElement>(null)

  // Check if already unlocked on mount
  useEffect(() => {
    const token = localStorage.getItem('cretivox_contact_token')
    if (token) {
      setIsUnlocked(true)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      })

      gsap.from('.contact-sub, .contact-email', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      })

      if (isUnlocked && socialLinksRef.current) {
        gsap.from('.social-link', {
          x: -20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.social-links',
            start: 'top 80%',
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [isUnlocked])

  const handleLockClick = () => {
    console.log('Lock clicked!');
    console.log('🔓 Lock clicked! Opening modal...')
    setShowModal(true)
  }

  const handleLoginSuccess = (token: string) => {
    console.log('✅ Login successful! Token:', token)
    localStorage.setItem('cretivox_contact_token', token)
    setIsUnlocked(true)
    setShowModal(false)
  }

  const handleLogout = () => {
    console.log('🚪 Logging out...')
    localStorage.removeItem('cretivox_contact_token')
    setIsUnlocked(false)
  }

  // Trigger animation when unlocked changes
  useEffect(() => {
    if (isUnlocked && socialLinksRef.current) {
      animateUnlock()
    }
  }, [isUnlocked])

  const animateUnlock = () => {
    if (!socialLinksRef.current) {
      console.error('❌ socialLinksRef is null, cannot animate')
      return
    }

    console.log('🎬 Starting unlock animation...')
    const socialLinks = socialLinksRef.current.querySelectorAll('.social-link')
    console.log('📍 Found', socialLinks.length, 'social links')

    const tl = gsap.timeline()

    // Initial state - make sure they're visible
    gsap.set(socialLinks, {
      opacity: 0,
      x: -20,
    })

    // Social links reveal with stagger
    tl.to(
      socialLinks,
      {
        duration: 0.6,
        opacity: 1,
        x: 0,
        stagger: 0.1,
        ease: 'power2.out',
      },
      0
    )

    console.log('✅ Animation timeline created')
  }

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div className="contact-inner">
        <div>
          <h2 className="contact-heading">
            Let&apos;s Build
            <br />
            Together.
          </h2>
          <p className="contact-sub">
            Open to collaborations, internship opportunities, and
            interesting projects at the intersection of AI and web development.
          </p>
          <a href="mailto:muhammaddhiyaulhaq1508@gmail.com" className="contact-email" id="contact-email-link">
            muhammaddhiyaulhaq1508@gmail.com
          </a>
        </div>

        <div>
          <p className="section-label" style={{ marginBottom: '2rem' }}>Find me on</p>
          
          {!isUnlocked ? (
            // Locked State - Flattened for better click handling
            <div
              ref={lockRef}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleLockClick()
              }}
              className="relative w-full max-w-xs p-8 rounded-lg border border-[var(--border)] bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg)] flex flex-col items-center justify-center gap-4 cursor-pointer group hover:border-[var(--accent-warm)]/50 transition-all duration-300"
              style={{ pointerEvents: 'auto' }}
            >
              {/* Lock Icon */}
              <svg
                width="64"
                height="64"
                viewBox="0 0 120 120"
                className="text-[var(--accent-warm)] drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
              >
                <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M 30 55 Q 30 30 60 30 Q 90 30 90 55" />
                  <rect x="25" y="55" width="70" height="50" rx="4" />
                  <circle cx="60" cy="80" r="6" fill="currentColor" />
                  <rect x="58" y="86" width="4" height="12" fill="currentColor" />
                </g>
              </svg>

              {/* Text */}
              <div className="text-center">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Access Restricted
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Login to see contact info
                </p>
              </div>
            </div>
          ) : (
            // Unlocked State - Social Links
            <div ref={socialLinksRef} className="social-links">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  id={`social-${s.name.toLowerCase()}`}
                >
                  <span className="social-link-name">{s.name}</span>
                  <span className="social-link-arrow">↗</span>
                </a>
              ))}
            </div>
          )}

          <div style={{ marginTop: '3rem' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Powered by
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Next.js · GSAP · Lenis · TypeScript
            </p>

            {isUnlocked && (
              <button
                onClick={handleLogout}
                className="mt-6 text-xs px-3 py-1 rounded border border-[var(--accent-warm)]/30 text-[var(--accent-warm)] hover:bg-[var(--accent-warm)]/10 transition-colors"
              >
                🔒 Lock (Dev Reset)
              </button>
            )}
          </div>
        </div>
      </div>

      <footer className="footer" style={{ marginTop: '5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem' }}>
        <p className="footer-text">© 2025 Muhammad Dhiya Ulhaq — All rights reserved.</p>
        <p className="footer-text">Built for Cretivox Internship</p>
      </footer>

      {/* Login Modal */}
      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </section>
  )
}
