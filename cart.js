const detalleCompra = [];
precioBruto = 0;
const suma = x => precioBruto = precioBruto + x;

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
    constructor(cantidad, item, precio){
    var suma = 0;
        this.cantidad = cantidad;
        this.item = item;
        this.precio = precio;
        UpdateCart();
    }
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
        suma(parseInt(producto.precio));
        document.getElementById("descripcion").innerHTML += `<p id="descripcion">${producto.item}</p>`
        document.getElementById("cantidad").innerHTML += `<p id="cantidad">${producto.cantidad}</p>`
        document.getElementById("precio").innerHTML += `<p id="precio">${producto.precio}</p>`
    }
    sessionStorage.setItem('precioBruto', precioBruto);
    sessionStorage.setItem('iva',Math.ceil(calculoIva(sessionStorage.getItem('precioBruto'))));
    sessionStorage.setItem('precioTotal',Math.ceil(totalCompra(precioBruto,calculoIva((sessionStorage.getItem('precioBruto'))))));

}

function checkoutCart(){
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
    precioBruto = 0;
    iva = 0;
    precioTotal = 0;
    checkout();
    document.getElementById("subtotal").innerHTML = `<p id="subtotal">$${precioBruto}</p>`;
    document.getElementById("iva").innerHTML = `<p id="iva">$${sessionStorage.getItem('iva')}</p>`;
    document.getElementById("precioTotal").innerHTML = `<p id="precioTotal">$${sessionStorage.getItem('precioTotal')}</p>`;
}