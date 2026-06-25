import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function signIn(email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response?.status === 400) throw new Error(error.response.data || 'Usuário ou senha incorretos.');
    if (error.response?.status === 401) throw new Error('Usuário ou senha incorretos.');
    throw new Error('Erro ao autenticar. Verifique sua conexão.');
  }
}

export async function signUp(name, email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
    return response.data;
  } catch (error) {
    if (error.response?.status === 400) throw new Error(error.response.data || 'Dados inválidos.');
    if (error.response?.status === 409) throw new Error('E-mail já cadastrado.');
    throw new Error('Erro ao cadastrar. Verifique sua conexão.');
  }
}
