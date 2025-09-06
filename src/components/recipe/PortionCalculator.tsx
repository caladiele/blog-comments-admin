'use client'

import { useState, useEffect } from 'react'

interface PortionCalculatorProps {
  defaultPortions?: number
  className?: string
  onPortionsChange?: (portions: number) => void
}

export default function PortionCalculator({ 
  defaultPortions = 4, 
  className = "",
  onPortionsChange 
}: PortionCalculatorProps) {
  const [portions, setPortions] = useState(defaultPortions)

  useEffect(() => {
    // Stocker la valeur globalement pour que les autres composants puissent l'utiliser
    if (typeof window !== 'undefined') {
      (window as any).currentPortions = portions
    }
    onPortionsChange?.(portions)
  }, [portions, onPortionsChange])

  const handleIncrease = () => {
    setPortions(prev => prev + 1)
  }

  const handleDecrease = () => {
    setPortions(prev => Math.max(1, prev - 1))
  }

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 my-6 ${className}`}>
      <h3 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
        🧮 Calculateur de portions
      </h3>
      
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">Portions :</span>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDecrease}
            className="w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center font-bold text-lg"
            disabled={portions <= 1}
          >
            −
          </button>
          
          <span className="font-bold text-2xl w-12 text-center text-blue-700">
            {portions}
          </span>
          
          <button 
            onClick={handleIncrease}
            className="w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center font-bold text-lg"
          >
            +
          </button>
        </div>
        
        <div className="ml-4 text-sm text-gray-600">
          <span className="hidden sm:inline">Toutes les quantités s'ajustent automatiquement</span>
          <span className="sm:hidden">Quantités ajustées</span>
        </div>
      </div>
    </div>
  )
}