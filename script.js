const form = document.getElementById("form-cliente");
const tabela = document.getElementById("tabela-clientes");
const modalEditar = document.getElementById("modal-editar");
const modalExcluir = document.getElementById("modal-excluir");

const inputNome = document.getElementById("nome");
const inputSobrenome = document.getElementById("sobrenome");
const inputCpf = document.getElementById("cpf");
const inputEmail = document.getElementById("email");

aplicandoMascaraCpf(inputCpf); //função para deixar o campo do cpf padrão

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

let clientes = [];

function salvarClientesNoLocalStore() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}

function aplicandoMascaraCpf(campo) {
  campo.addEventListener("input", function () {
    let valor = campo.value.replace(/\D/g, ""); // Remove tudo que não for número

    if (valor.length > 11) valor.slice(0, 11);

    //aplicando o 000.000.000-00
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    campo.value = valor;
  });
}

function showError(idCampo, mensagem) {
  //cria um span com uma mensagem de erro
  document.getElementById(`erro-${idCampo}`).textContent = mensagem;
  //muda a cor do input para vermelho junto
  document.getElementById(idCampo).style.borderColor = "red";
}

function limparErros() {
  // Limpa todos os spans com classe erro
  document.querySelectorAll(".erro").forEach((el) => (el.textContent = ""));
  //Remove a cor vermelha das bordas
  document.querySelectorAll("input").forEach((input) => {
    input.style.borderColor = "";
  });
}

function limparInputs() {
  //reseta inputs
  inputNome.value = "";
  inputSobrenome.value = "";
  inputCpf.value = "";
  inputEmail.value = "";
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  return /^\d{11}$/.test(cpf);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//função auxiliar dos para exibir tabela
function renderizarTabela() {
  tabela.innerHTML = "";
  clientes.forEach((cliente, index) => {
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

    // tdAcoes.appendChild(btnEditar); //dados mocados
    // tdAcoes.appendChild(btnExcluir); //dados mocados

    //substituições
    btnEditar.addEventListener("click", () => {
      const index = clientes.indexOf(cliente); //armazena index
      abrirModalEdicao(cliente, index);
    });

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    tabela.appendChild(tr);
  });
}

function abrirModalEdicao(cliente, index) {
  inputEditNome.value = cliente.nome;
  inputEditSobrenome.value = cliente.sobrenome;
  inputEditCpf.value = cliente.cpf;
  inputEditEmail.value = cliente.email;

  indexEditando = index;

  modalEditar.style.display = "block"; //mostra modal
}

btnCancelar.addEventListener("click", () => {
  modalEditar.style.display = "none";
});

form.addEventListener("submit", function (event) {
  event.preventDefault(); //inpede o recarregamento da pagina

  limparErros(); //funcção para limoar erros
  let temErro = false;

  const nome = inputNome.value.trim();
  const sobrenome = inputSobrenome.value.trim();
  const cpf = inputCpf.value.trim();
  const email = inputEmail.value.trim();

  if (!nome) {
    showError("nome", "Preencha o nome.");
    temErro = true;
  }

  if (!sobrenome) {
    showError("sobrenome", "Preencha o sobrenome.");
    temErro = true;
  }

  if (!cpf) {
    showError("cpf", "Preencha o CPF.");
    temErro = true;
  } else if (!validarCPF(cpf)) {
    showError("cpf", "CPF inválido (use apenas 11 números).");
    temErro = true;
  } else if (clientes.some((c) => c.cpf === cpf)) {
    showError("cpf", "CPF já cadastrado");
    temErro = true;
  }

  if (!email) {
    showError("email", "Preencha o e-mail.");
    temErro = true;
  } else if (!validarEmail(email)) {
    showError("email", "E-mail inválido.");
    temErro = true;
  }

  if (temErro) return;

  const cliente = { nome, sobrenome, cpf, email };

  clientes.push(cliente);
  salvarClientesNoLocalStore();
  renderizarTabela();
  limparInputs();
});

formEdicao.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = inputEditNome.value.trim();
  const sobrenome = inputEditSobrenome.value.trim();
  const cpf = inputEditCpf.value.trim();
  const email = inputEditEmail.value.trim();
  //atualiza clientes do arrey
  clientes[indexEditando] = { nome, sobrenome, cpf, email };

  //salva novamente no localStorage
  salvarClientesNoLocalStore();

  //renderiza a tabela
  renderizarTabela();
  modalEditar.style.display = "none";
});

//recupera dados do localStorage ao carregar a página
const dadosSalvos = localStorage.getItem("clientes");
if (dadosSalvos) {
  clientes = JSON.parse(dadosSalvos);
  renderizarTabela();
}

let indexEditando = null;
let indexExcluindo = null;
