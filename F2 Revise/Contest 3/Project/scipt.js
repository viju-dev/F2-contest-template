const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('nav-menu-active');
});

// home
const ctaButton = document.querySelector('.cta');
const menuSection = document.querySelector('#menu');

ctaButton.addEventListener('click', () => {
  menuSection.scrollIntoView({ behavior: 'smooth' });
});



//menu
const menuItemsContainer = document.querySelector('.menu-items');
let menuItems={};

fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
  .then(response => response.json())
  .then(data => {
    menuItems = data;
    data.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');

      const img = document.createElement('img');
      img.src = item.imgSrc;
      img.alt = item.name;

      const info = document.createElement('div');
      info.classList.add('info');

      const name = document.createElement('h3');
      name.textContent = item.name;

    //   const description = document.createElement('p');
    //   description.textContent = item.description;

      const price = document.createElement('p');
      price.classList.add('price');
      price.textContent = `$${item.price}`;

    //   const order = document.createElement('button');
    //   order.classList.add('orderBtn');
    //   order.textContent = "Order";
    const orderInfo = document.createElement('div');
    orderInfo.classList.add('orderInfo');

    const orderBtn = document.createElement('button');
    orderBtn.classList.add('orderBtn');
    orderBtn.textContent = "Order";
    orderBtn.setAttribute("onclick","giveOrder()")

      info.appendChild(name);
    //   info.appendChild(description);
      info.appendChild(price);
 
      orderInfo.appendChild(orderBtn);

      menuItem.appendChild(img);
      menuItem.appendChild(info);
      menuItem.appendChild(orderInfo);

      menuItemsContainer.appendChild(menuItem);
    })
});

function giveOrder(){

    TakeOrder().then((order) => {
        return orderPrep(order);
    }).then((status) => {
        return payOrder(status);
    }).then((status) => {
        return thankyouFnc(status);
    })
}

// Takeorder
function TakeOrder(){
    return new Promise((resolve,reject) => {

        setTimeout(() => {
            let order = pickRandomFoods();
            console.log(order);
            resolve(order);
        },2500)

    })
}

function orderPrep(order){
    return new Promise((resolve,reject) => {

        setTimeout(() => {
            let status = {order_status:true, paid:false}; 
            resolve(status);
            payDone(order);
            let url = window.location.href;
            url = url.replace("menu","order-section");
            location.replace(url);
        },1500)

    })
}
function payOrder(){
    return new Promise((resolve,reject) => {

        setTimeout(() => {
            let status = {order_status:true, paid:true}; 
            resolve(status);
        },1000)

    })
}
function thankyouFnc(status){
    if(status.paid == true){
        window.alert("thankyou for eating with us today!")
    }
    return;
}


function pickRandomFoods(){
    let items = [];
        var obj_keys = Object.keys(menuItems);
        for(let i=0;i<3;i++){
            var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];
            items.push(menuItems[ran_key]);
        }
        return items;
}


////////////////////////////////////////////////
// order
 function payDone(menuItems){
     // Get the table body where order items will be added
  const orderTableBody = document.querySelector('.order-table tbody');

  // Get the total price element
  const totalPrice = document.getElementById('total-price');

  // Get the pay button element
  const payBtn = document.getElementById('pay-btn');

 
  // Function to add an order item to the table
  function addOrderItem(item) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    const priceCell = document.createElement('td');
    priceCell.textContent = `$${item.price.toFixed(2)}`;
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    orderTableBody.appendChild(row);
  }

  // Function to calculate the total price and update the total price element
  function updateTotalPrice() {
    let total = 0;
    const priceCells = document.querySelectorAll('.order-table tbody td:last-child');
    priceCells.forEach(cell => {
      total += parseFloat(cell.textContent.replace('$', ''));
    });
    totalPrice.textContent = `$${total.toFixed(2)}`;
  }

  // Add 3 random order items to the table
  for (let i = 0; i < 3; i++) {
    const menuItem =menuItems[i];
    addOrderItem(menuItem);
  }

  // Calculate the total price and update the total price element
  updateTotalPrice();

  // Add event listener to the pay button
//   payBtn.addEventListener('click', () => {
//     alert('Payment processed!');
//   });
 }