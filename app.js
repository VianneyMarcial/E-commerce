document.addEventListener('DOMContentLoaded', () => {
  //DATA LOCALSTORAGE

  // //PRODUCTS
  const products =[
    {
      id:1,
      nombre: "Weeding Cake",
      precio: 125,
      stock: 8,
      url: "https://cdn0.matrimonio.com.co/article-real-wedding/361/3_2/960/jpg/317731.jpeg",
      alt: "Pastel boda",
      categoria: "Weddiing-Cake"
    },
    {
      id:2,
      nombre: "Birthday Cake",
      precio: 85,
      stock: 15,
      url: "https://i.pinimg.com/736x/ee/d5/2f/eed52f7541758abacccfdf9a8f9b850e.jpg",
      alt: "Pastel cumpleaños",
      categoria: "Birtday-Cake"
    },
    {
      id:3,
      nombre: "CheeseCake",
      precio: 50,
      stock: 20,
      url: "https://static-blogs.mujerhoy.com/eat-fashion/wp-content/uploads/sites/7/2019/03/eat-fashion1-1024x681.jpg",
      alt: "Cheesecake",
      categoria: "Cheesecake"
    },
    {
      id:4,
      nombre: "Hallowen Cake",
      precio: 90,
      stock: 10,
      url: "https://image.jimcdn.com/app/cms/image/transf/dimension=637x10000:format=jpg/path/sdd2b9b442c59d78e/image/ibb34ee3c77c98f35/version/1634800323/pasteles-de-calabazas.jpg",
      alt: "Pastel Hallowen",
      banner: true,
      categoria: "Halowen-Cake"
    }
  ]

  //CARRITO
  let carrito = {
    cargas: [],
    total: 0
  }

  //CONSTANTES DOM
  const barSide = document.getElementById("bar-side");
  const bag = document.getElementById("bag");
  const addcakes = document.getElementById("add");
  const secproducts = document.getElementById("secproducts");
  const cart = document.getElementById("cart");
  const checkout = document.getElementById("checkout");

  //FUNCIONES AUXILIARES 
  function deleteChilds(node) {
    if ( node.hasChildNodes() ) {
      while ( node.childNodes.length >= 1 )
      {
        node.removeChild( node.firstChild );
      }
    }
  }

  function validarCarito() {
    let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage"));
    if(carritoStorage.total>0) {
      checkout.disabled = false;
    }
    else{
      checkout.disabled = true;
    }
  }

  function renderCarrito(){
    deleteChilds(cart);
    let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage"));
    let productsStorage = JSON.parse(localStorage.getItem("products"));

    carritoStorage.cargas.map(carga => {
      const producto = productsStorage.find(p => p.id===carga.idProduct )
      let imgCart = document.createElement("img");
      imgCart.src = producto.url;
      imgCart.alt = producto.alt;
      let divControles = document.createElement("div");
      divControles.className = "inline";
      let buttonMenos = document.createElement("button");
      let buttonMas = document.createElement("button");
      let buttonEliminar = document.createElement("button");
      buttonMenos.className = "menos";
      const textButtonMenos =  document.createTextNode("-");
      buttonMenos.appendChild(textButtonMenos);
      buttonMenos.addEventListener("click", (e) => {
        restProduct(producto)
      });
      buttonMas.className = "mas";
      const textButtonMas = document.createTextNode("+"); 
      buttonMas.appendChild(textButtonMas);
      buttonMas.addEventListener("click", (e) => {
        addProduct(producto)
      });
      buttonEliminar.className = "eliminar";
      const textButtonEliminar = document.createTextNode("Eliminar");
      buttonEliminar.appendChild(textButtonEliminar);
      buttonEliminar.addEventListener("click", (e) => {
        deleteProduct(producto)
      });
      let divProductCart = document.createElement("div");
      divProductCart.className = "productCart"
      let divProductDesc = document.createElement("div");
      divProductDesc.className = "product-desc"
      let h3Cart = document.createElement("h3")
      const texth3Cart = document.createTextNode(producto.nombre);
      h3Cart.appendChild(texth3Cart);
      let divInline = document.createElement("div");
      divInline.className = "inline"
      let pStock = document.createElement("p");
      const textpStock = document.createTextNode("Stock: " + producto.stock);
      pStock.appendChild(textpStock);
      let pPrice = document.createElement("p");
      const textpPrice = document.createTextNode("  |  $" + producto.precio);
      pPrice.appendChild(textpPrice);
      let pSub = document.createElement("p");
      const textpSub = document.createTextNode("Subtotal: $" + carga.subtotal);
      pSub.appendChild(textpSub);
      let pUnite = document.createElement("p");
      const textpUnite = document.createTextNode(carga.amount + "  unites ");
      pUnite.appendChild(textpUnite);
      divInline.append(pStock);
      divInline.append(pPrice);
      divControles.append(buttonMenos);
      divControles.append(pUnite);
      divControles.append(buttonMas);
      divControles.append(buttonEliminar);
      divProductDesc.append(h3Cart);
      divProductDesc.append(divInline);
      divProductDesc.append(pSub);
      divProductDesc.append(divControles);
      divProductCart.append(imgCart);
      divProductCart.append(divProductDesc);
      cart.append(divProductCart);
    })

    cart.append("Total $" + carritoStorage.total)
    validarCarito();
  }

  function toggleBag () {
    if (barSide.style.display === "none") {
      barSide.style.display = 'block';
      
    } else {
      barSide.style.display = 'none';
    }
  }
  function addProduct(product) {
    let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage"));
    let amount = 1;
    if (!!carritoStorage) {
      for (const carga of carritoStorage.cargas) {
        if (carga.idProduct === product.id) {
          carga.amount = carga.amount + 1;
          amount = carga.amount;
          carga.subtotal = product.precio * amount;
          break;
        }
      }
    }

    if (amount=== 1){
      let carga = {
        idProduct: product.id,
        amount: amount,
        subtotal: product.precio * amount
      }
      carritoStorage.cargas.push(carga)
    }

    carritoStorage.total  = product.precio + carritoStorage.total;

    localStorage.setItem("carritoStorage",JSON.stringify(carritoStorage));
    
    renderCarrito();
  }
  
  function restProduct(product){
    let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage"));
    if (!!carritoStorage) {
      for(let i = 0; i<carritoStorage.cargas.length;i++){
        let carga = carritoStorage.cargas[i];
        if (carga.idProduct === product.id) {
          carga.amount = carga.amount - 1;
          carga.subtotal = carga.amount * product.precio
          if(carga.amount===0){
            carritoStorage.cargas.splice(i,1)
          }
          break;
        }
      }
    }

    carritoStorage.total = carritoStorage.total - product.precio;
    localStorage.setItem("carritoStorage",JSON.stringify(carritoStorage));

    renderCarrito();
  }


  function deleteProduct(product){
    let carritoStorage = JSON.parse(localStorage.getItem("carritoStorage"));
    if (!!carritoStorage) {
      for(let i = 0; i<carritoStorage.cargas.length;i++){
        let carga = carritoStorage.cargas[i];
        if(carga.idProduct===product.id){
          carritoStorage.total = carritoStorage.total - carga.subtotal;
          carritoStorage.cargas.splice(i,1);
          break;
        }
      }
    }  
    localStorage.setItem("carritoStorage",JSON.stringify(carritoStorage));
    let subt = carritoStorage.subtotal;

    renderCarrito(); 
  }

  function inicialize() {
    let json = JSON.stringify(products);
    localStorage.setItem("products",json);
    localStorage.setItem("carritoStorage",JSON.stringify(carrito));

    products.map((product) => {
      if (!product?.banner){
        let divProduct = document.createElement("div");
        divProduct.className = "product"
        let img = document.createElement("img");
        img.src = product.url;
        img.alt = product.alt;
        img.className = "imgp";
        let divButton = document.createElement("div");
        let button = document.createElement("button");
        button.addEventListener("click", (e) => {
          addProduct(product)
        });
        
        button.className = "addbag";
        divButton.className = "circle";
        const textButton = document.createTextNode("+");
        button.appendChild(textButton);
        let divPrice = document.createElement("div");
        divPrice.className = "price";
        let h2 = document.createElement("h2");
        const texth2 = document.createTextNode("$" + product.precio + " ");
        h2.appendChild(texth2);
        let p = document.createElement("p");
        const textp = document.createTextNode("Stock: " + product.stock);
        p.appendChild(textp);
        let h3 = document.createElement("h3");
        const texth3 = document.createTextNode(product.nombre);
        h3.appendChild(texth3);
      

        divPrice.append(h2);
        divPrice.append(p);
        divButton.append(button);
        divProduct.append(img);
        divProduct.append(divButton);
        divProduct.append(divPrice);
        divProduct.append(h3);
        secproducts.append(divProduct);

      } else {

      }
      
    })

  } 

  //EVENT LISTENER
  bag.addEventListener("click", (e) => {
    toggleBag() 
  });
  
  checkout.addEventListener("click", (e) => {
    deleteChilds(cart);
    
  });


  barSide.style.display = 'none';

 inicialize ()

})

