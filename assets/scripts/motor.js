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

}