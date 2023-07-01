let accessToken = localStorage.getItem("accessToken")
// let currentUser = JSON.parse(localStorage.getItem("currentUser"))
const signup = document.getElementById("signup")
const inputs = document.querySelectorAll("input")
let cart = []

let Users = JSON.parse(localStorage.getItem("Users"))
if(!Users){ //if array of users not present in localstorage
    Users = []
    localStorage.setItem("Users", JSON.stringify(Users))
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

if(accessToken){ //if user is already logged in
    location.replace("/shop")
}

function funcConfirmPassord(pass, confirmPass) { //for checking if both the password matches
    if (pass === confirmPass) {
        return true
    }
    return false
}

function validatePassword(pass) { //for validate password with atleast one uppercase, lowercase, number and minimum length 8
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (pass.match(lowerCaseLetters)) {
        if (pass.match(upperCaseLetters)) {
            if (pass.match(numbers)) {
                if (pass.length >= 8) {
                    return "valid"
                } else {
                    return "Password must contain atleast 8 or more characters"
                }
            } else {
                return "Password must contain atleast one number"
            }
        } else {
            return "Password must contain atleast one uppercase letter"
        }
    } else {
        return "Password must contain atleast one lowercase letter"
    }
}

function validateMail(mail) { //for validate email
    for(let i = 0; i < Users.length; i++){
        console.log(Users[i].email === mail)
        if(Users[i].email === mail){
            return "User Already Present with this email address."
        }
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
        return "valid"
    }
    return "Enter valid email address.";
}

function createUser(){ //after signup create user
    let flag = true
    for(let i = 0; i < inputs.length; i++){ //check all the input fields filled
        if(!inputs[i].value){
            flag = false
            break
        }
    }
    if(flag){
        if(validateMail(inputs[2].value) === "valid"){
            if(validatePassword(inputs[3].value) === "valid"){
                if(funcConfirmPassord(inputs[3].value, inputs[4].value)){
                    generateaccessToken()
                    let obj = {
                        "firstname" : inputs[0].value,
                        "lastname" : inputs[1].value,
                        "email" : inputs[2].value,
                        "password" : inputs[3].value,
                        'cart' : cart
                    }
                    localStorage.setItem("currentUser", JSON.stringify(obj))
                    let Users = JSON.parse(localStorage.getItem("Users"))
                    Users.push(obj)
                    localStorage.setItem("Users", JSON.stringify(Users))
                    location.replace("/shop")
                }
                else{
                    alert("Password doesn't match.")
                }
            }
            else{
                alert("Enter valid Password.")
            }
        }
        else{
            alert(validateMail(inputs[2].value))
        }
    }
    else{
        alert("All fields are madatory.")
    }
}
signup.addEventListener("click", createUser)