'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'

type Mode = 'customer' | 'business'

interface ModeContextType {
  mode: Mode
  setMode: (mode: Mode) => void
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('business')

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.substring(1)
    if (hash === 'customer' || hash === 'business') {
      setMode(hash)
    }
  }, [])

  useEffect(() => {
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [handleHashChange])


  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider')
  }
  return context
}