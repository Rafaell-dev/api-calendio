# API NestJS

Este projeto é uma API desenvolvida utilizando o [NestJS](https://nestjs.com/), um framework Node.js progressivo para a construção de aplicações escaláveis, eficientes e confiáveis.

## Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **TypeScript**
- **Prisma** (ou outro ORM, se utilizado)
- **PostgreSQL** (ou outro banco de dados, se utilizado)
- **Swagger** (para documentação da API)
- **Jest** (para testes)

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (opcional, para execução do banco de dados)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Rafaell-dev/luna-api.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd luna-api
   ```

3. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

4. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione as variáveis necessárias, utilize como base o arquivo .env.example

5. Execute as migrações do banco de dados (se aplicável):
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

## Execução

### Ambiente de Desenvolvimento

Para rodar a aplicação em ambiente de desenvolvimento, utilize o seguinte comando:
```bash
npm run start:dev
# ou
yarn start:dev
```

A aplicação estará disponível em `http://localhost:3002` (ou na porta definida no arquivo `.env`).

### Ambiente de Produção

Para executar a aplicação em produção:
```bash
npm run build
npm run start:prod
```

## Documentação da API

A documentação da API é gerada automaticamente pelo Swagger e está disponível em:
```
http://localhost:3000/api
```

## Testes

Para executar os testes:
```bash
npm run test
```

## Estrutura do Projeto

```
src/
├── modules/            # Módulos da aplicação
├── common/             # Código reutilizável (interceptors, filters, etc.)
├── config/             # Configurações da aplicação
├── main.ts             # Arquivo principal
└── app.module.ts       # Módulo raiz
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Feito com ❤ por [Rafael](https://github.com/rafaell-dev).

