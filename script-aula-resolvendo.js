const form = document.getElementById("form-cliente");
const tabela = document.getElementById("tabela-clientes");
const modalEditar = document.getElementById("modal-editar");
const modalExcluir = document.getElementById("modal-excluir");

// ---- inputs -----

const inputNome = document.getElementById("nome");
const inputSobrenome = document.getElementById("sobrenome");
const inputcpf = document.getElementById("cpf");
const inputEmail = document.getElementById("email");

// ----- inputs do modal editar -----

const inputEditNome = document.getElementById("edit-nome");
const inputEditSobrenome = document.getElementById("edit-sobrenome");
const inputEditCpf = document.getElementById("edit-cpf");
const inputEditEmail = document.getElementById("edit-email");

const formEdicao = document.getElementById("form-edicao");
const btnCancelarEdicao = document.getElementById("cancelar-edicao");
const btnConfirmarExclusao = document.getElementById("confirmar-exclusao");
const btnCancelarExclusao = document.getElementById("cancelar-exclusao");

let clientes = [
  {
    nome: "Rodrigo",
    sobrenome: "Medeiros",
    cpf: "122334567",
    email: "rodrigo@mail.com",
  },
  {
    nome: "Rodrigo",
    sobrenome: "Medeiros",
    cpf: "122334567",
    email: "rodrigo@mail.com",
  },
  {
    nome: "Rodrigo",
    sobrenome: "Medeiros",
    cpf: "122334567",
    email: "rodrigo@mail.com",
  },
];

let indexEditando = null;
let indexExcluindo = null;

function renderizarTabela() {
  tabela.innerHTML = "";

  clientes.forEach((cliente, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.sobrenome}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.email}</td>
    `;

    const tdAcoes = document.createElement("td");
    tdAcoes.classList.add("acoes");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("editar");
    btnEditar.onclick = () => abrirModalEditar(cliente, index);

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("excluir");
    btnExcluir.onclick = () => abrirModalExcluir(index);

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    tabela.appendChild(tr);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); //sempre uso isso em um evento submit para evitar carregamento da página

  const nome = inputNome.value;
  const sobrenome = inputSobrenome.value;
  const cpf = inputcpf.value;
  const email = inputEmail.value;

  if (!nome || !sobrenome || !cpf || !email) {
    return;
  }

  const objCliente = {
    nome,
    sobrenome,
    cpf,
    email,
  };

  clientes.push(objCliente);

  renderizarTabela();
  form.reset();
});

function abrirModalEditar(cliente, index) {
  modalEditar.style.display = "flex";

  inputEditNome.value = cliente.nome;
  inputEditSobrenome.value = cliente.sobrenome;
  inputEditCpf.value = cliente.cpf;
  inputEditEmail.value = cliente.email;

  indexEditando = index;
}

formEdicao.addEventListener("submit", (event) => {
  event.preventDefault();

  clientes[indexEditando] = {
    nome: inputEditNome.value,
    sobrenome: inputEditSobrenome.value,
    cpf: inputEditCpf.value,
    email: inputEditEmail.value,
  };

  if (
    !inputEditNome.value ||
    !inputEditSobrenome.value ||
    !inputEditCpf.value ||
    !inputEditEmail.value
  ) {
    return;
  }

  fecharModalEditar();
  renderizarTabela();
});

function fecharModalEditar() {
  indexEditando = null;
  modalEditar.style.display = "none";
}

function abrirModalExcluir(index) {
  indexExcluindo = index;
  modalExcluir.style.display = "flex";
}

function fecharModalExcluir() {
  indexExcluindo = null;
  modalExcluir.style.display = "none";
}

function confirmarExclusao() {
  clientes.splice(indexExcluindo, 1);

  fecharModalExcluir();
  renderizarTabela();
}

btnConfirmarExclusao.addEventListener("click", confirmarExclusao);

btnCancelarExclusao.addEventListener("click", fecharModalExcluir);

btnCancelarEdicao.addEventListener("click", fecharModalEditar);

renderizarTabela();
