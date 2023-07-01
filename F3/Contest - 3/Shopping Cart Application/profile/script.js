// Write your script here

const firstname = document.getElementById("firstname")
const lastname = document.getElementById("lastname")
const changePass = document.getElementById("change-pass")
const oldPass = document.getElementById("old-pass")
const newPass = document.getElementById("new-pass")

const editInfo = document.getElementById("edit-info")
const confirmPass = document.getElementById("confirm-pass")
const logout = document.getElementById("logout")

let accessToken = localStorage.getItem("accessToken")
if(!accessToken){
  location.replace("/login")
}

let data = getData()
firstname.innerHTML = data[0].firstname
lastname.innerHTML = data[0].lastname

function getData() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    let Users = JSON.parse(localStorage.getItem("Users"))
    return [currentUser, Users]
}

function funcConfirmPassord(pass, confirmPass) {
    if (pass === confirmPass) {
        return true
    }
    return false
}

function validatePassword(pass) {
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

editInfo.addEventListener("click", () => {
    let data = getData()
    let currentUser = data[0]
    let Users = data[1]

    currentUser.firstname = firstname.innerHTML
    currentUser.lastname = lastname.innerHTML
    localStorage.setItem("currentUser", JSON.stringify(currentUser))

    for (let i = 0; i < Users.length; i++) {
        if (Users[i].email === currentUser.email) {
            Users[i].firstname = firstname.innerHTML
            Users[i].lastname = lastname.innerHTML
            localStorage.setItem("Users", JSON.stringify(Users))
            break
        }
    }
})

changePass.addEventListener("click", () => {
    let data = getData()
    let currentUser = data[0]
    let Users = data[1]

    let oldPassword = oldPass.innerHTML.trim()
    let newPassword = newPass.innerHTML.trim()
    let confirmPassword = confirmPass.innerHTML.trim()


    if (oldPassword.length > 0 && newPassword.length > 0 && confirmPassword.length > 0) {
        if (oldPassword === currentUser.password) {
            if (validatePassword(newPassword) === "valid") {
                if (funcConfirmPassord(newPassword, confirmPassword)) {

                    currentUser.password = newPassword
                    localStorage.setItem("currentUser", JSON.stringify(currentUser))

                    for (let i = 0; i < Users.length; i++) {
                        if (Users[i].email === currentUser.email) {
                            Users[i].password = newPassword
                            localStorage.setItem("Users", JSON.stringify(Users))
                            break
                        }
                    }
                }
                else {
                    alert("New Password doesn't match.")
                }
            }
            else {
                alert(validatePassword(newPassword))
            }
        }
        else {
            alert("Old password is not matching.")
        }
    }
    else {
        alert("All fields are required.")
    }
})

logout.addEventListener("click", () => {
    let data = getData()
    let currentUser = data[0]
    let Users = data[1]

    firstname.innerHTML = "First Name"
    lastname.innerHTML = "last Name"
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].email === currentUser.email) {
            Users[i].cart = [...currentUser.cart]
        }
    }
    localStorage.setItem("Users", JSON.stringify(Users))
    localStorage.removeItem("accessToken")
    localStorage.removeItem("currentUser")
    location.replace("/")
})