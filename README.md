# GitHub API - Buscando Usuários
Este projeto é uma aplicação web simples do curso [DevQuest na plataforma curso.devemdobro](https://cursos.devemdobro.com) que permite **buscar usuários do GitHub** e visualizar seus **dados de perfil** e **repositórios públicos**, utilizando a **GitHub API** e o método **fetch**.

## 🛠 Tecnologias usadas
- HTML5
- CSS3
- JavaScript
- GitHub API
- Fetch API

## 🎯 Funcionalidades
- Buscar informações de qualquer usuário do GitHub digitando o nome de usuário.
- Exibir foto de perfil, nome e bio do usuário.
- Listar 10 ultimos repositórios públicos.
- Exibir uma mensagem se o usuário não for encontrado.

## 🔥 Como Funciona
- No campo de busca, digite o nome de um usuário do GitHub.
- Clique no botão Buscar ou pressione Enter.
- A aplicação irá fazer uma chamada para a GitHub API e mostrar:
    - Foto de perfil
    - Nome do usuário (ou aviso se não tiver nome)
    - Bio do usuário (ou aviso se não tiver bio)
    - Lista dos repositórios públicos (limitados por configuração)

## 📜 Principais arquivos
### index.js
Responsável por:
- Capturar eventos de clique e de tecla (keyup).
- Validar o campo de busca.
- Buscar dados do usuário e seus repositórios.

### user.js (services)
- Responsável por buscar os dados do usuário da GitHub API.

### repositories.js (services)
Responsável por buscar a lista de repositórios do usuário.

### screen.js
Responsável por renderizar:
- Perfil do usuário
- Lista de repositórios
- Mensagem de "usuário não encontrado"

### user.js (objects)
Modelo de objeto que representa o usuário, armazenando:
- Foto
- Nome
- Bio
- Lista de repositórios