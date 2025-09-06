// Export tous les composants de recette
export { default as PortionCalculator } from './PortionCalculator'
export { default as IngredientList } from './IngredientList'
export { default as Timer } from './Timer'
export { default as ShoppingList } from './ShoppingList'
export { default as EnvironmentalImpact } from './EnvironmentalImpact'
export { default as Alert } from './Alert'

// Types pour les composants
export interface Ingredient {
  name: string
  amount: number | string
  unit: string
  essential?: boolean
  seasonal?: boolean
  tip?: string
  category?: string
}

export interface ImpactData {
  co2Reduction: number      // Pourcentage de réduction CO2
  waterSaving: number       // Pourcentage d'économie d'eau
  landSaving: number        // Pourcentage d'économie de terre
  animalsSaved?: number     // Nombre d'animaux sauvés par portion
}