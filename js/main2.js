
//Funcion para añadir formato CLP a los datos numéricos
const formatoCL = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    useGrouping: true,
});

//Esta función evita que el dropdown se cierre el clickear adentro de él
$('.dropdown-menu').on('click', function (e) {
    e.stopPropagation();});

// Función para crear las cards de la tienda
$( document ).ready(function() {
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
});

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
        

        $('#resumen-carro').append('<li id="posicion-dropdown-'+opcion+'"><p id="nombre-li-'+opcion+'"></p><div id="cont-resu-carro"><i onclick="restarProducto('+opcion+')" class="fa-solid fa-square-minus fa-xl"></i><p class="contador-resu badge bg-dark" id="cant-resu-'+opcion+'">1</p><i class="fa-solid fa-square-plus fa-xl"></i></div></div><p class="precio-li" id="precio-li-'+opcion+'" ></p><div><i class="fa-solid fa-trash icono-eliminar"></i></li>');
       
        
    //Este condicional determina si el producto está en oferta o no para desplegar el precio.
    if (productDB[opcion].oferta){
        $('#precio-li-'+opcion).html(formatoCL.format(productDB[opcion].poferta));
    } else {
        $('#precio-li-'+opcion).html(formatoCL.format(productDB[opcion].precio));
    };

    //Si el producto es repetido, el contador aumenta en 1 unidad y lo vuelve a recalcular multiplicando por el precio y desplegando el nuevo precio en el documento.
    } else {
        console.log('producto repetido')
        console.log(listaProductos.indexOf(productDB[opcion]));
        let posicionRepetido = listaProductos.indexOf(productDB[opcion]);
        listaProductos[posicionRepetido].cantidad++;
        console.log(listaProductos[posicionRepetido].cantidad)
        $('#cant-resu-'+opcion).html(listaProductos[posicionRepetido].cantidad);
        
        let precioResu = 0;
        if (productDB[opcion].oferta){
            precioResu = productDB[opcion].poferta * listaProductos[posicionRepetido].cantidad;
            $('#precio-li-'+posicionRepetido).html(formatoCL.format(precioResu));
        } else {
            precioResu = productDB[opcion].precio * listaProductos[posicionRepetido].cantidad;
            $('#precio-li-'+posicionRepetido).html(formatoCL.format(precioResu));
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
};

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
    } else {
        $('#cant-resu-'+opcion).html(listaProductos[posicion].cantidad);
    };

    calcularMonto();
};

//Funcion para calcular precios y desplegarlos en el HTML
function calcular();