'use client'

import { useState, useEffect } from 'react'

interface Ingredient {
  name: string
  amount: number | string
  unit: string
  essential?: boolean
  seasonal?: boolean
  category?: string
}

interface ShoppingListProps {
  ingredients: Ingredient[]
  basePortions?: number
  className?: string
  showCategories?: boolean
}

// Fonction pour catégoriser automatiquement les ingrédients
const categorizeIngredient = (name: string): string => {
  const lowerName = name.toLowerCase()
  
  if (lowerName.includes('lentille') || lowerName.includes('haricot') || lowerName.includes('pois chiche') || lowerName.includes('quinoa') || lowerName.includes('riz') || lowerName.includes('avoine') || lowerName.includes('farine')) {
    return 'Épicerie sèche'
  }
  if (lowerName.includes('épinard') || lowerName.includes('salade') || lowerName.includes('carotte') || lowerName.includes('oignon') || lowerName.includes('ail') || lowerName.includes('gingembre') || lowerName.includes('tomate')) {
    return 'Légumes frais'
  }
  if (lowerName.includes('pomme') || lowerName.includes('banane') || lowerName.includes('citron') || lowerName.includes('orange')) {
    return 'Fruits'
  }
  if (lowerName.includes('lait') || lowerName.includes('crème') || lowerName.includes('yaourt') || lowerName.includes('fromage')) {
    return 'Alternatives végétales'
  }
  if (lowerName.includes('huile') || lowerName.includes('vinaigre') || lowerName.includes('moutarde')) {
    return 'Condiments'
  }
  if (lowerName.includes('curcuma') || lowerName.includes('cumin') || lowerName.includes('paprika') || lowerName.includes('thym') || lowerName.includes('basilic') || lowerName.includes('sel') || lowerName.includes('poivre')) {
    return 'Épices & aromates'
  }
  
  return 'Autres'
}

export default function ShoppingList({ 
  ingredients, 
  basePortions = 4,
  className = "",
  showCategories = true 
}: ShoppingListProps) {
  const [currentPortions, setCurrentPortions] = useState(basePortions)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Synchroniser avec les portions globales
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
    
    if (adjustedAmount < 1) {
      return (Math.round(adjustedAmount * 100) / 100).toString()
    } else if (adjustedAmount < 10) {
      return (Math.round(adjustedAmount * 10) / 10).toString()
    } else {
      return Math.round(adjustedAmount).toString()
    }
  }

  // Organiser par catégories
  const categorizedIngredients = ingredients.reduce((acc, ingredient, index) => {
    const category = ingredient.category || categorizeIngredient(ingredient.name)
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push({ ...ingredient, index })
    return acc
  }, {} as Record<string, Array<Ingredient & { index: number }>>)

  const handleItemCheck = (key: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const generateShareText = () => {
    const listText = ingredients
      .map(ingredient => {
        const adjustedAmount = calculateAdjustedAmount(ingredient.amount)
        return `• ${adjustedAmount} ${ingredient.unit} ${ingredient.name}`
      })
      .join('\n')
    
    return `🛒 Liste de courses (${currentPortions} portions)\n\n${listText}`
  }

  const handleShare = async () => {
    const text = generateShareText()
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Liste de courses',
          text: text
        })
      } catch (err) {
        // Fallback to copy
        navigator.clipboard.writeText(text)
        alert('Liste copiée dans le presse-papier !')
      }
    } else {
      navigator.clipboard.writeText(text)
      alert('Liste copiée dans le presse-papier !')
    }
  }

  if (!isVisible) {
    return (
      <div className={`my-6 ${className}`}>
        <button
          onClick={() => setIsVisible(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          🛒 Générer la liste de courses
        </button>
      </div>
    )
  }

  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-6 my-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
          🛒 Liste de courses
          <span className="text-sm font-normal text-green-600">
            (pour {currentPortions} portion{currentPortions > 1 ? 's' : ''})
          </span>
        </h3>
        
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
          >
            📱 Partager
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-sm bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition-colors"
          >
            ✕ Fermer
          </button>
        </div>
      </div>

      {showCategories ? (
        <div className="space-y-6">
          {Object.entries(categorizedIngredients).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-medium text-green-700 mb-3 border-b border-green-200 pb-1">
                {category}
              </h4>
              <div className="space-y-2">
                {items.map((ingredient) => {
                  const adjustedAmount = calculateAdjustedAmount(ingredient.amount)
                  const itemKey = `${category}-${ingredient.index}`
                  const isChecked = checkedItems[itemKey]
                  
                  return (
                    <label 
                      key={itemKey}
                      className={`flex items-center gap-3 p-3 bg-white rounded border cursor-pointer hover:bg-gray-50 transition-colors ${
                        isChecked ? 'opacity-50 line-through' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked || false}
                        onChange={() => handleItemCheck(itemKey)}
                        className="text-green-600 rounded"
                      />
                      <span className="flex-1">
                        <span className="font-medium">
                          {adjustedAmount} {ingredient.unit}
                        </span>
                        <span className="ml-2">{ingredient.name}</span>
                        {ingredient.essential && (
                          <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            Essentiel
                          </span>
                        )}
                        {ingredient.seasonal && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            De saison
                          </span>
                        )}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {ingredients.map((ingredient, index) => {
            const adjustedAmount = calculateAdjustedAmount(ingredient.amount)
            const isChecked = checkedItems[index]
            
            return (
              <label 
                key={index}
                className={`flex items-center gap-3 p-3 bg-white rounded border cursor-pointer hover:bg-gray-50 transition-colors ${
                  isChecked ? 'opacity-50 line-through' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked || false}
                  onChange={() => handleItemCheck(index.toString())}
                  className="text-green-600 rounded"
                />
                <span className="flex-1">
                  <span className="font-medium">
                    {adjustedAmount} {ingredient.unit}
                  </span>
                  <span className="ml-2">{ingredient.name}</span>
                </span>
              </label>
            )
          })}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-green-200">
        <p className="text-sm text-green-600 flex items-center gap-2">
          💡 <span>Cochez les articles au fur et à mesure de vos achats</span>
        </p>
      </div>
    </div>
  )
}