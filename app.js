
//  como agregar objetos en un carrito js

//  Para agregar objetos a un carrito de compras con JavaScript, primero necesitarás 
// una matriz para almacenar los artículos. Esto se debe a que cada vez que el usuario 
// agregue un artículo, se agregará un nuevo elemento a la matriz. A continuación, 
// necesitarás una función para agregar artículos al carrito. Esta función aceptará 
// los parámetros necesarios para agregar el artículo deseado, como el nombre, precio,
//  cantidad, etc. Esta función debe agregar un elemento al final de la matriz de 
// carrito de compras. Una vez que se haya agregado el artículo, es importante que 
// la función calcule el precio total y la cantidad total a partir de la matriz de 
// carrito de compras. Finalmente, una vez que el usuario haya completado la compra,
//  necesitarás una función para vaciar la matriz de carrito de compras. 
// Esto asegurará que el carrito esté vacío para la próxima compra.
 
//   ejemplo
 
 // Matriz para almacenar los artículos en el carrito
 let cart = [];
 
 // Función para agregar artículos al carrito
 function addToCart(name, price, quantity) {
   let item = {
     name: name,
     price: price,
     quantity: quantity
   };
   cart.push(item);
 
   // Calcula el precio total y la cantidad total
   let totalPrice = 0;
   let totalQuantity = 0;
   for (let i = 0; i < cart.length; i++) {
     totalPrice += cart[i].price * cart[i].quantity;
     totalQuantity += cart[i].quantity;
   }
   console.log(`Precio total: $${totalPrice.toFixed(2)}, Cantidad Total: ${totalQuantity}`);
 }
 
 // Función para vaciar la matriz de carrito de compras
 function emptyCart() {
   cart = [];
   console.log('El carrito está vacío');
 }
 
 // Agrega algunos artículos al carrito
 addToCart('Camisa', 25.99, 1);
 addToCart('Pantalones', 35.99, 2);
 addToCart('Gorra', 12.99, 1);
 
 // Vacía el carrito
 emptyCart();
 