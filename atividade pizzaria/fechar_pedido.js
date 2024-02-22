function confirmarVoltar() {
    // Exibir um pop-up de confirmação
    let confirmacao = window.confirm("Se voltar, seu pedido será perdido. Tem certeza que deseja voltar para o cardápio?");

    // Verificar a resposta do pop-up
    if (confirmacao) {
        window.location.href = "produtos.html"; // Redireciona se a resposta for verdadeira
    } else {
        // Ação a ser executada se a resposta for falsa (usuário cancelar)
    }
}

function fechar() {
    var mensagem = "Pedido Feito com Sucesso"
    window.alert(mensagem)
    window.location.href = "home.html";
}

// Função para obter os parâmetros da URL
function obterParametroURL(nomeParametro) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(nomeParametro);
}

// Função para limpar os campos do endereço
function limparCamposEndereco() {
    document.querySelector('input[name=rua]').value = '';
    document.querySelector('input[name=bairro]').value = '';
    document.querySelector('input[name=cidade]').value = '';
    document.querySelector('input[name=estado]').value = '';
}

// Recuperar o subtotal da URL
let subtotal = obterParametroURL('subtotal');
let detalhesPedido = document.getElementById('detalhesPedido');
let detalhesHTML = `<h2>Detalhes do Pedido</h2>`;


// Recuperar e exibir as quantidades e subtotais de cada pizza com quantidade maior que 0
const paramKeys = Array.from(new URLSearchParams(window.location.search).keys());
paramKeys.forEach(param => {
    if (param.startsWith('q')) {
        let numPizza = param.substring(1);
        let quantidade = obterParametroURL(param);
        let valorUnitario = obterParametroURL(`vu${numPizza}`); // Recuperando o valor unitário da pizza
        let subtotalPizza = obterParametroURL(`s${numPizza}`);
     //   let saborPizza = obterParametroURL(`sabor${numPizza}`); // Recuperando o sabor da pizza
        if (quantidade > 0) {
            let nomePizza = '';
            if (numPizza === '1') {
                nomePizza = 'Pizza Pequena';
            } else if (numPizza === '2') {
                nomePizza = 'Pizza Média';
            } else if (numPizza === '3') {
                nomePizza = 'Pizza Grande';
            }
            detalhesHTML += `<p>${nomePizza} <br>Valor Unitário: R$${valorUnitario} <br>Quantidade: ${quantidade} <br>Subtotal: R$${subtotalPizza}</p>`;
        }
    }
});
detalhesHTML += `<h3>Valor Final: R$${subtotal}</h3>`;

// Adicionar detalhes do pedido à página
detalhesPedido.innerHTML = detalhesHTML;
function preencherEndereco(json) {
    if (json.logradouro) {
        document.querySelector('input[name=rua]').value = json.logradouro;
        document.querySelector('input[name=bairro]').value = json.bairro;
        document.querySelector('input[name=cidade]').value = json.localidade;
        document.querySelector('input[name=estado]').value = json.uf;
    }
}
function buscarCEP() {
    const cep = document.querySelector("input[name=cep]");

    // replace remove todos os caracteres que não sejam números
    const value = cep.value.replace(/[^0-9]+/, '');

    if (value === '') {
        // Se o campo do CEP estiver vazio, limpar os outros campos
        limparCamposEndereco();
        return; // Encerra a função sem fazer a requisição
    }

    //cria a linha de consulta, incluindo o cep contido em value
    const url = `https://viacep.com.br/ws/${value}/json/`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })

        .then(preencherEndereco);
}
document.querySelector("input[name=cep]").addEventListener("input", buscarCEP);
