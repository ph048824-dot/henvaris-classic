/*=========================================
 HENVARIS CLASSIC
 SCRIPT.JS
=========================================*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/*=========================================
 ADICIONAR AO CARRINHO
=========================================*/


function addToCart(nome, preco){

    const produto = cart.find(item => item.nome === nome);

    if(produto){
        produto.quantidade++;
    }else{
        cart.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    salvarCarrinho();
    renderCart();

}

/*=========================================
 SALVAR CARRINHO
=========================================*/

function salvarCarrinho(){

localStorage.setItem("cart",JSON.stringify(cart));

}

/*=========================================
 MOSTRAR CARRINHO
=========================================*/

function renderCart(){

const items = document.getElementById("items");

const total = document.getElementById("total");

const contador = document.getElementById("cart-count");

items.innerHTML="";

let valorTotal=0;

let quantidadeTotal=0;

cart.forEach((item,index)=>{

const subtotal=item.preco*item.quantidade;

valorTotal+=subtotal;

quantidadeTotal+=item.quantidade;

items.innerHTML+=`

<div class="cart-item">

<h4>${item.nome}</h4>

<p>

R$ ${item.preco.toFixed(2)}

</p>

<div class="cart-controls">

<button onclick="diminuirQuantidade(${index})">−</button>

<span>${item.quantidade}</span>

<button onclick="aumentarQuantidade(${index})">+</button>

</div>

<p>

Subtotal:

<strong>

R$ ${subtotal.toFixed(2)}

</strong>

</p>

<button class="remover"

onclick="removerProduto(${index})">

🗑 Remover

</button>

</div>

`;

});

total.innerText=valorTotal.toFixed(2);

contador.innerText=quantidadeTotal;

salvarCarrinho();


}

/*=========================================
 AUMENTAR
=========================================*/

function aumentarQuantidade(index){

cart[index].quantidade++;

renderCart();

}

/*=========================================
 DIMINUIR
=========================================*/

function diminuirQuantidade(index){

if(cart[index].quantidade>1){

cart[index].quantidade--;

}else{

cart.splice(index,1);

}

renderCart();

}

/*=========================================
 REMOVER
=========================================*/

function removerProduto(index){

cart.splice(index,1);

renderCart();

}

/*=========================================
 ABRIR / FECHAR
=========================================*/

function toggleCart(){
document.getElementById("cart").classList.toggle("active");
}

/*=========================================
 COMPRAR AGORA
=========================================*/

function comprarAgora(nome,preco){

cart=[];

cart.push({

nome:nome,

preco:preco,

quantidade:1

});

salvarCarrinho();

window.location.href=

"pedido.html?cart="+

encodeURIComponent(JSON.stringify(cart));

}

/*=========================================
 FINALIZAR
=========================================*/

function finalizar(){

salvarCarrinho();

window.location.href=

"pedido.html?cart="+

encodeURIComponent(JSON.stringify(cart));

}

renderCart();
/*=========================================
 FILTRAR PRODUTOS
=========================================*/

function filtrarCategoria(categoria){

const produtos=document.querySelectorAll(".produto");

produtos.forEach(produto=>{

if(categoria==="todos"){

produto.style.display="block";
return;

}

if(produto.dataset.categoria===categoria){

produto.style.display="block";

}else{

produto.style.display="none";

}

});

}

/*=========================================
 PESQUISA
=========================================*/

function pesquisarProdutos(){

const input=document.getElementById("pesquisa");

if(!input) return;

const texto=input.value.toLowerCase();

const produtos=document.querySelectorAll(".produto");

produtos.forEach(produto=>{

const nome=produto.querySelector("h3").innerText.toLowerCase();

if(nome.includes(texto)){

produto.style.display="block";

}else{

produto.style.display="none";

}

});

}

/*=========================================
 LIMPAR CARRINHO
=========================================*/

function limparCarrinho(){

if(cart.length===0){

alert("Seu carrinho está vazio.");

return;

}

if(confirm("Deseja limpar todo o carrinho?")){

cart=[];

renderCart();

}

}

/*=========================================
 CONTADOR
=========================================*/

function atualizarContador(){

const contador=document.getElementById("cart-count");

if(!contador) return;

let total=0;

cart.forEach(item=>{

total+=item.quantidade;

});

contador.innerText=total;

}

/*=========================================
 AO CARREGAR A PÁGINA
=========================================*/

window.onload=function(){

renderCart();

atualizarContador();

}
/*=========================================
 BUSCAR CEP
=========================================*/

async function buscarCEP(){

const cep=document.getElementById("cep").value.replace(/\D/g,'');

if(cep.length!==8){

return;

}

try{

const resposta=await fetch(`https://viacep.com.br/ws/${cep}/json/`);

const dados=await resposta.json();

if(dados.erro){

alert("CEP não encontrado.");

return;

}

document.getElementById("rua").value=dados.logradouro || "";

document.getElementById("bairro").value=dados.bairro || "";

document.getElementById("cidade").value=dados.localidade || "";

document.getElementById("estado").value=dados.uf || "";

}catch(error){

alert("Erro ao consultar o CEP.");

}

}
function abrirLogin(){
    alert("Área de login em desenvolvimento.");
}

function abrirBusca(){
    const pesquisa = document.getElementById("pesquisa");

    if(pesquisa){
        pesquisa.focus();
    }else{
        alert("Campo de pesquisa não encontrado.");
    }
}
/*=========================================
 BUSCA
=========================================*/

function abrirBusca(){
    document.getElementById("busca-box").classList.add("active");
}

function fecharBusca(){
    document.getElementById("busca-box").classList.remove("active");
}

/*=========================================
 LOGIN
=========================================*/

function abrirLogin(){
    document.getElementById("login-box").classList.add("active");
}

function fecharLogin(){
    document.getElementById("login-box").classList.remove("active");
}