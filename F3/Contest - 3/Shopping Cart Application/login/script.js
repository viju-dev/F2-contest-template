let accessToken = localStorage.getItem("accessToken")
let Users = JSON.parse(localStorage.getItem("Users"))

if(accessToken){ //if user already logged in
    location.replace("/shop")
}

function generateaccessToken() {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let length = 16;
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    localStorage.setItem("accessToken", result)
}

const login = document.getElementById("login-btn")
const email = document.getElementById("email")
const password = document.getElementById("password")

login.addEventListener("click", () => {
    let flag = false
    if(Users){ //check if there are users present in localstorage
        if(email.value && password.value){
            for(let i = 0; i < Users.length; i++){
                ele = Users[i]
                if(ele.email === email.value){
                    if(ele.password === password.value){
                        generateaccessToken()
                        localStorage.setItem("currentUser", JSON.stringify(ele))
                        location.replace("/shop")
                        flag = true
                        break
                    }
                }
            }
            if(flag === false){
                alert("Invalid credentials.")
            }
        }
        else{
            alert("All fields are mandatory.")
        }
    }
    else{
        alert("No user present with this credentials.")
    }
})
