// alert("alertaaaaa csm!!");

// $(body).html("HOLA");

//Funcion para añadir formato CLP a los datos numéricos
const formatoCL = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    useGrouping: true,
});



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

//Función para añadir elemento al carrito
function agregarCarrito(opcion) {
    $('#resumen-carro').append('<li id="posicion-dropdown"><p id="nombre-li-'+opcion+'"></p><div id="cont-resu-carro"><i class="fa-solid fa-square-minus fa-xl"></i><p class="contador-resu badge bg-dark">1</p><i class="fa-solid fa-square-plus fa-xl"></i></div></div><p class="precio-li" id="precio-li-'+opcion+'" ></p><div><i class="fa-solid fa-trash icono-eliminar"></i></li>');
    $('#nombre-li-'+opcion).html(productDB[opcion].nombre);

    if (productDB[opcion].oferta){
        $('#precio-li-'+opcion).html(formatoCL.format(productDB[opcion].poferta));
    } else {
        $('#precio-li-'+opcion).html(formatoCL.format(productDB[opcion].precio));
    };

    contadorCarrito = contadorCarrito + 1;
    $('#cantidad-carro').html(contadorCarrito);

    console.log("holi");
}