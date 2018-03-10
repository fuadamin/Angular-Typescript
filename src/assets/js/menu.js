$(document).ready(function(){

  //----------------INITIALIZE---------------------

  $(".baseLayers").addClass("hide_layers"); // remove base layers
  $(".dropdown-menu").show();     
  $(".informationBlock").hide();
  
  //----------------oooooooooo---------------------

  //------------SIDE BAR DIVS TOGGLE---------------

    $(".sidebartoggle").on("click", function() {
        $(".informationBlock").hide();
        $("#dropdown-menu").toggle(); 
    });

    $("#item01").click(function(){
        $(".informationBlock").hide();
        $("#informationBlock").toggle();
    });

    $("#item02").click(function(){
        $(".informationBlock").hide();
        $("#geological").toggle();
    });

    $("#item03").click(function(){
        $(".informationBlock").hide();
        $("#informationBlock").toggle();
        $("#geological").hide();
        $("#moreInfo").hide();
        $("#legend").hide();
        $("#impressum").hide();
    });

    $("#item02").click(function(){
        $("#geological").toggle();
        $("#informationBlock").hide();
        $("#moreInfo").hide();
        $("#legend").hide();
        $("#impressum").hide();
    });

    $("#item03").click(function(){
        $("#informationBlock").hide();
        $("#geological").hide();
        $("#legend").hide();
        $("#impressum").hide(); 
        $("#moreInfo").toggle();
    });

    $("#item04").click(function(){
        $("#informationBlock").hide();
        $("#moreInfo").hide();
        $("#geological").hide();
        $("#impressum").hide();
        $("#legend").toggle();
    });

    $("#item05").click(function(){
        $("#informationBlock").hide();
        $("#moreInfo").hide();
        $("#legend").hide();
        $("#geological").hide();
        $("#impressum").toggle();
    });

  // Changes color on active element
  $('.dropdown-menu').on('click','li', function(){
   $(this).addClass('active').siblings().removeClass('active');
  });

//-------------ooooooooooooooooooooooo----------------

//---------------BASE MAPS SELECTORS------------------
  	   
	  $(".layersToggle").click(function(){
	    $(".baseLayers").removeClass("hide_layers");
      $(".baseLayers").addClass("hide_layers");
	    $(".layersToggle").removeClass("show_layers");
	  });

    $(".layersToggle").hover(function(){
	    $(".baseLayers").removeClass("hide_layers");
	    $(".layersToggle").removeClass("show_layers");
	  });

  $(".baseLayers").mouseleave(function(){
	    $(".baseLayers").addClass("hide_layers");
	  });

//-------------ooooooooooooooooooooooo----------------

});