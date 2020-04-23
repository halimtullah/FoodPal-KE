$(document).ready(function(){
  $("#work1").mouseover(function(){
    $("#overlay").show();
  }).mouseout(function(){
    $("#overlay").hide();
  });
});
$(document).ready(function(){
  $("#work2").mouseover(function(){
    $("#overlay2").show();
  }).mouseout(function(){
    $("#overlay2").hide();
  });
});
$(document).ready(function(){
  $("#work3").mouseover(function(){
    $("#overlay3").show();
  }).mouseout(function(){
    $("#overlay3").hide();
  });
});
$(document).ready(function(){
  $("#work4").mouseover(function(){
    $("#overlay4").show();
  }).mouseout(function(){
    $("#overlay4").hide();
  });
});

$(document).ready(function(){
  $("#work5").mouseover(function(){
    $("#overlay5").show();
  }).mouseout(function(){
    $("#overlay5").hide();
  });
  $("#work6").mouseover(function(){
    $("#overlay6").show();
  }).mouseout(function(){
		$("#overlay6").hide();
	});
});

function myFunc(){
  var checkBox = document.getElementById("cart1")
  if (checkBox.checked == true){
    $("#cart1i").show();
    $("#cart1t").hide();
  } else if (checkBox.checked == false) {
    $("#cart1t").show();
    $("#cart1i").hide();
  }

  if (checkBox.checked == true){
    $(".item1").show();
		$(".price1").show();
    $("#item1").text("Cran Berry");
		$("#price1").text(parseInt("150"));
  } else if (checkBox.checked == false) {
    $(".item1").hide();
		$(".price1").hide();
    $("#item1").html($(""));
		$("#price1").html($(""));
  }
};

function myFunc2(){
  var checkBox2 = document.getElementById("cart2")
  if (checkBox2.checked == true){
    $("#cart2i").show();
    $("#cart2t").hide();
  } else if (checkBox2.checked == false) {
    $("#cart2t").show();
    $("#cart2i").hide();
  }

  if (checkBox2.checked == true){
    $(".item2").show();
		$(".price2").show();
    $("#item2").text("Nido Milk");
		$("#price2").text(parseInt("100"));
  } else if (checkBox2.checked == false) {
    $(".item2").hide();
		$(".price2").hide();
    $("#item2").html($(""));
		$("#price2").html($(""));
  }
};

function myFunc3(){
  var checkBox3 = document.getElementById("cart3")
  if (checkBox3.checked == true){
    $("#cart3i").show();
    $("#cart3t").hide();
  } else if (checkBox3.checked == false) {
    $("#cart3t").show();
    $("#cart3i").hide();
  }

  if (checkBox3.checked == true){
    $(".item3").show();
		$(".price3").show();
    $("#item3").text("Hilwa Tuna");
		$("#price3").text(parseInt("50"));
  } else if (checkBox3.checked == false) {
    $(".item3").hide();
		$(".price3").hide();
    $("#item3").html($(""));
		$("#price3").html($(""));
  }
};

function myFunc4(){
  var checkBox4 = document.getElementById("cart4")
  if (checkBox4.checked == true){
    $("#cart4i").show();
    $("#cart4t").hide();
  } else if (checkBox4.checked == false) {
    $("#cart4t").show();
    $("#cart4i").hide();
  }

  if (checkBox4.checked == true){
    $(".item4").show();
		$(".price4").show();
    $("#item4").text("Weetabix");
		$("#price4").text(parseInt("150"));
  } else if (checkBox4.checked == false) {
    $(".item4").hide();
		$(".price4").hide();
    $("#item4").html($(""));
		$("#price4").html($(""));
  }
};
function myFunc5(event){
  var checkBox5 = document.getElementById("cart5")
  if (checkBox5.checked == true){
    $("#cart5i").show();
    $("#cart5t").hide();
  } else if (checkBox5.checked == false) {
    $("#cart5t").show();
    $("#cart5i").hide();
  }

  if (checkBox5.checked == true){
    $(".item5").show();
		$(".price5").show();
    $("#item5").text("Beverage");
		$("#price5").text(parseInt("150"));
  } else if (checkBox5.checked == false) {
    $(".item5").hide();
		$(".price5").hide();
    $("#item5").html($(""));
		$("#price5").html($(""));
  }

  event.preventDefault();
};



function proceed(){
  var checkBox = document.getElementById("cart1")
  var checkBox2 = document.getElementById("cart2")
  var checkBox3 = document.getElementById("cart3")
  var checkBox4 = document.getElementById("cart4")
  var checkBox5 = document.getElementById("cart5")

  if ((checkBox.checked == false) && (checkBox2.checked == false) && (checkBox3.checked == false) && (checkBox4.checked == false) && (checkBox5.checked == false)){
    alert("Please choose at least one product!")
  } else {
    $("#proceedbtn").hide();
    $("#notshown").hide();
    $("#checkout").slideDown(1000);
  }
  
  
};










function sendMsg() {
	var name = $("#NAME").val();
	var email = $("#EMAIL").val();
	var message = $("#MESSAGE").val();
	if (name !== "" && email !== "" && message !== ""){
		alert("Hey " + name + "! Thank you for your message! We will review it and give you feedback. Check your email for our feedback soon.")
  }
};