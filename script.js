let login = document.getElementsByClassName("login")[0];
let signUp = document.getElementsByClassName("signup")[0];
const cart = document.getElementsByClassName("cart")[0];


let listproducts = document.getElementById("listcart");
let products = [];

let carts = [];
let listCart = document.querySelector(".item");
let iconCartSpan = document.getElementsByClassName('itemQuantity');


function displayForm(){
    login.style.display = "flex";
}

function displaySignup(){
    signUp.style.display = "flex"; 
}
function displayCart(){
    cart.style.display = "flex"; 
}
function hideSignup(){
    signUp.style.display = "none";
}

function hideCart(){
    cart.style.display = "none";
}

function hideForm(){
    login.style.display = 'none';
}

const messageBtn = document.getElementById("message");
messageBtn.addEventListener('click', function(){
    alert("Messaege sent successfully");
})


const addDataToHTML=()=>{
    listproducts.innerHTML = ' ';
    if(products.length>0){
        products.forEach(product=>{
            let newProduct = document.createElement('div');
            newProduct.classList.add('menu-item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <img src="${product.image}" alt="">
                <p id="brown-color"><i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </p>
                <p><span id="brown-color">${product.name}</span></p>
                <div class="price">
                    <p>$${product.price}</p>
                    <p><i class="fa-solid fa-cart-shopping"></i></p>
                </div>`;
                listproducts.appendChild(newProduct);
        })
    }
}

listproducts.addEventListener('click', (event)=>{
    let positionClick = event.target;
    if(positionClick.classList.contains('fa-cart-shopping')){
        let productItem = positionClick.closest('.menu-item');
        let product_id = productItem.dataset.id;
        addToCart(product_id);
    }
})


const addToCart = (product_id) =>{
    let positionThisProductInCart = carts.findIndex((value)=> value.product_id == product_id);
    if(carts.length<=0){
        carts = [{
            product_id:product_id,
            quantity:1
        }]
    }else if(positionThisProductInCart<0){
        carts.push({
            product_id:product_id,
            quantity:1
        });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity+1;
    }
    addCartToHTML();
}

const addCartToHTML = () => {
    listCart.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('items');
            let positionProduct = products.findIndex((value) => value.id == cart.product_id);
            let info = products[positionProduct];
            newCart.innerHTML = `
                <div class="item-img">
                    <img src="${info.image}">
                </div>
                <div class="item-name">
                    ${info.name}
                </div>
                <div class="item-price">
                    $${info.price * cart.quantity}
                </div>
                <div class="item-quantity">
                    <span class="itemQuantity">${cart.quantity}</span>
                </div>`;
            listCart.appendChild(newCart);
        });
    }
    iconCartSpan.innerText = totalQuantity;
}

const initApp = ()=>{
    fetch('products.json')
    .then(Response=>Response.json())
    .then(data=>{
        products = data;
        addDataToHTML();
        
    })
}
initApp();
