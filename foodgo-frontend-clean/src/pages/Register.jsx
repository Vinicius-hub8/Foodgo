import React, { useState } from "react";
import { Logo, Input, Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await signUp(name, email, senha);
      setSucesso(true);
      setTimeout(() => navigate("/login"), 1500);
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
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <Logo />
        </div>
        <p style={{ textAlign: 'center', color: '#a8a29e', fontSize: '14px', marginBottom: '32px' }}>
          Crie sua conta e explore Passo Fundo
        </p>

        {sucesso ? (
          <div style={{
            textAlign: 'center', padding: '24px',
            background: '#f0fdf4', borderRadius: '14px', border: '1px solid #bbf7d0',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>✅</div>
            <p style={{ color: '#15803d', fontWeight: '700', fontSize: '16px' }}>Conta criada!</p>
            <p style={{ color: '#78716c', fontSize: '13px' }}>Redirecionando para o login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <Input label="Nome completo" placeholder="Seu nome..." type="text" required
                value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Input label="E-mail" placeholder="seu@email.com" type="email" required
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div style={{ marginBottom: '4px' }}>
              <Input label="Senha" placeholder="Mínimo 8 caracteres..." type="password" required
                value={senha} onChange={e => setSenha(e.target.value)} />
            </div>
            <p style={{ fontSize: '12px', color: '#a8a29e', marginBottom: '22px' }}>
              Precisa ter maiúscula, minúscula e número.
            </p>

            {erro && (
              <div style={{
                background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px',
                padding: '10px 14px', marginBottom: '16px', color: '#dc2626', fontSize: '14px',
              }}>
                ⚠️ {erro}
              </div>
            )}

            <Button type="submit" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Criando conta...' : '✅ Criar Conta'}
            </Button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#78716c' }}>
          Já tem conta?{' '}
          <Link to="/login" style={{ color: '#C0001A', fontWeight: '700', textDecoration: 'none' }}>
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
