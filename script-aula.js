const form = document.getElementById("form-cliente");
const tabela = document.getElementById("tabela-clientes");
const modalEditar = document.getElementById("modal-editar");
const modalExcluir = document.getElementById("modal-excluir");

//---- inputs ----

const inputNome = document.getElementById("nome");
const inputSobrenome = document.getElementById("sobrenome");
const inputCpf = document.getElementById("cpf");
const inputEmail = document.getElementById("email");

// ---- inputs do modal editar ----

const inputEditNome = document.getElementById("edit-nome");
const inputEditSobrenome = document.getElementById("edit-sobrenome");
const inputEditCpf = document.getElementById("edit-cpf");
const inputEditEmail = document.getElementById("edit-email");

// --- capturando form de edicao e botoes

const formEdicao = document.getElementById("form-edicao");
const btnCancelarEdicao = document.getElementById("cancelar-edicao");
const btnConfirmarExclusao = document.getElementById("confirmar-exclusao");
const btnCancelarExclusao = document.getElementById("cancelar-exclusao");

let clientes = [];

//variaveis auxiliares
let indexEditando = null;
let indexExcluindo = null;

function renderizarTabela() {
  //limpa todo o HTML de dentro da tabela
  tabela.innerHTML = "";

  //forEach vai passar por cada item
  clientes.forEach((cliente, index) => {
    //para cada cliente
    //cria o <tr></tr> principal do item
    const tr = document.createElement("tr");

    //injeta os dados direto pelo innerHTML dentro do tr
    tr.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.sobrenome}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.email}</td>
    `;

    //cria o <td> que receberá os botões
    const tdAcoes = document.createElement("td");
    //adiciona class="acoes" no td criado
    tdAcoes.classList.add("acoes");

    //criando o button editar
    const btnEditar = document.createElement("button");
    //inserindo o texto do botao
    btnEditar.textContent = "Editar";
    //adicionando class="editar" no botao
    btnEditar.classList.add("editar");
    // adicionando o onClick
    btnEditar.onclick = () => abrirModalEditar(cliente, index);

    //criando o button excluir
    const btnExcluir = document.createElement("button");
    //inserindo o texto do botao
    btnExcluir.textContent = "Excluir";
    //adicionando class="exluir" no botao
    btnExcluir.classList.add("excluir");
    //adicionando o onClick do excluir
    btnExcluir.onclick = () => abrirModalExcluir(index);

    //inserindo botao editar e excluir dentro do td acoes
    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);

    //inserindo td acoes dentro do tr principal do item
    tr.appendChild(tdAcoes);

    //inserindo o tr principal do item dentro do tbody
    tabela.appendChild(tr);
  });
}

form.addEventListener("submit", (event) => {
  //sempre use isso para evitar recarrecamento da pagina ao enviar formulário
  event.preventDefault();

  //capturar os valores digitados nos inputs
  const nome = inputNome.value;
  const sobrenome = inputSobrenome.value;
  const cpf = inputCpf.value;
  const email = inputEmail.value;

  //verifico se tenho todos os campos digitados
  if (!nome || !sobrenome || !cpf || !email) {
    return;
  }

  //preparar o objeto
  const objCliente = {
    nome,
    sobrenome,
    cpf,
    email,
  };

  //inserindo o objeto no array clientes
  clientes.push(objCliente);

  //resetar meu formulário
  form.reset();

  //atualizo a lista da tabela
  renderizarTabela();
});

function abrirModalEditar(cliente, index) {
  inputEditNome.value = cliente.nome;
  inputEditSobrenome.value = cliente.sobrenome;
  inputEditCpf.value = cliente.cpf;
  inputEditEmail.value = cliente.email;

  indexEditando = index;

  modalEditar.style.display = "flex";
}

function fecharModalEditar() {
  indexEditando = null;
  modalEditar.style.display = "none";
}

btnCancelarEdicao.addEventListener("click", () => {
  fecharModalEditar();
});

function abrirModalExcluir(index) {
  indexExcluindo = index;
  modalExcluir.style.display = "flex";
}

function fecharModalExcluir() {
  indexExcluindo = null;
  modalExcluir.style.display = "none";
}

btnCancelarExclusao.addEventListener("click", () => {
  fecharModalExcluir();
});

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

  indexEditando = null;
  fecharModalEditar();

  renderizarTabela();
});

btnConfirmarExclusao.addEventListener("click", () => {
  if (indexExcluindo !== null) {
    clientes.splice(indexExcluindo, 1);
    fecharModalExcluir();
    renderizarTabela();
  }
});

//executando a função de leitura dos dados (READ)
renderizarTabela();
