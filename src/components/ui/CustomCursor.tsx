'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import type { CursorState } from '@/types'

interface CursorContextValue {
  setCursorState: (state: CursorState) => void
}

const CursorContext = createContext<CursorContextValue>({ setCursorState: () => {} })

export function useCursor() {
  return useContext(CursorContext)
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [isMobile, setIsMobile] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [magneticRect, setMagneticRect] = useState<{ width: number, height: number, radius: string } | null>(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Super fast tracking spring
  const springConfig = { damping: 40, stiffness: 1200, mass: 0.05 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const onMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, [data-magnetic]') as HTMLElement | null

      if (target && cursorState !== 'view' && cursorState !== 'artist' && cursorState !== 'feature') {
        const rect = target.getBoundingClientRect()
        const computedStyle = window.getComputedStyle(target)
        
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const distanceX = e.clientX - centerX
        const distanceY = e.clientY - centerY
        
        mouseX.set(centerX + distanceX * 0.15)
        mouseY.set(centerY + distanceY * 0.15)
        
        setMagneticRect({ 
          width: rect.width + 8, 
          height: rect.height + 8, 
          radius: computedStyle.borderRadius === '0px' ? '8px' : computedStyle.borderRadius 
        })
      } else {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
        setMagneticRect(null)
      }
    }
    
    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [isMobile, mouseX, mouseY])

  const getLabel = () => {
    switch (cursorState) {
      case 'view': return 'View'
      case 'artist': return 'Artist'
      case 'feature': return 'Feature Me'
      case 'link': return ''
      default: return ''
    }
  }

  const isMagneticActive = magneticRect && cursorState !== 'view' && cursorState !== 'artist' && cursorState !== 'feature'

  const getSize = () => {
    if (isMagneticActive) return magneticRect.width // Will be overridden by explicit width/height in animate
    if (isClicking && cursorState === 'default') return 8 // small dot shrinks on click
    if (isClicking && cursorState === 'link') return 24 // link dot shrinks slightly
    if (isClicking) return 64 // labels shrink slightly on click
    
    switch (cursorState) {
      case 'view': return 72
      case 'artist': return 72
      case 'feature': return 80
      case 'link': return 36
      default: return 12
    }
  }

  const label = getLabel()
  const size = getSize()

  if (isMobile) {
    return (
      <CursorContext.Provider value={{ setCursorState }}>
        {children}
      </CursorContext.Provider>
    )
  }

  return (
    <CursorContext.Provider value={{ setCursorState }}>
      {children}
      <motion.div
        aria-hidden="true"
        animate={{
          width: isMagneticActive ? magneticRect.width : size,
          height: isMagneticActive ? magneticRect.height : size,
          border: cursorState === 'default' || cursorState === 'link' || isMagneticActive ? '0px solid #fff' : '1px solid rgba(255,255,255,0.4)',
          backgroundColor: isMagneticActive ? 'rgba(255,255,255,0.1)' : (cursorState === 'default' || cursorState === 'link' ? '#fff' : 'rgba(255,255,255,0.15)'),
          backdropFilter: cursorState === 'default' || cursorState === 'link' ? 'none' : 'blur(8px)',
          borderRadius: isMagneticActive ? magneticRect.radius : '50%',
        }}
        transition={{ type: 'spring', bounce: isMagneticActive ? 0.1 : 0.3, duration: isMagneticActive ? 0.3 : 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: cursorState === 'default' || cursorState === 'link' || isMagneticActive ? 'difference' : 'normal',
          zIndex: 999999,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'width, height, transform',
        }}
      >
        <AnimatePresence mode="wait">
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: -4 }}
              transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#fff',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </CursorContext.Provider>
  )
}


