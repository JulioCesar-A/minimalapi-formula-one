# 🏎️ Formula One API

---

## 📌 Visão Geral

A **Formula One API** é uma aplicação minimalista e de alto desempenho para gerenciar dados de equipes e pilotos da Fórmula 1. Projetada com foco em simplicidade, escalabilidade e boas práticas, serve como base ideal para demonstrações, protótipos ou sistemas educacionais.

Todos os dados são mantidos em memória, tornando a API rápida e fácil de executar sem dependência de banco de dados.

---

## 🔧 Tecnologias

| Tecnologia       | Uso |
|------------------|-----|
| [Fastify](https://www.fastify.io/) | Framework web de alto desempenho para Node.js |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática e melhor manutenção de código |
| [tsup](https://tsup.egoist.dev/) | Empacotamento moderno com zero configuração |
| [tsx](https://github.com/esbuild-kit/tsx) | Execução direta de TypeScript em desenvolvimento |
| [fastify-cors](https://github.com/fastify/fastify-cors) | Gerenciamento de políticas CORS |
| Node.js (ES Modules) | Ambiente de execução moderno com suporte nativo a módulos |

---

## 🚀 Inicialização Rápida

### 1. Pré-requisitos

- Node.js v18 ou superior
- npm (ou yarn)

### 2. Instalação

```bash
git clone https://github.com/JulioCesar-A/minimalapi-formula-one.git
cd minimalapi-formula-one
npm install
```

### 3. Configuração

Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:

```env
PORT=3333
```

> A porta padrão será `3333` se não definida.

### 4. Execução

| Comando | Descrição |
|--------|----------|
| `npm run start:dev` | Inicia o servidor em modo desenvolvimento (com logs e hot reload) |
| `npm run start:watch` | Modo observador — reinicia automaticamente ao alterar arquivos |
| `npm run start:dist` | Compila e executa a versão de produção |

```bash
# Desenvolvimento
npm run start:dev

# Produção (build + execução)
npm run start:dist
```

O servidor estará disponível em:  
👉 [http://localhost:3333](http://localhost:3333)

---

## 🌐 Documentação da API

A API fornece endpoints RESTful para acesso a dados da Fórmula 1.

### Base URL

```
http://localhost:3333
```

---

### 🔹 `GET /teams`

**Descrição:** Retorna a lista de todas as equipes da Fórmula 1.

**Resposta (200 OK):**
```json
{
  "teams": [
    {
      "id": 1,
      "name": "McLaren",
      "base": "Woking, United Kingdom"
    },
    {
      "id": 2,
      "name": "Mercedes",
      "base": "Brackley, United Kingdom"
    }
  ]
}
```

---

### 🔹 `GET /teams/:id`

**Descrição:** Retorna uma equipe específica pelo ID.

**Parâmetro:** `id` (number)

**Exemplo:** `GET /teams/3`

**Resposta (200 OK):**
```json
{
  "team": {
    "id": 3,
    "name": "Red Bull Racing",
    "base": "Milton Keynes, United Kingdom"
  }
}
```

**Erro (404 Not Found):**
```json
{ "message": "Team Not Found" }
```

---

### 🔹 `GET /teams/:id/drivers`

**Descrição:** Retorna todos os pilotos de uma equipe específica.

**Parâmetro:** `id` (number)

**Exemplo:** `GET /teams/3/drivers`

**Resposta (200 OK):**
```json
{
  "team": {
    "id": 3,
    "name": "Red Bull Racing",
    "base": "Milton Keynes, United Kingdom"
  },
  "drivers": [
    {
      "id": 1,
      "name": "Max Verstappen",
      "teamId": 3
    }
  ]
}
```

**Erro (404):**
```json
{ "message": "No Drivers Found for this Team" }
```

---

### 🔹 `GET /drivers`

**Descrição:** Retorna a lista de todos os pilotos.

**Resposta (200 OK):**
```json
{
  "drivers": [
    {
      "id": 1,
      "name": "Max Verstappen",
      "teamId": 3
    },
    {
      "id": 2,
      "name": "Lewis Hamilton",
      "teamId": 4
    }
  ]
}
```

---

### 🔹 `GET /drivers/:id`

**Descrição:** Retorna um piloto específico pelo ID.

**Parâmetro:** `id` (number)

**Exemplo:** `GET /drivers/1`

**Resposta (200 OK):**
```json
{
  "driver": {
    "id": 1,
    "name": "Max Verstappen",
    "teamId": 3
  }
}
```

**Erro (404 Not Found):**
```json
{ "message": "Driver Not Found" }
```

---

## ⚙️ Arquitetura e Boas Práticas

- **Tipagem rigorosa** com TypeScript e interfaces para parâmetros de rota.
- **CORS habilitado** para qualquer origem (ajustável para produção).
- **Logging integrado** via `fastify.logger`.
- **Zero dependência externa** — dados em memória.
- **Build otimizado** com `tsup` (sem necessidade de `tsconfig.json` complexo).
- **ES Modules nativo** — alinhado com padrões modernos do Node.js.

---

## 📦 Build de Produção

Compila o código TypeScript para JavaScript otimizado:

```bash
npm run dist
```

Gera os arquivos na pasta `dist/`.

Para executar a versão compilada:

```bash
npm run start:dist
```

Ideal para ambientes de produção com CI/CD.

---

## 🔒 CORS

A política de CORS permite todas as origens (`*`) para facilitar integrações em desenvolvimento.

> ⚠️ **Recomendação para produção:**  
> Restrinja as origens no `server.register(cors, { origin: [...] })` para aumentar a segurança.

---

## 📁 Estrutura do Projeto

```
minimalapi-formula-one/
├── src/
│   └── server.ts          # Servidor Fastify principal
├── dist/                  # Arquivos compilados (gerado por tsup)
├── .env                   # Variáveis de ambiente
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```
