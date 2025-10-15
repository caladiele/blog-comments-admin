// src/components/atoms/RecipeMetaBadge.tsx
import '@/app/styles/recipe-meta-badge.css';

interface RecipeMetaBadgeProps {
  icon: 'time' | 'tag';
  label: string;
}

export default function RecipeMetaBadge({ icon, label }: RecipeMetaBadgeProps) {
  return (
    <div className="recipe-meta-badge">
      {icon === 'time' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path fill="#C5CAC4" fillOpacity=".4" stroke="#585863" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".68" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Z" />
          <path stroke="#585863" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".68" d="M11.45 7.6v6.601h4.95" />
        </svg>
      )}
      {icon === 'tag' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" r="11" fill="#C5CAC4" fillOpacity=".4" />
          <circle cx="11" cy="11" r="10.5" stroke="#585863" strokeOpacity=".68" />
          <path fill="#85868C" d="m15.292 10.165-1.276-.644V7.065a.235.235 0 0 0-.235-.237h-1.875a.235.235 0 0 0-.234.237v1.273L10.605 7.8a.233.233 0 0 0-.21 0l-4.687 2.365a.238.238 0 0 0-.105.318l.469.946a.233.233 0 0 0 .314.106l.598-.302v5.295c0 .13.105.237.235.237h6.562c.13 0 .235-.106.235-.237v-5.295l.598.302c.116.059.257.01.314-.106l.47-.946a.238.238 0 0 0-.106-.318Zm-1.745-2.863v.473H12.14v-.473h1.406Zm-1.406.946h1.406v1.036l-1.406-.71v-.326Zm1.406 8.044H7.453v-5.296L10.5 9.458l3.047 1.538v5.296Zm1.067-5.286-4.009-2.024a.232.232 0 0 0-.21 0l-4.009 2.024-.259-.523L10.5 8.276l4.373 2.207-.26.523Z" />
          <path fill="#85868C" d="M8.46 11.629a1.587 1.587 0 0 0 0 2.227l1.875 1.893a.232.232 0 0 0 .332 0l1.875-1.893a1.587 1.587 0 0 0 0-2.227 1.552 1.552 0 0 0-2.041-.146 1.552 1.552 0 0 0-2.04.146Zm3.75.335a1.11 1.11 0 0 1 0 1.558l-1.71 1.726-1.708-1.726a1.111 1.111 0 0 1 0-1.559 1.083 1.083 0 0 1 1.543 0c.092.093.24.093.332 0a1.086 1.086 0 0 1 1.543 0Zm.468-5.678a.233.233 0 0 0 .332 0l1.406-1.42c.232-.234.36-.545.36-.876a1.24 1.24 0 0 0-.36-.878 1.223 1.223 0 0 0-1.572-.14 1.222 1.222 0 0 0-1.572.14 1.24 1.24 0 0 0-.36.878c0 .33.128.642.36.877l1.406 1.42Zm-1.075-2.839a.754.754 0 0 1 1.075 0c.092.093.24.093.332 0a.756.756 0 0 1 1.075 0 .767.767 0 0 1 .222.543.768.768 0 0 1-.222.542l-1.24 1.253-1.242-1.253a.767.767 0 0 1-.222-.542.77.77 0 0 1 .223-.543Z" />
        </svg>
      )}
      <span className="badge-label">{label}</span>
    </div>
  );
}