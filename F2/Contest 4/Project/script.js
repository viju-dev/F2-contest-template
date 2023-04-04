

let studentList = [];
let id = 0;
function addStudent(){
    id++;
    const name = document.getElementById("name").value;
    const email = document.getElementById("emailId").value;
    const gpa = document.getElementById("gpa").value;
    const age = document.getElementById("age").value;
    const degree = document.getElementById("degree").value;
    let studentObj = {"id":id,"name":name,"email":email,"gpa":gpa,"age":age,"degree":degree};
    
    studentList.push(studentObj);
    // console.log(name);
    
    createElem(id,name,email,gpa,age,degree);

}


function createElem(id,name,email,gpa,age,degree){
    const tblBody = document.getElementById("sudentTblBody");
    let tableRow = document.createElement("tr");
    let idCol = document.createElement("td");
    idCol.innerText = id;
    let nameCol = document.createElement("td");
    nameCol.innerText = name;
    let emailCol = document.createElement("td");
    emailCol.innerText=email;
    let gpaCol = document.createElement("td");
    gpaCol.innerText = gpa;
    let ageCol = document.createElement("td");
    ageCol.innerText = age;
    let degreeCol = document.createElement("td");
    degreeCol.innerHTML = degree+`<span style="float:right;"><i style="margin-right: 5px;" class="fa-regular fa-pen-to-square" data-myid="`+id+`" onclick="editStudent(this.getAttribute('data-myid'));"></i><i class="fa-regular fa-trash-can" data-myid="`+id+`" onclick="deleteStudent(this.getAttribute('data-myid'))"></i></span>`;

    tableRow.appendChild(idCol);
    tableRow.appendChild(nameCol);
    tableRow.appendChild(emailCol);
    tableRow.appendChild(gpaCol);
    tableRow.appendChild(ageCol);
    tableRow.appendChild(degreeCol);

    tblBody.appendChild(tableRow);
}

function editStudent(id){
    // console.log(id);
    document.getElementById("addButton").style.display = "none";
    document.getElementById("editButton").style.display = "block";

    const tblBody = document.getElementById("sudentTblBody");
    let tblrows = tblBody.children;
    for(let i=0;i<tblrows.length;i++){
        // const rowId = tblrows[i].firstElementChild.innerText;
        // console.log(tblrows[0].cells[0].innerText);
        const rowId = tblrows[i].cells[0].innerText;
        if(rowId == id ){
            
            document.getElementById("name").value = tblrows[i].cells[1].innerText
            document.getElementById("emailId").value = tblrows[i].cells[2].innerText
            document.getElementById("gpa").value = tblrows[i].cells[3].innerText
            document.getElementById("age").value = tblrows[i].cells[4].innerText
            document.getElementById("degree").value = tblrows[i].cells[5].innerText

            document.getElementById("update").setAttribute("data-myid",id);
           
            break;
        }
    }
}

    function updateStudent(id){

        const tblBody = document.getElementById("sudentTblBody");
        const name = document.getElementById("name").value;
        const email = document.getElementById("emailId").value;
        const gpa = document.getElementById("gpa").value;
        const age = document.getElementById("age").value;
        const degree = document.getElementById("degree").value;
        let studentObj = {"id":id,"name":name,"email":email,"gpa":gpa,"age":age,"degree":degree};
        


        for(let i=0;i<studentList.length;i++){
        //    console.log(studentList[i].id);
        //    console.log(id);
            if(studentList[i].id == id){
                studentList[i] = studentObj;
                 tblBody.deleteRow(i);
                let tblrow = tblBody.insertRow(i);
                tblrow.insertCell(0).innerHTML = id
                tblrow.insertCell(1).innerHTML = name
                tblrow.insertCell(2).innerHTML = email
                tblrow.insertCell(3).innerHTML = gpa
                tblrow.insertCell(4).innerHTML = age
                tblrow.insertCell(5).innerHTML = degree+`<span style="float:right;"><i style="margin-right: 5px;" class="fa-regular fa-pen-to-square" data-myid="`+id+`" onclick="editStudent(this.getAttribute('data-myid'));"></i><i class="fa-regular fa-trash-can" data-myid="`+id+`" onclick="deleteStudent(this.getAttribute('data-myid'))"></i></span>`;

                break;
            }
            
        }

        // document.getElementById("editButton").children("input").getAttribute()
        
        // console.log(name);
    }
        
    function deleteStudent(id){
        const tblBody = document.getElementById("sudentTblBody");
        for(let i=0;i<studentList.length;i++){
            // console.log(studentList[i].id);
            // console.log(id);
             if(studentList[i].id == id){
                 
                 studentList.splice(i,1)
                  tblBody.deleteRow(i);
                //   console.log(studentList); 
                 break;
             }
    }
    }


function search(){
    var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchBox");
  filter = input.value.toUpperCase();
  table = document.getElementById("sudentTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    names = tr[i].getElementsByTagName("td")[1];
    email = tr[i].getElementsByTagName("td")[2];      
    degree = tr[i].getElementsByTagName("td")[5];      
    if (td || email) {
      txtValue = names.textContent || names.innerText;
      txtValue2 = email.textContent || email.innerText;
      txtValue3 = degree.textContent || degree.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      }
      else if(txtValue2.toUpperCase().indexOf(filter) > -1){
        tr[i].style.display = "";
      } 
      else if(txtValue3.toUpperCase().indexOf(filter) > -1){
        tr[i].style.display = "";
      } 
      else {
        tr[i].style.display = "none";
      }
    }
    else if(email){
        txtValue = email.textContent || email.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }

  }
}