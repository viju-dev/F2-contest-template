// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

const links = document.querySelectorAll(".nav-items a")
const login = document.getElementById("login-btn")
const signup = document.getElementById("signup-btn")

let accessToken = localStorage.getItem("accessToken")


if(!accessToken){ //if user is not logged in
  links[3].href = "/signup" //cart button
  links[4].href = "/signup" //profile button
}
else{
  location.replace(window.location.href);
}

login.addEventListener("click", () => {
    // location.replace("./login/index.html");

    location.replace(window.location.href.replace("index.html","login/index.html"));
})

signup.addEventListener("click", () => {
    // location.replace("./signup/index.html")
    
    location.replace(window.location.href.replace("index.html","signup/index.html"));
})