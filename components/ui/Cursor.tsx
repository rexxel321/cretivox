'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3' })
    const xFollower = gsap.quickTo(follower, 'x', { duration: 0.4, ease: 'power3' })
    const yFollower = gsap.quickTo(follower, 'y', { duration: 0.4, ease: 'power3' })

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      xFollower(e.clientX)
      yFollower(e.clientY)
    }

    const onEnterLink = () => cursor.classList.add('cursor--hover')
    const onLeaveLink = () => cursor.classList.remove('cursor--hover')

    window.addEventListener('mousemove', onMove)

    document.querySelectorAll('a, button, .btn-primary, .skill-card').forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
