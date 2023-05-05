let StudentsData = [];

fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
  .then(response => response.json())
  .then(data => {
    StudentsData = data;
    //console.log(StudentsData);
    data.forEach(item => {
        
        tableFill(item,"studentTbody");
     //align-item center siplay flex

    })
});

// table filling
function tableFill(item,tableId){ // passed each item of list
    const row = document.createElement("tr");
     const Id = document.createElement("td");
     const Name = document.createElement("td");
     const Gender = document.createElement("td");
     const Class = document.createElement("td");
     const Marks = document.createElement("td");
     const Passing = document.createElement("td");
     const Email = document.createElement("td");
    
     const FullName = item.first_name +" "+ item.last_name;
     const Img = document.createElement("img");
     Img.src = item.img_src;
     Img.alt = item.FullName;
    
     const nameBox = document.createElement("p");
     nameBox.textContent = FullName;

     const imgBox = document.createElement("span");
     imgBox.classList.add("imgBox");

     imgBox.appendChild(Img);
     imgBox.appendChild(nameBox); 
    //  console.log(imgBox);

     //
     Id.textContent = item.id;
     Name.appendChild(imgBox); // used appendchild coz we are not setting content but setting html
     Gender.textContent=item.gender;
     Class.textContent = item.class;
     Marks.textContent= item.marks;
     if(item.passing == true){
        Passing.textContent = "Pass";
     }
     else{
        Passing.textContent = "Failed";
     }
     Email.textContent = item.email;

     //
     row.appendChild(Id);
     row.appendChild(Name);
     row.appendChild(Gender);
     row.appendChild(Class);
     row.appendChild(Marks);
     row.appendChild(Passing);
     row.appendChild(Email);

     const table = document.getElementById(tableId);
     table.appendChild(row);


}

// sorting functions

function sorting(){
    //making input value empty
    document.getElementById("searchId").value="";

    StudentsData.sort((a,b) =>{
        //hiding gender table if showing up
        document.getElementById("guysData").style.display = "none"; 
        document.getElementById("girlsData").style.display = "none";

        //showing studentTable if hidden
        document.getElementById("allStudents").style.display = "block"; 

        let fa = a.first_name.toLowerCase();
        let fb = b.first_name.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
    });

   document.getElementById("studentTbody").innerHTML = "";
    StudentsData.forEach(element => {
        tableFill(element,"studentTbody");
    })

}
function reverseSorting(){
    //making input value empty
    document.getElementById("searchId").value="";

    //hiding gender table if showing up
    document.getElementById("guysData").style.display = "none"; 
    document.getElementById("girlsData").style.display = "none";

    //showing studentTable if hidden
    document.getElementById("allStudents").style.display = "block"; 

    StudentsData.sort((b,a) =>{
        let fa = a.first_name.toLowerCase();
        let fb = b.first_name.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
    });
   document.getElementById("studentTbody").innerHTML = "";
    StudentsData.forEach(element => {
        tableFill(element,"studentTbody");
    })
    
}
function marksSort(){
    //making input value empty
    document.getElementById("searchId").value="";

    //hiding gender table if showing up
    document.getElementById("guysData").style.display = "none"; 
    document.getElementById("girlsData").style.display = "none";

    //showing studentTable if hidden
    document.getElementById("allStudents").style.display = "block"; 

    StudentsData.sort((a,b) =>{
        return a.marks - b.marks;
    });
   document.getElementById("studentTbody").innerHTML = "";
    StudentsData.forEach(element => {
        tableFill(element,"studentTbody");
    })

}
function passSort(){
    //making input value empty
    document.getElementById("searchId").value="";

    //hiding gender table if showing up
    document.getElementById("guysData").style.display = "none"; 
    document.getElementById("girlsData").style.display = "none";

    //showing studentTable if hidden
    document.getElementById("allStudents").style.display = "block"; 

    StudentsData.sort((a,b) =>{
        return a.id - b.id;
    });
   document.getElementById("studentTbody").innerHTML = "";
    StudentsData.forEach(element => {
        if(element.passing == 1){
            tableFill(element,"studentTbody");
        }
    })

}
function classSort(){
    //making input value empty
    document.getElementById("searchId").value="";

    //hiding gender table if showing up
    document.getElementById("guysData").style.display = "none"; 
    document.getElementById("girlsData").style.display = "none";

    //showing studentTable if hidden
    document.getElementById("allStudents").style.display = "block"; 

    StudentsData.sort((a,b) =>{
        return a.class - b.class;
    });
   document.getElementById("studentTbody").innerHTML = "";
    StudentsData.forEach(element => {
        tableFill(element,"studentTbody");
    })

}

//
let guysData = [];
let girlsData = [];
function genderSort(){
    //making input value empty
    document.getElementById("searchId").value="";
    

    StudentsData.forEach(element => {
        if(element.gender == "Male"){
            guysData.push(element);
        }
        else if(element.gender == "Female"){
            girlsData.push(element);
        }
    })

    document.getElementById("allStudents").style.display = "none";
    if(guysData.length > 0){
        document.getElementById("guysData").style.display = "block"; 
        // if using display property on table
        // Display:block will change the by default behavior of the Table element which results in loosing its width. instead of that you can change display:table
    }
    guysData.forEach(element => {
        tableFill(element,"guysTbody")
    })
    if(girlsData.length > 0){
        document.getElementById("girlsData").style.display = "block";
    }
    girlsData.forEach(element => {
        tableFill(element,"girlsTbody")
    })

}

function searchStudent(){
     //hiding gender table if showing up
     document.getElementById("guysData").style.display = "none"; //onclick for this
     document.getElementById("girlsData").style.display = "none";
 
     //showing studentTable if hidden
     document.getElementById("allStudents").style.display = "block"; 
    
     //onchange - suppose onclick only coz we have button
     document.getElementById("studentTbody").innerHTML = "";
    let inputVal = document.getElementById("searchId").value;
    // inputVal = inputVal.trim();
    inputVal = inputVal.trim().toLowerCase();
    StudentsData.forEach(element => {
        if((element.first_name).toLowerCase() == inputVal || (element.last_name).toLowerCase()== inputVal || (element.email).toLowerCase() == inputVal){
            console.log((element.first_name).toLowerCase(),element);
            tableFill(element,"studentTbody");
        }
    })

    //making input value empty
    document.getElementById("searchId").value="";


}
