# YiMobileTest
Teste de estagio para a empresa Yi Mobile

API REST para operações CRUD, usando Node.js, a framework Express.js e MySQL como banco de dados.

A rota principal da API é `http://localhost:8080/`.

Para fazer operações na rota /ordens, é preciso realizar o login na API, pegar o token retornado no login e
adicioná-lo no header das requisições como Authorization e com a seguinte estrutura:

`Bearer TOKEN_RETORNADO_LOGIN`

# Executando o projeto

Para executar o projeto, tem que ter instalado Node.js e MySQL na sua máquina.

## Instalação das dependências

To install dependencies enter project folder and run following command:
Para instalar as dependências necessárias para rodar o projeto, entre no diretório raiz do projeto e rode o comando:

`npm install`


## Configurando o banco de dados local MySQL 

Primeiro, edite os arquivos `./api/models/dbconnection.js` e `/config/database.js` para adicionar o seu usuário, senha e
banco de dados para seu MySQL local.

Para criar as tabelas e o banco de dados, rode o comando `node ./api/scripts/create-database.js`
## Para rodar o servidor:

`node server.js`
