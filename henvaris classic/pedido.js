/*=========================================
 HENVARIS CLASSIC
 PEDIDO.JS
=========================================*/

// Recupera o carrinho salvo
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const listaProdutos = document.getElementById("lista-produtos");
const valorTotal = document.getElementById("valor-total");

// Mostrar produtos
function carregarPedido(){

    listaProdutos.innerHTML="";

    let total=0;

    if(cart.length===0){

        listaProdutos.innerHTML=`
            <p>Seu carrinho está vazio.</p>
        `;

        valorTotal.innerText="0,00";

        return;

    }

    cart.forEach(item=>{

        const subtotal=item.preco*item.quantidade;

        total+=subtotal;

        listaProdutos.innerHTML+=`

        <div class="produto-resumo">

            <div>

                <strong>${item.nome}</strong><br>

                Quantidade: ${item.quantidade}

            </div>

            <div>

                R$ ${subtotal.toFixed(2)}

            </div>

        </div>

        `;

    });

    valorTotal.innerText=total.toFixed(2);

}

carregarPedido();

/*=========================================
 ENVIAR PEDIDO FORM SUBMIT
=========================================*/

document.getElementById("pedidoForm").addEventListener("submit", function () {

    let listaProdutos = "";
    let total = 0;

    cart.forEach(item => {

        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        listaProdutos +=
`Produto: ${item.nome}
Quantidade: ${item.quantidade}
Preço: R$ ${item.preco.toFixed(2)}
-------------------------

`;

    });

    listaProdutos += `TOTAL: R$ ${total.toFixed(2)}`;

    document.getElementById("produtos").value = listaProdutos;

    localStorage.removeItem("cart");

});