import "./logo.css";

// Logo FoodGo! — pin dourado com garfo + tipografia FOOD(amarelo) GO!(vermelho)
export const Logo = ({ size = "md" }) => {
  const scale = size === "sm" ? 0.6 : size === "lg" ? 1.3 : 1;
  return (
    <div className="logo-container" style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
      {/* Ícone: pin com garfo */}
      <svg width="72" height="80" viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sombra suave */}
        <ellipse cx="36" cy="76" rx="14" ry="4" fill="rgba(0,0,0,0.10)" />
        {/* Body do pin */}
        <path d="M36 4C20.536 4 8 16.536 8 32C8 52 36 76 36 76C36 76 64 52 64 32C64 16.536 51.464 4 36 4Z"
          fill="#D4960A" stroke="#7B4B00" strokeWidth="3"/>
        {/* Brilho interno do pin */}
        <path d="M36 8C22.745 8 12 18.745 12 32C12 50 36 72 36 72C36 72 60 50 60 32C60 18.745 49.255 8 36 8Z"
          fill="#E8A80C"/>
        {/* Highlight */}
        <ellipse cx="26" cy="20" rx="5" ry="7" fill="rgba(255,255,255,0.30)" transform="rotate(-20 26 20)"/>
        {/* Garfo */}
        <g transform="translate(36,32)" fill="white">
          {/* Cabo */}
          <rect x="-3" y="4" width="6" height="14" rx="3"/>
          {/* Dentes */}
          <rect x="-8" y="-14" width="3" height="12" rx="1.5"/>
          <rect x="-1.5" y="-14" width="3" height="12" rx="1.5"/>
          <rect x="5" y="-14" width="3" height="12" rx="1.5"/>
          {/* Base dos dentes */}
          <rect x="-8" y="-3" width="16" height="3" rx="1.5"/>
          <rect x="-3" y="-3" width="6" height="8" rx="1"/>
        </g>
      </svg>

      {/* Texto FOODGO! */}
      <div className="logo-wordmark">
        <span className="logo-food">FOOD</span>
        <span className="logo-go">GO!</span>
      </div>
    </div>
  );
};
