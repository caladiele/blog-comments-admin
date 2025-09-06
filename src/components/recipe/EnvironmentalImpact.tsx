'use client'

import { useState } from 'react'

interface ImpactData {
  co2Reduction: number      // Pourcentage de réduction CO2
  waterSaving: number       // Pourcentage d'économie d'eau
  landSaving: number        // Pourcentage d'économie de terre
  animalsSaved?: number     // Nombre d'animaux sauvés par portion
}

interface EnvironmentalImpactProps {
  comparison?: string       // "vs bœuf", "vs porc", etc.
  impactData?: ImpactData
  className?: string
  showDetails?: boolean
}

// Données par défaut pour une recette végane typique vs bœuf
const defaultImpactData: ImpactData = {
  co2Reduction: 85,
  waterSaving: 90,
  landSaving: 75,
  animalsSaved: 0.1
}

export default function EnvironmentalImpact({ 
  comparison = "vs équivalent au bœuf",
  impactData = defaultImpactData,
  className = "",
  showDetails = true 
}: EnvironmentalImpactProps) {
  const [showEquivalents, setShowEquivalents] = useState(false)

  const ProgressBar = ({ value, color, label }: { value: number, color: string, label: string }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-lg font-bold ${color}`}>-{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full ${color.replace('text', 'bg')} transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )

  // Calculs d'équivalents concrets
  const equivalents = {
    co2: Math.round(impactData.co2Reduction * 2.5), // kg CO2 économisés
    water: Math.round(impactData.waterSaving * 50), // litres économisés
    land: Math.round(impactData.landSaving * 0.8), // m² économisés
    carKm: Math.round(impactData.co2Reduction * 2.5 * 5) // km de voiture équivalents
  }

  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-6 my-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center justify-center gap-2">
          🌍 Impact Environnemental
        </h3>
        <p className="text-green-600 text-sm">
          En choisissant cette recette végane {comparison}
        </p>
      </div>

      {/* Barres de progression principales */}
      <div className="mb-6">
        <ProgressBar 
          value={impactData.co2Reduction} 
          color="text-blue-600" 
          label="🌍 Émissions CO₂"
        />
        <ProgressBar 
          value={impactData.waterSaving} 
          color="text-cyan-600" 
          label="💧 Consommation d'eau"
        />
        <ProgressBar 
          value={impactData.landSaving} 
          color="text-green-600" 
          label="🌱 Utilisation des terres"
        />
      </div>

      {/* Métriques d'impact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-white rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">{equivalents.co2}kg</div>
          <div className="text-xs text-gray-600">CO₂ évité</div>
        </div>
        
        <div className="text-center p-3 bg-white rounded-lg border">
          <div className="text-2xl font-bold text-cyan-600">{equivalents.water}L</div>
          <div className="text-xs text-gray-600">Eau économisée</div>
        </div>
        
        <div className="text-center p-3 bg-white rounded-lg border">
          <div className="text-2xl font-bold text-green-600">{equivalents.land}m²</div>
          <div className="text-xs text-gray-600">Terre préservée</div>
        </div>

        {impactData.animalsSaved && (
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-orange-600">
              {impactData.animalsSaved < 1 ? 
                `${Math.round(impactData.animalsSaved * 10)}/10` : 
                Math.round(impactData.animalsSaved)}
            </div>
            <div className="text-xs text-gray-600">Animal{impactData.animalsSaved > 1 ? 'x' : ''} épargné{impactData.animalsSaved > 1 ? 's' : ''}</div>
          </div>
        )}
      </div>

      {/* Bouton pour voir les équivalents */}
      {showDetails && (
        <div className="text-center mb-4">
          <button
            onClick={() => setShowEquivalents(!showEquivalents)}
            className="text-sm text-green-700 hover:text-green-800 underline"
          >
            {showEquivalents ? 'Masquer' : 'Voir'} les équivalents concrets
          </button>
        </div>
      )}

      {/* Équivalents concrets */}
      {showEquivalents && (
        <div className="bg-white rounded-lg p-4 border border-green-200">
          <h4 className="font-medium text-gray-800 mb-3">💡 Pour vous donner une idée :</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">🚗</span>
              <span>Économie CO₂ = <strong>{equivalents.carKm} km</strong> de trajet en voiture</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-600">🚿</span>
              <span>Économie d'eau = <strong>{Math.round(equivalents.water / 25)} douches</strong> standard</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">🏠</span>
              <span>Terre préservée = <strong>{Math.round(equivalents.land)} m²</strong> (taille d'un studio)</span>
            </div>
          </div>
        </div>
      )}

      {/* Message motivant */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg text-center">
        <p className="text-sm font-medium">
          🎉 Bravo ! Chaque repas végan compte pour la planète
        </p>
        <p className="text-xs mt-1 opacity-90">
          Multipliez cet impact en partageant cette recette avec vos proches
        </p>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={() => {
            const text = `🌱 En choisissant cette recette végane, j'économise ${equivalents.co2}kg de CO₂, ${equivalents.water}L d'eau et ${equivalents.land}m² de terre ! Chaque repas compte pour la planète 🌍`
            if (navigator.share) {
              navigator.share({ text })
            } else {
              navigator.clipboard.writeText(text)
              alert('Message copié !')
            }
          }}
          className="text-xs bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors"
        >
          📱 Partager mon impact
        </button>
        
        <button
          onClick={() => window.open('https://www.notre-planete.info/environnement/alimentation.php', '_blank')}
          className="text-xs bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          📚 En savoir plus
        </button>
      </div>
    </div>
  )
}