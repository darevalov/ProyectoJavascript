// Variables y Constantes
const detalleCompra = [];
precioBruto = 0;
const suma = x => precioBruto = precioBruto + x;
const productList = document.querySelector('.product-list');

eventListeners();

function eventListeners(){
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
    });
}

function loadJSON(){
    fetch('productos.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            precioUnidad = addCommas(product.precio);
            html += `
            <div class="col-sm-6 col-md-4">
              <div class="shop__thumb">
                  <div class="shop-thumb__img">
                    <img src="${product.image}" class="img-responsive" alt="...">
                  </div>
                  <h5 class="shop-thumb__title">${product.marca}</h5>
                  <h5 class="shop-thumb__title">
                    ${product.modelo}
                  </h5>
                  <div class="shop-thumb__price">
                    <span class="shop-thumb__price">$${precioUnidad}</span></span>
                  </div>
                <div style="margin-top: 8px;">
                  <button onclick="detalleCompra.push(new Detalle(${product.id},'1','${product.modelo}','${product.precio}'))">Añadir <i class="fa fa-shopping-cart"></i></button>
                </div>
              </div>
            </div>
            `;
        });
        productList.innerHTML = html;
    })
}

function productos(value){
    suma(value);
}

function showCart(){
    var displayCheckout = document.getElementById("checkout-items");
    var displayItems = document.getElementById("container-items");
    if (displayItems.style.display === "none") {
        displayItems.style.display = "block";
        displayCheckout.style.display = "none";
    }
    let qtyCart = sessionStorage.getItem('qtyCart');
    if (qtyCart === null) {
        qtyCart = 0;
    }
    document.getElementById("cart").innerHTML = `<i class="fa fa-shopping-cart" id="cart"></i>(${qtyCart})`
}
showCart();

function UpdateCart(){
    let qtyCart = sessionStorage.getItem('qtyCart');
    if (qtyCart === null) {
        qtyCart = 0;
    }
    qtyCart = parseInt(qtyCart)+1;
    sessionStorage.setItem('qtyCart', qtyCart);
    showCart();
}

var Detalle = class {
    constructor(id,cantidad, item, precio){
    var suma = 0;
        this.id = id;
        this.cantidad = cantidad;
        this.item = item;
        this.precio = precio;
        UpdateCart();
    }
}

function deleteItem(value){
    for( var i = 0; i < detalleCompra.length; i++){ 
        if ( detalleCompra[i].id === value) { 
            detalleCompra.splice(i, 1);
            i = detalleCompra.length;
        }
    }
    sessionStorage.setItem('qtyCart', detalleCompra.length);
    checkoutCart();
}

function calculoIva(x){
    let iva = x * 0.19;
    return iva;
}


function totalCompra(sumaProductos,iva){
    let total = sumaProductos + iva;
    return total;
}

// Checkout Cart

function checkout(){
    document.getElementById("descripcion").innerHTML = `<p id="descripcion"></p>`
    document.getElementById("cantidad").innerHTML = `<p id="cantidad"></p>`
    document.getElementById("precio").innerHTML = `<p id="precio"></p>`
    for (const producto of detalleCompra){
        var btn = document.createElement("button");
        btn.innerHTML = "Eliminar";
        suma(parseInt(producto.precio));
        precioUnidad = addCommas(producto.precio);
        document.getElementById("descripcion").innerHTML += `<p id="descripcion">${producto.item}</p>`
        document.getElementById("cantidad").innerHTML += `<p id="cantidad">${producto.cantidad}</p>`
        document.getElementById("precio").innerHTML += `<table><tr><td>${precioUnidad}</td><td><button id="${producto.id}" onclick="deleteItem(${producto.id})">Eliminar</button></td></tr></table>`
    }
    sessionStorage.setItem('precioBruto', precioBruto);
    sessionStorage.setItem('iva',Math.ceil(calculoIva(sessionStorage.getItem('precioBruto'))));
    sessionStorage.setItem('precioTotal',Math.ceil(totalCompra(precioBruto,calculoIva((sessionStorage.getItem('precioBruto'))))));
    sessionStorage.setItem("currentCart", JSON.stringify(detalleCompra));

}

function checkoutCart(){
    precioBruto = 0;
    iva = 0;
    precioTotal = 0;
    let qtyCart = sessionStorage.getItem('qtyCart');
    if (qtyCart === null) {
        qtyCart = 0;
    }
    document.getElementById("cantidad-items").innerHTML = `<p id="cantidad-items">${qtyCart}</p>`
    var displayCheckout = document.getElementById("checkout-items");
    var displayItems = document.getElementById("container-items");
    if (displayCheckout.style.display === "none") {
        displayCheckout.style.display = "block";
        displayItems.style.display = "none";
    }
    checkout();
    precioBruto = addCommas(precioBruto);
    iva = addCommas(sessionStorage.getItem('iva'));
    precioTotal = addCommas(sessionStorage.getItem('precioTotal'));

    document.getElementById("subtotal").innerHTML = `<p id="subtotal">$${precioBruto}</p>`;
    document.getElementById("iva").innerHTML = `<p id="iva">$${iva}</p>`;
    document.getElementById("precioTotal").innerHTML = `<p id="precioTotal">$${precioTotal}</p>`;
}


// Load JSON
$.getJSON("productos.json", function(json) {
    console.log(json)
});

function pago() {
    alert ("Iniciando Pago Webpay");
  }

function addCommas(nStr){
 nStr += '';
 var x = nStr.split('.');
 var x1 = x[0];
 var x2 = x.length > 1 ? '.' + x[1] : '';
 var rgx = /(\d+)(\d{3})/;
 while (rgx.test(x1)) {
  x1 = x1.replace(rgx, '$1' + '.' + '$2');
 }
 return x1 + x2;
}