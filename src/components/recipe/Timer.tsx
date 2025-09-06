'use client'

import { useState, useEffect } from 'react'

interface TimerProps {
  duration: number // en minutes
  label?: string
  className?: string
  onComplete?: () => void
}

export default function Timer({ 
  duration, 
  label,
  className = "",
  onComplete 
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60) // en secondes
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            setIsRunning(false)
            setIsComplete(true)
            onComplete?.()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, onComplete])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, '0')
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsComplete(false)
    setTimeLeft(duration * 60)
  }

  if (isComplete) {
    return (
      <div className={`inline-flex items-center gap-2 bg-green-100 border border-green-300 px-4 py-2 rounded-full ${className}`}>
        <span className="text-green-600 font-medium">✅ Terminé !</span>
        {label && <span className="text-green-700 text-sm">({label})</span>}
        <button
          onClick={handleReset}
          className="text-xs text-blue-600 hover:underline ml-2"
        >
          Recommencer
        </button>
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-4 py-2 rounded-full ${className}`}>
      {/* Icône timer */}
      <span className="text-orange-600">⏱️</span>
      
      {/* Temps affiché */}
      <span className="font-mono text-sm font-semibold text-gray-900">
        {formatTime(minutes)}:{formatTime(seconds)}
      </span>
      
      {/* Label optionnel */}
      {label && (
        <span className="text-sm text-gray-600">({label})</span>
      )}
      
      {/* Boutons de contrôle */}
      <div className="flex gap-1">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="bg-green-500 text-white px-3 py-1 text-xs rounded hover:bg-green-600 transition-colors"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600 transition-colors"
          >
            Pause
          </button>
        )}
        
        {(isRunning || timeLeft !== duration * 60) && (
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-3 py-1 text-xs rounded hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}