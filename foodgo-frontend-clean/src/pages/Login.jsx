import React, { useState } from "react";
import { Logo, Input, Button } from "../components";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const token = await signIn(email, senha);
      login(token);
      navigate("/map");
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f5f0e8 0%, #ede8dc 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#fff',
        borderRadius: '24px',
        padding: '44px 36px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
        border: '1px solid #e7e5e4',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <Logo />
        </div>
        <p style={{ textAlign: 'center', color: '#a8a29e', fontSize: '14px', marginBottom: '32px' }}>
          Descubra os melhores sabores de Passo Fundo
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <Input label="E-mail" placeholder="seu@email.com" type="email" required
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <Input label="Senha" placeholder="Sua senha..." type="password" required
              value={senha} onChange={e => setSenha(e.target.value)} />
          </div>

          {erro && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px',
              padding: '10px 14px', marginBottom: '16px', color: '#dc2626', fontSize: '14px',
            }}>
              ⚠️ {erro}
            </div>
          )}

          <Button type="submit" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Entrando...' : '🗺️ Entrar no Mapa'}
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#78716c' }}>
          Não tem conta?{' '}
          <Link to="/register" style={{ color: '#C0001A', fontWeight: '700', textDecoration: 'none' }}>
            Cadastre-se grátis
          </Link>
        </p>
      </div>
    </div>
  );
}
