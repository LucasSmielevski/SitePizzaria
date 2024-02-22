
const campo = document.getElementById('quantidade');

campo.addEventListener('focus', function () {
    this.select();
});

document.getElementById('fecharPedidoLink').addEventListener('click', function () {
    // Obtenção das quantidades e preços das pizzas
    let quantidades = document.querySelectorAll('.quants');
    let precos = document.querySelectorAll('.preco');

    let subtotal = 0;
    let queryString = '';
    let quantidadeMaiorQueZero = false;

    // Verificação se a quantidade é maior que zero
    for (let i = 0; i < quantidades.length; i++) {
        let quantidade = parseFloat(quantidades[i].value);
        if (quantidade > 0) {
            quantidadeMaiorQueZero = true;
            let precoPizza = parseFloat(precos[i].innerText.replace('R$', ''));

            queryString += `&q${i + 1}=${quantidade}&s${i + 1}=${quantidade * precoPizza}`;

            let valorUnitario = precoPizza;
            queryString += `&vu${i + 1}=${valorUnitario}`; // Adicionando valor unitário à query string

            subtotal += quantidade * precoPizza;
        }
    }

    // Redirecionamento se a quantidade for maior que zero
    if (quantidadeMaiorQueZero) {
        window.location.href = `fechar_pedido.html?subtotal=${subtotal}${queryString}`;
    } else {
        // Se a quantidade for zero, exibe uma mensagem 
        alert('Adicione pelo menos uma pizza para fechar o pedido.');
    }
});

/*document.getElementById('adicao').addEventListener('click', function () {
    var tamanho = document.querySelector('tamanhopizza');
    var quantidade = document.getElementById('quantidade').value;
    var sabor = document.querySelector('input[name="saborPizza"]:checked').nextSibling.nodeValue.trim();
    var detalhesPedido = document.getElementById('detalhesPedido');
    detalhesPedido.innerHTML += 'Tamanho' + tamanho + '<br>Quantidade: ' + quantidade + '<br>Sabor: ' + sabor + '<br><br>';
});*/