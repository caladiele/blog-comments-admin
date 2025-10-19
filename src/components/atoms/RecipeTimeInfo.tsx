// src/components/atoms/RecipeTimeInfo.tsx
import { convertTimeToISO8601 } from '@/lib/recipeHelpers';
import '@/app/styles/recipe-time-info.css';

interface RecipeTimeInfoProps {
  total: string;       
  preparation: string; 
  cuisson?: string;     
}

export default function RecipeTimeInfo({ 
  total, 
  preparation, 
  cuisson 
}: RecipeTimeInfoProps) {
  return (
    <div className="recipe-time-info">
      <div className="time-item">
        <span className="time-label">Total:</span>
        <time 
          className="time-value"
          itemProp="totalTime" 
          dateTime={total}
        >
          {total}
        </time>
      </div>
      
      <span className="time-separator" aria-hidden="true">|</span>
      
      <div className="time-item">
        <span className="time-label">Préparation:</span>
        <time 
          className="time-value"
          itemProp="prepTime" 
          dateTime={preparation}
        >
          {preparation}
        </time>
      </div>
        {cuisson && (
        <>
            <span className="time-separator" aria-hidden="true">|</span>
            <div className="time-item">
              <span className="time-label">Cuisson:</span>
              <time 
                className="time-value"
                itemProp="cookTime" 
                dateTime={cuisson}
              >
                {cuisson}
              </time>
            </div>
        </>
        )}
    </div>
  );
}