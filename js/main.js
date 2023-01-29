


//Funcion para añadir formato CLP a los datos numéricos
const formatoCL = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    useGrouping: true,
});


//Esta función carga las cartas vacías y las inserta en el "#contenedor-principal" del index.
$(document).ready(function() {
        // console.log('se está cargando la tienda');
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
        // console.log('producto no repetido');
        listaProductos.push(productDB[opcion]);  
       
        $('#resumen-carro').append(`
        <li id="posicion-dropdown-${opcion}">
            <p id="nombre-li-${opcion}"></p>
            <div id="cont-resu-carro">
                <i onclick="restarProducto(${opcion})" class="fa-solid fa-square-minus fa-xl"></i>
                <p class="contador-resu badge bg-dark" id="cant-resu-${opcion}">1</p>
                <i onclick="sumarProducto(${opcion})" class="fa-solid fa-square-plus fa-xl"></i>
            </div>
                <p class="precio-li" id="precio-li-${opcion}"></p>
                <div><i onclick="eliminarLinea(${opcion})" class="fa-solid fa-trash icono-eliminar"></i></div>
        </li>
        `);

        
    //Este condicional determina si el producto está en oferta o no para desplegar el precio.
    if (productDB[opcion].oferta){
        $('#precio-li-'+opcion).html(formatoCL.format(productDB[opcion].poferta));
    } else {
        $('#precio-li-'+opcion).html(formatoCL.format(productDB[opcion].precio));
    };

    //Si el producto es repetido, el contador aumenta en 1 unidad y lo vuelve a recalcular multiplicando por el precio y desplegando el nuevo precio en el documento.
    } else {
        // console.log('producto repetido');
        // console.log('La posicion en el arreglo es '+listaProductos.indexOf(productDB[opcion]));
        let posicionRepetido = listaProductos.indexOf(productDB[opcion]);
        listaProductos[posicionRepetido].cantidad++;
        // console.log('La nueva cantidad es '+listaProductos[posicionRepetido].cantidad);
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

let precioTotal = 0;
let precioConIva = 0;
let valorDespacho = 0;

//Funcion para calcular los montos
function calcularMonto(){
    
    precioTotal = 0;
    precioConIva = 0;
    valorDespacho = 0;
    
    //Calcular total
    for (let i = 0;i <= listaProductos.length-1;i++) {
        if (listaProductos[i].oferta){
            let precioLista = (listaProductos[i].poferta * listaProductos[i].cantidad);
            // console.log(precioLista);
            precioTotal = precioTotal + precioLista;
        } else {
            let precioLista = (listaProductos[i].precio * listaProductos[i].cantidad);
            precioTotal = precioTotal + precioLista;
            // console.log(precioLista);
        };
    };
    // console.log(precioTotal);
    $('#monto-total').html(formatoCL.format(precioTotal));

    
    precioConIva = precioTotal * 1.19;
    $('#monto-con-iva').html(formatoCL.format(precioConIva));

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
    // console.log('La posicion de la cantidad a restar es '+posicion);
    listaProductos[posicion].cantidad--;
    // console.log('La nueva cantidad es '+listaProductos[posicion].cantidad);
    contadorCarrito = contadorCarrito - 1;
    $('#cantidad-carro').html(contadorCarrito);

    if (listaProductos[posicion].cantidad == 0) {
        // console.log('Se remueve este elemento');
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
    renderResumen();
};


//Función para añadir una unidad de un producto

function sumarProducto(opcion){
    let posicion = listaProductos.indexOf(productDB[opcion]);
    // console.log('La posicion de la cantidad a sumar es '+posicion);
    listaProductos[posicion].cantidad++;
    // console.log('La nueva cantidad es '+listaProductos[posicion].cantidad);
    contadorCarrito = contadorCarrito + 1;
    $('#cantidad-carro').html(contadorCarrito);
    $('#cant-resu-'+opcion).html(listaProductos[posicion].cantidad);

        if (listaProductos[posicion].oferta){
            $('#precio-li-'+opcion).html(formatoCL.format(listaProductos[posicion].poferta * listaProductos[posicion].cantidad));
        } else {
            $('#precio-li-'+opcion).html(formatoCL.format(listaProductos[posicion].precio * listaProductos[posicion].cantidad));
        };
        calcularMonto();
        renderResumen();
};


//Función para eliminar todas las unidades de un producto
function eliminarLinea(opcion){
    const listaProductosFiltrado = listaProductos.filter(producto => producto != productDB[opcion]);
    console.log(listaProductosFiltrado);
    $('#posicion-dropdown-'+opcion).remove();
    let posicion = listaProductos.indexOf(productDB[opcion]);
    // console.log(listaProductos[posicion].cantidad);
    contadorCarrito = contadorCarrito - listaProductos[posicion].cantidad;
    $('#cantidad-carro').html(contadorCarrito);

    listaProductos = listaProductosFiltrado;
    calcularMonto();
    renderResumen();
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
    renderResumen();
};


//Funcion para cargar el html sobre el main actual
function cargarVentanaPago() {
    // console.log('voy a pagar');
    $('#contenedor-principal').load('./indexcarro.html .contenedor-carro' , () => {
        renderResumen();

        //Verificamos si existe el usuario en Local Storage, si existe, el formulario se rellena con esta info automáticamente.
        if (localStorage.getItem("usuario") != null) {

            let usuario = JSON.parse(localStorage.getItem("usuario"));

            document.querySelector('#nombre-form').value = (usuario.nombre);
            document.querySelector('#apellido-form').value = (usuario.apellido);
            document.querySelector('#rut-form').value = usuario.rut;
            document.querySelector('#email-form').value = usuario.email;
            document.querySelector('#direccion-form').value = usuario.direccion;
            document.querySelector('#fono-form').value = usuario.fono;
            document.querySelector('#pais-form').value = usuario.pais;
            document.querySelector('#region-form').value = usuario.region;
        };
    });

    $('.dropdown-toggle').removeClass('show');
    $('.dropdown-toggle').attr('aria-expanded' , 'false');
    $('.dropdown-menu').removeClass('show');
  
};

function regresaraTienda() {
    $('#contenedor-principal').load('./tienda.html' , () => {  //Función .load permite la ejecución secuencial de elementos através del parametro funcion () => {}
        crearCards();
    }); 
};

function renderResumen() {


    if (document.querySelector('#lista-indexcarro') != null){
            document.querySelector('#lista-indexcarro').innerHTML = ('');
    };

    listaProductos.forEach(prod => {
        if (prod.oferta){
            prod.precioF = (prod.poferta * prod.cantidad);
            // console.log('La variable precioF es: '+prod.precioF);
        } else {
            prod.precioF = (prod.precio * prod.cantidad);
            // console.log('La variable precioF es: '+prod.precioF);
        };
    });
    

    listaProductos.forEach(prod => {
        $('#lista-indexcarro').append(`
        <li class="list-group-item d-flex justify-content-betweenlh-sm">
        <div>
        <h6 class="my-0" id="index-carro-nombre-item">${prod.nombre}</h6><small class="text-muted" id="index-carro-cantidad">Cod. ${prod.codigo} x ${prod.cantidad} unidad(es)</small>
        </div>
        <span class="text-muted" id="index-carro-precio">${formatoCL.format(prod.precioF)}</span></li>`)

        
    });

    if (document.querySelector('.btn-num-tucarro') != null){
        document.querySelector('.btn-num-tucarro').innerHTML = (contadorCarrito);
        // console.log(precioTotal);
        // console.log(valorDespacho);
        // console.log(precioConIva);
        document.getElementById('indexcarro-totalneto').innerHTML = (formatoCL.format(precioTotal));
        document.getElementById('indexcarro-total').innerHTML = (formatoCL.format(precioConIva));

        if (isNaN(valorDespacho)){
            document.getElementById('indexcarro-despacho').innerHTML = (valorDespacho);
        } else {
            document.getElementById('indexcarro-despacho').innerHTML = (formatoCL.format(valorDespacho));
        }
    };
};

//Funcion para validar formulario
function validarForm(){
    const forms = document.querySelectorAll('.needs-validation');

    let estado = false; 

    forms.forEach(form => {
        if (form.checkValidity()) { 
            estado = true;
        };

        form.classList.add('was-validated');
    });

    return estado;
};   


// {{{ BETA }}}  En esta función almacenamos los datos si es que el cliente checkeó la casilla de "#Guardar Información", adicionalmente enviamos la información del cliente y los datos de la compra realizada a nuestra base de datos.
function almacenarDatos () {
    if (validarForm()){
        if (listaProductos != 0) {
            // console.log('Se ejecuta el script');

            const cliente = {
                nombre :    (document.querySelector('#nombre-form').value),
                apellido :  (document.querySelector('#apellido-form').value),
                rut :       (document.querySelector('#rut-form').value),
                email :     (document.querySelector('#email-form').value),
                direccion : (document.querySelector('#direccion-form').value),
                fono :      (document.querySelector('#fono-form').value),
                pais :      (document.querySelector('#pais-form').value),
                region :    (document.querySelector('#region-form').value),
                credito :   (document.querySelector('#credit').checked),
                debito:     (document.querySelector('#debit').checked),
                tarjeta: {
                    numero:(document.querySelector('#cc-number').value),
                    exp: (document.querySelector('#cc-expiration').value),
                    cvv: (document.querySelector('#cc-cvv').value),
                    },
            };

            const compra = listaProductos;
            compra.unshift(Date());

            //Para almacenar en Local Storage se utiliza el método setItem. JSON.stringify sirve para tipificar un objeto en Local Storage
            localStorage.setItem("usuario", JSON.stringify(cliente));
            localStorage.setItem("carrito", JSON.stringify(compra));
            
            //Para luego consumir objetos almacenados con JSON.stringify, se utiliza el método JSON.parse :
            let usuario = JSON.parse(localStorage.getItem("usuario"));
            // console.log('El usuario almacenado es:');
            // console.log(usuario);


        } else {
            // console.log('No tiene elementos en su carrito');
        }
    } else {
        // console.log('no se puede ejecutar porque no se validó');
    }
}

//Lista de referencias al documento: FORMULARIO
// const nombreForm = document.querySelector('#nombre-form');
// const apellidoForm = document.querySelector('#apellido-form');
// const rutForm = document.querySelector('#rut-form');
// const emailForm = document.querySelector('#email-form');
// const direccionForm = document.querySelector('#direccion-form');
// const fonoForm = document.querySelector('#fono-form');
// const paisForm = document.querySelector('#pais-form');
// const regionForm = document.querySelector('#region-form');

// const guardarInfo = document.querySelector('#save-info'); <- Este es el checklist que debería habilitar la opcion para guardar usuario en Local Storage.