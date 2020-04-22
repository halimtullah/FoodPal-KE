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

$(document).ready(function () {
  $("#proceedbtn").click(function(event){
  $("#proceedbtn").hide();
  $("#notshown").hide();
  $("#checkout").slideDown(1000);
  
  	event.preventDefault();
  });
});

$(document).ready(function () {
  $(".add").click(function(event) {event.preventDefault();
  document.getElementById("add").innerHTML = "Added to cart!"
	document.getElementById("add").style.color ="red"
  });
  $(".add2").click(function(event) {event.preventDefault();
    document.getElementById("add2").innerHTML = "Added to cart!"
    document.getElementById("add2").style.color ="red"
    });
  $(".add3").click(function(event) {event.preventDefault();
    document.getElementById("add3").innerHTML = "Added to cart!"
	  document.getElementById("add3").style.color ="red"
    });
  $(".add4").click(function(event) {event.preventDefault();
    document.getElementById("add4").innerHTML = "Added to cart!"
    document.getElementById("add4").style.color ="red"
    });
  $(".add5").click(function(event) {event.preventDefault();
    document.getElementById("add5").innerHTML = "Added to cart!"
    document.getElementById("add5").style.color ="red"
    });
});








function sendMsg() {
	var name = $("#NAME").val();
	var email = $("#EMAIL").val();
	var message = $("#MESSAGE").val();
	if (name !== "" && email !== "" && message !== ""){
		alert("Hey " + name + "! Thank you for your message! We will review it and give you feedback. Check your email for our feedback soon.")
  }
};