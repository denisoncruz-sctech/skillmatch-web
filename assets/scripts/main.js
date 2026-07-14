import { carregarVagas } from "./dados.js";
import { analisarVagas, encontrarMelhorVaga, gerarRecomendacao } from "./motor.js";

const elementoStatus = document.querySelector("#mensagem-status");

async function iniciarAplicacao() {
    elementoStatus.textContent = "Carregando vagas…";

    try {
        const vagas = await carregarVagas();
        if (vagas.length === 0) {
            elementoStatus.textContent = "Nenhuma vaga disponível no momento.";

            return;
        }
        const candidato = {
            nome: "Ricardo",
            habilidades: [
                "HTML",
                "CSS",
                "JavaScript"
            ],
            experienciaMeses: 6
        };

        const resultados = analisarVagas(
            candidato,
            vagas
        );

        const melhorResultado = encontrarMelhorVaga(
            resultados,
            candidato
        );

        const recomendacao = gerarRecomendacao(
            melhorResultado
        );

        elementoStatus.textContent =
            `${vagas.length} vagas carregadas com sucesso.`;

        console.log("Resultados completos:", resultados);

        console.log("----------------------------");

        console.log(
            "Melhor vaga:",
            melhorResultado.vaga.obterDescricao()
        );

        console.log(
            `Compatibilidade: ${melhorResultado.percentual}%`
        );

        console.log(
            `Classificação: ${melhorResultado.classificacao}`
        );

        console.log(
            "Habilidades encontradas:",
            melhorResultado.habilidadesEncontradas
        );

        console.log(
            "Habilidades faltantes:",
            melhorResultado.habilidadesFaltantes
        );

        console.log(
            "Recomendação:",
            recomendacao
        );
    } catch (erro) {
        elementoStatus.textContent =
            "Ocorreu um erro ao carregar as vagas. Tente novamente.";

        console.error(
            "Erro ao iniciar a aplicação:",
            erro
        );
    }
}

iniciarAplicacao();