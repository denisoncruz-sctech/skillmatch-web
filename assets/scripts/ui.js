const listaVagas = document.querySelector("#lista-vagas");

const destaqueMelhorVaga = document.querySelector("#destaque-melhor-vaga");

export function limparResultados() {
  listaVagas.innerHTML = "";
  destaqueMelhorVaga.innerHTML = "";
}

function criarListaHabilidades(titulo, habilidades) {
  const container = document.createElement("div");
  container.classList.add("grupo-habilidades");

  const subtitulo = document.createElement("h4");
  subtitulo.textContent = titulo;

  const lista = document.createElement("ul");

  if (habilidades.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Nenhuma";
    lista.appendChild(item);
  } else {
    habilidades.forEach((habilidade) => {
      const item = document.createElement("li");
      item.textContent = habilidade;
      lista.appendChild(item);
    });
  }

  container.appendChild(subtitulo);
  container.appendChild(lista);

  return container;
}

function formatarSalario(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function criarCardVaga(resultado) {
  const card = document.createElement("article");
  card.classList.add("card-vaga");

  const cabecalho = document.createElement("div");
  cabecalho.classList.add("card-vaga__cabecalho");

  const titulo = document.createElement("h3");
  titulo.textContent = resultado.vaga.cargo;

  const empresa = document.createElement("p");
  empresa.classList.add("card-vaga__empresa");
  empresa.textContent = resultado.vaga.empresa;

  const percentual = document.createElement("p");
  percentual.classList.add("card-vaga__percentual");
  percentual.textContent = `${resultado.percentual}% de compatibilidade`;

  const classificacao = document.createElement("span");
  const classeClassificacao = resultado.classificacao
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  classificacao.classList.add(
    "card-vaga__classificacao",
    `classificacao-${classeClassificacao}`,
  );
  classificacao.textContent = resultado.classificacao;

  const detalhes = document.createElement("div");
  detalhes.classList.add("card-vaga__detalhes");

  const modalidade = document.createElement("p");
  modalidade.textContent = `Modalidade: ${resultado.vaga.modalidade}`;

  const salario = document.createElement("p");
  salario.textContent = `Salário: ${formatarSalario(resultado.vaga.salario)}`;

  const stack = document.createElement("p");
  stack.textContent = `Stack: ${resultado.vaga.stack}`;

  const listaEncontradas = criarListaHabilidades(
    "Habilidades encontradas",
    resultado.habilidadesEncontradas,
  );

  const listaFaltantes = criarListaHabilidades(
    "Habilidades faltantes",
    resultado.habilidadesFaltantes,
  );

  cabecalho.appendChild(titulo);
  cabecalho.appendChild(empresa);

  detalhes.appendChild(modalidade);
  detalhes.appendChild(salario);
  detalhes.appendChild(stack);

  card.appendChild(cabecalho);
  card.appendChild(percentual);
  card.appendChild(classificacao);
  card.appendChild(detalhes);
  card.appendChild(listaEncontradas);
  card.appendChild(listaFaltantes);

  return card;
}

export function renderizarVagas(resultados) {
  listaVagas.innerHTML = "";

  if (resultados.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.textContent = "Nada encontrado.";
    listaVagas.appendChild(mensagem);

    return;
  }

  resultados.forEach((resultado) => {
    const card = criarCardVaga(resultado);
    listaVagas.appendChild(card);
  });
}

export function renderizarMelhorVaga(melhorResultado, recomendacao) {
  destaqueMelhorVaga.innerHTML = "";

  if (!melhorResultado) {
    return;
  }

  const container = document.createElement("article");
  container.classList.add("melhor-vaga");

  const titulo = document.createElement("h3");
  titulo.textContent = "Melhor oportunidade para seu perfil";

  const vaga = document.createElement("p");
  vaga.classList.add("melhor-vaga__titulo");
  vaga.textContent = `${melhorResultado.vaga.cargo} — ${melhorResultado.vaga.empresa}`;

  const compatibilidade = document.createElement("p");
  compatibilidade.textContent = `Compatibilidade: ${melhorResultado.percentual}%`;

  const recomendacaoElemento = document.createElement("p");
  recomendacaoElemento.classList.add("melhor-vaga__recomendacao");
  recomendacaoElemento.textContent = recomendacao;

  container.appendChild(titulo);
  container.appendChild(vaga);
  container.appendChild(compatibilidade);
  container.appendChild(recomendacaoElemento);

  destaqueMelhorVaga.appendChild(container);
}
