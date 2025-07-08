console.log(`Hello World`);

const form = document.getElementById("form-cliente");
const tabela = document.getElementById("tabela-clientes");
const modalEditar = document.getElementById("modal-editar");
const modalExcluir = document.getElementById("modal-excluir");

console.log(modalExcluir);

// ---- inputs ----

const inputNome = document.getElementById("nome");
const inputSobrenome = document.getElementById("sobrenome");
const inputCpf = document.getElementById("cpf");
const inputEmail = document.getElementById("email");

// inputs modal editar

const inputEditNome = document.getElementById("edit-nome");
const inputEditSobrenome = document.getElementById("edit-sobrenome");
const inputEditCpf = document.getElementById("edit-cpf");
const inputEditEmail = document.getElementById("edit-email");

//form edição

const formEdicao = document.getElementById("form-edicao");

const btnCancelar = document.getElementById("cancelar-edicao");

//modal exclusao

const btnConfirmaExclusao = document.getElementById("confirmar-exclusao");
const btnCancelarExclusao = document.getElementById("cancelar-exclusao");
//dentro do arrey vamos manupular os dados dos clientes
let cliente = [
  {
    nome: "Rodrigo",
    sobrenome: "Medeiros",
    cpf: 1818282940921,
    email: "rodrigo@gmail.com",
  },
  {
    nome: "Arthur",
    sobrenome: "Robson",
    cpf: 829765279012,
    email: "arthur@gmail.com",
  },
  {
    nome: "Cesar",
    sobrenome: "Luca",
    cpf: 2927467291086,
    email: "luca@gmail.com",
  },
];

//
let indexEditando = null;

let indexExcluindo = null;

//vamos trabalhar com a exibição da dos dados

function renderizarTabela() {
  cliente.forEach((cliente) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${cliente.nome} </td>
    <td>${cliente.sobrenome} </td>
    <td> ${cliente.cpf}</td>
    <td> ${cliente.email}</td>    
    `;
    //para criar td acoes
    const tdAcoes = document.createElement("td");
    tdAcoes.classList.add("acoes");
    //criar botão editar e add as class
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("editar");

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("excluir");

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    tabela.appendChild(tr);
  });
}

renderizarTabela();
