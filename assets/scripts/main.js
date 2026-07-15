import { carregarVagas } from "./dados.js";
import {
  analisarVagas,
  encontrarMelhorVaga,
  gerarRecomendacao,
} from "./motor.js";
import {
  limparResultados,
  renderizarVagas,
  renderizarMelhorVaga,
} from "./ui.js";

const formulario = document.querySelector("#formulario-perfil");
const elementoStatus = document.querySelector("#mensagem-status");
const campoNome = document.querySelector("#nome");
const campoArea = document.querySelector("#area");
const campoHabilidades = document.querySelector("#habilidades");
const campoExperiencia = document.querySelector("#experiencia");
const erroNome = document.querySelector("#erro-nome");
const erroArea = document.querySelector("#erro-area");
const erroHabilidades = document.querySelector("#erro-habilidades");
const erroExperiencia = document.querySelector("#erro-experiencia");
const CHAVE_CANDIDATO = "skillmatch-candidato";


let vagasCarregadas = [];

async function iniciarAplicacao() {
  elementoStatus.textContent = "Carregando vagas…";

  try {
    vagasCarregadas = await carregarVagas();

    if (vagasCarregadas.length === 0) {
      elementoStatus.textContent = "Nenhuma vaga disponível no momento.";

      formulario.querySelector("button[type='submit']").disabled = true;

      return;
    }

    elementoStatus.textContent = `${vagasCarregadas.length} vagas carregadas. Preencha seu perfil para iniciar a análise.`;
    const candidatoSalvo =
      carregarCandidatoSalvo();

    if (candidatoSalvo) {
      preencherFormulario(candidatoSalvo);

      elementoStatus.textContent =
        `${vagasCarregadas.length} vagas carregadas. Perfil restaurado automaticamente.`;
    }

  } catch (erro) {
    elementoStatus.textContent =
      "Ocorreu um erro ao carregar as vagas. Tente novamente.";

    formulario.querySelector("button[type='submit']").disabled = true;

    console.error("Erro ao carregar vagas:", erro);
  }
}

function limparErros() {
  erroNome.textContent = "";
  erroArea.textContent = "";
  erroHabilidades.textContent = "";
  erroExperiencia.textContent = "";

  campoNome.classList.remove("campo-invalido");
  campoArea.classList.remove("campo-invalido");
  campoHabilidades.classList.remove("campo-invalido");
  campoExperiencia.classList.remove("campo-invalido");

  campoNome.removeAttribute("aria-invalid");
  campoArea.removeAttribute("aria-invalid");
  campoHabilidades.removeAttribute("aria-invalid");
  campoExperiencia.removeAttribute("aria-invalid");
}
function mostrarErro(campo, elementoErro, mensagem) {
  elementoErro.textContent = mensagem;
  campo.classList.add("campo-invalido");
  campo.setAttribute("aria-invalid", "true");
}
function validarFormulario() {
  limparErros();

  let formularioValido = true;

  const nome = campoNome.value.trim();
  const area = campoArea.value.trim();
  const habilidadesTexto = campoHabilidades.value.trim();
  const experienciaMeses = Number(campoExperiencia.value);

  if (nome.length < 2) {
    mostrarErro(
      campoNome,
      erroNome,
      "Informe um nome com pelo menos 2 caracteres.",
    );

    formularioValido = false;
  }

  if (area.length < 2) {
    mostrarErro(campoArea, erroArea, "Informe uma área de interesse.");

    formularioValido = false;
  }

  if (habilidadesTexto.length === 0) {
    mostrarErro(
      campoHabilidades,
      erroHabilidades,
      "Informe pelo menos uma habilidade.",
    );

    formularioValido = false;
  }

  if (Number.isNaN(experienciaMeses) || experienciaMeses < 0) {
    mostrarErro(
      campoExperiencia,
      erroExperiencia,
      "A experiência deve ser igual ou maior que zero.",
    );

    formularioValido = false;
  }

  return formularioValido;
}
function criarCandidato() {
  const habilidades = campoHabilidades.value
    .split(",")
    .map((habilidade) => habilidade.trim())
    .filter((habilidade) => habilidade.length > 0);

  return {
    nome: campoNome.value.trim(),
    area: campoArea.value.trim(),
    habilidades,
    experienciaMeses: Number(campoExperiencia.value),
  };
}

function salvarCandidato(candidato) {
  localStorage.setItem(
    CHAVE_CANDIDATO,
    JSON.stringify(candidato)
  );
}

function carregarCandidatoSalvo() {
  const candidatoSalvo =
    localStorage.getItem(CHAVE_CANDIDATO);

  if (!candidatoSalvo) {
    return null;
  }

  try {
    return JSON.parse(candidatoSalvo);
  } catch (erro) {
    console.error(
      "Erro ao ler candidato salvo:",
      erro
    );

    localStorage.removeItem(CHAVE_CANDIDATO);

    return null;
  }
}

function preencherFormulario(candidato) {
  campoNome.value =
    candidato.nome ?? "";

  campoArea.value =
    candidato.area ?? "";

  campoHabilidades.value =
    candidato.habilidades?.join(", ") ?? "";

  campoExperiencia.value =
    candidato.experienciaMeses ?? 0;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const formularioValido = validarFormulario();

  if (!formularioValido) {
    const primeiroCampoInvalido = formulario.querySelector(".campo-invalido");

    primeiroCampoInvalido?.focus();

    return;
  }

  const candidato = criarCandidato();

  salvarCandidato(candidato);

  const resultados = analisarVagas(candidato, vagasCarregadas);

  const melhorResultado = encontrarMelhorVaga(resultados, candidato);

  const recomendacao = gerarRecomendacao(melhorResultado);

  limparResultados();

  renderizarMelhorVaga(
    melhorResultado,
    recomendacao
  );

  renderizarVagas(resultados);

  elementoStatus.textContent = `Análise concluída para ${candidato.nome}.`;

  console.log("Candidato:", candidato);
  console.log("Resultados:", resultados);

  console.log("Melhor vaga:", melhorResultado.vaga.obterDescricao());

  console.log(`Compatibilidade: ${melhorResultado.percentual}%`);

  console.log(`Classificação: ${melhorResultado.classificacao}`);

  console.log("Recomendação:", recomendacao);
});
iniciarAplicacao();
