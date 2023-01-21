//select elements
const productsE1 =document.querySelector(".products");
const cart = document.getElementById('cart');
console.log(cart);

// show cart

(function () {
  const cartInfo = document.getElementById('cart-info');
  cartInfo.addEventListener('click', function () {
    cart.classList.toggle('show-cart');
  });
})();

// UPDATE CART 
function updateCart(){
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}
// remove item from cart 
function removeItemFromCart(id){
  cart=cart.filter( (item) => item.id !== id);

 updateCart();
}


// add items to the cart

(function(){

    const cartBtn=document.querySelectorAll('.store-item-icon');

    cartBtn.forEach(function(btn){
        btn.addEventListener('click',function(event){

           if(event.target.parentElement.classList.contains('store-item-icon')){
            let fullPath=event.target.parentElement.previousElementSibling.src;
           
            const item={};
            let name= event.target.parentElement.parentElement.nextElementSibling
               .children[0].children[0].textContent;
            item.name=name;

            let price= event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent.replace("DT","");
          
        
            item.price= price;

            
            const cartItem= document.createElement('div');
            cartItem.classList.add('cart-item',
              'd-flex',
              'justify-content-between',
              'text-capitalize',
              'my-3'
            );
            console.log(item)
            cartItem.innerHTML=`
              <div class="item-text">
  
                <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                <span> DT</span>
              </div>
              <div onclick="removeItemFromCart(${item.id})" id='cart-item-remove' class="cart-item-remove">
                <i class="fas fa-trash"></i>
              </div>
            </div>`;

//select cart
const cart=document.getElementById('cart');
const total=document.querySelector('.cart-total-container');
  
cart.insertBefore(cartItem,total);
alert('item added to the cart');

showTotals();
           }
        });
    });




//show totals
function showTotals(){
    
    const total=[];
    const items=document.querySelectorAll(".cart-item-price");
    console.log(items)
    items.forEach(function(item){
    //const arr={itemtextContent};

    total.push(item.innerText);
    });

let result = []
let fin_all = 0
for(let i=0;i<total.length;i++){
  let num = Number(total[i].replaceAll("DT",""))
  fin_all+=num
  result.push(num)

}
console.log("array of number",result.length)


document.getElementById('cart-total').textContent=fin_all;
document.getElementById('item-total').textContent=fin_all;
document.getElementById('item-count').textContent= result.length;
 }
})();
