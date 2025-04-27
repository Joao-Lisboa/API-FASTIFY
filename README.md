# API Fastify com TypeScript

Este é um projeto de API RESTful para um e-commerce, desenvolvido com Fastify e TypeScript, seguindo boas práticas de desenvolvimento e arquitetura limpa.
A API permite: cadastro e autenticação de usuários, criação e gerenciamento de produtos e categorias, criação de carrinhos contendo produtos de diferentes categorias, validação de token JWT para rotas protegidas e operações completas de CRUD.

## 🚀 Tecnologias Utilizadas

- **Fastify**: Framework web rápido e eficiente para Node.js
- **TypeScript**: Superset tipado do JavaScript
- **Prisma**: ORM moderno para banco de dados
- **Zod**: Biblioteca para validação de esquemas
- **JWT**: Autenticação via tokens
- **Vitest**: Framework de testes
- **Husky**: Git hooks para garantir qualidade de código

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Docker (opcional, para desenvolvimento com banco de dados)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

## 🐳 Docker

O projeto inclui configuração Docker para facilitar o desenvolvimento e deploy. Para executar com Docker:

1. Construa a imagem:
```bash
docker build -t api-fastify .
```

2. Execute o container:
```bash
docker run -p 3333:3333 api-fastify
```

Para desenvolvimento com Docker Compose:
```bash
docker-compose up -d
```

O Docker Compose inclui:
- Serviço da API
- Banco de dados PostgreSQL
- Prisma Studio para visualização do banco de dados

## 🚀 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
```

## 🧪 Testes

O projeto utiliza Vitest para testes. Para executar:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

## 📦 Estrutura do Projeto

```
├── src/
│   ├── http/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── server.ts
│   ├── use-cases/
│   ├── repositories/
│   └── prisma/
├── prisma/
│   └── schema.prisma
├── tests/
├── docker/
└── package.json
```

## 🔒 Segurança

- Autenticação via JWT
- Validação de dados com Zod
- CORS configurado
- Variáveis de ambiente protegidas

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

## ✨ Features

- [x] Autenticação de usuários
- [x] CRUD completo
- [x] Validação de dados
- [x] Testes automatizados
- [x] Docker support
- [x] CI/CD configurado

## 📫 Contato

[João Lisboa] - [https://www.linkedin.com/in/jo%C3%A3o-v%C3%ADtor-lisboa-silva-8a5604237/]

[Pedro Camilo] - [https://www.linkedin.com/in/pedro-camilo-749482216/]
