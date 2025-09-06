'use client'

import { useState, useEffect } from 'react'

interface Ingredient {
  name: string
  amount: number | string
  unit: string
  essential?: boolean
  seasonal?: boolean
  tip?: string
}

interface IngredientListProps {
  ingredients: Ingredient[]
  basePortions?: number
  className?: string
}

export default function IngredientList({ 
  ingredients, 
  basePortions = 4,
  className = "" 
}: IngredientListProps) {
  const [currentPortions, setCurrentPortions] = useState(basePortions)

  useEffect(() => {
    // Vérifier périodiquement les portions globales
    const checkPortions = () => {
      if (typeof window !== 'undefined') {
        const globalPortions = (window as any).currentPortions
        if (globalPortions && globalPortions !== currentPortions) {
          setCurrentPortions(globalPortions)
        }
      }
    }

    const interval = setInterval(checkPortions, 100)
    return () => clearInterval(interval)
  }, [currentPortions])

  const calculateAdjustedAmount = (amount: number | string): string => {
    if (typeof amount === 'string') return amount
    
    const adjustedAmount = amount * (currentPortions / basePortions)
    
    // Arrondir intelligemment
    if (adjustedAmount < 1) {
      return (Math.round(adjustedAmount * 100) / 100).toString()
    } else if (adjustedAmount < 10) {
      return (Math.round(adjustedAmount * 10) / 10).toString()
    } else {
      return Math.round(adjustedAmount).toString()
    }
  }

  return (
    <div className={`my-6 ${className}`}>
      <div className="space-y-3">
        {ingredients.map((ingredient, index) => {
          const adjustedAmount = calculateAdjustedAmount(ingredient.amount)
          
          return (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                {/* Icône indicatrice */}
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  ingredient.essential ? 'bg-red-500' : 
                  ingredient.seasonal ? 'bg-green-500' : 
                  'bg-gray-400'
                }`}>
                  {ingredient.essential ? '!' : 
                   ingredient.seasonal ? '🌱' : 
                   '📦'}
                </span>
                
                {/* Nom de l'ingrédient */}
                <span className="font-medium text-gray-900">{ingredient.name}</span>
                
                {/* Tip optionnel */}
                {ingredient.tip && (
                  <span className="text-xs text-gray-500 italic">({ingredient.tip})</span>
                )}
              </div>
              
              {/* Quantité ajustée */}
              <div className="text-right">
                <span className="font-semibold text-gray-900 text-lg">
                  {adjustedAmount} {ingredient.unit}
                </span>
                {currentPortions !== basePortions && (
                  <div className="text-xs text-blue-600">
                    (base: {ingredient.amount} {ingredient.unit})
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Légende */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
          <span>Essentiel</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-xs">🌱</span>
          <span>De saison</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">📦</span>
          <span>Standard</span>
        </div>
      </div>
    </div>
  )
}