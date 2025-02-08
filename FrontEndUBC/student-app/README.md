
# 🎓 Sistema para gerenciar estudantes (Frontend)  

Este é o **frontend** de um sistema de gerenciamento de estudantes, desenvolvido com **React.js**, **React Router** e **Material-UI**, utilizando **JWT Authentication** para autenticação de usuários.  

## 🚀 Tecnologias Utilizadas  

✔ **React.js** - Biblioteca principal para a interface.  
✔ **React Router Dom** - Gerenciamento de rotas.  
✔ **Material-UI** - Interface moderna e responsiva.  
✔ **Axios** - Consumo da API backend.  
✔ **JWT Authentication** - Autenticação segura com tokens.  

---

## ⚙️ **Instalação e Execução**  

### 1️⃣ Clonar o repositório  
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2️⃣ Instalar as dependências  
```bash
npm install
```

### 3️⃣ Definir a URL da API  
No arquivo **`src/services/api.js`**, atualize a URL do backend caso necessário:  
```javascript
const API_URL = "https://localhost:7090/api";
```

### 4️⃣ Rodar o projeto  
```bash
npm start
```
O projeto será iniciado em **http://localhost:3000/**  

---

## 🔒 **Autenticação (JWT)**
- O usuário faz login na tela `/login`.  
- O backend retorna um **token JWT**, que é salvo no **localStorage**.  
- O acesso ao `/dashboard` só é permitido se o usuário tiver um **JWT válido**.  

---

## 📜 **Licença**
Este projeto é de código aberto e está sob a licença **MIT**.
