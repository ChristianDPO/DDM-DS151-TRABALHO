# Trabalho da Disciplina de DS151

__Disciplina:__ Desenvolvimento para Dispositivos Móveis (DS151)

__Curso:__ Tecnologia em Análise e Desenvolvimento de Sistemas - Universidade Federal do Paraná (UFPR)

__Professor:__ Alexander Robert Kutzke

__Participantes:__

* [Christian Debovi Paim Oliveira](https://github.com/ChristianDPO)
* [Karine Antoniacomi dos Santos](https://github.com/karineAntoniacomi)
* [Katiana Zeitz](https://github.com/katianaz)


# Especificação

O trabalho desta disciplina consistia em criar uma aplicativo móvel, utilizando o framework [ReactNative](https://reactnative.dev) juntamente com a ferramenta [ExpoCLI](https://expo.dev), com os requisitos:

- Algum tipo de autenticação
- Acessar alguma API externa


# Descrição 

O aplicativo 'React To The Movies' permite o usuário fazer login na sua conta do [TheMovieDatabase](https://www.themoviedb.org), permitindo que ele:
- Veja os filmes em alta atuais
- Veja todos os filmes disponiveis (ou pesquisar algum)
- Marcar ou desmarcar o filme como favorito
- Visualizar seu perfil


# Dependencias  

Para rodar o ambiente, precisamos do Node.js instalado. É recomendado o uso de de um version manager como o nvm e um gerenciador de pacotes como o npm.
Siga os passos para a instalação:

1. Instale o [nvm](https://github.com/nvm-sh/nvm)
2. Instale o [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3. Instale o expo-cli utilizando o comando
```
npm install -g expo-cli
```

Não é necessário, mas para testar o aplicativo em um ambiente nativo, pode-se usar o :
- [Android Studio](https://developer.android.com/studio)


# Rodando

Antes de tudp, deve-se ter [uma conta cadastrada no site da TheMovieDatabase](https://www.themoviedb.org/u/ChristianDPO).
Para os dados da API serem pegos corretamente, deve ser criado um arquivo  `.env.local` no diretório raiz com [a chave da API do TheMovieDatabase](https://www.themoviedb.org/settings/api).
O conteúdo do arquivo deve ser da forma:
```
API_KEY=<minha chave de API aqui>
```

Para rodar o trabalho, basta executar no diretório raiz:
```
npm install --legacy-peer-deps
expo start
```
Após isso, basta selecionar a opção `w` no terminal (para abrir no navegador)