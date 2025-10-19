// src/lib/recipeHelpers.ts
import { IngredientSection } from './recipes';

/**
 * Convertit un temps au format "45m" ou "1h30" en format ISO 8601 (PT45M, PT1H30M)
 * @param time - Format: "45m", "1h", "1h30m", "2h15"
 * @returns Format ISO 8601: "PT45M", "PT1H", "PT1H30M"
 */
export function convertTimeToISO8601(time: string): string {
  if (!time) return '';
  
  // Nettoyer et normaliser
  const cleaned = time.toLowerCase().trim();
  
  // Extraire heures et minutes
  const hourMatch = cleaned.match(/(\d+)\s*h/);
  const minuteMatch = cleaned.match(/(\d+)\s*m/);
  
  const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
  
  // Construire format ISO
  let iso = 'PT';
  if (hours > 0) iso += `${hours}H`;
  if (minutes > 0) iso += `${minutes}M`;
  
  return iso || 'PT0M';
}

/**
 * Formatte le nombre de portions pour Schema.org
 */
export function formatRecipeYield(portions: number): string {
  return `${portions} ${portions > 1 ? 'portions' : 'portion'}`;
}

/**
 * Ajuste toutes les sections d'ingrédients selon le ratio
 */
export function adjustAllIngredients(
  ingredientSections: IngredientSection[],
  ratio: number
): IngredientSection[] {
  return ingredientSections.map(section => ({
    section: section.section,
    items: section.items.map(ingredient => 
      adjustIngredientQuantity(ingredient, ratio)
    )
  }));
}

/**
 * Calcule le ratio de portions pour ajuster les quantités d'ingrédients
 */
export function calculatePortionRatio(
  currentPortions: number, 
  originalPortions: number
): number {
  return currentPortions / originalPortions;
}

/**
 * Ajuste une quantité d'ingrédient selon le nouveau nombre de portions
 * Gère les fractions courantes et formats multiples
 * @param ingredient - Ex: "800 g de cenelles", "1/2 tasse de sucre", "2,5 kg de farine"
 * @param ratio - Ratio de portions (currentPortions / originalPortions)
 * @returns Quantité ajustée - Ex: "1600 g de cenelles"
 */
export function adjustIngredientQuantity(
  ingredient: string, 
  ratio: number
): string {
  // Pattern pour capturer : nombre, fraction, unité, reste
  const patterns = [
    // Format : "800 g de cenelles" ou "2.5 kg de farine"
    /^(\d+(?:[.,]\d+)?)\s*([a-zA-Zàâäéèêëïîôùûüç]*)\s+(.+)$/,
    // Format : "1/2 tasse de sucre"
    /^(\d+)\/(\d+)\s*([a-zA-Zàâäéèêëïîôùûüç]*)\s+(.+)$/,
    // Format : "2 1/2 tasses de lait" (nombre mixte)
    /^(\d+)\s+(\d+)\/(\d+)\s*([a-zA-Zàâäéèêëïîôùûüç]*)\s+(.+)$/
  ];

  // Essayer pattern 1 (décimal simple)
  let match = ingredient.match(patterns[0]);
  if (match) {
    const [, quantityStr, unit, rest] = match;
    const quantity = parseFloat(quantityStr.replace(',', '.'));
    const adjusted = quantity * ratio;
    
    return formatAdjustedQuantity(adjusted, unit, rest);
  }

  // Essayer pattern 2 (fraction)
  match = ingredient.match(patterns[1]);
  if (match) {
    const [, numerator, denominator, unit, rest] = match;
    const quantity = parseInt(numerator) / parseInt(denominator);
    const adjusted = quantity * ratio;
    
    return formatAdjustedQuantity(adjusted, unit, rest);
  }

  // Essayer pattern 3 (nombre mixte)
  match = ingredient.match(patterns[2]);
  if (match) {
    const [, whole, numerator, denominator, unit, rest] = match;
    const quantity = parseInt(whole) + (parseInt(numerator) / parseInt(denominator));
    const adjusted = quantity * ratio;
    
    return formatAdjustedQuantity(adjusted, unit, rest);
  }

  // Pas de nombre trouvé, retourner tel quel
  return ingredient;
}

/**
 * Formate une quantité ajustée avec gestion des fractions courantes
 */
function formatAdjustedQuantity(
  quantity: number, 
  unit: string, 
  rest: string
): string {
  // Arrondir intelligemment
  let formatted: string;
  
  if (quantity < 1) {
    // Petites quantités : essayer de convertir en fractions courantes
    const fractions: Record<string, string> = {
      '0.25': '1/4',
      '0.33': '1/3',
      '0.5': '1/2',
      '0.66': '2/3',
      '0.75': '3/4'
    };
    
    const rounded = Math.round(quantity * 100) / 100;
    formatted = fractions[rounded.toFixed(2)] || rounded.toString().replace('.', ',');
  } else if (quantity < 10) {
    // Quantités moyennes : 1 décimale
    const rounded = Math.round(quantity * 10) / 10;
    formatted = rounded % 1 === 0 
      ? rounded.toString() 
      : rounded.toString().replace('.', ',');
  } else {
    // Grandes quantités : arrondir à l'unité
    formatted = Math.round(quantity).toString();
  }
  
  return `${formatted} ${unit} ${rest}`.trim();
}