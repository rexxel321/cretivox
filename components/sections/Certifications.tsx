'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CERTIFICATIONS = [
  {
    num: '01',
    title: 'Belajar Dasar AI',
    issuer: 'Dicoding Indonesia',
    type: 'Course Certificate',
    year: '2026',
    credential: 'ERZR2VOMQPYV',
    desc: 'Completed foundational Artificial Intelligence course covering AI concepts, machine learning, and deep learning fundamentals.',
    tags: ['Verified', 'Dicoding', 'AI', 'Deep Learning'],
    image: '/photos/cert-ai-dasar.png',
  },
  {
    num: '02',
    title: 'Memulai Pemrograman dengan Python',
    issuer: 'Dicoding Indonesia',
    type: 'Course Certificate',
    year: '2026',
    credential: '1OP8RVO6QZQK',
    desc: 'Learned Python programming fundamentals including data structures, algorithms, and application development.',
    tags: ['Verified', 'Dicoding', 'Python', 'Programming'],
    image: '/photos/cert-python.png',
  },
  {
    num: '03',
    title: 'AI Praktis untuk Produktivitas',
    issuer: 'Dicoding Indonesia',
    type: 'Course Certificate',
    year: '2026',
    credential: '4EXG1ORLDPRL',
    desc: 'Explored practical AI applications for productivity, prompt engineering techniques, and AI ethics in the workplace.',
    tags: ['Verified', 'Dicoding', 'AI', 'Productivity'],
    image: '/photos/cert-ai-produktivitas.png',
  },
  {
    num: '04',
    title: 'Getting Started with Data',
    issuer: 'IBM SkillsBuild',
    type: 'Completion Certificate',
    year: '2026',
    credential: 'PLAN-14F2691E3A32',
    desc: 'Completed introductory data course covering fundamental data concepts and practical data analysis skills.',
    tags: ['IBM', 'SkillsBuild', 'Data'],
    image: '/photos/cert-ibm-start-data.png',
  },
  {
    num: '05',
    title: 'Classifying Data Using IBM Granite',
    issuer: 'IBM SkillsBuild',
    type: 'Completion Certificate',
    year: '2026',
    credential: 'ALM-COURSE_4058910',
    desc: 'Completed course on data classification using IBM Granite, covering classification techniques and practical applications (1 hr 30 mins).',
    tags: ['IBM', 'SkillsBuild', 'Granite', 'Data Classification'],
    image: '/photos/cert-ibm-classify-data.png',
  },
]

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const stage = section.querySelector<HTMLElement>('.cert-stage')
    if (!stage) return

    const ctx = gsap.context(() => {
      const cards = Array.from(section.querySelectorAll<HTMLElement>('.cert-card'))

      gsap.from('.cert-label, .cert-heading-line, .cert-copy, .cert-stats', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      })

      gsap.to('.cert-ring', {
        rotate: 360,
        duration: 50,
        repeat: -1,
        ease: 'none',
      })

      gsap.to('.cert-ring--inner', {
        rotate: -360,
        duration: 34,
        repeat: -1,
        ease: 'none',
      })

      gsap.to('.cert-core', {
        scale: 1.06,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 10%',
          end: '+=125%',
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.from('.cert-stage', {
        scale: 0.94,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
      }, 0)

      tl.from('.cert-core', {
        scale: 0.18,
        rotation: -160,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.8)',
      }, 0)

      tl.from('.cert-ring', {
        scale: 0.2,
        opacity: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.08,
      }, 0)

      tl.fromTo(cards,
        {
          y: 70,
          scale: 0.88,
          rotationX: -14,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          rotationX: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
        },
        0.18
      )

      tl.from('.cert-card-media', {
        scale: 1.08,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
      }, 0.36)
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="certifications" id="certifications">
      <div className="cert-shell">
        <div className="cert-header">
          <div>
            <span className="cert-label section-label">005 — Licenses & Certifications</span>
            <h2 className="cert-heading">
              <span className="cert-heading-line">License</span>
              <span className="cert-heading-line cert-heading-accent">&amp;</span>
              <span className="cert-heading-line">Certification.</span>
            </h2>
          </div>

          <div className="cert-copy-wrap">
            <p className="cert-copy">
              A curated collection of professional certificates, licenses, and badges from Dicoding, IBM, and other industry-recognized platforms.
            </p>
            <div className="cert-stats">
              <div>
                <span className="cert-stat-value">{String(CERTIFICATIONS.length).padStart(2, '0')}</span>
                <span className="cert-stat-label">Template slots</span>
              </div>
              <div>
                <span className="cert-stat-value">GSAP</span>
                <span className="cert-stat-label">Scroll animation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cert-stage">
          <div className="cert-grid" aria-hidden="true" />
          <div className="cert-ring cert-ring--outer" aria-hidden="true" />
          <div className="cert-ring cert-ring--inner" aria-hidden="true" />

          <div className="cert-core">
            <span>Vault</span>
            <strong>Unlocked</strong>
          </div>

          <div className="cert-cards">
            {CERTIFICATIONS.map((cert, i) => (
              <article key={cert.num} className="cert-card">
                <div className="cert-card-media">
                  {cert.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cert.image} alt={cert.title} className="cert-card-image" />
                  ) : (
                    <div className="cert-card-media-empty">
                      <span>Certificate Image</span>
                      <p>Drop a file in /public/photos and set its path here.</p>
                    </div>
                  )}
                </div>

                <div className="cert-card-top">
                  <span className="cert-card-num">{cert.num}</span>
                  <span className="cert-card-type">{cert.type}</span>
                </div>

                <h3 className="cert-card-title">{cert.title}</h3>
                <p className="cert-card-issuer">{cert.issuer}</p>
                <p className="cert-card-desc">{cert.desc}</p>

                <div className="cert-card-meta">
                  <div>
                    <span className="cert-meta-label">Year</span>
                    <span className="cert-meta-value">{cert.year}</span>
                  </div>
                  <div>
                    <span className="cert-meta-label">Credential</span>
                    <span className="cert-meta-value">{cert.credential}</span>
                  </div>
                </div>

                <div className="cert-card-tags">
                  {cert.tags.map((tag) => (
                    <span key={tag} className="cert-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="cert-card-glow" />
                <div className="cert-card-index">{String(i + 1).padStart(2, '0')}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
