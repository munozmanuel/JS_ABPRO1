
//Funcion para añadir formato CLP a los datos numéricos
const formatoCL = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    useGrouping: true,
});

//Esta función carga las cartas vacías y las inserta en el "#contenedor-principal" del index.
$(document).ready(function() {
        console.log('se está cargando la tienda');
        $('#contenedor-principal').load('./tienda.html' , () => {  //Función .load permite la ejecución secuencial de elementos
            crearCards();
        }); 

});

//Esta función evita que el dropdown se cierre el clickear adentro de él
$('.dropdown-menu').on('click', function (e) {
    e.stopPropagation();});

// Función para crear las cards de la tienda
function crearCards() {

    for (let i=0;i<productDB.length;i++){
        $("#img-"+i).attr('src',productDB[i].img);
        // document.getElementById('img-'+i).getAttribute('src') = productDB[i].img;
        $("#titulo-"+i).html(productDB[i].nombre);
       
        
        //El signo ! es negación // '== true' no es necesario para verificar un valor que por defecto es verdadero
        //Condicional determina si el producto está en oferta o no
            if (!productDB[i].oferta) {
                $("#etiqueta-oferta-"+i).addClass("d-none");
            };

        //Si no está en oferta le pasa el precio normal, si está en oferta añade clase 'text-muted' y 'text-decoration-line-through' al precio normal y añade el precio de oferta
            if (!$("#etiqueta-oferta-"+i).hasClass("d-none")) {
                $("#etiqueta-oferta-"+i).html("Oferta "+productDB[i].dscto);
                $("#precio-"+i).html(formatoCL.format(productDB[i].precio));

                $("#precio-"+i).addClass('text-muted text-decoration-line-through');
                $("#precio-oferta-"+i).html(formatoCL.format(productDB[i].poferta));
                } else {
                    $("#precio-"+i).html(formatoCL.format(productDB[i].precio));
                };
    };
};

let contadorCarrito = 0;
$('#cantidad-carro').html(contadorCarrito);

//Arreglo para almacenar la lista de productos que se van agregando
let listaProductos = [];

//Función para añadir elemento al carrito
function agregarCarrito(opcion) {

    //Con este condicional determinamos si el producto existe dentro del arreglo que contiene los elementos enlistados en el resumen del carro. Si no es repetido, añade un nuevo elemento al documento HTML
    if (listaProductos.indexOf(productDB[opcion]) === -1) {
        console.log('producto no repetido');
        listaProductos.push(productDB[opcion]);  
        

        $('#resumen-carro').append('<li id="posicion-dropdown-'+opcion+'"><p id="nombre-li-'+opcion+'"></p><div id="cont-resu-carro"><i onclick="restarProducto('+opcion+')" class="fa-solid fa-square-minus fa-xl"></i><p class="contador-resu badge bg-dark" id="cant-resu-'+opcion+'">1</p><i onclick="sumarProducto('+opcion+')" class="fa-solid fa-square-plus fa-xl"></i></div></div><p class="precio-li" id="precio-li-'+opcion+'" ></p><div><i onclick="eliminarLinea('+opcion+')" class="fa-solid fa-trash icono-eliminar"></i></li>');
       
        
    //Este condicional determina si el producto está en oferta o no para desplegar el precio.
    if (productDB[opcion].oferta){
        $('#precio-li-'+opcion).html(formatoCL.format(productDB[opcion].poferta));
    } else {
        $('#precio-li-'+opcion).html(formatoCL.format(productDB[opcion].precio));
    };

    //Si el producto es repetido, el contador aumenta en 1 unidad y lo vuelve a recalcular multiplicando por el precio y desplegando el nuevo precio en el documento.
    } else {
        console.log('producto repetido')
        console.log('La posicion en el arreglo es '+listaProductos.indexOf(productDB[opcion]));
        let posicionRepetido = listaProductos.indexOf(productDB[opcion]);
        listaProductos[posicionRepetido].cantidad++;
        console.log('La nueva cantidad es '+listaProductos[posicionRepetido].cantidad);
        $('#cant-resu-'+opcion).html(listaProductos[posicionRepetido].cantidad);
        
        let precioResu = 0;
        if (productDB[opcion].oferta){
            precioResu = listaProductos[posicionRepetido].poferta * listaProductos[posicionRepetido].cantidad;
            $('#precio-li-'+opcion).html(formatoCL.format(precioResu));
        } else {
            precioResu = listaProductos[posicionRepetido].precio * listaProductos[posicionRepetido].cantidad;
            $('#precio-li-'+opcion).html(formatoCL.format(precioResu));
        };
    };
    
    $('#nombre-li-'+opcion).html(productDB[opcion].nombre);

    //Esta suma iterativa controla el contador general de productos en el resumen del carro
    contadorCarrito = contadorCarrito + 1;
    $('#cantidad-carro').html(contadorCarrito);

    calcularMonto();
   
}

//Funcion para calcular los montos
function calcularMonto(){
    let precioTotal = 0;
    
    //Calcular total
    for (let i = 0;i <= listaProductos.length-1;i++) {
        if (listaProductos[i].oferta){
            let precioLista = (listaProductos[i].poferta * listaProductos[i].cantidad);
            console.log(precioLista);
            precioTotal = precioTotal + precioLista;
        } else {
            let precioLista = (listaProductos[i].precio * listaProductos[i].cantidad);
            precioTotal = precioTotal + precioLista;
            console.log(precioLista);
        };
    };
    console.log(precioTotal);
    $('#monto-total').html(formatoCL.format(precioTotal));

    
    let precioConIva = precioTotal * 1.19;
    $('#monto-con-iva').html(formatoCL.format(precioConIva));

    let valorDespacho = 0;
    if (precioConIva < 100000) {
        valorDespacho = precioConIva * 0.05;
        $('#despacho-total').html(formatoCL.format(valorDespacho));
    } else {
        valorDespacho = 'Gratis';
        $('#despacho-total').html(valorDespacho);
    }
    

    if (precioTotal == 0){
        $('#monto-total').html('');
    }
    if (precioConIva == 0){
        $('#monto-con-iva').html('');
    }
    if (valorDespacho == 0){
        $('#despacho-total').html('');
    }
};


//Función para eliminar una unidad de un producto

function restarProducto(opcion){
    let posicion = listaProductos.indexOf(productDB[opcion]);
    console.log('La posicion de la cantidad a restar es '+posicion);
    listaProductos[posicion].cantidad--;
    console.log('La nueva cantidad es '+listaProductos[posicion].cantidad);
    contadorCarrito = contadorCarrito - 1;
    $('#cantidad-carro').html(contadorCarrito);

    if (listaProductos[posicion].cantidad == 0) {
        console.log('Se remueve este elemento');
        $('#posicion-dropdown-'+opcion).remove();
        const listaProductosFiltrado = listaProductos.filter(producto => producto != productDB[opcion]);
        listaProductos = listaProductosFiltrado;
    } else {
        $('#cant-resu-'+opcion).html(listaProductos[posicion].cantidad);

        if (listaProductos[posicion].oferta){
        $('#precio-li-'+opcion).html(formatoCL.format(listaProductos[posicion].poferta * listaProductos[posicion].cantidad));
        } else {
            $('#precio-li-'+opcion).html(formatoCL.format(listaProductos[posicion].precio * listaProductos[posicion].cantidad));
        };
    };
    calcularMonto();
};


//Función para añadir una unidad de un producto

function sumarProducto(opcion){
    let posicion = listaProductos.indexOf(productDB[opcion]);
    console.log('La posicion de la cantidad a sumar es '+posicion);
    listaProductos[posicion].cantidad++;
    console.log('La nueva cantidad es '+listaProductos[posicion].cantidad);
    contadorCarrito = contadorCarrito + 1;
    $('#cantidad-carro').html(contadorCarrito);
    $('#cant-resu-'+opcion).html(listaProductos[posicion].cantidad);

        if (listaProductos[posicion].oferta){
            $('#precio-li-'+opcion).html(formatoCL.format(listaProductos[posicion].poferta * listaProductos[posicion].cantidad));
        } else {
            $('#precio-li-'+opcion).html(formatoCL.format(listaProductos[posicion].precio * listaProductos[posicion].cantidad));
        };
        calcularMonto();
};


//Función para eliminar todas las unidades de un producto
function eliminarLinea(opcion){
    const listaProductosFiltrado = listaProductos.filter(producto => producto != productDB[opcion]);
    console.log(listaProductosFiltrado);
    $('#posicion-dropdown-'+opcion).remove();
    let posicion = listaProductos.indexOf(productDB[opcion]);
    console.log(listaProductos[posicion].cantidad);
    contadorCarrito = contadorCarrito - listaProductos[posicion].cantidad;
    $('#cantidad-carro').html(contadorCarrito);

    listaProductos = listaProductosFiltrado;
    calcularMonto();
};

//Funcion para vaciar carrito
function vaciarCarrito(){
    contadorCarrito = 0;
    $('#cantidad-carro').html(contadorCarrito);
    for (let i=0;i <= productDB.length-1;i++){
        $('#posicion-dropdown-'+i).remove();
    };

    listaProductos = [];
    calcularMonto();
};


//Funcion para cargar el html sobre el main actual
function cargarVentanaPago() {
    console.log('voy a pagar');
    $('#contenedor-principal').load('./indexcarro.html .contenedor-carro');

}

function regresaraTienda() {
    $('#contenedor-principal').load('./tienda.html' , () => {  //Función .load permite la ejecución secuencial de elementos
        crearCards();
    }); 
};