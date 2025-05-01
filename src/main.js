import Reader from './Reader.js';
import Librarian from './Librarian.js';

document.addEventListener('DOMContentLoaded', () => {
  const name = document.getElementById('name');
  const cpf = document.getElementById('cpf');

  const jobSelect = document.getElementById('job-select');

  const readerCodeDiv = document.getElementById('reader-code-div');
  const borrowedBookDiv = document.getElementById('borrowed-book-div');
  const readerCode = document.getElementById('reader-code');
  const borrowedBook = document.getElementById('borrowed-book');
  const addBorrowedBookButton = document.getElementById(
    'add-borrowed-book-button',
  );

  const employeeRegistrationDiv = document.getElementById(
    'employee-registration-div',
  );
  const shiftDiv = document.getElementById('shift-div');
  const registerLoanDiv = document.getElementById('register-loan-div');
  const registerLoan = document.getElementById('register-loan');
  const employeeRegistration = document.getElementById('employee-registration');
  const shift = document.getElementById('shift');
  const addLoanReaderButton = document.getElementById('add-loan-reader-button');

  const sendButton = document.getElementById('send-button');

  const displayResults = document.getElementById('display-results');
  const displayResultsButton = document.getElementById(
    'display-results-button',
  );

  jobSelect.addEventListener('change', function () {
    const selectedJob = jobSelect.value;
    displayResults.textContent = '';

    if (selectedJob === 'reader') {
      employeeRegistrationDiv.style.display = 'none';
      shiftDiv.style.display = 'none';
      registerLoanDiv.style.display = 'none';
      readerCodeDiv.style.display = 'block';
      borrowedBookDiv.style.display = 'block';
      displayResultsButton.style.display = 'block';
      displayResultsButton.textContent = 'Exibir Informações do Leitor';
    } else if (selectedJob === 'librarian') {
      readerCodeDiv.style.display = 'none';
      borrowedBookDiv.style.display = 'none';
      employeeRegistrationDiv.style.display = 'block';
      shiftDiv.style.display = 'block';
      registerLoanDiv.style.display = 'block';
      displayResultsButton.style.display = 'block';
      displayResultsButton.textContent = 'Exibir Informações do Bibliotecário';
    } else {
      readerCodeDiv.style.display = 'none';
      borrowedBookDiv.style.display = 'none';
      employeeRegistrationDiv.style.display = 'none';
      shiftDiv.style.display = 'none';
      registerLoanDiv.style.display = 'none';
      displayResultsButton.style.display = 'none';
    }
  });

  function validateFormInputs() {
    const name = document.getElementById('name').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const readerCode = document.getElementById('reader-code').value.trim();
    const employeeRegistration = document
      .getElementById('employee-registration')
      .value.trim();
    const shift = document.getElementById('shift').value.trim();
    const job = document.getElementById('job-select').value;

    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    const cpfRegex = /^\d{11}$/;
    const onlyNumbers = /^\d+$/;
    const onlyLetters = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!nameRegex.test(name)) {
      alert('Nome inválido. Use apenas letras e acentos.');
      return false;
    }

    if (!cpfRegex.test(cpf)) {
      alert('CPF inválido. Deve conter exatamente 11 dígitos numéricos.');
      return false;
    }

    if (job === 'reader') {
      if (!onlyNumbers.test(readerCode) || Number(readerCode) <= 0) {
        alert('Código do leitor inválido. Use apenas números maiores que 0.');
        return false;
      }
    }

    if (job === 'librarian') {
      if (
        !onlyNumbers.test(employeeRegistration) ||
        Number(employeeRegistration) <= 0
      ) {
        alert('Matrícula inválida. Use apenas números maiores que 0.');
        return false;
      }

      if (!onlyLetters.test(shift)) {
        alert('Turno inválido. Use apenas letras.');
        return false;
      }
    }

    return true;
  }

  function clearFields() {
    name.value = '';
    cpf.value = '';
    jobSelect.value = '';
    readerCode.value = '';
    borrowedBook.value = '';
    titles = [];
    readerLoans = [];
    employeeRegistration.value = '';
    shift.value = '';
    registerLoan.value = '';
    readerCodeDiv.style.display = 'none';
    borrowedBookDiv.style.display = 'none';
    employeeRegistrationDiv.style.display = 'none';
    shiftDiv.style.display = 'none';
    registerLoanDiv.style.display = 'none';
    displayResultsButton.style.display = 'none';
  }

  let titles = [];
  addBorrowedBookButton.addEventListener('click', () => {
    const borrowedBookValue = borrowedBook.value.trim();

    if (borrowedBookValue) {
      titles.push(borrowedBookValue);
      console.log(titles);
      alert(`Livro "${borrowedBookValue}" adicionado ao empréstimo.`);
    }

    borrowedBook.value = '';
  });

  function createReader() {
    const nameValue = name.value.trim();
    const cpfValue = cpf.value.trim();
    const readerCodeValue = readerCode.value.trim();

    const selectedJob = jobSelect.value;

    if (selectedJob === 'reader') {
      const reader = new Reader(nameValue, cpfValue, readerCodeValue);
      reader.lendBook(titles);

      const savedReaders = JSON.parse(localStorage.getItem('readers')) || [];
      savedReaders.push(reader);

      localStorage.setItem('readers', JSON.stringify(savedReaders));
    }
  }

  let readerLoans = [];
  addLoanReaderButton.addEventListener('click', () => {
    const registerLoanValue = registerLoan.value.trim();

    const savedReaders = JSON.parse(localStorage.getItem('readers')) || [];

    const matchedReader = savedReaders.find(
      (readerData) => readerData.name === registerLoanValue,
    );

    if (matchedReader) {
      const reader = new Reader(
        matchedReader.name,
        matchedReader.cpf,
        matchedReader.readerCode,
      );
      reader.borrowedBooks = matchedReader.borrowedBooks;

      readerLoans.push(reader);
      alert(`Leitor ${reader.name} adicionado ao empréstimo.`);
    } else {
      alert('Leitor não encontrado.');
    }

    registerLoan.value = '';

    console.log(readerLoans);
  });

  function createLibrarian() {
    const nameValue = name.value.trim();
    const cpfValue = cpf.value.trim();
    const employeeRegistrationValue = employeeRegistration.value.trim();
    const shiftValue = shift.value.trim();

    const selectedJob = jobSelect.value;
    if (selectedJob === 'librarian') {
      const librarian = new Librarian(
        nameValue,
        cpfValue,
        employeeRegistrationValue,
        shiftValue,
      );

      librarian.registerLoan(readerLoans);

      const savedLibrarians =
        JSON.parse(localStorage.getItem('librarians')) || [];
      savedLibrarians.push(librarian);

      localStorage.setItem('librarians', JSON.stringify(savedLibrarians));
    }
  }

  function saveInfo(event) {
    event.preventDefault();

    const selectedJob = jobSelect.value;

    if (validateFormInputs() === false) {
      return;
    }

    if (selectedJob === 'reader') {
      createReader();
    }
    if (selectedJob === 'librarian') {
      createLibrarian();
    }

    clearFields();
  }

  function renderResults(event) {
    displayResults.innerHTML = '';
    const selectedJob = jobSelect.value;

    if (selectedJob === 'reader') {
      const savedReaders = JSON.parse(localStorage.getItem('readers')) || [];

      savedReaders.forEach((readerData) => {
        const reader = new Reader(
          readerData.name,
          readerData.cpf,
          readerData.readerCode,
        );
        reader.borrowedBooks = readerData.borrowedBooks;

        const p = document.createElement('pre');
        p.textContent = `${reader.displayData()} \n`;
        displayResults.appendChild(p);
      });
    }
    if (selectedJob === 'librarian') {
      const savedLibrarians =
        JSON.parse(localStorage.getItem('librarians')) || [];

      savedLibrarians.forEach((librarianData) => {
        const librarian = new Librarian(
          librarianData.name,
          librarianData.cpf,
          librarianData.employeeRegistration,
          librarianData.shift,
        );
        librarian.loans = librarianData.loans;

        const p = document.createElement('pre');
        p.textContent = `${librarian.displayData()} \n`;
        displayResults.appendChild(p);
      });
    }
  }

  sendButton.addEventListener('click', saveInfo);
  displayResultsButton.addEventListener('click', renderResults);
});
