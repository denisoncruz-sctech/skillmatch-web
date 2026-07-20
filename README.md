# SkillMatch Web

> Aplicação web desenvolvida para analisar a compatibilidade entre o perfil de um candidato e vagas de desenvolvimento Front-end.


---

# Sobre o projeto

O **SkillMatch Web** é uma aplicação desenvolvida em JavaScript que compara as habilidades e a experiência profissional informadas pelo usuário com os requisitos de vagas de desenvolvimento Front-end.

Após a análise, o sistema calcula o percentual de compatibilidade para cada vaga, identifica as habilidades encontradas e faltantes, destaca a melhor oportunidade e apresenta uma recomendação personalizada.

Este projeto foi desenvolvido como parte de um mini projeto avaliativo com o objetivo de aplicar conceitos fundamentais e intermediários de JavaScript, HTML e CSS.

---

# Funcionalidades

* Cadastro do perfil do candidato;
* Validação dos campos do formulário;
* Carregamento dinâmico das vagas através de arquivo JSON;
* Cálculo do percentual de compatibilidade;
* Classificação das vagas por compatibilidade;
* Identificação das habilidades encontradas;
* Identificação das habilidades faltantes;
* Recomendação personalizada;
* Destaque da melhor vaga;
* Persistência dos dados utilizando LocalStorage;
* Interface responsiva.

---

# Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)
* Fetch API
* LocalStorage
* Git
* GitHub
* Visual Studio Code

## Conceitos aplicados

Durante o desenvolvimento foram utilizados diversos conceitos da linguagem JavaScript, entre eles:

* Programação Orientada a Objetos (POO);
* Classes;
* Herança;
* Objetos e Arrays;
* Métodos `map()`, `filter()`, `find()`, `reduce()` e `every()`;
* Callback;
* Closure;
* Promise;
* Async/Await;
* Manipulação do DOM;
* Módulos ES.

---

# Estrutura do projeto

```text
skillmatch-web/
│
├── assets/
│   ├── dados/
│   ├── img/
│   ├── scripts/
│   └── styles/
│
├── index.html
├── README.md
└── ...
```


---

# Como executar o projeto

## Pré-requisitos

Para executar a aplicação é necessário possuir:

* Visual Studio Code;
* Extensão **Live Server** instalada no Visual Studio Code.

## Passo 1

Clone o repositório:

```bash
git clone https://github.com/denisoncruz-sctech/skillmatch-web.git
```

Ou faça o download do projeto em formato **ZIP** através do GitHub.

## Passo 2

Abra a pasta do projeto no Visual Studio Code.

## Passo 3

Abra o arquivo:

```text
index.html
```

## Passo 4

Clique com o botão direito sobre o arquivo e selecione:

```text
Open with Live Server
```

## Passo 5

O navegador abrirá automaticamente a aplicação.

Agora basta preencher os campos do formulário e clicar em **Analisar Perfil**.

> **Importante:** o projeto utiliza módulos JavaScript e a Fetch API para carregar os dados das vagas. Por esse motivo, ele deve ser executado utilizando um servidor local, como o **Live Server**.

---

# Como utilizar

1. Informe o nome do candidato;
2. Informe a área de atuação;
3. Digite as habilidades separadas por vírgulas;
4. Informe o tempo de experiência;
5. Clique em **Analisar Perfil**;
6. Visualize:

   * percentual de compatibilidade;
   * classificação da vaga;
   * habilidades encontradas;
   * habilidades faltantes;
   * recomendação personalizada;
   * melhor vaga.

---

# Melhorias futuras

Algumas melhorias que poderão ser implementadas futuramente:

* Autenticação de usuários;
* Cadastro dinâmico de vagas;
* Cadastro dinâmico de candidatos;
* Integração com banco de dados;
* Painel administrativo;
* API própria para gerenciamento das vagas;
* Histórico das análises realizadas.

---

# Autor

Desenvolvido por **Denison Cruz** como parte do Mini Projeto Avaliativo da disciplina de Desenvolvimento Front-end.

**GitHub:** https://github.com/denisoncruz-sctech/skillmatch-web

**Kanban (Trello):**
https://trello.com/b/J1BFx2mA/projeto-avaliativo-modulo-1-semana-13
