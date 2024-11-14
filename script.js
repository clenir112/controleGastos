const formGasto = document.getElementById('formGasto');
const listaGastos = document.getElementById('listaGastos');
const totalGastosDisplay = document.getElementById('totalGastos');
const gastosCartoesDisplay = document.getElementById('gastosCartoes');

let totalGastos = 0;
let gastosPorCartao = { PickPay: 0, Will: 0, Nubank: 0 };

// Função para carregar os gastos do Local Storage
function carregarGastos() {
    const gastosSalvos = JSON.parse(localStorage.getItem('gastos')) || [];
    gastosSalvos.forEach(gasto => {
        adicionarGasto(gasto.data, gasto.valor, gasto.cartao);
    });
}

// Função para adicionar gasto à lista e atualizar totais
function adicionarGasto(data, valor, cartao) {
    const li = document.createElement('li');
    li.textContent = `Data: ${data}, Valor: R$ ${valor.toFixed(2)}, Cartão: ${cartao}`;
    listaGastos.appendChild(li);

    totalGastos += valor;
    totalGastosDisplay.textContent = `Total de Gastos: R$ ${totalGastos.toFixed(2)}`;

    gastosPorCartao[cartao] += valor;
    gastosCartoesDisplay.textContent = `Gastos por Cartão: PickPay: R$ ${gastosPorCartao.PickPay.toFixed(2)}, Will: R$ ${gastosPorCartao.Will.toFixed(2)}, Nubank: R$ ${gastosPorCartao.Nubank.toFixed(2)}`;
}

// Carregar os gastos ao iniciar
carregarGastos();

formGasto.addEventListener('submit', function(event) {
    event.preventDefault();

    const data = document.getElementById('data').value;
    const valor = parseFloat(document.getElementById('valor').value.replace(',', '.'));
    const cartao = document.getElementById('cartao').value;

    if (isNaN(valor)) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    // Adiciona gasto à lista e ao Local Storage
    adicionarGasto(data, valor, cartao);

    // Salva o gasto no Local Storage
    const gastosSalvos = JSON.parse(localStorage.getItem('gastos')) || [];
    gastosSalvos.push({ data, valor, cartao });
    localStorage.setItem('gastos', JSON.stringify(gastosSalvos));

    // Limpa o formulário
    formGasto.reset();
});

// Seleciona o botão de limpar
const botaoLimpar = document.getElementById('limpar');

// Adiciona um evento de clique ao botão
botaoLimpar.addEventListener('click', function() {
    // Limpa a lista de gastos
    listaGastos.innerHTML = '';
    
    // Reseta os totais
    totalGastos = 0;
    totalGastosDisplay.textContent = `Total de Gastos: R$ 0.00`;

    // Reseta os gastos por cartão
    gastosPorCartao = {
        PickPay: 0,
        Will: 0,
        Nubank: 0
    };
    gastosCartoesDisplay.textContent = `Gastos por Cartão: PickPay: R$ 0.00, Will: R$ 0.00, Nubank: R$ 0.00`;

    // Limpa o Local Storage
    localStorage.removeItem('gastos');
});
