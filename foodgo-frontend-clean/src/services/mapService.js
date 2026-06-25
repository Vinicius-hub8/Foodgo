import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const BASE_URL = `${API_URL}/ws/point`;

export const PONTOS_PF = [
  { id: 'pf-1',  nome: 'Burger House PF',          categoria: 'hamburguer', lat: -28.2602, lng: -52.4088, avaliacao: 4.3, endereco: 'Rua Morom, 1050 - Centro' },
  { id: 'pf-2',  nome: 'Boi na Brasa Burger',       categoria: 'hamburguer', lat: -28.2643, lng: -52.4062, avaliacao: 4.5, endereco: 'Av. Brasil, 650 - Centro' },
  { id: 'pf-3',  nome: 'Smash Bros Burger',         categoria: 'hamburguer', lat: -28.2571, lng: -52.4101, avaliacao: 4.6, endereco: 'Rua Independência, 320 - Centro' },
  { id: 'pf-4',  nome: 'Pizzaria Bella Napoli',     categoria: 'pizza',      lat: -28.2614, lng: -52.4067, avaliacao: 4.5, endereco: 'Av. Brasil, 1200 - Centro' },
  { id: 'pf-5',  nome: 'Dom Pizza',                 categoria: 'pizza',      lat: -28.2598, lng: -52.4082, avaliacao: 4.2, endereco: 'Rua Morom, 744 - Centro' },
  { id: 'pf-6',  nome: 'Pizzaria Italiana',         categoria: 'pizza',      lat: -28.2551, lng: -52.4121, avaliacao: 4.7, endereco: 'Av. Sete de Setembro, 890' },
  { id: 'pf-7',  nome: 'El Rancho Mexicano',        categoria: 'mexicana',   lat: -28.2588, lng: -52.4033, avaliacao: 4.4, endereco: 'Rua Paissandu, 450 - Centro' },
  { id: 'pf-8',  nome: 'Tacos & Cia',               categoria: 'mexicana',   lat: -28.2631, lng: -52.4115, avaliacao: 4.1, endereco: 'Av. Brasil, 2300 - Boqueirão' },
  { id: 'pf-9',  nome: 'Sushi Passo Fundo',         categoria: 'japonesa',   lat: -28.2625, lng: -52.4075, avaliacao: 4.4, endereco: 'Av. Brasil, 900 - Centro' },
  { id: 'pf-10', nome: 'Hana Japonesa',             categoria: 'japonesa',   lat: -28.2611, lng: -52.4019, avaliacao: 4.6, endereco: 'Rua Independência, 1100' },
  { id: 'pf-11', nome: 'Sakura Sushi Bar',          categoria: 'japonesa',   lat: -28.2554, lng: -52.4088, avaliacao: 4.5, endereco: 'Rua General Neto, 678' },
  { id: 'pf-12', nome: 'Dragão Dourado',            categoria: 'chinesa',    lat: -28.2599, lng: -52.4050, avaliacao: 4.0, endereco: 'Rua Morom, 320 - Centro' },
  { id: 'pf-13', nome: 'China Palace',              categoria: 'chinesa',    lat: -28.2648, lng: -52.4030, avaliacao: 4.2, endereco: 'Av. Brasil, 1550 - Centro' },
  { id: 'pf-14', nome: 'Confeitaria Dulce',         categoria: 'doces',      lat: -28.2591, lng: -52.4048, avaliacao: 4.8, endereco: 'Rua General Neto, 150' },
  { id: 'pf-15', nome: 'Doce Encanto',              categoria: 'doces',      lat: -28.2663, lng: -52.4038, avaliacao: 4.7, endereco: 'Rua Independência, 300' },
  { id: 'pf-16', nome: 'Sorveteria La Palma',       categoria: 'doces',      lat: -28.2577, lng: -52.4071, avaliacao: 4.6, endereco: 'Av. Brasil, 780 - Centro' },
  { id: 'pf-17', nome: 'Padaria Central PF',        categoria: 'padaria',    lat: -28.2619, lng: -52.4055, avaliacao: 4.5, endereco: 'Rua Paissandu, 210 - Centro' },
  { id: 'pf-18', nome: 'Panifício São Cristóvão',   categoria: 'padaria',    lat: -28.2541, lng: -52.4110, avaliacao: 4.3, endereco: 'Av. Sete de Setembro, 560' },
  { id: 'pf-19', nome: 'Pão da Vovó',              categoria: 'padaria',    lat: -28.2688, lng: -52.4079, avaliacao: 4.6, endereco: 'Rua Independência, 890' },
];

export const CATEGORIAS = [
  { id: 'todos',      label: 'Todos',       emoji: '🍽️', cor: '#78716c' },
  { id: 'hamburguer', label: 'Hambúrguer',  emoji: '🍔', cor: '#ea580c' },
  { id: 'pizza',      label: 'Pizza',       emoji: '🍕', cor: '#dc2626' },
  { id: 'mexicana',   label: 'Mexicana',    emoji: '🌮', cor: '#16a34a' },
  { id: 'japonesa',   label: 'Japonesa',    emoji: '🍣', cor: '#db2777' },
  { id: 'chinesa',    label: 'Chinesa',     emoji: '🥡', cor: '#ca8a04' },
  { id: 'doces',      label: 'Doces',       emoji: '🍰', cor: '#9333ea' },
  { id: 'padaria',    label: 'Padaria',     emoji: '🥐', cor: '#b45309' },
];

export async function getPoints(token) {
  try {
    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.map(point => ({
      id: point.id,
      title: point.description || 'Meu ponto',
      categoria: point.categoria || 'outro',
      position: { lat: point.lat, lng: point.lng },
    }));
  } catch (error) {
    throw new Error(error.response?.data || 'Erro ao buscar pontos');
  }
}

export async function getPointsByCategoria(token, categoria) {
  try {
    const url = categoria === 'todos' ? BASE_URL : `${BASE_URL}/categoria/${categoria}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.map(point => ({
      id: point.id,
      title: point.description || 'Ponto',
      categoria: point.categoria || 'outro',
      position: { lat: point.lat, lng: point.lng },
    }));
  } catch (error) {
    throw new Error(error.response?.data || 'Erro ao buscar pontos');
  }
}

export async function postPoint(token, pointData) {
  try {
    const response = await axios.post(BASE_URL, pointData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 201) return response.data;
    throw new Error('Erro ao cadastrar ponto');
  } catch (error) {
    throw new Error(error.response?.data || 'Erro ao cadastrar ponto');
  }
}

export async function putPoint(token, id, pointData) {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, pointData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Erro ao atualizar ponto');
  }
}

export async function deletePoint(token, id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error(error.response?.data || 'Erro ao deletar ponto');
  }
}
