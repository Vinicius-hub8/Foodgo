import "./navbar.css";
import { useAuth } from "../../contexts/AuthContext";

export function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        {/* Ícone pin compacto */}
        <svg width="32" height="36" viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 4C20.536 4 8 16.536 8 32C8 52 36 76 36 76C36 76 64 52 64 32C64 16.536 51.464 4 36 4Z"
            fill="#D4960A" stroke="#7B4B00" strokeWidth="3"/>
          <path d="M36 8C22.745 8 12 18.745 12 32C12 50 36 72 36 72C36 72 60 50 60 32C60 18.745 49.255 8 36 8Z"
            fill="#E8A80C"/>
          <g transform="translate(36,32)" fill="white">
            <rect x="-3" y="4" width="6" height="14" rx="3"/>
            <rect x="-8" y="-14" width="3" height="12" rx="1.5"/>
            <rect x="-1.5" y="-14" width="3" height="12" rx="1.5"/>
            <rect x="5" y="-14" width="3" height="12" rx="1.5"/>
            <rect x="-8" y="-3" width="16" height="3" rx="1.5"/>
            <rect x="-3" y="-3" width="6" height="8" rx="1"/>
          </g>
        </svg>
        <span className="navbar-title">
          <span className="navbar-food">FOOD</span>
          <span className="navbar-go">GO!</span>
        </span>
      </div>

      <div className="navbar-sub">Restaurantes em Passo Fundo</div>

      <button className="navbar-logout" onClick={logout}>
        <span>Sair</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </header>
  );
}
