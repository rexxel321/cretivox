'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  {
    name: 'React',
    category: 'Frontend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    invert: false,
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    logo: 'https://cdn.simpleicons.org/nextdotjs/ffffff',
    invert: false,
  },
  {
    name: 'Flutter',
    category: 'Mobile',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
    invert: false,
  },
  {
    name: 'Node.js',
    category: 'Backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    invert: false,
  },
  {
    name: 'Golang',
    category: 'Backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg',
    invert: false,
  },
  {
    name: 'Django',
    category: 'Backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg',
    invert: true, // green might be too dark, let's invert to white
  },
  {
    name: 'Supabase',
    category: 'Backend / BaaS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',
    invert: false,
  },
  {
    name: 'Firebase',
    category: 'Backend / BaaS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg',
    invert: false,
  },
  {
    name: 'TensorFlow',
    category: 'AI / ML',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    invert: false,
  },
  {
    name: 'PyTorch',
    category: 'AI / ML',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
    invert: false,
  },
  {
    name: 'Figma',
    category: 'UI / UX',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    invert: false,
  },
  {
    name: 'Git',
    category: 'Version Control',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    invert: false,
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // --- SVG path draw ---
      const paths = section.querySelectorAll<SVGPathElement>('.svg-draw-path')
      paths.forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        })
      })

      // --- Section header ---
      gsap.from('.skills-heading span', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.skills-header',
          start: 'top 80%',
        },
      })

      // --- Stagger cards ---
      gsap.from('.skill-card', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="skills" id="skills">
      {/* SVG decorative */}
      <svg className="skills-svg" width="400" height="400" viewBox="0 0 400 400" fill="none">
        <path
          className="svg-draw-path"
          d="M 200 10 L 390 110 L 390 290 L 200 390 L 10 290 L 10 110 Z"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
        <path
          className="svg-draw-path"
          d="M 200 40 L 360 130 L 360 270 L 200 360 L 40 270 L 40 130 Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>

      <div className="skills-header">
        <h2 className="skills-heading">
          <span>Tech</span>
          <span>Stack</span>
        </h2>
        <p className="skills-count">0{SKILLS.length} Technologies</p>
      </div>

      <div className="skills-grid">
        {SKILLS.map((skill, i) => (
          <div
            key={skill.name}
            className="skill-card"
          >
            <p className="skill-card-num">0{i + 1}</p>

            {/* Real tech logo */}
            <div className="skill-logo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={skill.logo}
                alt={`${skill.name} logo`}
                className="skill-logo"
                style={{
                  filter: skill.invert ? 'brightness(0) invert(1)' : 'none',
                }}
              />
            </div>

            <p className="skill-name">{skill.name}</p>
            <p className="skill-category">{skill.category}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
