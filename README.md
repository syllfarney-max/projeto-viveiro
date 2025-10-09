# 🌱 Projeto Viveiro COMURG

Sistema web para o gerenciamento e divulgação do Viveiro de Mudas da COMURG, desenvolvido com **React + Vite** (frontend) e **Node.js + Express** (backend), implantados na **plataforma Render**.

---

## 🚀 Estrutura do Projeto

```
projeto-viveiro/
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── components/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── routes/
│
├── render.yaml
└── README.md
```

---

## 🌐 Endereços

- **Frontend:** https://viveiro-comurg-frontend-56v2.onrender.com  
- **Backend:** https://viveiro-comurg-backend-yjsj.onrender.com  

---

## 💬 Fluxo de Mensagens

1. Usuário envia o formulário no site  
2. Frontend envia dados para o backend  
3. Backend responde com: `Mensagem recebida pelo backend (simulação)`  
4. Envio real pode ser ativado com o `.env`

---

## ⚙️ Configuração do `.env` (backend)

```
SENDGRID_API_KEY=SG.sua_chave_aqui
CONTACT_EMAIL=seuemail@dominio.com
```

> ⚠️ **Nunca envie o arquivo `.env` para o GitHub.**  
> Configure as variáveis diretamente no painel Render → Environment Variables.

---

## 🌿 Tema Visual

**Tema Verde Natural**  
Paleta sugerida:

| Elemento | Cor | Código |
|-----------|------|---------|
| Primária | Verde Folha | `#2E7D32` |
| Secundária | Verde Claro | `#A5D6A7` |
| Fundo | Branco | `#FFFFFF` |
| Texto | Cinza Escuro | `#2C2C2C` |

---

## 🧩 Tecnologias

**Frontend:** React + Vite, Tailwind CSS  
**Backend:** Node.js + Express, SendGrid  
**Deploy:** Render.com, GitHub

---

## 🧹 Organização

✅ `.env` fora do repositório  
✅ `.github/` pode ser removida  
✅ Comunicação entre frontend e backend funcional  
✅ Tema verde ativo  

---

## 🧠 Autor

**Syll Farney**  
📧 syllfarney@hotmail.com

> Última atualização: Outubro/2025  
> Status: **Online e funcional**
