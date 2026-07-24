'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    num: '01',
    title: 'FitBuddy',
    subtitle: 'AI Fitness Assistant Chatbot',
    desc: 'A web-based fitness assistant chatbot application using a Hybrid NLP architecture, combining a rule-based system for instant BMI/calorie calculations and a Generative AI Model to answer complex questions. Features chat history, conversation summarizing, and Llama 3 vs Gemini selection.',
    tags: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Python', 'Gemini'],
    year: '2024',
    url: 'https://github.com/rexxel321/final-nlp',
    accent: '#0d1527',
    image: 'ai chatbot.jpeg',
  },
  {
    num: '02',
    title: 'Yuana Bhakti Nusantara',
    subtitle: 'Volunteer Management Platform',
    desc: 'A full-stack volunteer management platform connecting volunteers with humanitarian organizations. Features event registration, volunteer hour tracking, impact dashboards, and real-time community service notifications.',
    tags: ['React', 'Node.js', 'TypeScript', 'CSS'],
    year: '2025',
    url: 'https://github.com/nopall-png/yayasanyuanabhakti',
    accent: '#162a1e',
    image: 'volunter.png',
  },
  {
    num: '03',
    title: 'Lumina AI',
    subtitle: 'AI Image Enhancer & Processor',
    desc: 'A web-based image processing application powered by artificial intelligence allowing automated background removal, beautify face enhancement, color correction, object removal, and style transfer. Powered by Flask, GFPGAN, Real-ESRGAN, and TensorFlow.',
    tags: ['Python', 'Flask', 'PyTorch', 'TensorFlow', 'OpenCV'],
    year: '2025',
    url: 'https://github.com/rexxel321/Lumina-ai',
    accent: '#21182c',
    image: 'Lumina Ai.png',
  },
  {
    num: '04',
    title: 'EmotiCare',
    subtitle: 'Emotion & Stress Level Detector',
    desc: 'An AI-based web application for emotion detection and real-time stress evaluation. Integrates face expression detection via camera, text sentiment/stress analysis, and self-assessment surveys via a Decision Support System.',
    tags: ['Python', 'Flask', 'TensorFlow', 'OpenCV', 'MySQL'],
    year: '2025',
    url: 'https://github.com/rexxel321/Emoticare',
    accent: '#291515',
    image: 'EmotiCare.png',
  },
  {
    num: '05',
    title: 'E-Learning Volcano',
    subtitle: 'Gamified Volcano Study Platform',
    desc: 'An interactive volcano-themed educational web application for elementary students. Turns learning into an adventure with Floor & Node Progression systems, integrated with Groq AI as a smart tutor.',
    tags: ['Next.js', 'React', 'TypeScript', 'Appwrite', 'Groq'],
    year: '2026',
    url: 'https://e-learning-softeng-project.vercel.app/auth/login',
    accent: '#281e0f',
    image: 'elearning1.png',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll<HTMLElement>('.project-card')

      // Set initial stacked positions (each card slightly below and smaller)
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i * 36,
          scale: 1 - i * 0.035,
          zIndex: cards.length - i,
          transformOrigin: 'top center',
        })
      })

      // --- Pin & deck scroll timeline ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // For each card except last: exit top, and shift all behind cards up
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return

        const slot = i // timeline position slot

        // Exit current card upward
        tl.to(card, {
          yPercent: -130,
          opacity: 0,
          scale: 0.92,
          ease: 'power2.inOut',
          duration: 1,
        }, slot)

        // Shift remaining cards forward (up + scale to their new position)
        for (let j = i + 1; j < cards.length; j++) {
          const newIndex = j - i - 1
          tl.to(cards[j], {
            y: newIndex * 36,
            scale: 1 - newIndex * 0.035,
            ease: 'power2.inOut',
            duration: 1,
          }, slot)
        }

        // Clip-path reveal on image of next card when it comes to front
        const nextImg = cards[i + 1]?.querySelector<HTMLElement>('.project-card-visual')
        if (nextImg) {
          tl.fromTo(nextImg,
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power4.inOut' },
            slot + 0.2
          )
        }
      })

      // Initial clip-path reveal for first card on section enter
      const firstImg = cards[0]?.querySelector<HTMLElement>('.project-card-visual')
      if (firstImg) {
        gsap.fromTo(firstImg,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          }
        )
      }

      // Header animate in
      gsap.from('.proj-label, .proj-heading', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      })

      // --- Magnetic hover on CTA buttons ---
      const magnets = section.querySelectorAll<HTMLElement>('.magnetic-btn')
      const cleanups: Array<() => void> = []

      magnets.forEach((btn) => {
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect()
          const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.4
          const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.4
          gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' })
        }
        const onLeave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
        }
        btn.addEventListener('mousemove', onMove)
        btn.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          btn.removeEventListener('mousemove', onMove)
          btn.removeEventListener('mouseleave', onLeave)
        })
      })

      return () => cleanups.forEach((fn) => fn())
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="projects" id="projects">
      {/* Section Header */}
      <div className="proj-header">
        <span className="proj-label section-label">006 — Projects</span>
        <h2 className="proj-heading">
          <span>Selected</span>
          <span>Work.</span>
        </h2>
        <p className="proj-count">{String(PROJECTS.length).padStart(2, '0')} Projects</p>
      </div>

      {/* Card Stack */}
      <div className="project-stack">
        {PROJECTS.map((project, i) => (
          <div
            key={project.num}
            className="project-card"
          >
            {/* Left: Info */}
            <div className="project-card-info">
              <div className="project-card-top">
                <p className="project-num">{project.num}</p>
                <p className="project-year">{project.year}</p>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-desc">{project.desc}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>

              <div className="project-cta">
                <a
                  href={project.url}
                  className="magnetic-btn"
                  id={`project-cta-${i}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project ↗
                </a>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="project-card-visual-wrap">
              <div
                className="project-card-visual"
                style={{ background: project.accent }}
              >
                {/* Real project visual screenshot */}
                {project.image && (
                  <img
                    src={`/photos/${project.image}`}
                    alt={project.title}
                    className="project-image"
                  />
                )}
                {/* Overlay code lines */}
                <div className="project-visual-inner">
                  <div className="project-visual-lines">
                    {[...Array(8)].map((_, li) => (
                      <div
                        key={li}
                        className="project-visual-line"
                        style={{
                          width: `${45 + ((i * 7 + li * 13) % 40)}%`,
                          opacity: 0.06 + li * 0.015,
                        }}
                      />
                    ))}
                  </div>
                  <div className="project-visual-label">
                    <span className="project-visual-num">{project.num}</span>
                    <span className="project-visual-name">{project.title}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
