$(document).ready(function () {
    //The app directory/path.. it can be modified to your require path
    var customBasePath = "chowberry/v1.2"; //global variable
    var customBasePath = "";

    //getDeliveryAddress();
    getSubscriptionStatus();
    var baseUrl = getBasePath();
    var urlFull =  getHostBaseUrl();
    var hostUrl = hostUrl();

    if($('div').hasClass('slider-form')){
        initPopup();
    }

    $('#productModal').on('show.bs.modal',function(e){
        var productId = $(e.relatedTarget).attr('data-id');
        var url = hostUrl + "/index/getProduct/" + productId;
        //console.log(url+" productId: "+productId);
         $.ajax({
            type: "POST",
            url: url,
            data: {productId:productId},
            processData: false,
            contentType: false   // tell jQuery not to set contentType
        })
        .done(function( msg ) {
          //console.log(url+" msg: "+msg);
           $(".productModalBody").html(msg);
           $("#check").on('click',function(){
               var productId = $(this).data('id');
               var qty = $("#qty").val();
                 $.ajax({
                  method: "POST",
                  url: hostUrl+"/cart/addProductToCart",
                  data: {
                    productId: productId,
                    qty: qty
                  }
                })
                 .done(function( msg ) {
                 if(msg != 'error'){
                  var getMsg = JSON.parse(msg);
                  var basketItems = $('span.count');
                  //var num = parseInt(basketItems.text());
                  basketItems.text(getMsg.cartItemsCount);
                 // basketItems.text(num+qty);
                  var item = JSON.parse(msg);

                   swal({
                    title: "",
                  text: item['name'] + " has been added to your shopping basket!" ,
                  imageUrl:urlFull+'/uploads/products/'+ item['image'],
                  type: "success",
                  showCancelButton: true,
                  allowOutsideClick: true,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "Checkout",
                  cancelButtonText: "Continue Shopping",
                  closeOnConfirm: false,
                },
                function(){
                  var urlPath = hostUrl+ "/cart"; 
                    $(window).attr("location", urlPath );
                });
                  }else{
                    swal("Oops, An error occurred !", "Product not added to cart!", "error");
                  }
                    
                }); 
                 
           });
        });  

});



//(function() { // Begin scoping function 
    //Delete 
    //Product function 
 
    //Global varable 
    var id; 
    var action; 
    var type;   
 
    $('.deleteProduct').on('click', function(){  
      id = $(this).attr('data-id'); 
      action = $(this).attr('data-action'); 
      type = $(this).attr('data-type'); 
      //console.log(id+' '+type+' S in id is '+action); 
    }); 

    //Delete retailer products in group
    $('.deleteSelectedProducts').on('click',function(e){
      e.preventDefault();
      //var retailerEmail = "";
        var $checkboxes = $('input[type="checkbox"]:checked').map(function(){
          var id = $(this).val();
          var action = $(this).attr('data-action');//static
          var type = $(this).attr('data-type');

          deleteList(id, action, type);
        // console.log("id = "+id+",action = "+action+", type = "+type+", status = "+data_approvalstatus);
        return {id, action, type};
        }).get();
        console.log("checkboxes Ids: "+$checkboxes+" typeof: "+ typeof $checkboxes.toString());
        $getIds = $checkboxes.toString();//now a string type
        //exit();
        //sendApprovalEmail($getIds);
        return false;
        exit;
      });  
 
//user 
    $('.deleteUser').on('click', function(){  
      id = $(this).attr('data-id'); 
      action = $(this).attr('data-action'); 
      type = $(this).attr('data-type'); 
      //console.log(id+' '+type+' S in id is '+action); 
    }); 
 
    $('.AdmindeleteRetailer').on('click', function(){ 
      id = $(this).attr('data-id'); 
      action = $(this).attr('data-action'); 
      type = $(this).attr('data-type'); 
      //console.log(id+' '+type+' S delete retailer in id is '+action); 
    }); 
 
    $('#btnYes').click(function(e) { 
        // handle deletion here 
        e.preventDefault(); 
      //console.log(id+' Globe id is '+action); 
    //  var action = $(this).attr('data-action'); 
      //console.log(id+' Global laction in id is '+ action); 
 
        $success = deleteList(id, action, type); 
        $('#myModalDelete').modal('hide'); 
    }); 
    //type is either product, user e.t.c 
    function deleteList(id, action, type){ 
      $.ajax({ 
            type: "POST", 
            url: hostUrl+"/"+action+"/"+id, 
            data: { 
              productId:id, 
              url: '/'+baseUrl+"/"+action+"/"+id 
            }, 
            processData: false, 
            contentType: false   // tell jQuery not to set contentType 
        }) 
        .done(function( msg ) { 
          /*NB: the path the url leads to has a logic that help in executing the delete action*/ 
 
          $pcount = $('.'+type+'_body .box-title').attr('data-count') - 1;  
          $('.'+type+'Id'+id).remove();  
          $('.'+type+'_body .box-title').replaceWith( "<h3 class='box-title' data-count='" + $pcount + "'>Users Lists ("+$pcount+")</h3>" ); 
          //console.log(id +' url:'+url+' '+type+' count ' + action); 
          return true; 
        }); 
    } 
    //end Delete action 
//});
 
    //User function 
 
//product approval 
$('.approvalStatus').on('click',function(e){
  e.preventDefault();
    var id = $(this).attr('data-id'); 
    var approvalStatus = $(this).attr('data-approvalStatus');
    //ajax call function
    approvalMethod(id, approvalStatus);
  });

//group product approval
$('.approvalGroupStatus').on('click',function(e){
  e.preventDefault();
  //var retailerEmail = "";
    var $checkboxes = $('input[type="checkbox"]:checked').map(function(){
      var id = $(this).val();
      var approvalStatus = $(this).attr('data-approvalStatus');
      approvalMethod(id, approvalStatus);
    return id;
    }).get();
    //console.log("checkboxes Ids: "+$checkboxes+" typeof: "+ typeof $checkboxes.toString());
    $getIds = $checkboxes.toString();//now a string type
    //exit();
    sendApprovalEmail($getIds);
    return false;
    exit;
  }); 

  function approvalMethod(id, approvalStatus){
    console.log("id: "+id+" approve: "+approvalStatus);
    var action = "admin/products/approve";
    //var url = '/'+baseUrl+"/"+action+"/"+id+"?approval_status="+approvalStatus; 
    var url = hostUrl+"/"+action+"/"+id+"?approval_status="+approvalStatus; 
    $.ajax({ 
        type: "POST", 
        url: url, 
        data: {productId:id, 
              url: '/'+hostUrl+"/"+action+"/"+id}, 
        processData: false, 
        contentType: false   // tell jQuery not to set contentType 
    }) 
    .done(function( msg ) { 
      $('.productId'+id .approve ).removeClass('bg-gray').addClass('btn-success'); 
      //console.log("approval was successfull!!!");
      //Temporary fix  
     // window.location.reload(true) 
     $('body').load(window.location.href,'body'); 
    });
  }

  function sendApprovalEmail($getIds){
    var action = "admin/productAprovalMail";
    var retailer_email = $('.approvalGroupStatus').attr('data-retailemail');
   // console.log("email: "+retailer_email);
    var url = hostUrl+"/"+action+"?email="+retailer_email+"&ids="+$getIds;
    //var url = '/'+hostUrl+"/"+action+"?email="+retailer_email+"&ids="+$getIds;

    $.ajax({ 
        type: "POST", 
        url: url, 
        data: {email: retailer_email}, 
        processData: false, 
        contentType: false   // tell jQuery not to set contentType 
    }) 
    .done(function( msg ) { 
      //Temporary fix  
     // window.location.reload(true) 
     $('body').load(window.location.href,'body'); 
    });
  }
 


//Approve retailer 
 
 
 
//verify user 
$('.is_verified').on('click',function(e){ 
    var id = $(this).attr('data-id'); 
    var verifyStatus = $(this).attr('data-verify'); 
    var action = $(this).attr('data-action'); 
    var url = hostUrl+"/"+action+"/"+id+"?verify_status="+verifyStatus; 
    //console.log(id+" Test 1 verify: "+ verifyStatus +" "+ url); 
 
    $.ajax({ 
        type: "POST", 
        url: url, 
        data: {productId:id, 
              url: hostUrl+"/"+action+"/"+id}, 
        processData: false, 
        contentType: false   // tell jQuery not to set contentType 
    }) 
    .done(function( msg ) { 
      $('.userId'+id+' td:nth-of-type(-1) ').removeClass('bg-gray').addClass('btn-success'); 
      $('.userId'+id+' td:nth-of-type(-1) ').replaceWith( '<a class="btn btn-red btn-success btn-flat">Unverified</a>'); 
     // //console.log(".done "+ action); 
      $('body').load(window.location.href,'body'); 
    }); 
  }); 
 
  //Edit category 
  var catname; //Global varable 
  $('.editCategory').on('click',function(e){ 
    catname = $(this).attr('data-catName'); 
    id = $(this).attr('data-id'); 
    action = $(this).attr('data-action'); 
    //console.log(id+" "+catname+" edit in action: "+action); 
    var html = '<input type="text" class="form-control editCatName" id="name" name="name" placeholder="Name"  required data-error="Name is required" value="'+catname+'">'; 
    $('.editCatName').replaceWith( html ); 
 
     
  }); 

//Check if email is in the Database
//Refactored from jQuery to pure Javascript
// This window.onload = function (){} is equivalent to  this $(document).ready(function () {})
/*window.onload = function(){
  document.querySelector('.register #email').onblur = function () {
   //console.log(this.value);
   var exists = checkIfEmailExists(this.value);
  };
}*/
(function (){
  $reg_email = document.querySelector(".register #email");
  if ($reg_email) {
    $reg_email.onblur = function () {
     //console.log(this.value);
     var exists = checkIfEmailExists(this.value);
    };
  }
}());
  
/*  document.querySelector('.register #email').onblur = function () {
   //console.log(this.value);
   var exists = checkIfEmailExists(this.value);
  };*/

/*$(document).ready(function () {
  $('.register #email').on('blur', function () {
    var exists = checkIfEmailExists(this.value);
  });
});*/


function checkIfEmailExists(email){
  function success(data) {
    //console.log(data);
    if (data === 'true') {
      document.querySelector(".register .email input").setAttribute('style', 'border:1px solid red;');
      document.querySelector(".email .help-block").innerHTML = '<div class="help-block with-errors"><ul class="list-unstyled"><li style="color:red;">Email address already exist</li></ul></div>';
      document.querySelector(".email .list-unstyled").setAttribute('style', "display: block;");
    } else {
      document.querySelector('.register .email input').setAttribute('style', "border: 1px solid #ccc;");
      document.querySelector('.email .list-unstyled').setAttribute('style', "display: none;");
    }
  }
  //var url = '/' + baseUrl + "/register/validateEmail/" + email;
  var url = "/register/validateEmail/" + email;
     //console.log('Url: '+url);
  $.ajax({
     type: "POST",
     url: url,
     data: {email: email},
  }).done(success);
}

$('.retailer-add-product .submit').on('click', function(e){
    var $retailerId, $retailerAddProduct, url, result;
    $retailerId = $(this).attr('data-retailerId');
    $retailerProductUploadLimit = $('.retailer-add-product').attr('data-productUploadLimit');
    $retailerProductUploadCount = $('.retailer-add-product').attr('data-productUploadCount');
   // url = '/' + baseUrl+'/SubscriptionPlan/subExpired/' +$retailerId;
    url = baseUrl+'/SubscriptionPlan/subExpired/' +$retailerId;
    var url2 = urlFull+'/SubscriptionPlan/getSubscriptionPlans';
    
    if(parseInt($retailerProductUploadLimit) <= parseInt($retailerProductUploadCount)){
      //console.log($retailerProductUploadLimit +" > "+  $retailerProductUploadCount);
      e.preventDefault();
      $.ajax({
           type: "POST",
           url: url,
           data: {retailerId: $retailerId},
       })
      .done(function( msg ) {
          $.magnificPopup.open({
              items: {
                src: '<div class="white-popup" style="width: 850px;">'+
                  '<div class="kt-popup-newsletter">'+
                  '<div class="popup-title">'+
                  '<img src="images/logo.png" alt="">'+
                  '<p class="notice">'+  
                  ' Oops! Sorry but you have exceeded the total number of product that your current package covers.<br>'+
                  'Would you like to upgrade to enjoy extended benefits?<br> check out other plans below.'+
                  '</p>'+
                  '</div>'+

                  '<form id="form-subscribe" class="form-subscribe" method="post" action="SubscriptionPlan/subscribeNow" data-toggle="validator">'+
                    '<input class="input form-control" id="sub_email" name="sub_email" placeholder="Your email here" type="hidden" required />'+
                     '<div style="overflow-x:auto;" class="">'+
                        '<table>'+
                        '<tr><th>Feature</th><th>Basic <span>N9,900/Month</span></th><th>Standard <span>N19,900/Month</span></th><th>Premium <span>N29,900/Month</span></th><th>Membership <span>N59,900/Month</span></th></tr>'+
                        '<tbody>'+
                        '<tr><td>No. of product Uploads</td><td>3</td><td>5</td><td>9</td><td>Unlimited</td></tr>'+
                        '<tr><td>Number of Users</td><td>2</td><td>4</td><td>6</td><td>10</td></tr>'+
                        '<tr><td>Email Expiry Product Alert</td><td><i class="fa fa-check" aria-hidden="true"></i></td><td><i class="fa fa-check"></i></td><td><i class="fa fa-check"></i></td><td><i class="fa fa-check"></i></td></tr>'+
                        '<tr><td>SMS Expiry product alert</td><td><i class="fa fa-times"></i></td><td><i class="fa fa-check"></i></td><td><i class="fa fa-check"></i></td><td><i class="fa fa-check"></i></td></tr>'+
                        '<tr><td>Purchase Recommendation</td><td><i class="fa fa-times"></i></td><td><i class="fa fa-times"></i></td><td><i class="fa fa-check"></i></td><td><i class="fa fa-check"></i></td></tr>'+
                        '<tr><td>Products featuring</td><td><i class="fa fa-times"></i></td><td><i class="fa fa-times"></i></td><td><i class="fa fa-times"></i></td><td><i class="fa fa-check"></i></td></tr>'+
                        '<tr>'+
                        '<td></td><td><button class="button btn-green subscribe" id="basic">subscribe</button></td><td><button class="button subscribe" id="standard">subscribe</button></td>'+
                        '<td><button class="button btn-purple subscribe" id="sub">Premium</button></td><td><button class="button btn-blue subscribe" id="sub">Membership</button></td>'+
                        '</tr>'+
                        '</tbody>'+
                        '</table>'+
                     '</div>'+ 
                     '<div style="margin-top:20px">'+
                     'Not yet ready? <button class="button" style="width:150px" id="cancelSub">Subscribe Later</button>'+
                     '</div>'+
                    '</form>'+
                    '</div>'+
                  '</div>',
                 type: 'inline' //can be a HTML string, jQuery object, or CSS selector
               }
            });
      });
    }else{
      //Do nothing
        //console.log("Limitcap: "+$retailerProductUploadLimit +" | > | NumberOfProduct: "+  $retailerProductUploadCount);
    }
});

//Create autocomplete search function from scratch
//inspiration from the previous one
(function (){
  $sel = document.querySelector("#search-product");
  if ($sel) {
    $sel.onkeyup = function() {
      var input = this.value; //get the input 
      var Max_length = 2;
      var loc = document.getElementById("location_search").value;
      var searchCategory = document.getElementById("searchsel").value;
      if (input.length >= Max_length) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
          if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var response = JSON.parse(this.responseText); //convert the string value a object
            for (var i = 0; i <= response.length; i++) {
              //var producturl = '/' + baseUrl + "/product/" + response[i]['productid'];
              var producturl = baseUrl + "/product/" + response[i]['productid'];
              document.getElementById("results").insertAdjacentHTML("beforeend", "<div class='item'><a href='"+producturl+"'>"+response[i]['name']+"</a></div>");
            }
          }
        };
        $('.item').click(function() {
          var text = $(this).html();
          $sel.val(text);
        });

        $('#result').html('');
        document.querySelector('.area-result').textContent = '';
        //var url = '/' + baseUrl+'/search/getJsonResult?location_filter='+loc+'&search=' +input+"&searchsel="+searchCategory;
        var url = baseUrl+'/search/getJsonResult?location_filter='+loc+'&search=' +input+"&searchsel="+searchCategory;
        xhttp.open("POST", url, true);
        xhttp.send();
      }else {
        document.querySelector('.area-result').textContent = '';
      }
    };
  }

  //Location filter
  $loc_filter = document.querySelector("#location_search");
  if ($loc_filter) {
    $loc_filter.onkeyup = function() {
      var input = this.value; //get value is used in a form input
      var Max_length = 2;
      var searchCategory = document.getElementById("searchsel").value;
      if (input.length >= Max_length) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
          if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText); //convert the string value a object
           
            for (var i = 0; i <= response.length; i++) {
              var areaname = response[i]['areanameWithCity'];
              var re = new RegExp(input, 'gi');
              //what you are about to see is a work of genuis 
              if (areaname.match(re) !== null) {
                document.querySelector(".area-result").insertAdjacentHTML("beforeend", "<div class='item-list item-list-"+i+"' data_areaid='"+response[i]['areaid']+"'>"+areaname+"</div>");
                var $item_list = document.querySelector(".item-list-"+i);
                $item_list.onclick = function(){
                  $loc_filter.setAttribute('data-areaid', this.getAttribute("data_areaid"));
                  $loc_filter.value = this.textContent;
                };
              }

            }
            
            
            
          }
        };

        document.querySelector('.area-result').textContent = '';
        //var url = '/' + baseUrl+'/index/getLocationFilter?input='+input;
        var url = baseUrl+'/index/getLocationFilter?input='+input;
        xhttp.open("POST", url, true);
        xhttp.send();
      }else {
        document.querySelector('.area-result').textContent = '';
      }
    };
  }

  /*document.getElementById('location_search').onbur = function(){
    document.querySelector(".area-result").fadeOut(500);
  };*/
  $("#location_search").blur(function(){
    $(".area-result").fadeOut(500);
  }).focus(function() {
      $(".area-result").show();
  });
}());


  

 
  function edit(newCatName, id){ 
    //var url2 = '/'+baseUrl+"/"+action+"/"+id+"?catname="+newCatName; 
    var url2 = baseUrl+"/"+action+"/"+id+"?catname="+newCatName; 
    $.ajax({ 
      type: "POST", 
      url: url2, 
      processData: false, 
      contentType: false   // tell jQuery not to set contentType 
    }).done(function( msg ){ 
        //console.log(id+" "+catname+" inside done new: "+newCatName+" edit in url: "+url2); 
        var html = '<input type="text" class="form-control editCatName" id="name" name="name" placeholder="Name"  required data-error="Name is required" value="'+newCatName+'">'; 
        var html2 = '<td class="category_name">'+newCatName+'</td>'; 
        $('.categoryId'+id+' .category_name').replaceWith( html2 ); 
        //$('.editCatName').replaceWith( html ); 
        $('body').load(window.location.href,'body'); 
    }); 
  } 

  $('.updateCategory').on('click', function(e){ 
    // handle deletion here 
    e.preventDefault(); 
    var newCatName = $('.editCatName').val(); 
    var isSave = edit(newCatName, id); 
     
    //console.log(id+" "+catname+" Inside update btn newCat: "+newCatName); 
    $('#actionEditModal').modal('hide'); 
 
  }); 


  //post edit
  function postedit(newCatName, id){
    //var url2 = '/'+baseUrl+"/"+action+"/"+id+"?catname="+newCatName; 
    var url2 = baseUrl+"/"+action+"/"+id+"?catname="+newCatName; 

    var form = document.querySelector('#editPostform');
    var data = new FormData(form);
    for(var pair of data.entries()){
      //console.log(pair[0]+ ', '+ pair[1]); 
    }
    //exit();
    //var req = new XMLHttpRequest();
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
          //console.log(this.responseText);
          var response = JSON.parse(this.responseText); 

          //convert the string value a object
          var html = '<input type="text" class="form-control editCatName" id="name" name="name" placeholder="Name"  required data-error="Name is required" value="'+newCatName+'">'; 
          var html2 = '<td class="category_name">'+newCatName+'</td>';


          $('.categoryId'+id+' .category_name').replaceWith( html2 ); 
          //$('.editCatName').replaceWith( html ); 
          $('body').load(window.location.href,'body'); 
          /*
          for (var i = 0; i <= response.length; i++) {
            var producturl = '/' + baseUrl + "/product/" + response[i]['productid'];
            document.getElementById("results").insertAdjacentHTML("beforeend", "<div class='item'><a href='"+producturl+"'>"+response[i]['name']+"</a></div>");
          }
          */
        }
      };
      $('.item').click(function() {
        var text = $(this).html();
        $sel.val(text);
      });

      //$('#result').html('');
      //document.querySelector('.area-result').textContent = '';
      //var url = '/' + baseUrl+'/search/getJsonResult?location_filter='+loc+'&search=' +input+"&searchsel="+searchCategory;
      var url = baseUrl+"/admin/posts/edit/";
      xhttp.open("POST", url, true);
      xhttp.send(data);
    }

  $('.updatePost').on('click', function(e){
    // handle deletion here 
    e.preventDefault(); 
    var newCatName = $('#content').val(); 
    var title, content, post_status;
    title = $('.title').val();
    content = $('.content').val();
    post_status = $('.post_status').val();
    var isSave = postedit(newCatName, id); 
     
    //console.log(id+" "+catname+" Inside update btn newCat: "+newCatName); 
    $('#actionEditModal').modal('hide'); 
 
  });
 
 //Show product limit
  var $selectValue, url, limitVal;
  $('.selectpicker').on('change', function(){
    limitVal = $(this).find(":selected").val();
    var absoluteUrl = getAbsolutePath();
    //console.log(limitVal + ' is the seletected value '+window.location);
   // url = window.location+'?limit='+limitVal;
    $.ajax({
      method: 'POST',
      url: absoluteUrl+'/getProductLoadLimit',
      data: {productLimit: limitVal},
      processData: false,
      contentType: false 
    })
    .done(function(msg){
     // $('#products').html(productLimit);
      //console.log(limitVal + ' '+url +' whats happening, is it working');
      //$('body').load(window.location.href,'body');
      });
  });
//}();

//hamburger
$( document ).ready(function() {

  $( ".cross" ).hide();
  $( ".mobile-menu-nav" ).hide();
  $( ".hamburger, .text-hamburger" ).click(function() {
    $( ".mobile-menu-nav" ).toggle('slide', {
            direction: 'left'
        }, 1000, function(){
          $( ".hamburger" ).hide();
          $( ".cross" ).show();
      });
    /*$( ".mobile-menu-nav" ).slideToggle( "slow", function() {

      $( ".hamburger" ).hide();
      $( ".cross" ).show();
    });*/ 
  });

  $( ".cross" ).click(function() {
    $( ".mobile-menu-nav" ).toggle('slide', {
            direction: 'left'
        }, 1000, function(){
          $( ".cross" ).hide();
          $( ".hamburger" ).show();
        }
    /*$( ".mobile-menu-nav" ).slideToggle( "slow", function() {
    $( ".cross" ).hide();
    $( ".hamburger" ).show();
    }*/);
  });

  $('#tabs .tab-link').click(function(){
    var tab_id = $(this).attr('data-tab');
    $('#tabs .tab-link').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  });

});


$('#actionModal').on('show.bs.modal',function(e){
    var id = $(e.relatedTarget).attr('data-id');
    var action = $(e.relatedTarget).attr('data-action');
    $.ajax({
        type: "POST",
        //url: '/'+baseUrl+"/"+action+"/"+urlPath,
        url: baseUrl+"/"+action+"/"+urlPath,
        data: {productId:productId},
        processData: false,
        contentType: false   // tell jQuery not to set contentType
    })
    .done(function( msg ) {
        $(".productModalBody").html(msg);
        $("#check").on('click',function(){
            var productId = $(this).data('id');
            var qty = $("#qty").val();
            $.ajax({
                method: "POST",
                url: "cart/addProductToCart",
                data: {
                    productId: productId,
                    qty: qty
                }
            });
        });
    });
});
 $('.slider-range-price').each(function(){
            var min             = $(this).data('min');
            var max             = $(this).data('max');
            var unit            = $(this).data('unit');
            var value_min       = $(this).data('value-min');
            var value_max       = $(this).data('value-max');
            var label_result   = $(this).data('label-result');
            var t               = $(this);
            $( this ).slider({
              range: true,
              min: min,
              max: max,
              values: [ value_min, value_max ],
              slide: function( event, ui ) {
                var result = label_result +" "+ unit + ui.values[ 0 ] +' - '+ unit +ui.values[ 1 ];
                t.closest('.price_slider_wrapper').find('.amount-range-price').html(result);
                $(this).attr("data-min", ui.values[ 0 ]);
                $(this).attr("data-max", ui.values[ 1 ]);
                min = ui.values[ 0 ];
                max = ui.values[ 1 ];

                //Connecting the product listing to the filter - dozie
                var $products = $('.grid-products'), results;
                $products.each(function(){
                  var current = $(this);
                  current.hide();
                  productPrice = $(this).attr('data-discountprice');
                  discountedPrice = parseInt(productPrice);
                  if(max >= discountedPrice && min <= discountedPrice){
                      results = true;
                      $(this).show();
                      //console.log(max +" >= "+  discountedPrice);
                    }
                });
                if(!results){
                  $products.hide();
                }
              }
            });
              
            
        });

    $('#city').prepend('<option>'+'Select City'+'</option>');
    $('#new_city').append('<option value="">'+'Select City'+'</option>');
    $('#area').append('<option>'+'Select Area'+'</option>');

    $('#state').change(function(){
      var stateId = $("#state").val();
      //url: '/'+baseUrl+"/register/getCitiesByState/"+ stateId,
      var url = "/register/getCitiesByState/"+ stateId;
      //console.log(url);
      $.ajax({
        method: "POST",
        url: url,
        data: { stateId: stateId }
        })
       .done(function( msg ) {
       $('#city').empty();
       var city    =  document.getElementById("city");
         var cities = JSON.parse(msg);
        if(cities.length > 0){
          $('#city').prepend('<option>'+'Select City'+'</option>'); // Added by Jay 20012017
          for(var i=0; i< cities.length;i++){
            $('#city').append('<option value='+cities[i].cityid+'>'+cities[i].cityname+'</option>');
          }
        }else{
          $('#city').prepend('<option>'+'Select City'+'</option>');
        }
       });
    });

    $('#new_state').change(function(){
        var stateId = $("#new_state").val();
        //var url = urlFull+"/register/getCitiesByState/"+ stateId;
        var url = "/register/getCitiesByState/"+ stateId;
        //console.log(url);
        $.ajax({
          method: "POST",
          url: url,
          data: { stateId: stateId }
          })
         .done(function( msg ) {
         $('#new_city').empty();
          var cities = JSON.parse(msg);
          if(cities.length > 0){

            for(var i=0; i< cities.length;i++){
               $('#new_city').prepend('<option value='+cities[i].cityid+'>'+cities[i].cityname+'</option>');
          }
         }
         else{

              $('#new_city').prepend('<option>'+'Select City'+'</option>');
          }
       });
    });

     $('#city').change(function(){
        var cityId = $("#city").val();

        $.ajax({
          method: "POST",
          //url: '/'+baseUrl+"/register/getAreasByCity/"+ cityId,
          url: "/register/getAreasByCity/"+ cityId,
          data: { cityId: cityId }
          })
         .done(function( msg ) {
         $('#area').empty();
          var areas = JSON.parse(msg);
           if(areas.length > 0){
            $('#area').prepend('<option>'+'Select Area'+'</option>'); // Added by Jay 20012017
            for(var i=0; i< areas.length;i++){
               $('#area').append('<option value='+areas[i].areaid+'>'+areas[i].areaname+'</option>');
          }
         }
         else{
              $('#area').append('<option>'+'Select Area'+'</option>');
         }
       });
    });

    $('.btn-add-address').click(function(){
      addDeliveryAddress();
    });

    $('.btn-edit-address').click(function(){
      editDeliveryAddress();
    });

    $('#subscription').change(function(){
      if ($('#subscription').is(":checked")){
        subscribe();
      }
      else{
        unSubscribe();
      }
    });

  function addDeliveryAddress(){
       $('#addressForm').submit(function(e){
         e.preventDefault();
       
          var formData = new FormData(this);
          $.ajax({
              type: "POST",
              url: '/'+baseUrl+"/customer/addAddress",
              data: formData,
              processData: false, 
              contentType: false   // tell jQuery not to set contentType
          })
          .done(function( msg ) {
            var status =  JSON.parse(msg);
            if(status.status == 'ok'){
                var msg = 'Your Delivery address details has been added successfully!';
                $('.success').append(msg);
                 $('.success').show();
               $('#addressModal').modal('toggle');
               $("#addressForm").trigger("reset");
               getDeliveryAddress();
               return false;
            }
            else{
             var msg = 'Sorry your Delivery address details could not be added, Please try again!';
              $('.error').append(msg);
              $('.error').show();
             $("#addressForm").trigger("reset");
             return false;
            }
          });       
      });      
    }

    function editDeliveryAddress(){
       $('#editAddressForm').submit(function(e){
         e.preventDefault();
       
          var formData = new FormData(this);
          $.ajax({
              type: "POST",
              url: '/'+baseUrl+"/customer/editDeliveryAddress",
              data: formData,
              processData: false, 
              contentType: false   // tell jQuery not to set contentType
          })
          .done(function( msg ) {
            var status =  JSON.parse(msg);
            if(status.status == 'ok'){
                var msg = 'Your Delivery address details has been updated successfully!';
                $('.success').append(msg);
                $('.success').show();
               $('#editAddressModal').modal('toggle');
               $("#editAddressForm").trigger("reset");
               getDeliveryAddress();
               return false;
            }
            else{
              var msg = 'Sorry your Delivery address details could not be updated, Please try again!';
              $('.error').append(msg);
              $('.error').show();
              $('#editAddressModal').modal('toggle');
              $("#editAddressForm").trigger("reset");
               getDeliveryAddress();
              return false;
            }
          });       
      });      
    }


    function getDeliveryAddress(){
      var baseUrl = getBasePath();
      var addressState;
      var addressCity ;
      $.ajax({
              type: "GET",
              url: '/'+baseUrl+"/customer/getDeliveryAddress",
              processData: false,
              contentType: false   // tell jQuery not to set contentType
          })
          .done(function( msg ) {
           // //console.log(msg);
                var status = JSON.parse(msg);
                if(status.status == 'ok'){
                   $("#btn-edit-address").show();
                   $("#btn-new-address").hide();
                   $('.address').text('');
                    var addressData = status.deliveryAddress;
                    var data = '<div class="tabShipping">'+
                                 '<div class="row">'+
                                   '<div class="col-md-12">'+
                                    '<h4>'+ addressData.firstname + ' ' + addressData.lastname +'</h4>'+
                                    '<address>'+
                                    '<br>'+
                                      addressData.address +
                                    '<br>'+
                                      addressData.city.cityname +','+  addressData.state.state_name+                                  
                                    '<br>'+
                                      addressData.phone+
                                    '</address>'+
                                  '</div>'+
                                '</div>'; 
                  $('.address').append(data); 

                  $('#new_firstname').val(addressData.firstname);
                  $('#new_lastname').val(addressData.lastname);
                  $('#new_phone').val(addressData.phone);
                  $('#new_address').val(addressData.address);
                  return false;
                }
                else{
                  var msg = "No Shipping Address Yet";
                  $("#btn-new-address").show();
                  var data = '<div class="tabShipping">'+
                                 '<div class="row">'+
                                 '<div class="col-md-12">'+
                                    msg +
                                 '</div>'+
                                '</div>'+
                             '</div>';
                 $('.address').append(data); 
                 return false;
                }
            });      
       }

      function getSubscriptionStatus(){
          var url = hostUrl()+"/subscription/checkSubscriptionStatus";
          //console.log(url);
          $.ajax({
              type: "GET",
              url: url,
              processData: false, 
              contentType: false   // tell jQuery not to set contentType
          })
          .done(function( msg ) {
            //console.log(msg);
            var status =  JSON.parse(msg);
            if(status.status == 'ok'){
                    $('.sub_message').empty();
                     var msg = 'unSubscribe from recieving newsletters and updates';
                     $('.sub_message').append(msg);
                         $('#subscription').prop("checked", true );
                      return false;
                    }
                    else{
                       
                       $('.sub_message').empty();
                      var msg = 'Subscribe for newsletters and updates';
                      $('.sub_message').append(msg);
                      $('#subscription').prop("checked", false );
                    }
                });      
      }

  function subscribe(){
    var baseUrl = getBasePath();
          $.ajax({
                  type: "GET",
                  url: '/'+baseUrl+"/subscription/addSubscription",
                  processData: false, 
                  contentType: false   // tell jQuery not to set contentType
              })
              .done(function( msg ) {
                    var status =  JSON.parse(msg);
                    if(status.status == 'ok'){
                        $('.success').empty();
                        $('.error').empty();
                         var msg = ' You have successfully subscribed to chowberry newsletters and updates';
                          $('.success').append(msg);
                          $('.success').show();
                        getSubscriptionStatus();

                      return false;
                    }
                    else{
                        $('.success').empty();
                        $('.error').empty();
                      var msg = 'Sorry,you were not subscribed. Please try again!';
                       $('.error').append(msg);
                       $('.error').show();
                       getSubscriptionStatus();
                    }
                });      
   }


  function unSubscribe(){
    var baseUrl = getBasePath();
    $.ajax({
      type: "GET",
      url: '/'+baseUrl+"/subscription/unSubscribe",
      processData: false, 
      contentType: false   // tell jQuery not to set contentType
    })
    .done(function( msg ) {
      var status =  JSON.parse(msg);
      if(status.status == 'ok'){  
        $('.success').empty();
        $('.error').empty(); 
         var msg = ' You have successfully unSubscribed to chowberry newsletters and updates';
          $('.success').append(msg);
          $('.success').show();
        getSubscriptionStatus();
          return false;
      }
      else{
        $('.success').empty();
        $('.error').empty();
        var msg = 'Sorry,unSubscription not successfull. Please try again!';
        $('.error').append(msg);
        $('.error').show();
        getSubscriptionStatus();
        }
    });      
  }

  function initPopup(){
     var baseUrl = getBasePath();
          $.ajax({
                  type: "GET",
                  url: '/'+baseUrl+"/subscription/checkSubscriptionStatus",
                  processData: false, 
                  contentType: false   // tell jQuery not to set contentType
              })
              .done(function( msg ) {
                    var status =  JSON.parse(msg);
                    if(status.status == 'ok'){

                      return false;
                    }
                    else{
                       

                       $.magnificPopup.open({
                        items: {
                          src: '<div class="white-popup">'+
                                 '<div class="kt-popup-newsletter">'+
                                    '<div class="popup-title">'+
                                     '<img src="images/logo.png" alt="">'+
                                     '<p class="notice">Enter your email and be the'+  
                                      '  First to know about latest products and updates'+
                                    '</p>'+
                                  '</div>'+
                                  '<form id="form-subscribe" class="form-subscribe" method="post" action="customer/subscribe" data-toggle="validator">'+
                                    '<input class="input form-control" id="sub_email" name="sub_email" placeholder="Your email here" type="email" required />'+
                                     '<div class="group-button">'+
                                        '<button class="button" id="cancelSub">NO THANKS!</button>'+
                                        '<button class="button subscribe" id="sub"> Subscribe</button>'+
                                     '</div>'+ 
                                  '</form>'+
                                  '</div>'+
                                  '</div>',  //can be a HTML string, jQuery object, or CSS selector
                          type: 'inline'
                        }
                      });
                        $('#cancelSub').click(function(e){
                          e.preventDefault();
                          $.magnificPopup.close();
                        });
                         $('#sub').click(function(){
                           $("#form-subscribe").submit(function(e){
                             e.preventDefault();
                               var formData = new FormData(this);
                               $.ajax({
                                type: "POST",
                                url: '/'+baseUrl+"/subscription/addSubscription",
                                data: formData,
                                processData: false, 
                                contentType: false   // tell jQuery not to set contentType
                            })
                            .done(function( msg ) {
                                  var status =  JSON.parse(msg);
                                  if(status.status == 'ok'){
                               
                                     $.magnificPopup.close();
                                  }
                                  else{ 

                                  }
                            });
                       
                           });
                        });
                        return false;
                    }

                });      
   }  

  $(document).ready(function () {
    $("#example1").DataTable();
  });


    // Add event listener for opening and closing details
    $('#example1 tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    });
     
  $('#expiry-datepicker').datepicker({

      format: 'yyyy-m-d'
  });

  $('#expiry-datepicker').change(function(){
    if( $('#setDiscount').is(":unchecked")){
       var expiryDate =  $('#expiry:-datepicker').val();
       var expires_in =  expiresIn(expiryDate);
       var discount = getDiscountRate(expires_in);    
       $("#discount").val(discount);

       var marketPrice = $('#productPrice').val();
       if (marketPrice) {
          var specialPrice =getChowberryPrice(marketPrice,discount);
          $("#chowberryPrice").val(specialPrice);
       }
     }
  });

  $('#setDiscount').change(function(){
    if($(this).is(":checked")){
        $('#discount').attr("disabled",false);
        $('#chowberryPrice').attr("disabled",false);
      }
      else{
        $('#discount').attr("disabled",true);
         $('#chowberryPrice').attr("disabled",true);
      }
   });

  $("#discount").change(function(){
     $("#discount").attr('readonly', true);
     var discount =  $("#discount").val();
     var marketPrice =  $('#productPrice').val();
      var specialPrice =getChowberryPrice(marketPrice,discount);
     $("#chowberryPrice").val(specialPrice);
     $("#discount").attr('readonly', false);
  });

  $('#productPrice').keyup(function(){
    if( $('#setDiscount').is(":unchecked")){
      var marketPrice =  $('#productPrice').val();
      $("#discount").attr('readonly', true);
      var discount =  $("#discount").val();
       var specialPrice =getChowberryPrice(marketPrice,discount);
       $("#chowberryPrice").val(specialPrice);
       $("#discount").attr('readonly', false);
    }
  });

  $('#chowberryPrice').keyup(function(){
     var chowberryPrice =  $('#chowberryPrice').val();
     var marketPrice = $('#productPrice').val();
     if(marketPrice == ""){
       $("#discount").val(0);
     }
     else{
       var rate = (1 - (chowberryPrice/marketPrice)) * 100 ;
       $("#discount").val(rate);
     }
  });

$(document).ready(function () {
  $("#productImage").fileinput({
      overwriteInitial: true,
      maxFileSize: 1500,
      showClose: false,
      showCaption: false,
      browseOnZoneClick: true,
      browseLabel: '',
      removeLabel: '',
      browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
      removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
      removeTitle: 'Cancel or reset changes',
      elErrorContainer: '#kv-avatar-errors-1',
      msgErrorClass: 'alert alert-block alert-danger',
      defaultPreviewContent: '<img src="'+ urlFull +'/images/box_food.png" alt="Your Product Image" style="width:150px;height: 150px;">',
      layoutTemplates: {main2: '{preview} ' + ' {remove} {browse}'},
      allowedFileExtensions: ["jpg", "png", "gif"]
  });
});

  


   function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);

    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
   }

  function getBasePath() {
      var loc = window.location;
      var basePath = loc.pathname.split('/')[1]+'/'+customBasePath;
      if(!customBasePath.trim()){
        basePath = loc.pathname.split('/')[1];
      }
      return basePath;
  } 

  function getHostBaseUrl(){
    var loc  = window.location;
    var host = loc.origin;
    var basePath = loc.pathname.split('/')[1]+'/'+customBasePath;  
    if(!customBasePath.trim()){
        basePath = loc.pathname.split('/')[1];
      } 
    var full = host+'/'+basePath;
    return full;
  }

  //web app url | domain
  function hostUrl(){
  var loc  = window.location;
   var host = loc.origin;
   return host;
  }


   function expiresIn(){
    var date  = $("input#expiry-datepicker").val();
    var expiry_date = moment(date,["YYYY-M-D"]);
    var today = moment().format('YYYY-M-D');
    var expires_in = expiry_date.diff(today,"days");

    return expires_in;
   }


  function AutomateDiscount(){

  }



function getDiscountRate(expiry_date){
   switch (true) {
          case (expiry_date >= 90):
              discount = "30" ;
            break;
          case (expiry_date >= 60 && expiry_date < 90):
              discount = "40" ;
            break;
          case (expiry_date >= 45 && expiry_date < 60):
              discount = "50" ;
            break;
          case (expiry_date >= 30 && expiry_date < 45):
              discount = "60" ;
            break;
          case (expiry_date > 0 && expiry_date < 30):
              discount = "70" ;
            break;
          case (expiry_date <= 0):
              discount = "100" ;
            break;
          default:
             discount = "100" ;
            break;
        }

      return discount;
}

function getChowberryPrice(marketPrice,discount){
  if(discount == 0){
    var chowberryPrice = marketPrice;
   }
   else{
     var discountPrice = (discount/100) * marketPrice;
     var chowberryPrice = marketPrice - discountPrice;
   }  
   return chowberryPrice;
}
});
//};

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

console.log("isLocalhost: "+isLocalhost);

if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('./sw.js').then(function(registration) {
    console.log('Service worker registration succeeded:', registration);
  }).catch(function(error) {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}