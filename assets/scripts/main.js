import { VagaFrontEnd } from "./motor.js";

const vaga = new VagaFrontEnd(
    1,
    "Tech Solutions",
    "Front-end",
    ["HTML", "CSS", "JavaScript"],
    3500,
    "Remoto",
    "JavaScript"
);

console.log(vaga);
console.log(vaga.obterDescricao());