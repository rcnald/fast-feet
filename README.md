# Fast Feet API

Uma API RESTful desenvolvida com **NestJS**, **Prisma** e **Zod**, projetada para gerenciar entregas de encomendas, entregadores e destinatários. Esta aplicação tem como objetivo oferecer uma plataforma segura e eficiente para o controle completo do processo de entregas, com suporte a administradores e entregadores.

Este projeto foi desenvolvido como parte dos meus estudos em backend, utilizando tecnologias modernas como NestJS para construção de aplicações escaláveis, Prisma para gerenciamento de banco de dados PostgreSQL, e Zod para validação de dados.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Como Usar

### 1. Clone o repositório:
```bash
git clone https://github.com/rcnald/fast-feet.git
```

### 2. Acesse a pasta do projeto:
```bash
cd fast-feet
```

### 3. Instale as dependências:
```bash
npm install
```

### 4. Configure o ambiente:
Crie um arquivo `.env` na raiz do projeto, e preencha com base no `.env.example`.

### 5. Inicialize o docker:
```bash
docker-compose up 
```

### 6. Execute as migrations do banco de dados:
```bash
npx prisma migrate dev
```

### 7. Inicie o servidor:
```bash
npm run start:dev
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)


##  Funcionalidades Principais

### • Autenticação de Usuários
- Login via CPF e senha
- Autenticação com JWT
- Suporte a dois tipos de usuários: `admin` e `entregador`

### • Gerenciamento de Entregadores
- Alteração de senha

### • Gerenciamento de Encomendas
- Marcar como: aguardando retirada, retirada, entregue ou devolvida
- Foto obrigatória para confirmação de entrega
- Apenas o entregador que retirou pode concluir a entrega
- Listar encomendas próximas ao entregador (raio de 5km)

### • Gerenciamento de Destinatários
- Notificações automáticas por alteração de status da encomenda


## Requisitos Funcionais (RFs)

- [x] A aplicação deve ter dois tipos de usuário: **entregador** e/ou **admin**
- [x] Deve ser possível realizar login com CPF e senha
- [x] Deve ser possível marcar uma encomenda como **aguardando retirada**
- [x] Deve ser possível retirar uma encomenda
- [x] Deve ser possível marcar uma encomenda como **entregue**
- [x] Deve ser possível marcar uma encomenda como **devolvida**
- [x] Deve ser possível listar as encomendas **próximas ao entregador (5km)**
- [x] Deve ser possível alterar a senha de um usuário
- [x] Deve ser possível listar as entregas de um usuário
- [x] Deve ser possível notificar o destinatário a cada alteração no status da encomenda


## Regras de Negócio (RNs)

- [x] Para marcar uma encomenda como **entregue**, é obrigatório o envio de uma **foto**
- [x] Somente o **entregador que retirou** a encomenda pode marcá-la como entregue
- [ ] Somente o **admin** pode alterar a senha de um usuário
- [x] Não deve ser possível um entregador **listar as encomendas de outro entregador**
