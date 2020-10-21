
function writeLeftBar(selectedBar){
	var inputHandler = "";
//	if(objId === undefined) {
//		inputHandler = "";
//	}else{
//		inputHandler = "value=\""+objId+"\"";
//	}
    var selA1 = "";
    var selA2 = "";
    var selA3 = "";
    var selA4 = "";
    var nameHandler = "";
    var placeHolder = "Search...";
    var activeValue = " class=\"active\"";

    if(selectedBar == "selA1"){
    	selA1 = activeValue;
    	nameHandler = "handleEnter";
    	//placeHolder = "Search...";
    }else if(selectedBar == "selA2"){
        selA2 = activeValue;
        nameHandler = "handleEnter2";
        placeHolder = "Search id...";
    }else if(selectedBar == "navigator"){
        selA1 = activeValue;
        nameHandler = "handleNavigator";
    }else if(selectedBar == "history"){
        selA2 = activeValue;
        nameHandler = "handleHistory";
        placeHolder = "Search id...";
    }else if(selectedBar == "selA3"){
        selA3 = activeValue;
    }else if(selectedBar == "selA4"){
        selA4 = activeValue;
    }
    var selB0 = "";
    var selB1 = "";
    var selB2 = "";
    var selB3 = "";

    if(selectedBar == "navigator_OLDPOSIZ"){
    	selB0 = activeValue;
    	nameHandler = "handleNavigator";
    	//placeHolder = "Search...";
    }else if(selectedBar == "selB1"){
    	selB1 = activeValue;
    	nameHandler ="handleEnterNav1";
    }else if(selectedBar == "selB2"){
        selB2 = activeValue;
        nameHandler ="handleEnterNav2";
    }else if(selectedBar == "selB3"){
        selB3 = activeValue;
        nameHandler ="handleEnterNav3";
    }

    var selL1 = "";
    if(selectedBar == "selL1"){
        selL1 = activeValue;
        nameHandler ="handleEnterLog1";
    }

    //$('#sidebar1').append("<li" + selA1 + "><a href=\"dashboard.html\">XPDM Load</a></li>");
    //$('#sidebar1').append("<li" + selA2 + "><a href=\"dashboard2.html\">MDI List</a></li>");
    //$('#sidebar1').append("<li" + selA3 + "><a href=\"#\">Analytics</a></li>");
    //$('#sidebar1').append("<li" + selA4 + "><a href=\"#\">Export</a></li>");
    $('#sidebar1').append("<li" + selA1 + "><a href=\"navigator.html\">Navigator</a></li>");
    $('#sidebar1').append("<li" + selA2 + "><a href=\"history.html\">History</a></li>");

    //$('#sidebar2').append("<li" + selB0 + "><a href=\"navigator.html\">Navigator</a></li>");
    $('#sidebar2').append("<li" + selB1 + "><a href=\"nav1.html\">Find Object <text style=\"float:right\" id=\"resultCounter\"></text></a></li>");
    $('#sidebar2').append("<li" + selB2 + "><a href=\"nav2.html\">XDM Load</a></li>");
    $('#sidebar2').append("<li" + selB3 + "><a href=\"nav3.html\">XDM DOC</a></li>");

    $('#sidebar3').append("<li" + selL1 + "><a href=\"log1.html\">LOG</a></li>");

    if((selectedBar != "navigator") && (selectedBar != "history")){
    	$('#manageHandler').append("<input type=\"text\" id=\"param\" class=\"form-control\" "+inputHandler+" placeholder=\""+placeHolder
    	+"\"  onkeypress=\""+nameHandler+"(this, event)\">");
    }
}


function handleNavigator(inField, e) {
   	var charCode;
	//Get key code (support for all browsers)
	if(e && e.which){
	    charCode = e.which;
	}else if(window.event){
	    e = window.event;
	    charCode = e.keyCode;
	}

	if(charCode == 13) {
	   if (e.preventDefault) {
	       e.preventDefault();
	   } else {
	       e.returnValue = false;
	   }
	   //Call submit function
	   loadNavigator(inField.value);
	}
}

function loadNavigator(param, paramType) {
	$.ajax({
		type: "GET",
		url: apiEnoclientURL + "navigator",
		dataType : 'json',
		cache: false,
		data: "queryname=" + param + "&querytype=" + paramType,
		success: function(risposta){
	  //alert("Chiamata Navigator!!!");
	  printJsonPresenter(risposta);
		},
		error: function(){
			alert("Chiamata fallita!!!");
		}
	});
}


function handleHistory(inField, e) {
   	var charCode;
	//Get key code (support for all browsers)
	if(e && e.which){
	    charCode = e.which;
	}else if(window.event){
	    e = window.event;
	    charCode = e.keyCode;
	}

	if(charCode == 13) {
	   if (e.preventDefault) {
	       e.preventDefault();
	   } else {
	       e.returnValue = false;
	   }
	   //Call submit function
	   loadHistory(inField.value);
	}
}

function loadHistory(param, paramType) {
	$.ajax({
		type: "GET",
		url: apiEnoclientURL + "history",
		dataType : 'json',
		cache: false,
		data: "queryname=" + param + "&querytype=" + paramType,
		success: function(risposta){
	  //alert("Chiamata History!!!");
	  printJsonPresenter(risposta);
		},
		error: function(){
			alert("Chiamata fallita!!!");
		}
	});
}

function printJsonPresenter(data){
	// ciclo l'array
	$('#alertmsg').hide();
	$("#alerttxt").empty();
	//var jsonString = JSON.stringify(data);
	//alert(jsonString);
	$('#contentNavigator').jsonPresenter({
		json: data, // JSON objects here
	})
	 //  $('#contentNavigator').append(jsonString);
}
//-----------------------
