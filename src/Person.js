export default class Person {
  #name;
  #cpf;

  constructor(name, cpf) {
    this.#name = name;
    this.#cpf = cpf;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get cpf() {
    const cpfStr = this.#cpf.toString().padStart(11, '0');
    return cpfStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  set cpf(cpf) {
    this.#cpf = cpf;
  }

  displayData() {
    return `Nome: ${this.name}, CPF: ${this.cpf}`;
  }

  toJSON() {
    return {
      name: this.name,
      cpf: this.cpf,
    };
  }
}
