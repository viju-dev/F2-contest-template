userArr = [
  { id: 1, name: "john", age: "18", profession: "developer" },
  { id: 2, name: "jack", age: "20", profession: "developer" },
  { id: 3, name: "karen", age: "19", profession: "admin" },
];

// function insertAfter(referenceNode, newNode) {
//     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
//   } // this function is used to append siblings not childs
function filterUsers() {
    // let select = document.getElementById("profession");
    // select.nextElementSibling.innerHTML = "";
    // userArr.reverse().forEach((element) => {

    let cardBox = document.getElementById("userCards");
    cardBox.innerHTML="";

    let profession = document.getElementById("profession").value;
  userArr.forEach((element) => {
    
   if(profession == element.profession){
    var card = document.createElement("div");
    let info =  
    `<div class="uid" id="cId">`+element.id+`</div>
    <div class="uname" id="cName">`+element.name+`</div>
    <div class="uprofession" id="cProfession">`+element.profession+`</div>
    <div class="uage" id="cAge">`+element.age+`</div>`;
    card.innerHTML = info;
    card.setAttribute("class","card");
    cardBox.appendChild(card);
   }
    // var info1 = document.createElement("div");
    // info1.innerHTML = info;
    // elem = select.nextElementSibling.appe
    // info1.setAttribute("class","card");
    // select.parentNode.insertBefore(info1, select.nextSibling);

  });
}

function addUser() {
  let id = userArr[Object.keys(userArr).length - 1].id;
  let uname = document.getElementById("uName").value;
  let uprofession = document.getElementById("uProfession").value;
  let uage = document.getElementById("uAge").value;

  arr = { id: ++id, name: uname, profession: uprofession, age: uage };
  userArr.push(arr);
}

document.addEventListener("DOMContentLoaded", () => {
    let profession = document.getElementById("profession").value;
    if(profession == -1){
        window.alert("Select Profession Before Clicking Filter Button");
    }
    document.getElementById("uName").value = "";
    document.getElementById("uProfession").value = "";
    document.getElementById("uNauAGeme").value = "";

  });