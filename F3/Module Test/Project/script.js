let ip;
$.getJSON("https://api.ipify.org?format=json", function (data) {
  // Setting text of element P with id gfg
  ip = data.ip;
  $("#ipAddress").text(ip);
});

let info;
let timezone;
let cords;
let dateTimeZone;
let posts;
$("#getData").click(function () {
  $.getJSON(
    "https://ipinfo.io/" + ip + "?token=6202c4cd24274d",
    function (data) {
      //${ip} dont work
      // console.log(data);
    }
  )
    .done(function (data) {
      document.getElementById("getData").style.display = "none";
      document.getElementById("fullInfo").style.display = "block";

      info = data;
      timezone = info.timezone;
      cords = info.loc;
      console.log(info);
      $.fn.getGmap();
      $.fn.getTime();
      $.fn.getPostOffices();
      $.fn.fillInfo();
    })
    .fail(function () {
      console.log("error, api request limit reached");
    })
    .always(function () {
      console.log("complete");
    });
});

$.fn.getGmap = function () {
  $("#gmap").attr(
    "src",
    "https://maps.google.com/maps?q=" + cords + "&z=15&output=embed"
  );
};

// .done(function(){
//   $.fn.getTime();
// })

$.fn.getTime = function () {
  // datetime in "America/Chicago" timezone in the "en-US" locale
  dateTimeZone = new Date().toLocaleString("en-US", { timeZone: timezone });

  // "3/22/2021, 5:05:51 PM"
  console.log(dateTimeZone);
};

$.fn.getPostOffices = function () {
  $.getJSON("https://api.postalpincode.in/pincode/421306", function (data) {
    // Setting text of element P with id gfg
    posts = data;
    console.log(data);
  });
};

$.fn.fillInfo = function () {
  setTimeout(function () {
    $("#latitude").text(info.loc.split(",")[0]);
    $("#longitude").text(info.loc.split(",")[1]);
    $("#city").text(info.city);
    $("#region").text(info.region);
    $("#orgn").text(info.asn.name);
    $("#host").text("Unknown");
    $("#timeZone").text(info.timezone);
    $("#DateTime").text(dateTimeZone);
    $("#pinCode").text(info.postal);
    $("#message").text(posts[0].Message);

    // let content = document.getElementById("#items")
    $.fn.fillPostData(posts[0].PostOffice);
    console.log("before");
    
  }, 2000);
};


//post cards
$.fn.fillPostData = function(data){

  $("#items").html("");
  data.forEach((elem) => {
    console.log("inner");
    html =
      ` <div class="item" style="">
  <h3>Name : <span id="">` +
      elem.Name +
      `</span></h3>
  <h3>Branch Type : <span id="">` +
      elem.BranchType +
      `</span></h3>
  <h3>Delivery Status : <span id="">` +
      elem.DeliveryStatus +
      `</span></h3>
  <h3>District : <span id="">`+ elem.District +`</span></h3>
  <h3>Division : <span id="">` + elem.Division +`</span></h3>
</div>`;

    // content.append(html);
    $("#items").append(html);
  });
  $(document).scrollTop(300);
}



// search function
$("input").keyup(function() {
  console.log("clicked");
  $("#items").html("");
  var res = $.grep(posts[0].PostOffice, function (n, i) {
    return n.Name.toLowerCase().indexOf($("#searchId").val().toLowerCase()) > -1 || n.BranchType.toLowerCase().indexOf($("#searchId").val().toLowerCase()) > -1;
});

            $.each(res, function (i, elem) {
              html =
              ` <div class="item" style="">
          <h3>Name : <span id="">` +
              elem.Name +
              `</span></h3>
          <h3>Branch Type : <span id="">` +
              elem.BranchType +
              `</span></h3>
          <h3>Delivery Status : <span id="">` +
              elem.DeliveryStatus +
              `</span></h3>
          <h3>District : <span id=""></span>` +
              elem.District +
              `</h3>
          <h3>Division : <span id=""></span>` +
              elem.Division +
              `</h3>
        </div>`;
        
            // content.append(html);
            $("#items").append(html);
            });
});

// search function
// $("input").keyup(function() {
//   $("#items").html("");
//   let inputVal = $("#searchId").val();
//   inputVal = inputVal.trim().toLowerCase();
//   posts[0].PostOffice.forEach((elem) => {
//     if (
//       elem.Name.toLowerCase() == inputVal ||
//       elem.BranchType.toLowerCase() == inputVal
//     ) {
//       // console.log((element.first_name).toLowerCase(),element);
//       // tableFill(element,"studentTbody");
//       html =
//         ` <div class="item" style="">
//     <h3>Name : <span id="">` +
//         elem.Name +
//         `</span></h3>
//     <h3>Branch Type : <span id="">` +
//         elem.BranchType +
//         `</span></h3>
//     <h3>Delivery Status : <span id="">` +
//         elem.DeliveryStatus +
//         `</span></h3>
//     <h3>District : <span id=""></span>` +
//         elem.District +
//         `</h3>
//     <h3>Division : <span id=""></span>` +
//         elem.Division +
//         `</h3>
//   </div>`;

//       // content.append(html);
//       $("#items").append(html);
//     }
//     else if(inputVal == ""){
//       $("#items").html("");
//       $.fn.fillPostData(posts[0].PostOffice);
//     }
//     $(document).scrollTop(300);

//   });
// });

$( document ).ready(function() {
  $("#searchId").val("");
});