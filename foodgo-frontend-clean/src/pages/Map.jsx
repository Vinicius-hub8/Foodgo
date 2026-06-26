import { useEffect, useState, useRef, useCallback } from "react";
import { Navbar } from "../components";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { getPoints, postPoint, PONTOS_PF, CATEGORIAS } from "../services/mapService";
import { useAuth } from "../contexts/AuthContext";

const CENTRO_PF = { lat: -28.2614, lng: -52.4067 };
const MAP_CONTAINER = { width: "100%", height: "100%" };
const MAP_OPTIONS = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  zoomControlOptions: { position: 9 },
  styles: [
    { featureType: "poi.business", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
  ],
};

// Cores por categoria
const COR = {
  hamburguer: '#D4960A',
  pizza:      '#dc2626',
  mexicana:   '#16a34a',
  japonesa:   '#db2777',
  chinesa:    '#ca8a04',
  doces:      '#9333ea',
  padaria:    '#b45309',
  outro:      '#64748b',
};

function pinIcon(cor) {
  return {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    fillColor: cor,
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 2,
    scale: 1.8,
    anchor: { x: 12, y: 24 },
  };
}

// Modal para escolher categoria ao clicar no mapa
function ModalCategoria({ pos, onConfirm, onCancel }) {
  const [categoria, setCategoria] = useState('hamburguer');
  const [descricao, setDescricao] = useState('');

  if (!pos) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '32px 28px',
        width: '100%', maxWidth: '380px', boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1c1917', marginBottom: '4px' }}>
          📍 Adicionar ponto
        </h3>
        <p style={{ fontSize: '13px', color: '#78716c', marginBottom: '20px' }}>
          Lat: {pos.lat.toFixed(4)}, Lng: {pos.lng.toFixed(4)}
        </p>

        <label style={{ fontSize: '12px', fontWeight: '600', color: '#57534e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Tipo de comida
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', marginBottom: '16px' }}>
          {CATEGORIAS.filter(c => c.id !== 'todos').map(cat => (
            <button key={cat.id} onClick={() => setCategoria(cat.id)} style={{
              padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600',
              border: `2px solid ${cat.cor}`,
              background: categoria === cat.id ? cat.cor : 'transparent',
              color: categoria === cat.id ? '#fff' : cat.cor,
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        <label style={{ fontSize: '12px', fontWeight: '600', color: '#57534e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Descrição (opcional)
        </label>
        <input
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          placeholder="Ex: Melhor hambúrguer da cidade!"
          style={{
            width: '100%', marginTop: '6px', marginBottom: '20px',
            border: '2px solid #e7e5e4', borderRadius: '10px',
            padding: '10px 14px', fontSize: '14px', outline: 'none',
          }}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: '11px', borderRadius: '10px', border: '2px solid #e7e5e4',
            background: 'transparent', color: '#78716c', fontWeight: '600', cursor: 'pointer', fontSize: '14px',
          }}>
            Cancelar
          </button>
          <button onClick={() => onConfirm({ categoria, description: descricao, lat: pos.lat, lng: pos.lng })} style={{
            flex: 2, padding: '11px', borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, #C0001A, #D4960A)',
            color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '14px',
          }}>
            ✅ Salvar ponto
          </button>
        </div>
      </div>
    </div>
  );
}

export const Map = () => {
  const { token } = useAuth();
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [myPoints, setMyPoints] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [pendingPos, setPendingPos] = useState(null);
  const [loadingPoints, setLoadingPoints] = useState(false);
  const [toast, setToast] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
  });

  // Carrega pontos do usuário
  useEffect(() => {
    async function fetchMyPoints() {
      if (!token) return;
      setLoadingPoints(true);
      try {
        const data = await getPoints(token);
        setMyPoints(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoadingPoints(false);
      }
    }
    fetchMyPoints();
  }, [token]);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  const handleMapClick = useCallback((e) => {
    setPendingPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setSelectedMarker(null);
  }, []);

  const handleConfirmPoint = async (data) => {
    try {
      const saved = await postPoint(token, data);
      setMyPoints(prev => [...prev, {
        id: saved.id,
        title: saved.description || 'Meu ponto',
        categoria: saved.categoria,
        position: { lat: saved.lat, lng: saved.lng },
      }]);
      showToast('Ponto adicionado com sucesso!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setPendingPos(null);
    }
  };

  // Pontos PF filtrados por categoria
  const pontosPFVisiveis = categoriaAtiva === 'todos'
    ? PONTOS_PF
    : PONTOS_PF.filter(p => p.categoria === categoriaAtiva);

  const catInfo = CATEGORIAS.reduce((acc, c) => { acc[c.id] = c; return acc; }, {});

  if (!isLoaded) return (
    <div style={{
      height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: '#f5f0e8', gap: '16px',
    }}>
      <div style={{ fontSize: '48px' }}>🍽️</div>
      <p style={{ color: '#78716c', fontWeight: '600', fontSize: '16px' }}>Carregando o mapa...</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />

      {/* Barra de filtros */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #e7e5e4',
        padding: '12px 20px', display: 'flex', gap: '8px',
        overflowX: 'auto', flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        {CATEGORIAS.map(cat => {
          const ativo = categoriaAtiva === cat.id;
          const qtd = cat.id === 'todos' ? PONTOS_PF.length : PONTOS_PF.filter(p => p.categoria === cat.id).length;
          return (
            <button key={cat.id} onClick={() => { setCategoriaAtiva(cat.id); setSelectedMarker(null); }}
              style={{
                flexShrink: 0,
                padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700',
                border: `2px solid ${ativo ? cat.cor : cat.cor + '55'}`,
                background: ativo ? cat.cor : '#fff',
                color: ativo ? '#fff' : cat.cor,
                cursor: 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', gap: '6px',
                transform: ativo ? 'scale(1.05)' : 'scale(1)',
                boxShadow: ativo ? `0 4px 12px ${cat.cor}44` : 'none',
              }}>
              {cat.emoji} {cat.label}
              <span style={{
                fontSize: '11px', fontWeight: '800',
                background: ativo ? 'rgba(255,255,255,0.3)' : cat.cor + '22',
                borderRadius: '10px', padding: '1px 6px',
              }}>{qtd}</span>
            </button>
          );
        })}
      </div>

      {/* Mapa */}
      <div style={{ flex: 1, position: 'relative' }}>
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER}
          center={CENTRO_PF}
          zoom={14}
          options={MAP_OPTIONS}
          onClick={handleMapClick}
          onLoad={map => { mapRef.current = map; }}
        >
          {/* Pontos PF (restaurantes cadastrados) */}
          {pontosPFVisiveis.map(p => (
            <Marker
              key={p.id}
              position={{ lat: p.lat, lng: p.lng }}
              icon={pinIcon(COR[p.categoria] || '#64748b')}
              title={p.nome}
              onClick={() => setSelectedMarker({ ...p, tipo: 'pf' })}
            />
          ))}

          {/* Pontos do usuário */}
          {myPoints.map(p => (
            <Marker
              key={p.id}
              position={p.position}
              icon={pinIcon('#0ea5e9')}
              title={p.title}
              onClick={() => setSelectedMarker({ ...p, tipo: 'user' })}
            />
          ))}

          {/* InfoWindow */}
          {selectedMarker && selectedMarker.tipo === 'pf' && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div style={{ padding: '4px 2px', minWidth: '180px' }}>
                <div style={{
                  fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
                  color: COR[selectedMarker.categoria], letterSpacing: '0.5px', marginBottom: '4px',
                }}>
                  {catInfo[selectedMarker.categoria]?.emoji} {catInfo[selectedMarker.categoria]?.label}
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#1c1917', marginBottom: '4px' }}>
                  {selectedMarker.nome}
                </div>
                <div style={{ fontSize: '12px', color: '#78716c', marginBottom: '4px' }}>
                  📍 {selectedMarker.endereco}
                </div>
                <div style={{ fontSize: '13px', color: '#ca8a04', fontWeight: '600' }}>
                  ⭐ {selectedMarker.avaliacao}
                </div>
              </div>
            </InfoWindow>
          )}

          {selectedMarker && selectedMarker.tipo === 'user' && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div style={{ padding: '4px 2px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#0ea5e9', marginBottom: '4px' }}>
                  📌 MEU PONTO
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1c1917' }}>
                  {selectedMarker.title || 'Sem descrição'}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        {/* Legenda */}
        <div style={{
          position: 'absolute', bottom: '24px', left: '12px',
          background: 'rgba(255,255,255,0.96)', borderRadius: '14px',
          padding: '12px 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          fontSize: '12px', color: '#57534e', backdropFilter: 'blur(8px)',
        }}>
          <div style={{ fontWeight: '700', marginBottom: '6px', color: '#1c1917' }}>Legenda</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#D4960A' }} />
            Restaurantes PF
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#0ea5e9' }} />
            Meus pontos
          </div>
          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e7e5e4', color: '#a8a29e', fontSize: '11px' }}>
            Clique no mapa para adicionar
          </div>
        </div>

        {/* Loading overlay */}
        {loadingPoints && (
          <div style={{
            position: 'absolute', top: '16px', right: '16px',
            background: '#fff', borderRadius: '10px', padding: '10px 16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontSize: '13px',
            color: '#78716c', fontWeight: '500', display: 'flex', gap: '8px', alignItems: 'center',
          }}>
            <div style={{
              width: '14px', height: '14px', border: '2px solid #e7e5e4',
              borderTopColor: '#C0001A', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
            }} />
            Carregando seus pontos...
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div style={{
            position: 'absolute', bottom: '24px', right: '16px',
            background: toast.type === 'error' ? '#fef2f2' : '#f0fdf4',
            border: `1px solid ${toast.type === 'error' ? '#fecaca' : '#bbf7d0'}`,
            borderRadius: '12px', padding: '12px 18px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            fontSize: '14px', fontWeight: '600',
            color: toast.type === 'error' ? '#dc2626' : '#15803d',
          }}>
            {toast.type === 'error' ? '❌' : '✅'} {toast.msg}
          </div>
        )}
      </div>

      {/* Modal de categoria */}
      <ModalCategoria
        pos={pendingPos}
        onConfirm={handleConfirmPoint}
        onCancel={() => setPendingPos(null)}
      />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d6d3d1; border-radius: 4px; }
      `}</style>
    </div>
  );
};
