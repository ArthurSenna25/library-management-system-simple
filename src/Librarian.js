import Person from './Person.js';

export default class Librarian extends Person {
  constructor(name, cpf, employeeRegistration, shift) {
    super(name, cpf);
    this.employeeRegistration = employeeRegistration;
    this.shift = shift;
    this.loans = [];
  }

  registerLoan(readers) {
    readers.forEach((reader) => {
      this.loans.push({
        readerName: reader.name,
        books: [reader.borrowedBooks],
      });
    });
  }

  displayLoans() {
    if (this.loans.length === 0) {
      return 'Nenhum empréstimo registrado.';
    } else {
      let result = 'Empréstimos registrados pelo bibliotecário:\n';
      this.loans.forEach((loan, index) => {
        result += `${index + 1}. ${loan.readerName} pegou os livros: ${
          loan.books
        }\n`;
      });
      return result;
    }
  }

  displayData() {
    return (
      `${super.displayData()}\n` +
      `Matrícula: ${this.employeeRegistration}, Turno: ${this.shift}\n` +
      `${this.displayLoans()}`
    );
  }

  toJSON() {
    return {
      ...super.toJSON(),
      employeeRegistration: this.employeeRegistration,
      shift: this.shift,
      loans: this.loans,
    };
  }
}
