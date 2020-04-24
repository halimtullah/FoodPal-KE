$(document).ready(function () {
  $("#work1")
    .mouseover(function () {
      $("#overlay").show();
    })
    .mouseout(function () {
      $("#overlay").hide();
    });
});
$(document).ready(function () {
  $("#work2")
    .mouseover(function () {
      $("#overlay2").show();
    })
    .mouseout(function () {
      $("#overlay2").hide();
    });
});
$(document).ready(function () {
  $("#work3")
    .mouseover(function () {
      $("#overlay3").show();
    })
    .mouseout(function () {
      $("#overlay3").hide();
    });
});
$(document).ready(function () {
  $("#work4")
    .mouseover(function () {
      $("#overlay4").show();
    })
    .mouseout(function () {
      $("#overlay4").hide();
    });
});


function myFunc(itemname, itemprice) {
  let cartitem = itemname + ":" + itemprice;
  if (sessionStorage) {
    // sessionStorage.clear();
    // Store data
    let allcarts = sessionStorage.getItem("cartItems");
    // sessionStorage.setItem("cartItems", username);
    let cartitems = sessionStorage.getItem("cartItems");
    if (cartitems === null) {
      cartitems = [];
    } else {
      cartitems = JSON.parse(sessionStorage.getItem("cartItems"));
    }
    cartitems.push(JSON.stringify(cartitem));
    sessionStorage.setItem("cartItems", JSON.stringify(cartitems));

    $("#myModal").modal({ backdrop: "static" });
    $("#myModal").modal("show");
    $("#msg").html("You Have Added " + cartitem + " To Your Cart");
    $("#modalTitle").html("New Item Added to Cart");
    $("#myModal").modal("show");

    $(".checkoutbtn").click(function (event) {
      $("#proceedbtn").hide();
      $("#notshown").hide();
      if (sessionStorage) {
        // Store data
        let loggedusername = sessionStorage.getItem("loggedUser");
        let logged = sessionStorage.getItem("logged");
        if (logged === true) {
          // alert(loggedusername);
          $("#checkout").slideDown(1000);
        } else {
          // alert("Not Logged In");
          window.location.href = "index2.html";
        }
      } else {
        alert("Sorry, your browser do not support session storage.");
      }
    });
  } else {
    alert("Sorry, your browser do not support session storage.");
  }
}

// function myFunc2(){
//   var checkBox2 = document.getElementById("cart2")
//   if (checkBox2.checked == true){
//     $("#cart2i").show();
//     $("#cart2t").hide();
//   } else if (checkBox2.checked == false) {
//     $("#cart2t").show();
//     $("#cart2i").hide();
//   }
//   };

//   function myFunc3(){
//     var checkBox3 = document.getElementById("cart3")
//     if (checkBox3.checked == true){
//       $("#cart3i").show();
//       $("#cart3t").hide();
//     } else if (checkBox3.checked == false) {
//       $("#cart3t").show();
//       $("#cart3i").hide();
//     }
//     };

// function myFunc4(){
//   var checkBox4 = document.getElementById("cart4")
//   if (checkBox4.checked == true){
//     $("#cart4i").show();
//     $("#cart4t").hide();
//   } else if (checkBox4.checked == false) {
//     $("#cart4t").show();
//     $("#cart4i").hide();
//   }
// };
// function myFunc5(){
//   var checkBox5 = document.getElementById("cart5")
//   if (checkBox5.checked == true){
//     $("#cart5i").show();
//     $("#cart5t").hide();
//   } else if (checkBox5.checked == false) {
//     $("#cart5t").show();
//     $("#cart5i").hide();
//   }
// };



function sendMsg() {
  var name = $("#NAME").val();
  var email = $("#EMAIL").val();
  var message = $("#MESSAGE").val();
  if (name !== "" && email !== "" && message !== "") {
    alert(
      "Hey " +
        name +
        "! Thank you for your message! We will review it and give you feedback. Check your email for our feedback soon."
    );
  }
}
