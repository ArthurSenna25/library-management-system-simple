import Person from './Person.js';

export default class Reader extends Person {
  constructor(name, cpf, readerCode) {
    super(name, cpf);
    this.readerCode = readerCode;
    this.borrowedBooks = [];
  }

  lendBook(title) {
    this.borrowedBooks.push(title);
  }

  displayData() {
    return (
      `${super.displayData()}\n` +
      `Código do Leitor: ${this.readerCode}, Livros Emprestados: ${
        (this.borrowedBooks.join(",") || 'Nenhum livro emprestado')
      }\n`
    );
  }

  toJSON() {
    return {
      ...super.toJSON(),
      readerCode: this.readerCode,
      borrowedBooks: this.borrowedBooks,
    };
  }
}
