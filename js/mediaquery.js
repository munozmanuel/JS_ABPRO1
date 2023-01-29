//Función de media query en JS, 

function mediaQueryJS(maxWidth) {
    if (maxWidth.matches) { 
     $('#btn-vaciar').html('<i style="padding-right: 4px;" class="fa-solid fa-trash"></i>');
      
    } else {
        $('#btn-vaciar').html('<i style="padding-right: 4px;" class="fa-solid fa-trash">Vaciar Carrito</i>');
    }
  }
   var maxWidth = window.matchMedia("(max-width: 700px)");
   
   mediaQueryJS(maxWidth);
   maxWidth.addListener(mediaQueryJS);


   function mediaQueryJS(maxWidth2) {
    if (maxWidth2.matches) { 
        $('.fa-square-minus').removeClass('fa-xl');
        $('.fa-square-minus').addClass('fa-lg');
        $('.fa-square-plus').removeClass('fa-xl');
        $('.fa-square-plus').addClass('fa-lg');
        $('#secc-vaciar').remove();
        $('#botonera-inf-resu').append('<div id="secc-vaciar"><button onclick="vaciarCarrito()" id="btn-vaciar" class="btn btn-outline-warning"><i style="padding-right: 4px;" class="fa-solid fa-trash"></i></button></div>');

    //  <div id="secc-vaciar"><button onclick="vaciarCarrito()" id="btn-vaciar" class="btn btn-outline-warning"><i style="padding-right: 4px;" class="fa-solid fa-trash"></i>Vaciar Carrito</button></div>
     
    } else {
        $('.fa-square-minus').removeClass('fa-lg');
        $('.fa-square-minus').addClass('fa-xl');
        $('.fa-square-plus').removeClass('fa-lg');
        $('.fa-square-plus').addClass('fa-xl');
        $('#secc-total').remove();
        $('#secc-vaciar').remove();
        $('#botonera-inf-resu').append('<div id="secc-vaciar"><button onclick="vaciarCarrito()" id="btn-vaciar" class="btn btn-outline-warning"><i style="padding-right: 4px;" class="fa-solid fa-trash"></i>Vaciar Carrito</button></div>');
        $('#botonera-inf-resu').append('<div id="secc-total"><p>Total Neto:<span id="monto-total"></span></p><p>Despacho:<span id="despacho-total"></span></p><h5>Total: <span id="monto-con-iva"></span></h5></div>');
        calcularMonto();

       
    }
  }
   var maxWidth2 = window.matchMedia("(max-width: 480px)");
   
   mediaQueryJS(maxWidth2);
   maxWidth2.addListener(mediaQueryJS);