'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)
  const photoLeftRef = useRef<HTMLDivElement>(null)
  const photoRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const panels = panelsRef.current
    if (!container || !panels) return

    const totalPanels = panels.querySelectorAll('.about-panel').length

    // --- Horizontal scroll ---
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalPanels * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      tl.to(panels, {
        x: () => -(panels.scrollWidth - window.innerWidth),
        ease: 'none',
      })

      // --- Clip-path reveals for text blocks ---
      const clipEls = container.querySelectorAll('.clip-reveal')
      clipEls.forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: el,
              containerAnimation: tl,
              start: 'left 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // --- Photo left: rotation + scale + opacity ---
      if (photoLeftRef.current) {
        gsap.from(photoLeftRef.current, {
          rotation: -15,
          scale: 0.75,
          opacity: 0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: photoLeftRef.current,
            containerAnimation: tl,
            start: 'left 70%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // --- Photo right: rotation + scale + opacity ---
      if (photoRightRef.current) {
        gsap.from(photoRightRef.current, {
          rotation: 15,
          scale: 0.75,
          opacity: 0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: photoRightRef.current,
            containerAnimation: tl,
            start: 'left 70%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Bio text fade
      const bioEls = container.querySelectorAll('.about-bio, .about-divider')
      bioEls.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            containerAnimation: tl,
            start: 'left 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="about" id="about" style={{ height: `${3 * 100}vh` }}>
      <div className="about-sticky">
        <div ref={panelsRef} className="about-panels">

          {/* Panel 1: Intro + Photo Left */}
          <div className="about-panel about-panel-1">
            <div className="about-text-block">
              <span className="section-label">001 — About</span>
              <h2 className="about-heading">
                <span className="clip-reveal">Building</span>
                <span className="clip-reveal">the Future,</span>
                <span className="clip-reveal">One Stack</span>
                <span className="clip-reveal">at a Time.</span>
              </h2>
              <div className="about-divider" />
              <p className="about-bio">
                I&apos;m an Informatics student at President University specializing in Software Engineering and Artificial Intelligence. I have hands-on experience in web development, 
                backend systems, and AI-based applications through academic, organizational, and professional projects. Currently working as an IT Intern while leading the Web Development 
                team within the university's Student Executive Board.

              </p>
            </div>
            <div ref={photoLeftRef} className="about-photo">
              <Image
                src="/photos/left.png"
                alt="Dhiya — left profile"
                fill
                sizes="50vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div className="about-photo-frame" />
            </div>
          </div>

          {/* Panel 2: Quote */}
          <div className="about-panel about-panel-2">
            <span className="section-label" style={{ marginBottom: '2rem' }}>002 — Vision</span>
            <p className="about-quote">
              <span className="clip-reveal">Passionate about</span>
              <span className="clip-reveal">combining <em>data analysis,</em></span>
              <span className="clip-reveal">machine learning,</span>
              <span className="clip-reveal">and software development</span>
              <span className="clip-reveal">to create</span>
              <span className="clip-reveal"><em>innovative,</em></span>
              <span className="clip-reveal">impactful applications.</span>
            </p>
          </div>

          {/* Panel 3: Photo Right + Tags */}
          <div className="about-panel about-panel-3">
            <div ref={photoRightRef} className="about-photo">
              <Image
                src="/photos/right.png"
                alt="Dhiya — right profile"
                fill
                sizes="50vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div className="about-photo-frame" />
            </div>
            <div className="about-text-block">
              <span className="section-label">003 — Identity</span>
              <h2 className="about-heading">
                <span className="clip-reveal">President</span>
                <span className="clip-reveal">University.</span>
              </h2>
              <div className="about-divider" />
              <p className="about-bio">
                Full-Stack Developer · AI Engineer · Team Leader.
                I craft digital experiences that bridge the gap between
                intelligence and interface.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                {['AI/ML', 'Web Dev', 'Mobile', 'Leadership'].map((tag) => (
                  <span key={tag} style={{
                    padding: '0.35rem 0.9rem',
                    border: '1px solid var(--border)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
