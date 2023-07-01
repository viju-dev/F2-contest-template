const filtersCat = document.querySelectorAll(".filters .filter")
const filterInputs = document.querySelectorAll("aside input")
const searchProducts = document.getElementById("search-products")

let accessToken = localStorage.getItem("accessToken")
if(!accessToken){
  location.replace("/login")
}

searchProducts.addEventListener("keyup", () => { //get items by search(input)
  let products = JSON.parse(localStorage.getItem("products"))
  val = searchProducts.value.toLowerCase()
  copyProduct = products.filter((ele) => {
    console.log(ele.title.toLowerCase(), val)
    return ele.title.toLowerCase().includes(val)
  })

  let temp = document.getElementsByClassName("active")
  let catData = []
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].innerHTML === "All")
      catData.push("All")
    if (temp[i].innerHTML === "Mens")
      catData.push("men's clothing")
    if (temp[i].innerHTML === "Womens")
      catData.push("women's clothing")
    if (temp[i].innerHTML === "Jewellery")
      catData.push("jewelery")
    if (temp[i].innerHTML === "Electronics")
      catData.push("electronics")
  }
  displayData(catData, copyProduct)
})

let filters = []
let copyProduct = []

function filterByPrice(price) { //filter items by price
  let products = JSON.parse(localStorage.getItem("products"))
  price = price.split("-")
  let min = parseInt(price[0])
  let max = parseInt(price[1])
  if (min == 100) {
    max = 1000000
  }
  if (copyProduct.length === 0) {
    copyProduct = products.filter((ele) => {
      return (ele.price >= min && ele.price <= max)
    })
  }
  else {
    copyProduct = copyProduct.filter((ele) => {
      return (ele.price >= min && ele.price <= max)
    })
  }
}

function filterByRange(range) { //filter items by ratings
  let products = JSON.parse(localStorage.getItem("products"))
  if (copyProduct.length === 0) {
    copyProduct = products.filter((ele) => {
      return ele.rating.rate >= range
    })
  }
  else {
    copyProduct = copyProduct.filter((ele) => {
      return ele.rating.rate >= range
    })
  }
}

function filterProducts(event) {
  let products = JSON.parse(localStorage.getItem("products"))
  filters = []
  copyProduct = []
  let color = ["red", "blue", "green", "black", "white"]
  let size = ["s", "m", "l", "xl"]
  let priceRange = ["0-25", "25-50", "50-100", "100on"]

  if (event.target.id === "range") {
    filterByRange(event.target.value)
  }
  let obj = {}

  for (let i = 0; i < filterInputs.length; i++) {
    if (filterInputs[i].checked) {
      filters.push(filterInputs[i].id)
    }
  }

  filters.forEach((ele) => {
    if (color.includes(ele)) {
      obj.color = ele
    }
    if (size.includes(ele)) {
      obj.size = ele
    }
  })

  copyProduct = products.filter(function (item) {
    for (var key in obj) {
      if (item[key] === undefined || item[key] != obj[key])
        return false;
    }
    return true;
  });

  filters.forEach((ele) => {
    if (priceRange.includes(ele)) {
      filterByPrice(ele)
    }
  })

  let temp = document.getElementsByClassName("active")
  let catData = []
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].innerHTML === "All")
      catData.push("All")
    if (temp[i].innerHTML === "Mens")
      catData.push("men's clothing")
    if (temp[i].innerHTML === "Womens")
      catData.push("women's clothing")
    if (temp[i].innerHTML === "Jewellery")
      catData.push("jewelery")
    if (temp[i].innerHTML === "Electronics")
      catData.push("electronics")
  }
  if (filters.length === 0) {
    displayData(catData, products)
  }
  else {
    displayData(catData, copyProduct)
  }
}
for (let i = 0; i < filterInputs.length; i++) {
  filterInputs[i].addEventListener("change", filterProducts)
}


function addToCart(event) {
  let products = JSON.parse(localStorage.getItem("products"))
  let id = parseInt(event.target.parentNode.id)
  let currentUser = JSON.parse(localStorage.getItem("currentUser"))
  let cart = currentUser.cart
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      cart.push(products[i])
      alert("Added to cart")
      currentUser.cart = cart
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }
  }
}

function emptyMainContent() {
  const men = document.getElementById("men's clothing")
  const women = document.getElementById("women's clothing")
  const jewelery = document.getElementById("jewelery")
  const electronics = document.getElementById("electronics")

  if (men) {
    men.remove()
  }
  if (women) {
    women.remove()
  }
  if (jewelery) {
    jewelery.remove()
  }
  if (electronics) {
    electronics.remove()
  }
}

function displayData(catData, data) {

  emptyMainContent()

  if (data.length > 0) {
    if (catData[0] === "All") {
      catData = ["men's clothing", "women's clothing", "jewelery", "electronics"]
    }

    let result = []
    catData.forEach((ele) => {
      result.push(data.filter((item) => {
        return item.category === ele
      }))
    })

    const mainContent = document.querySelector("main-content")
    for (let i = 0; i < result.length; i++) {
      let section = document.createElement("section")
      section.id = catData[i]
      section.innerHTML = `<title>${catData[i]}</title>`
      let items = document.createElement("div")
      items.className = "items"
      for (let j = 0; j < result[i].length; j++) {
        let ele = result[i][j]
        items.innerHTML +=
          `
                <div id=${ele.id} class="item">
                  <img src="${ele.image}" alt="Item" title="${ele.title}" />
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
                  <button id="addBtn">Add to Cart</button>
                </div>
            `

      }
      section.appendChild(items)
      mainContent.appendChild(section)
    }

    const btn = document.querySelectorAll("#addBtn")
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click", addToCart)
    }
  }
}

function filterByCategory(event) {
  let products = JSON.parse(localStorage.getItem("products"))
  filtersCat.forEach((ele) => {
    if (ele.innerHTML === event.target.innerHTML) {
      event.target.className = "filter active"
    }
    else {
      ele.className = "filter"
    }
  })

  let temp = document.getElementsByClassName("active")
  let catData = []
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].innerHTML === "All")
      catData.push("All")
    if (temp[i].innerHTML === "Mens")
      catData.push("men's clothing")
    if (temp[i].innerHTML === "Womens")
      catData.push("women's clothing")
    if (temp[i].innerHTML === "Jewellery")
      catData.push("jewelery")
    if (temp[i].innerHTML === "Electronics")
      catData.push("electronics")
  }
  if (filters.length === 0) {
    displayData(catData, products)
  }
  else {
    displayData(catData, copyProduct)
  }
}
filtersCat.forEach((ele) => {
  ele.addEventListener("click", filterByCategory)
})

function getColor() {
  let arr = ["red", "blue", "black"]
  let num = Math.floor(Math.random() * arr.length)
  return arr[num]
}

function getSize() {
  let arr = ["s", "l", "m", "xl"]
  let num = Math.floor(Math.random() * arr.length)
  return arr[num]
}

async function setColorSize(data) {
  data.forEach((ele) => {
    ele.color = getColor()
    ele.size = getSize()
  })
  return data
}

async function fetchData() {
  let url = 'https://fakestoreapi.com/products'

  let response = await fetch(url)
  let data = await response.json()

  let result = await setColorSize(data)
  localStorage.setItem("products", JSON.stringify(result))
  displayData(["All"], JSON.parse(localStorage.getItem("products")))
}

fetchData()