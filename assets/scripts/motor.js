export class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
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
  calcularCompatibilidade(candidato) {
    const habilidadesCandidato = candidato.habilidades.map((habilidade) =>
      habilidade.toLowerCase()
    );

    const habilidadesEncontradas = this.requisitos.filter((requisito) =>
      habilidadesCandidato.includes(requisito.toLowerCase())
    );

    const habilidadesFaltantes = this.requisitos.filter((requisito) =>
      !habilidadesCandidato.includes(requisito.toLowerCase())
    );
    /*const habilidadesEncontradas = this.requisitos.filter((requisito) => {
      return candidato.habilidades.includes(requisito);
    });

    const habilidadesFaltantes = this.requisitos.filter((requisito) => {
      return !candidato.habilidades.includes(requisito);
    });*/

    const percentual = Math.round(
      (habilidadesEncontradas.length / this.requisitos.length) * 100,
    );

    const classificacao = this.classificarCompatibilidade(percentual);

    return {
      percentual,
      classificacao,
      habilidadesEncontradas,
      habilidadesFaltantes,
    };
  }
}

export class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, stack) {
    super(id, empresa, cargo, requisitos, salario, modalidade);

    this.stack = stack;
  }

  obterDescricao() {
    return `${super.obterDescricao()} | Stack: ${this.stack}`;
  }

}
export function analisarVagas(candidato, vagas) {
  return vagas.map((vaga) => {
    const resultadoCompatibilidade = vaga.calcularCompatibilidade(candidato);

    return {
      vaga,
      ...resultadoCompatibilidade,
    };
  });
}
function desempatarVagas(melhorResultado, resultadoAtual, candidato) {
  const experienciaMeses = candidato.experienciaMeses ?? 0;

  if (experienciaMeses >= 12) {
    if (resultadoAtual.vaga.salario > melhorResultado.vaga.salario) {
      return resultadoAtual;
    }

    return melhorResultado;
  }

  if (
    resultadoAtual.habilidadesFaltantes.length <
    melhorResultado.habilidadesFaltantes.length
  ) {
    return resultadoAtual;
  }

  return melhorResultado;
}
export function encontrarMelhorVaga(resultados, candidato) {
  if (resultados.length === 0) {
    return null;
  }

  return resultados.reduce((melhorResultado, resultadoAtual) => {
    if (resultadoAtual.percentual > melhorResultado.percentual) {
      return resultadoAtual;
    }

    if (resultadoAtual.percentual < melhorResultado.percentual) {
      return melhorResultado;
    }

    return desempatarVagas(melhorResultado, resultadoAtual, candidato);
  });
}
export function gerarRecomendacao(melhorResultado) {
  if (!melhorResultado) {
    return "Não foi possível gerar uma recomendação.";
  }

  const habilidadesFaltantes = melhorResultado.habilidadesFaltantes;

  if (habilidadesFaltantes.length === 0) {
    return "Seu perfil atende a todos os requisitos da melhor vaga.";
  }

  if (habilidadesFaltantes.length === 1) {
    return `Recomendamos estudar ${habilidadesFaltantes[0]} para aumentar sua compatibilidade.`;
  }

  const habilidadesFormatadas = habilidadesFaltantes.join(", ");

  return `Recomendamos estudar ${habilidadesFormatadas} para aumentar sua compatibilidade com essa vaga.`;
}
