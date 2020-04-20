jQuery(document).ready(function($){
      $('#file-input').on('change', function(){ //on file input change
          if (window.File && window.FileReader && window.FileList && window.Blob) //check File API supported browser
          {
              $('#thumb-output').html(''); //clear html of output element
              var data = $(this)[0].files; //this file data
              
              $.each(data, function(index, file){ //loop though each file
                  if(/(\.|\/)(gif|jpe?g|png)$/i.test(file.type)){ //check supported file type
                      var fRead = new FileReader(); //new filereader
                      fRead.onload = (function(file){ //trigger function on successful read
                      return function(e) {
                          var img = $('<img/>').addClass('thumb').attr('src', e.target.result); //create image element 
                          $('#thumb-output').append(img); //append image to output element
                      };
                      })(file);
                      fRead.readAsDataURL(file); //URL representing the file's data.
                  }
              });
              
          }else{
              alert("Your browser doesn't support File API!"); //if File API is absent
          }
      });



      //jQuery-ui for navigating 
      $( ".tabbable" ).tabs();
  });

  //if(var stringLength == )
  //maxLength validation for retailer product form product name
  $('#productName').on('change', function(){
    var stringLength = this.value.length;
    if (stringLength >= 10) {
      console.log("Error: Maximum characters are 10");
         document.querySelector('.help-block').innerText = "Maximum characters are 35.";
    } else {
      console.log("You're good to go");
        document.querySelector('.help-block').innerText = ""
    }
  });

 if (window.location.hash && window.location.hash == '#_=_') {
     if (window.history && history.pushState) {
         window.history.pushState("", document.title, window.location.pathname);
     } else {
         // Prevent scrolling by storing the page's current scroll offset
         var scroll = {
             top: document.body.scrollTop,
             left: document.body.scrollLeft
         };
         window.location.hash = '';
         // Restore the scroll offset, should be flicker free
         document.body.scrollTop = scroll.top;
         document.body.scrollLeft = scroll.left;
     }
 }

       /*Custom searh by dozie
    */
function searchProduct() {
  // Declare variables
  var input, filter, products, h4, div, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  products = document.querySelector(".products");
  div = products.getElementsByTagName("div");
  for (i = 0; i < div.length; i++) {
    h4 = div[i].getElementsByTagName("h4")[0];
    //console.log("Is it working inside for td:"+td);
    if (h4) {
      if (h4.innerHTML.toUpperCase().indexOf(filter) > -1) {
        div[i].style.display = "";
      } else {
        div[i].style.display = "none";
      }
    }
  }
}


$(document).ready(function() {
  var $products = $('.grid-products'),
      $filters = $("#filters input[type='checkbox']"),
      product_filter = new ProductFilterLevel1($products, $filters);
  product_filter.init();
});

function ProductFilterLevel1(products, filters) {
  var _this = this;

  this.init = function() {
    this.products = products;
    this.filters = filters;
    this.bindEvents();
  };

  this.bindEvents = function() {
    this.filters.click(this.filterGridProducts);
    $('#none').click(this.removeAllFilters);
  };

  this.filterGridProducts = function() {
    _this.products.hide();
    var selectedFilters = _this.filters.filter(':checked');
    if (selectedFilters.length) {
      var selectedFiltersValues = [];
      selectedFilters.each(function() {
        var currentFilter = $(this);
        selectedFiltersValues.push("[data-" + currentFilter.attr('name') + "='" + currentFilter.val() + "']");
      });
      _this.products.filter(selectedFiltersValues.join(',')).show();
    } else {
      _this.products.show();
    }
  };

  this.removeAllFilters = function() {
    _this.filters.prop('checked', false);
    _this.products.show();
  }
}

//Filter for Price Range and also Expiration day
$(document).ready(function() {
  var $products = $('.grid-products'),
      proCat,productExipiry,
      $filters = $(".filters .expiration input[type='radio']"),
      $productExpirationDaysRemaining = $('.grid-products').attr('data-expiry');

      //Price Range
    var priceFilterTrigger = $(".filters .price_slider_wrapper .slider-range-price");
      $filters.on( "click", function() {
        var filterMax = $( "input:checked" ).attr('max'),
            filterMin = $( "input:checked" ).attr('min');

            var results = false;
        $products.each(function(){
            $(this).hide();
            productExp = $(this).attr('data-expiry');
            productExipiry = parseInt(productExp);
            if(filterMax >= productExipiry && filterMin <= productExipiry){
              results = true;
             // console.log(proCat);
             $(this).show();
              console.log(filterMax +" >= "+  productExipiry);
            }
          });
        if(!results){
              //$products.hide();
          console.log(filterMax +" <= "+  productExipiry);
        }
      });
});
