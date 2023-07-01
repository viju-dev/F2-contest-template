let currentUser = JSON.parse(localStorage.getItem("currentUser"))
const checkoutBtn = document.getElementById("checkout-btn")

let accessToken = localStorage.getItem("accessToken")
if(!accessToken){
  location.replace("/login")
}

checkoutBtn.addEventListener("click", () => {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (currentUser.cart.length === 0) { //check if items present in cart if present redirect to payment
    alert("No items in the cart.")
  }
  else {
    location.replace("/razorpay")
  }
})

function removeFromCart(event) { //remove item from mycart
  let id = parseInt(event.target.parentNode.id)
  let currentUser = JSON.parse(localStorage.getItem("currentUser"))
  let cart = currentUser.cart
  cart = cart.filter((ele) => { //remove item from cart array
    return ele.id != id
  })
  currentUser.cart = cart
  localStorage.setItem("currentUser", JSON.stringify(currentUser)) //add updated cart to localtorage
  displayCart(cart)
  alert("Item removed from cart.")
}

function displayCart(result) { // display mycart
  const items = document.querySelector(".items")
  items.innerHTML = ""
  const list = document.getElementById("list")
  list.innerHTML = ""

  const total = document.getElementById("total")
  let totalPrice = ""
  for (let i = 0; i < result.length; i++) {
    let ele = result[i]
    let title = ele.title.split(" ")
    totalPrice = totalPrice + "+" + ele.price
    items.innerHTML +=
      `
                <div id=${ele.id} class="item">
                  <img src="${ele.image}" alt="Item" />
                  <div class="info">
                    <div class="row">
                      <div class="price">Price : $${ele.price}</div>
                      <div class="sized">Size : ${ele.size}</div>
                    </div>
                    <div class="colors">
                      Color :
                      <div class="row">
                        <div class="circle" style="background-color: ${ele.color}"></div>
                      </div>
                    </div>
                    <div class="row">Rating : ${ele.rating.rate}</div>
                  </div>
                  <button id="addBtn">Remove from Cart</button>
                </div>
            `

    list.innerHTML +=
      `
                <div class="list-item">
                    <span id="item-title">${i + 1}. ${title[0] + " " + title[1] + " " + title[2]}</span><span id="price">$${ele.price}</span>
                </div>
            `

  }
  if (totalPrice){
    localStorage.setItem("Total-Ammount", parseFloat(eval(totalPrice)).toFixed(2))
    console.log(parseFloat(eval(totalPrice)).toFixed(2))
    total.innerHTML = "$" + eval(totalPrice)
  }
  const btn = document.querySelectorAll("#addBtn")
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", removeFromCart)
  }
}

displayCart(currentUser.cart)