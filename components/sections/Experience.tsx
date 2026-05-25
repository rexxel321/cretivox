'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCES = [
  {
    num: '01',
    year: '2024',
    role: 'Artificial Intelligence Intern',
    company: 'CodeAlpha',
    location: 'Remote',
    desc: "Responsible for developing and implementing various AI-based solutions to improve system interactivity and efficiency. Developed natural language processing tools, NLP-based chatbot systems, and computer vision systems for real-time object detection and tracking.",
    tags: ['NLP', 'Computer Vision', 'Python'],
  },
  {
    num: '02',
    year: '2025',
    role: 'Software Engineer Intern',
    company: 'DISKOMINFOSANTIK',
    location: 'Government Agency',
    desc: 'Developed a Content Management System (CMS) and performed sentiment analysis using social media data crawling.',
    tags: ['Django', 'Python', 'Data Crawling'],
  },
  {
    num: '03',
    year: '2026 — Present',
    role: 'Full-Stack Developer Intern',
    company: 'ResponsAIbility',
    location: 'AI Start-Up',
    desc: 'Assisted in developing a full-stack Content Management System (CMS) with Role-Based Access Control. Gained deep expertise in Next.js, Golang, and Appwrite backend integration.',
    tags: ['Next.js', 'Golang', 'Appwrite'],
  },
  {
    num: '04',
    year: '2026 — Present',
    role: 'Head of Web Development',
    company: 'PUSB',
    location: 'President University',
    desc: 'Developing website for PUSB using React and Tailwind CSS for frontend and Golang for backend.',
    tags: ['React', 'Tailwind CSS', 'Golang'],
  },
]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)
  const lineProgressRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const panels = panelsRef.current
    if (!container || !panels) return

    const ctx = gsap.context(() => {
      // --- Header animate in ---
      gsap.from('.exp-label, .exp-heading', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
        },
      })

      // --- Horizontal scroll timeline ---
      const getScrollDistance = () => panels.scrollWidth - window.innerWidth

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollDistance() + 400}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Timeline line grows with scroll progress
            if (lineProgressRef.current) {
              gsap.set(lineProgressRef.current, {
                scaleX: self.progress,
                transformOrigin: 'left center',
              })
            }
          },
        },
      })

      tl.to(panels, {
        x: () => -getScrollDistance(),
        ease: 'none',
      })

      // --- Card stagger entrance via containerAnimation ---
      const cards = container.querySelectorAll<HTMLElement>('.exp-card')
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          delay: i * 0.05,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: 'left 80%',
            toggleActions: 'play none none none',
          },
        })

        // Dot on timeline pops in
        const dot = card.querySelector<HTMLElement>('.exp-dot')
        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left 70%',
              toggleActions: 'play none none none',
            },
          })
        }
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="experience" id="experience">
      {/* Header (stays fixed on left while pinned) */}
      <div ref={headerRef} className="exp-header">
        <span className="exp-label section-label">004 — Experience</span>
        <h2 className="exp-heading">
          <span>The</span>
          <span>Journey.</span>
        </h2>
      </div>

      {/* Timeline baseline */}
      <div className="exp-timeline-track">
        <div className="exp-timeline-line" />
        <div ref={lineProgressRef} className="exp-timeline-progress" />
      </div>

      {/* Horizontal Panels */}
      <div ref={panelsRef} className="exp-panels">
        {/* Spacer so first card starts after header */}
        <div className="exp-spacer" />

        {EXPERIENCES.map((exp) => (
          <div key={exp.num} className="exp-card">
            <div className="exp-dot" />
            <div className="exp-card-inner">
              <p className="exp-num">{exp.num}</p>
              <p className="exp-year">{exp.year}</p>
              <h3 className="exp-role">{exp.role}</h3>
              <div className="exp-company-wrap">
                <p className="exp-company">{exp.company}</p>
                <p className="exp-location">{exp.location}</p>
              </div>
              <p className="exp-desc">{exp.desc}</p>
              <div className="exp-tags">
                {exp.tags.map((tag) => (
                  <span key={tag} className="exp-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="exp-spacer" />
      </div>
    </div>
  )
}
