/** @format */

let arr = [
  { id: 1, name: "john", age: "18", profession: "developer" },
  { id: 2, name: "jack", age: "20", profession: "developer" },
  { id: 3, name: "karen", age: "19", profession: "admin" },
];

function PrintDeveloperbyMap() {
  //Write your code here , just console.log
  arr.map(function(element){
    if(element.profession === "developer" ){
      console.log(element);
    }
})
}

function PrintDeveloperbyForEach() {
  //Write your code here , just console.log
  arr.forEach(element => {
    if(element.profession === "developer"){
      console.log(element);
    }
  });
}

function addData() {
  //Write your code here, just console.log
  arr.push({id:4,name:"susan",age:"20",profession:"intern"});
  console.log(arr);
}

function removeAdmin() {
  //Write your code here, just console.log
  for(let i=0;i<arr.length;i++){
    if(arr[i].profession === "admin"){
      arr.splice(i,1);
    }
  }
  console.log(arr);
}

function concatenateArray() {
  //Write your code here, just console.log
  let arr2 = [
    { id: 5, name: "tony", age: "27", profession: "Tech" },
    { id: 6, name: "thor", age: "27", profession: "ThunderGod" },
    { id: 7, name: "captain", age: "26", profession: "Gym" },
  ];
 let arr3 = arr.concat(arr2);
  console.log(arr3);

}
