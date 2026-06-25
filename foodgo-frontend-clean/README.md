# Atitus Maps

## Sobre o Projeto

O **Atitus Maps** é uma aplicação web que permite visualizar e cadastrar pontos geográficos em um mapa interativo. Usuários autenticados podem adicionar novos pontos clicando no mapa, que são salvos em um backend e exibidos para todos.

## Como iniciar este exercício

Clique em **Copiar Exercício** e abra o link em uma nova aba.

   <a id="copy-exercise" target="_blank" href="https://github.com/new?template_name=atitus-maps&template_owner=jaisonschmidt&name=atitus-maps&owner=%40me&visibility=public">
      <img src="https://img.shields.io/badge/📠_Copiar_Exercício-008000" height="25pt"/>
   </a>

## Funcionalidades

- Visualização de pontos cadastrados no mapa.
- Cadastro de novos pontos ao clicar no mapa.
- Autenticação de usuários.
- Integração com Google Maps.

## Dependências

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api)
- [Axios](https://www.npmjs.com/package/axios)

## Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/atitus-maps.git
   cd atitus-maps
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Crie o arquivo `.env` na raiz do projeto:**
   ```
   VITE_GOOGLE_MAPS_API_KEY=sua_chave_google_maps_aqui
   ```

   > **Atenção:**  
   > - O prefixo `VITE_` é obrigatório para variáveis de ambiente no Vite.
   > - Não compartilhe sua chave de API publicamente.

4. **Rode o projeto:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**  
   Abra [http://localhost:5173](http://localhost:5173) para visualizar a aplicação.

## Observações

- Certifique-se de que sua chave do Google Maps tem permissão para uso em aplicações web.
- O backend utilizado está disponível em:  
  `https://passing-agatha-atitus-0ca94c8f.koyeb.app/ws/point`

---
