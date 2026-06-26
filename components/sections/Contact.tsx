'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = [
  { name: 'GitHub', url: 'https://github.com/rexxel321', label: 'github.com/rexxel321' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/muhammaddhiyaulhaq---', label: 'linkedin.com/in/muhammaddhiyaulhaq' },
  { name: 'Instagram', url: 'https://www.instagram.com/muhammaddhiya._/', label: '@muhammaddhiya._' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const socialLinksRef = useRef<HTMLDivElement>(null)

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

      if (socialLinksRef.current) {
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
  }, [])

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
                <span className="social-link-arrow">&#8599;</span>
              </a>
            ))}
          </div>

          <div style={{ marginTop: '3rem' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Powered by
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Next.js &middot; GSAP &middot; Lenis &middot; TypeScript
            </p>
          </div>
        </div>
      </div>

      <footer className="footer" style={{ marginTop: '5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <p className="footer-text">&copy; 2026 Muhammad Dhiya Ulhaq &mdash; All rights reserved.</p>
        <p className="footer-text">Built for Cretivox Internship</p>
        <img
          src="/photos/Logo Cretivox - Black.png"
          alt="Cretivox Logo"
          style={{ height: '24px', objectFit: 'contain', marginTop: '0.5rem', filter: 'invert(1) opacity(0.8)' }}
        />
      </footer>
    </section>
  )
}
