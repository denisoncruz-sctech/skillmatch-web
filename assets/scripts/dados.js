import { VagaFrontEnd } from "./motor.js";

export async function carregarVagas() {
    const resposta = await fetch("./assets/dados/vagas.json");

    if (!resposta.ok) {
        throw new Error(
            `Não foi possível carregar as vagas. Código: ${resposta.status}`
        );
    }

    const vagasJson = await resposta.json();

    if (!Array.isArray(vagasJson)) {
        throw new Error("O catálogo de vagas possui um formato inválido.");
    }

    return vagasJson.map((vaga) => {
        return new VagaFrontEnd(
            vaga.id,
            vaga.empresa,
            vaga.cargo,
            vaga.requisitos,
            vaga.salario,
            vaga.modalidade,
            vaga.stack
        );
    });
}