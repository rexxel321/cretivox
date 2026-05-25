'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const FULL_NAME = 'Muhammad Dhiya Ulhaq'
const LINES = ['Muhammad', 'Dhiya', 'Ulhaq']

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const photo = photoRef.current
    if (!section || !photo) return

    // --- Split text into individual chars ---
    const charEls = section.querySelectorAll<HTMLSpanElement>('.char')

    // --- Entrance Timeline ---
    const tl = gsap.timeline({ delay: 0.3 })

    tl.from(charEls, {
      y: '110%',
      rotationZ: 8,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.035,
    })
    .to(labelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .to(scrollIndicatorRef.current, { opacity: 1, duration: 0.6 }, '-=0.2')

    // Initial hidden state for subtitle/cta
    gsap.set([subtitleRef.current, ctaRef.current], { y: 20 })
    gsap.set(labelRef.current, { y: 10 })

    // --- Parallax scroll pin ---
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        gsap.set(photo, {
          opacity: 1 - self.progress * 1.5,
          scale: 1 + self.progress * 0.08,
        })
      },
    })

    // --- Mouse parallax on photo ---
    const xTo = gsap.quickTo(photo, 'x', { duration: 1.2, ease: 'power3.out' })
    const yTo = gsap.quickTo(photo, 'y', { duration: 1.2, ease: 'power3.out' })

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const dx = (clientX / innerWidth - 0.5) * 30
      const dy = (clientY / innerHeight - 0.5) * 20
      xTo(dx)
      yTo(dy)
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="hero" id="hero">
      {/* Photo BG */}
      <div ref={photoRef} className="hero-photo">
        <Image
          src="/photos/front.png"
          alt={FULL_NAME}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <p ref={labelRef} className="hero-label">
          Full-Stack Developer · AI Enthusiast
        </p>

        <div ref={nameRef} className="hero-name" aria-label={FULL_NAME}>
          {LINES.map((line, li) => (
            <span key={li} className="hero-name-line">
              {line.split('').map((char, ci) => (
                <span key={ci} className="char">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          ))}
        </div>

        <p ref={subtitleRef} className="hero-subtitle">
          Informatics · President University
          <br />
          Building at the intersection of AI & Web.
        </p>

        <div ref={ctaRef} className="hero-cta">
          <a href="#skills" className="btn-primary" id="hero-cta-work">
            View Work
          </a>
          <a href="#contact" className="btn-secondary" id="hero-cta-contact">
            Get in Touch →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
