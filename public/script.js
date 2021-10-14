
// Show Menu
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

    if(toggle && nav){
        toggle.addEventListener('click', () =>{
            nav.classList.toggle('show');
        });
    };
};


showMenu('nav-toggle', 'nav-menu');



//Remove Menu
const navLink = document.querySelectorAll('.nav__link'),
navMenu = document.getElementById('nav-menu');

function linkAction(){
    navMenu.classList.remove('show');
};
navLink.forEach(n => n.addEventListener('click',linkAction));


//Scroll sections and active link
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', scrollActive);

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');


        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active');
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active') ;
        }

    
    });
};


//Change Header Color
window.onscroll = () =>{
    const nav = document.getElementById('header');
    if(this.scroll >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
};

                                    // CART

                           

      //SHOW CART MENU

(function(){
    const cartInfo= document.getElementById('cart-info')
    const cart = document.getElementById('cart')

    cartInfo.addEventListener('click', function(){
        cart.classList.toggle('show-cart');
    })


})();



                 //ADD ITEM TO CART
(function(){
    const cartBtn = document.querySelectorAll('.button-light');
    //console.log(cartBtn)
    
    cartBtn.forEach(function(btn){
        btn.addEventListener('click', function(event){
       
         if(event.target){

           

            // SMALLER-IMAGE ADDED ON TO CART WHEN BUTTON IS CLICKED
             let fullPath = event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.src
             let pos = fullPath.indexOf('Img')+3
             let particalPath = fullPath.slice(pos)
             //console.log(particalPath)


             const item = {};
             item.img = `Img-cart${particalPath}`;

             //NAME OF ITEM
             let name = event.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
             item.name = name

             //COLOR OF ITEM
             let color = event.target.previousElementSibling.previousElementSibling.textContent
             item.color = color


             //PRICE OF ITEM
             let price = event.target.previousElementSibling.textContent
             let finalPrice = price.slice(1).trim()
             item.finalPrice= finalPrice

             //ITEM ID
             shopItem = event.target.parentElement
             let id = shopItem.dataset.itemId
             item.id = id

            //console.log(item)

             const cartItem = document.createElement('div')
             cartItem.classList.add('cart__item')

             //TEMPLATE
             cartItem.innerHTML =  `
             <img src="${item.img}" class="item__img" id="item-img" alt="">
             <div class="item__text" id="item-text">
                 <p class="item__title" id="cart-item-title">${item.name}</p>
                 <span class="item__color" id="cart-item-color">${item.color}</span><br>
                 <label for="size">Size: </label>
                 <select class="item__size" id="cart-item-size" >
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                     <option value="6">6</option>
                     <option value="7">7</option>
                     <option value="8">8</option>
                     <option value="9">9</option>
                     <option value="10">10</option>
                     <option value="11">11</option>
                 </select><br>
                 <span>R</span>
                 <span class="item__price" id="cart-item-price">${item.finalPrice}</span>
                 <span href="#" class="item__remove" id="cart-item-remove"><i class="bx bxs-trash-alt"></i></span>
                `  ;  

            //SELECT CART
            const cart = document.getElementById('cart');
            const total = document.querySelector('.cart-total__container');

            cart.insertBefore(cartItem, total);

        

        //REMOVE ITEM FROM CART
        var removeBtn = document.getElementsByClassName("item__remove")
     

        for( var i = 0; i < removeBtn.length; i++){
            var buttons = removeBtn[i]
             buttons.addEventListener('click', function(event){
             var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.parentElement.remove() 
            showTotals()
          
            })         
         }
         showTotals()


         }

    
      });
    });

    //SHOW TOTALS
    function showTotals(){
        const total = [];
        const items = document.querySelectorAll('#cart-item-price');

        items.forEach(function(item){
            total.push(parseFloat(item.textContent))
        })
        //console.log(total)

        const totalMoney = total.reduce(function(total, item){
            total += item;
            return total;
        }, 0)

        const finalMoney =totalMoney.toFixed(2)

       console.log(finalMoney)

       document.getElementById('cart-total').textContent = finalMoney;
       document.getElementById('item-total').textContent = finalMoney;
       document.getElementById('item-count').textContent = total.length;

       
    };

    

 document.getElementsByClassName('checkout__button')[0].addEventListener('click', purchaseClicked);

    
})();


var stripeHandler = StripeCheckout.configure({
    key : stripePublicKey,
    locale: 'auto',
    token: function(token){
        var items = []
        //var cartItemsContainer = document.getElementsByClassName('cart')
        var cartItems = document.getElementsByClassName('cart__items')

        for (var i = 0; i < cartItems.length; i++){
            var cartItem = cartItems[i]
            var id = cartItem.dataset.itemId
            var sizeElement = cartItem.getElementsByClassName('item__size')[0]
            var size = sizeElement.value

            items.push({
                id:id,
                size: size
            })
           
        }

        fetch('/purchase',{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId : token.id,
                items: items
            })
        }).then(function(res) {
            return res.json();
        }).then(function(data){
            alert(data.message)
           var cartItems = document.getElementsByClassName('cart')[0]
          while(cartItems.hasChildNodes()){
          cartItems.removeChild(cartItems.firstChild) 
          }
           showTotals()
        }).catch(function(error){
           console.error(error)
       })       
    }
});



function purchaseClicked(){
    //alert('Thank you for the purchase')      
 //cartItems = document.getElementsByClassName('cart')[0]
 //while(cartItems.hasChildNodes()){
    //cartItems.removeChild(cartItems.firstChild) 
 //}
 //showTotals()

 
 var priceElement = document.getElementsByClassName('cart__total')[0];
 var price = parseFloat(priceElement.textContent.replace('R','')) * 100
 stripeHandler.open({
     currency: 'ZAR',
     amount:price
 })


}









