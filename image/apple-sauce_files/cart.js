$( document ).ready( function() {
		//The app directory/path.. it can be modified to your require path
  //var customBasePath = "v1.2"; //global variable
  var customBasePath = "";
	var baseUrl = getBasePath();
	var urlFull = getHostBaseUrl();
	var hostUrl = hostUrl();
	var productId = $('.remove-item').data('id');

 	var basketItems = $('span.count').text();
	$.ajax({
		method: "POST",
		//url: '/'+baseUrl+"/cart/countCartItems"
		url: hostUrl+"/cart/countCartItems"
	})
	.done(function( msg ) {
		if(msg != 'error'){
			$('span.count').html(msg);
		}
	});

	 $("#myCarousel").carousel({
         interval : 3000,
         pause: false
     });

     if ( $( 'input[type=radio][name=shipping]').is( ":checked" ) ) {
     	process_shipping();
     }

	$('.buy').on('click',function() {
		var productId = $(this).data('id');
		if ($('.qty').val()) {
			var qty = document.querySelector('.qty').value;
		}
		//var url = urlFull+'/cart/addProductToCart';
	 
		var url = hostUrl+'/cart/addProductToCart';
		$.ajax({
			method: "POST",
			url: url,
			data: { productId: productId, qty: qty}
		})
	   .done( function( msg ) {
			////console.log(msg);
			var getMsg = JSON.parse(msg);

			if ( getMsg.success == 100 ) {
				var basketItems = $('span.count');
				//var num = parseInt(basketItems.text(getMsg.cartItemsCount));
				basketItems.text(getMsg.cartItemsCount);
				//////console.log(getMsg.cartItemsCount);

				swal({
					title: "",
					text: getMsg['name'] + " has been added to your shopping basket!" ,
					//imageUrl:urlFull+'/uploads/products/'+ getMsg['image'],
					imageUrl:hostUrl+'/uploads/products/'+ getMsg['image'],
					type: "success",
					showCancelButton: true,
					html: true,
					allowOutsideClick: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Checkout",
					cancelButtonText: "Continue Shopping",
					closeOnConfirm: false,
				},
				function(){
					//var urlPath = getHostBaseUrl() + "/cart";
					var urlPath = hostUrl+ "/cart";
					$(window).attr("location", urlPath );
				});

		    } else if ( getMsg.error == 100 ) {
	           swal( "Oops, An error occurred !", getMsg.name + " could not be added to cart!", "error" );
		    }
		});

		/** $.post( "getId.php",{id:uid,quantity:quan}, function( data ) {
		 $( "#fget" ).load( "getupdate.php" );
		 $('.bs-example-modal-lg').html(data);
		 });
		 **/
	});

	$(document).on( 'click', '#remove-item', function( event ){

		var productname = $(this).data('name');
		// //console.log(productname);
		var confirmed = confirm( 'Are you sure you want to delete ' + productname + ' from your cart' );
		if ( confirmed ) {
			// event.preventDefault();
			var productId = $(this).data('id');
			// //console.log(productId);
			$.ajax({
				method: "POST",
				url: "cart/deleteCartItem",
				data: { productId: productId }
			})
		   .done( function( msg ) {
				////console.log(msg);
				var getMsg = JSON.parse(msg);

				if ( getMsg.success == 100 ) {
					var basketItems = $('span.count');
					//var num = parseInt(basketItems.text(getMsg.cartItemsCount));
					basketItems.text(getMsg.cartItemsCount);
					////console.log(getMsg.cartItemsCount);

					swal({
						title: "",
						text: getMsg['name'] + " has been delete from your shopping basket!" ,
						imageUrl:'uploads/products/'+ getMsg['image'],
						type: "success",
						showCancelButton: true,
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "Checkout",
						cancelButtonText: "Continue Shopping",
						closeOnConfirm: false,
					},
					function(){
						//var baseUrl = getAbsolutePath();
						var urlPath = hostUrl + "cart";
						$(window).attr("location", urlPath );
					});

			    } else if ( getMsg.error == 100 ) {
		           swal( "Oops, An error occurred !", getMsg.name + " could not be added to cart!", "error" );
			    }
			});
		}
	});

	$('.cart-link').hover(function(){
		reload_cart();
		// $.ajax({
		// 	method: "POST",
		// 	url:'/'+baseUrl+"/cart/getCartContents"
		// })
		// .done(function( msg ) {
		// 	$('.show-shopping-cart').html( msg );
  //  		});
 	});

 	function reload_cart() {
 		//url:'/'+baseUrl+"/cart/getCartContents"
		var url = hostUrl+"/cart/getCartContents"
		//console.log(url);
		$.ajax({
			method: "POST",
			url: url
		})
		.done(function( msg ) {
			$('.show-shopping-cart').html( msg );
   		});
 	}

	function process_shipping() {
		var shipping = "";
		var currency = "";
		var option = $('input[name="shipping"]:checked').val();
		// //console.log(option);
		$.ajax({
			method: "POST",
			url: "cart/userShippingOption",
			data: { option : option }
		}).done( function( msg ) {
			// //console.log(msg);
			var getMsg = JSON.parse(msg);

			if ( getMsg.success == 100 ) {
				var total = $('span#total');
				var vattotal = $('span#vat-total');
				var grandtotal = $('span#grand-total');

				total.html(getMsg.total_str);
				vattotal.html(getMsg.vat_str);
				grandtotal.html(getMsg.grandtotal_str);
				//console.log(getMsg.grandtotal_str);

		    } else if ( getMsg.error == 100 ) {
	           swal( "Oops, An error occurred !", getMsg.name + " could not be added to cart!", "error" );
		    }
		});
	}

	$( 'input[type=radio][name=shipping]' ).change(function(){
		process_shipping();
		// var shipping = "";
		// var currency = "";
		// var option = $('input[name="shipping"]:checked').val();
		// // //console.log(option);
		// $.ajax({
		// 	method: "POST",
		// 	url: "cart/userShippingOption",
		// 	data: { option : option }
		// })
	 //   .done( function( msg ) {
		// 	// //console.log(msg);
		// 	var getMsg = JSON.parse(msg);

		// 	if ( getMsg.success == 100 ) {
		// 		var total = $('span#total');
		// 		var vattotal = $('span#vat-total');
		// 		var grandtotal = $('span#grand-total');

		// 		total.html(getMsg.total_str);
		// 		vattotal.html(getMsg.vat_str);
		// 		grandtotal.html(getMsg.grandtotal_str);
		// 		//console.log(getMsg.grandtotal_str);

		//     } else if ( getMsg.error == 100 ) {
	 //           swal( "Oops, An error occurred !", getMsg.name + " could not be added to cart!", "error" );
		//     }
		// });
	});


	$( '.qty' ).change( function(){
		var qty = $( this ).val();
		var cartid = $( this ).data( 'id' );
		var price = $( '#itemprice-' + cartid ).val();

		////console.log( cartid + " qty: "+qty+" price: "+price);

   		$.ajax({
		  method: "POST",
		  url: "cart/updateItemQty",
		  data: {
		  	cartid : cartid,
		  	qty : qty,
		  	price : price
		  }
		})
	     .done(function( msg ) {
			var getMsg = JSON.parse( msg );

			if ( getMsg.success == 100 ) {
				var rowtotal = $( 'td#rowtotal-' + cartid );
				var total = $( 'span#total' );
				var vattotal = $( 'span#vat-total' );
				var grandtotal = $( 'span#grand-total' );
				var rowfinal = price * qty;

				rowtotal.html( getMsg.currency + getMsg.line_cost );
				total.html( getMsg.total_str );
				vattotal.html( getMsg.vat_str );
				grandtotal.html( getMsg.grandtotal_str );

		    } else if ( getMsg.error == 100 ) {
	           swal( "Oops, An error occurred !", getMsg.name + " could not be added to cart!", "error" );
		    }
		});
	});

	$('#remove').click( function( event ){
		event.preventDefault();
		var basketItems = $('span.count');
	    var rowToDelete = $(this).closest("tr");
		var ItemId = $(this).closest("tr")   // Finds the closest row <tr>
	                       .find("#ItemId")     // Gets a descendent with class="#ItemId"
	                       .text();
	    // //console.log(basketItems);
	    $.ajax({
			method: "POST",
			url: "cart/deleteItem",
			data: {
				ItemId: ItemId,
			}
		})
		.done(function( msg ) {

			if(msg != 'not deleted!'){
				var item =JSON.parse(msg);

				rowToDelete.remove();
				basketItems.text(item['newTotalItems']);
				$('span.price').text(item['newTotal']);
				$(this).closest("tr").remove();

				swal({
					title: "",
					text:  "Item has been removed from  your shopping basket!" ,
					type: "success",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Checkout",
					cancelButtonText: "Continue Shopping",
					closeOnConfirm: false,
				},
				function(){
					//var baseUrl = getAbsolutePath();
					var urlPath = hostUrl+ "cart";
					$(window).attr("location", urlPath );
				});
				return false;

			} else {
				sweetAlert("Oops...", "Item could not be removed from  your shopping basket!", "error");
			}

		});
	});
	$('#rootwizard .finish').click(function() {
		var formData = $( 'form' ).serialize();
		var itemCount = $( 'span.count' );
		var url = hostUrl+'/checkOut/process';
		//console.log("Url: "+url);
        $.ajax({
                url: url,
                type:'GET',
                data: formData
        })
        .done( function( msg ) {
        	//console.log("msg is "+msg);
			var getMsg = JSON.parse( msg );
			//console.log( getMsg.redirect );
			reload_cart();

			if ( getMsg.success == 100 ) {
				//console.log("it was a success... redirect_to:"+getMsg.redirect);
				itemCount.text( getMsg.item_count );
				window.location.replace( getMsg.redirect );
				//console.log("end success!");
		    } else if ( getMsg.error == 200 ) {
	           swal( "Oops, An error occurred !", getMsg.success + " could not be added to cart!", "error" );
		    }
        });

	});

	function getAbsolutePath() {
    	var loc = window.location;
    	var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
	    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
	}

	function getBasePath() {
	    var loc = window.location;
	    var basePath = loc.pathname.split('/')[1];
	    /*
	    var basePath = loc.pathname.split('/')[1]+'/'+customBasePath;  
	    //if(!customBasePath.trim()){
	    if(!customBasePath){
	        basePath = loc.pathname.split('/')[1];
	      }*/
	    return basePath;
	}

	function getHostBaseUrl(){
	 var loc  = window.location;
	 var host = loc.origin;
	 var basePath = loc.pathname.split('/')[1];
	 //+'/'+customBasePath;
	/* if(!customBasePath){
	        basePath = loc.pathname.split('/')[1];
	      } */
	 var full = host+'/'+basePath;
	    return full;
	}

	//web app url | domain
	function hostUrl(){
	var loc  = window.location;
	 var host = loc.origin;
	 return host;
	}
	
});

