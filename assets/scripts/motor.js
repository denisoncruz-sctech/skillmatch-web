export class Vaga {
    constructor(
        id,
        empresa,
        cargo,
        requisitos,
        salario,
        modalidade
    ) {
        this.id = id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;
    }

    obterDescricao() {
        return `${this.cargo} - ${this.empresa}`;
    }
    classificarCompatibilidade(percentual) {

    if (percentual >= 80) {
        return "Alta";
    }

    if (percentual >= 50) {
        return "Média";
    }

    return "Baixa";
}    
}

export class VagaFrontEnd extends Vaga {

    constructor(
        id,
        empresa,
        cargo,
        requisitos,
        salario,
        modalidade,
        stack
    ) {

        super(
            id,
            empresa,
            cargo,
            requisitos,
            salario,
            modalidade
        );

        this.stack = stack;
    }

    obterDescricao() {
        return `${super.obterDescricao()} | Stack: ${this.stack}`;
    }
    calcularCompatibilidade(candidato) {

    const habilidadesEncontradas = [];
    const habilidadesFaltantes = [];
    
        this.requisitos.forEach((requisito) => {

        if (candidato.habilidades.includes(requisito)) {

            habilidadesEncontradas.push(requisito);

        } else {

            habilidadesFaltantes.push(requisito);

        }

    });

    const percentual =
    Math.round(
        (
            habilidadesEncontradas.length /
            this.requisitos.length
        ) * 100
    );
    const classificacao =
    this.classificarCompatibilidade(percentual);
    
    return {
        percentual,
        classificacao,
        habilidadesEncontradas,
        habilidadesFaltantes,
        
    };

}




}