import { carregarVagas } from "./dados.js";

const elementoStatus = document.querySelector("#mensagem-status");

async function iniciarAplicacao() {
    elementoStatus.textContent = "Carregando vagas…";

    try {
        const vagas = await carregarVagas();
        const candidato = {
    nome: "Ricardo",
    habilidades: [
        "HTML",
        "CSS",
        "JavaScript"
    ]
};

        if (vagas.length === 0) {
            elementoStatus.textContent = "Nenhuma vaga disponível no momento.";
            return;
        }

        elementoStatus.textContent =
            `${vagas.length} vagas carregadas com sucesso.`;

        console.log("Vagas carregadas:", vagas);

        vagas.forEach((vaga) => {
           // console.log(vaga.obterDescricao());
            const resultado = vaga.calcularCompatibilidade(candidato);

    console.log("----------------------------");

    console.log(vaga.obterDescricao());

    console.log(resultado);   
        });
    } catch (erro) {
        elementoStatus.textContent =
            "Ocorreu um erro ao carregar as vagas. Tente novamente.";

        console.error("Erro ao carregar vagas:", erro);
    }
}

iniciarAplicacao();