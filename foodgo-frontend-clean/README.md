# FoodGo

Aplicação web para descobrir e cadastrar restaurantes em um mapa interativo. Usuários autenticados podem clicar no mapa para adicionar pontos (restaurantes) categorizados por tipo de comida, e visualizar os pontos cadastrados por outros usuários.

## Funcionalidades

- Cadastro e login de usuários (autenticação via JWT)
- Cadastro de pontos no mapa por categoria (hambúrguer, pizza, japonesa, chinesa, mexicana, doces, padaria, outro)
- Visualização de todos os pontos de uma categoria no mapa
- Edição e remoção de pontos (apenas pelo dono)

## Tecnologias

- React 19 + Vite
- Tailwind CSS
- @react-google-maps/api
- Axios
- Backend: [foodgo-backend](https://github.com/Vinicius-hub8/foodgo-backend) (Spring Boot + PostgreSQL)

## Como rodar

```bash
git clone https://github.com/Vinicius-hub8/Foodgo.git
cd Foodgo/foodgo-frontend-clean
npm install
```

Crie um arquivo `.env` na raiz com:

```
VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

```bash
npm run dev
```

Acesse em `http://localhost:5173`.

## Autor

Vinícius Amaral de Oliveira — projeto acadêmico (ATITUS)