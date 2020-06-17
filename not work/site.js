$(document).ready(function() {
  $("#login").click(function(){
    var usr = $("#username").val();
    var pwd = $("#password").val();
     var token = usr + ':' + pwd;  
     var hash = $.base64.encode(token);  
     var base_auth = "Basic " + hash;
     //enoviaLogin(base_auth);
  });
 
  $('#loginForm').submit(function() {
     //preventDefault
     return false;
  });
});

var apiLoaderURL = 'http://localhost:9770/datamigration/db/rest/loader/v1/';
var apiEnoclientURL = 'http://localhost:9770/datamigration/db/rest/enoclient/v1/';
var findLimit = 100;

function aboutEnoviaClient() {
	alert(" Enovia Client 1.0\n Plm-Systems s.r.l. \n All rights reserved");
}



function enoviaLogin(base_auth) {
  $.ajax({
	url: "rest/API/GC",
	data:"param=login",
	beforeSend : function(xhr) {
	    // set header
	    xhr.setRequestHeader("Authorization", base_auth);
    	},
	success: function(data) {
		$.cookie('enoviaSession', data);
	        //alert("cooki-->"+$.cookie('enoviaSession'));
	        window.location.href = "dashboard.html";
	},
	error: function(){
	       alert("The user name or password is incorrect!");
	} 
  });     
 
}

function enoviaClientLogout() {
	$.removeCookie("enoviaSession");
	window.location.href = "login.html";
}

function clearTable() {
	//alert("cooki-->"+$.cookie('enoviaSession'));
	window.location.href = window.location.href;
}

function close(){
   $('#alertmsg').hide();
   $("#alerttxt").empty();
}

function loadData2() {
  var param=$("#param").val();
  var authSession=$.cookie('enoviaSession');
  $.ajax({
	type: "GET",
    url: "http://localhost:9770/datamigration/db/rest/loader/v1/xdmmdilist",
    data:'objectId=42894.59165.3439.59123',
//    data:'objectId='+param,
    dataType : 'application/json',
    beforeSend : function(xhr) {
      // set header
      xhr.setRequestHeader("Authorization", authSession);
   },
    success: function(data) {
      printData(data);
    },
    error: function(){
      alert("Chiamata fallita!!");
    } 
  });
}  // loadData2()

// ------------------------------------- File  -------------------------------------

function downloadFile() {
  $.ajax({
    type: "GET",
	//url: "https://webhelpbot.com/api/?uid=614745834",
    //url: "http://localhost:9770/datamigration/db/rest/loader/v1/xpdmload?limit=10",
	url: apiEnoclientURL + "downloadfile",
    dataType : 'json',
  success: function(risposta){
	  alert("Chiamata OK!!!");
 },
  error: function(){
    alert("Chiamata fallita!!a!");
  }
 });
}

// ------------------------------------- leftbar1 xpdmLoad -------------------------------------
function handleEnter(inField, e) {
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
	   //alert(inField.id+'--->'+inField.value);
	   loadData();
	}
}

function loadData() {
  $.ajax({
    type: "GET",
	//url: "https://webhelpbot.com/api/?uid=614745834",
    //url: "http://localhost:9770/datamigration/db/rest/loader/v1/xpdmload?limit=10",
	url: apiLoaderURL + "xpdmload?limit=10",
    dataType : 'json',
    cache: false,
  success: function(risposta){
	  //alert("Chiamata OK!!!");
	  printData(risposta);
 },
  error: function(){
    alert("Chiamata fallita!!!");
  }
 });
} 

function printData(data){
   // ciclo l'array
   $('#matrixRes tbody > tr').remove();
      //alert("debuggo:" +data.xpdmLoadList.length+ "<-- ");
   for(i=0; i<data.xpdmLoadList.length; i++){
	   var ele = data.xpdmLoadList[i];
       var  content  = '<tr>';
       content += '<td>' + data.xpdmLoadList[i].name + '</td>';
       content +=  '<td>' + data.xpdmLoadList[i].objectId + '</td>';
       content +=  '<td>' + ele.priority + '</td>';
       content +=  '<td>' +  ele.type + '</td>';
       content +=  '<td>AA</td>';
       content +=  '</tr>';
       $('#matrixRes').append(content);    
   }
} 

// ------------------------------------- leftbar2 xdmmdilist -------------------------------------

function handleEnter2(inField, e) {
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
	   //alert(inField.id+'--->'+inField.value);
	   loadDataMDIList(inField.value);
	}
}

function loadDataMDIList(param) {
  $.ajax({
    type: "GET",
    //url: "http://localhost:9770/datamigration/db/rest/loader/v1/xdmmdilist",
	url: apiLoaderURL + "xdmmdilist",
    data:'objectId='+param,
    //data:'objectId=42894.59165.3439.59123',
    dataType : 'json',
    cache: false,
  success: function(risposta){
	  //alert("Chiamata OK!!!");
	  printDataMDIList(risposta);
 },
  error: function(){
    alert("Chiamata fallita!!!");
  }
 });
} 


function printDataMDIList(data){
   // ciclo l'array
   $('#matrixRes tbody > tr').remove();
   //alert("debuggo:" +data.xpdmMdiList.length+ "<-- ");
   for(i=0; i<data.xpdmMdiList.length; i++){
	 var ele = data.xpdmMdiList[i].mdi.Items[0];
     var  content  = '<tr>';
     content +=  '<td>' + ele.DocumentName + '</td>';
     content +=  '<td>' + ele.IsXdm + '</td>';
     content +=  '<td>' + ele.HasReadPermission + '</td>';
     content +=  '<td>AA</td>';
     content +=  '<td>AA</td>';
     content +=  '</tr>';
     $('#matrixRes').append(content);    
   }
} 

// ------------------------------------- Navigator menu -------------------------------------
function handleEnterNav1(inField, e) {
   	var charCode;
   	var selType = document.getElementById("typeFormControlSelect").value;
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
	   //alert(inField.id+'--->'+inField.value);
       //alert(manageHandler.typeFormControlSelect.options[1].value);
       //alert(selType);
	   loadNav1(inField.value, selType);
	}
}


function loadNav1(param, paramType) {
      $.ajax({
        type: "GET",
        url: apiEnoclientURL + "findobj",
        dataType : 'json',
        cache: false,
        data: "queryname=" + param + "&querytype=" + paramType,
      success: function(risposta){
          //alert("Chiamata OK!!!");
          printNav1(risposta);
     },
      error: function(){
        alert("Chiamata fallita!!!");
      }
     });
} 


function printNav1(data){
   if ( $.fn.dataTable.isDataTable('#matrixRes') ) {
        $('#matrixRes').off('click');
        $('#matrixRes').DataTable().destroy();
   }
   $('#alertmsg').hide();
   $("#alerttxt").empty();
   $('#matrixRes tbody > tr').remove();
   for(i=0; i<data.length; i++){
	   var ele = data[i];
       var  content  = '<tr>';
       content += '<td class="details-control"></td>';
       content +=  '<td>' +  ele.type + '</td>';
       //content +=  '<td>' +  ele.name + '</td>';
       content += '<td> <a href="navigator.html?queryname='+ele.id+'" target="_blank">' +  ele.name + '</a></td>';
       content +=  '<td>' +  ele.revision + '</td>';
       content +=  '<td>' +  ele.current + '</td>';
       content +=  '<td>' +  ele.XDM_Priority + '</td>'; 
       content +=  '<td>' +  ele.id + '</td>';
        //content += '<td> <a href="navigator.html?queryname='+ele.id+'" target="_blank">' +  ele.id + '</a></td>';
        // content += '<td> <a href="' + apiEnoclientURL + 'navigator?queryname='+ele.id+'" target="_blank">' +  ele.id + '</a></td>';  
       content +=  '<td>' +  ele.PLM_Current_Action + '</td>';
       content +=  '<td>' +  ele.PLM_IsOldRevision + '</td>';
       content +=  '<td>' +  ele.PLM_DocumentType + '</td>';
       content +=  '<td>' +  ele.XPDMLOAD_Type + '</td>';
       content +=  '<td>' +  ele.description + '</td>'; 
       content +=  '</tr>';
       $('#matrixRes').append(content);
   }

    if ( $.fn.dataTable.isDataTable('#matrixRes') ) {
        // never pass here
        alert("check site.js!");
    }else {
        table = $('#matrixRes').DataTable( {
               "scrollCollapse": true,
               "paging": false,
               //"scrollX": true,
               //"scrollY": "550px",
               "paging": false,
               "info": false,
               "autoWidth": true,
               "destroy": true,
        	   "dom": "Bfrtip",
        	   "buttons": [
        			         "copy", "csv", "excel", "pdf", "print"
                			],
               "columnDefs": [
                   { className: "dt-center", targets: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
                   {
                       "targets": [ 4 ],
                       "visible": true,
                       "searchable": false
                   },
                   {
                       "targets": [ 6 ],
                       "visible": false
                   }
               ]
        } );

        // Set Toggle Columns
        $(".toggle-vis").remove();
	    var headers = table.columns().header();
	    var number = table.columns().data().length;
	    var sepa = " - ";
	    for(var i = 0; i < number; i++){
	        if(i+1 === number){
	            sepa = "";
	        }
		    var row = '<a class="toggle-vis" data-column="'+i+'">'+headers[i].innerText+ sepa +'</a> ';
		    $('#toggle-columns').append(row);
	    }
        // End Set Toggle Columns

        // Add event listener for opening and closing details
        $('#matrixRes').on('click', 'td.details-control', function () {
              var tr = $(this).closest('tr');
              var row = table.row(tr);
             // alert(tr+"apri!"+row);
              event.preventDefault();
              if (row.child.isShown()) {
                  // This row is already open - close it
                  row.child.hide();
                  tr.removeClass('shown');
                  event.preventDefault();
              } else {
                  // Open this row
                    row.child( format(row.data()) ).show();
                  tr.addClass('shown');
              }
        });

        $('a.toggle-vis').on( 'click', function (e) {
            e.preventDefault();
            // Get the column API object
            var column = table.column( $(this).attr('data-column') );
            // Toggle the visibility
            column.visible( ! column.visible() );
        } );
    }


    if(data.length == 0){
        $('#alerttxt').append("No item found!");
        $('#alertmsg').show();
    }else if(data.length >= 100){
        $('#alerttxt').append("Query limit has been reached!");
        $('#alertmsg').show();
    }
} 

function format (dataSource) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>ID: </td>'+
            '<td>'+dataSource[6]+'</td>'+
        '</tr>'+
    '</table>';
}
// ------------------------------------- nav 2 -------------------------------------

function handleEnterNav2(inField, e) {
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
	   //alert(inField.id+'--->'+inField.value);
	   loadNav2(inField.value);
	}
}


function loadNav2(param) {
  $.ajax({
    type: "GET",
	url: apiEnoclientURL + "xpdmloadref",
    dataType : 'json',
    cache: false,
	data:'queryname='+param,
  success: function(risposta){
	  //alert("Chiamata OK!!!");
	  printNav2(risposta);
 },
  error: function(){
    alert("Chiamata fallita!!!");
  }
 });
}

/*
 * Inserisce i dati nella tabella HTML
 */
function printNav2_NEW(data){
   if ( $.fn.dataTable.isDataTable('#matrixRes') ) {
	  //$('#matrixRes').DataTable().destroy();
   }
   $('#matrixRes tbody > tr').remove();
   for(i=0; i<data.length; i++){
	   var ele = data[i];
       var  content  = '<tr>';
       content +=  '<td>' +  ele.type + '</td>';
       content +=  '<td>' +  ele.name + '</td>';
       content +=  '<td>' +  ele.current + '</td>';
       //content +=  '<td>' +  ele.id + '</td>';
       content += '<td> <a href="navigator.html?queryname='+ele.id+'" target="_blank">' +  ele.id + '</a></td>';

       content +=  '<td>' +  ele.XPDMLOAD_Type + '</td>';
       content +=  '<td>' +  ele.XDM_Priority + '</td>';
       content +=  '<td>' +  ele.PLM_IsAssembly + '</td>';
       content +=  '<td>' +  ele.PLM_IsOldRevision + '</td>';
       content +=  '<td>' +  ele.PLM_DocumentType + '</td>';
       //content +=  '<td>' +  ele.PLM_Current_Action + '</td>';
       content +=  '<td>' +  ele.XDM_FilePath + '</td>';
       content +=  '<td>' +  ele.XDM_FileType + '</td>';
       content +=  '</tr>';
       $('#matrixRes').append(content);
   }
   if ( $.fn.dataTable.isDataTable('#matrixRes') ) {
       // never pass here
       //alert("check site.js!");
   }else {
       table = $('#matrixRes').DataTable( {
              "scrollY": "550px",
              "scrollCollapse": true,
              "paging": false,
              "scrollX": true,
              "paging": false,
              "info": false,
              "order": [],
              "destroy": true
       } );
   }

}

function printNav2(data){
   // ciclo l'array
   $('#matrixRes tbody > tr').remove();
   for(i=0; i<data.length; i++){
	   var ele = data[i];
       var  content  = '<tr>';
       content +=  '<td>' +  ele.type + '</td>';
       content +=  '<td>' +  ele.name + '</td>';
       content +=  '<td>' +  ele.current + '</td>';
       //content +=  '<td>' +  ele.id + '</td>';
       content += '<td> <a href="navigator.html?queryname='+ele.id+'" target="_blank">' +  ele.id + '</a></td>';

       content +=  '<td>' +  ele.XPDMLOAD_Type + '</td>';
       content +=  '<td>' +  ele.XDM_Priority + '</td>';
       content +=  '<td>' +  ele.PLM_IsAssembly + '</td>';
       content +=  '<td>' +  ele.PLM_IsOldRevision + '</td>';
       content +=  '<td>' +  ele.PLM_DocumentType + '</td>';
       //content +=  '<td>' +  ele.PLM_Current_Action + '</td>';
       content +=  '<td>' +  ele.XDM_FilePath + '</td>';
       content +=  '<td>' +  ele.XDM_FileType + '</td>';
       content +=  '</tr>';
       $('#matrixRes').append(content);
   }
}
// ------------------------------------- nav 3 -------------------------------------
function handleEnterNav3(inField, e) {
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
	   //alert(inField.id+'--->'+inField.value);
	   loadNav3(inField.value);
	}
}

function loadNav3(param) {
  $.ajax({
    type: "GET",
	url: apiEnoclientURL + "getXDM_DOCs",
    dataType : 'json',
    cache: false,
	data:'queryname='+param,
  success: function(risposta){
	  //alert("Chiamata OK!!!");
	  printNav3(risposta);
 },
  error: function(){
    alert("Chiamata fallita!!!");
  }
 });
}

function printNav3(data){
   // ciclo l'array
   $('#matrixRes tbody > tr').remove();
   for(i=0; i<data.length; i++){
	   var ele = data[i];
       var  content  = '<tr>';
       content +=  '<td>' +  ele.type + '</td>';
       content +=  '<td>' +  ele.name + '</td>';
       content +=  '<td>' +  ele.current + '</td>';
       //content +=  '<td>' +  ele.id + '</td>';
       content += '<td> <a href="navigator.html?queryname='+ele.id+'" target="_blank">' +  ele.id + '</a></td>';
       content +=  '</tr>';
       $('#matrixRes').append(content);
   }
}
// ------------------------------------- Log menu -------------------------------------

function handleEnterLog1(inField, e) {
   	var charCode;
   	var selType = document.getElementById("typeFormControlSelect").value;
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
	   //alert(inField.id+'--->'+inField.value);
       //alert(manageHandler.typeFormControlSelect.options[1].value);
       //alert(selType);
       //$('#logcontent').load("test.html");
       // $('#logcontent').html(data);
	  loadLog1(inField.value, selType);
	}
}



function loadLog1_OLD(){
    $('#logcontent').append("-------------->");
    $("#logcontent").load("test.html");
    alert("content - loaded");
}


function loadLog1(param) {
    $.ajax({
      crossOrigin: true,
      url: "test.html",
      success: function(data) {
        //$('#logcontent').html(data);
        $("#logcontent").load("test.html");
      },
         error: function(){
           alert("Chiamata fallita---");
         }
    });
}


//-----------------------
function GetURLParameter(sParam){
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
	    if (sParameterName[0] == sParam) {
	    	 return sParameterName[1];
	    }
	}
}
//----------------------- DEBUG ------------------

function handleEnterDEBUG(inField, e) {
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
	   alert('popolare la tabella');
	   //loadNavDEBUG(inField.value);
	}
}

function loadNavDEBUG(param) {
  $.ajax({
    type: "GET",
	url: apiEnoclientURL + "getXDM_DOCs",
    dataType : 'json',
    cache: false,
	data:'queryname='+param,
  success: function(risposta){
	  //alert("Chiamata OK!!!");
	  printNavDEBUG(risposta);
 },
  error: function(){
    alert("Chiamata fallita!!!");
  }
 });
}


function printNavDEBUG(data){
   if ( $.fn.dataTable.isDataTable('#matrixRes') ) {
	  //$('#matrixRes').DataTable().destroy();
   }
   $('#matrixRes tbody > tr').remove();
   for(i=0; i<data.length; i++){
	   var ele = data[i];
       var  content  = '<tr>';
       content +=  '<td>' +  ele.type + '</td>';
       content +=  '<td>' +  ele.name + '</td>';
       content +=  '<td>' +  ele.current + '</td>';
       content +=  '<td>' +  ele.XDM_FilePath + '</td>';
       content +=  '<td>' +  ele.XDM_FileType + '</td>';
       content +=  '</tr>';
       $('#matrixRes').append(content);
   }
   if ( $.fn.dataTable.isDataTable('#matrixRes') ) {
       // never pass here
       alert("check site.js!");
   }else {
       table = $('#matrixRes').DataTable( {
              "scrollY": "550px",
              "scrollCollapse": true,
              "paging": false,
              "scrollX": true,
              "paging": false,
              "info": false,
              "destroy": true,
        	  "dom": "Bfrtip",
        	  "buttons": [ "copy", "csv", "excel", "pdf", "print" ]
       } );
   }

}



function handleEnterLog1(inField, e) {
   	var charCode;
   	//var selType = document.getElementById("typeFormControlSelect").value;
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
	   //alert(inField.id+'--->'+inField.value);
       //alert(manageHandler.typeFormControlSelect.options[1].value);
       //alert(selType);
       //$('#logcontent').load("test.html");
       // $('#logcontent').html(data);
	   //window.open(dowloadServlet + inField.value, "_blank");
	   loadLog1(inField.value);
	}
}



function loadLog1(data){
    alert(data);
    $('#logcontent').append("-------------->");
    $("#logcontent").load("test.html");
    alert("content - loaded");
}


function typeChanged(){
	var selTypeObj = document.getElementById("typeFormControlSelect");
	var option = document.getElementById("stateFormControlSelect");
	var dim_prec = option.length
	var selState = option.value;
	//alert("-->"+selTypeObj.value);
	var indexSelType = selTypeObj.selectedIndex;
    if(indexSelType == -1) return null;
    selected = selTypeObj.options[indexSelType].innerHTML;
    //alert(selected);

    state_BASIC = new Array();
    state_FILE = new Array();
    state_DOC = new Array();
    state_MDI = new Array();
    state_LOAD = new Array();
    //State definition policy
    state_DOC[0]=new Option('All','All');
    state_DOC[1]=new Option('CREATED','CREATED');
    state_DOC[2]=new Option('PROCESSING','PROCESSING');
    state_DOC[3]=new Option('COMPLETED','COMPLETED');
    state_DOC[4]=new Option('ERROR','ERROR');

    state_MDI[0]=new Option('All','All');
    state_MDI[1]=new Option('CREATED','CREATED');
    state_MDI[2]=new Option('XPDM_READY','XPDM_READY');
    state_MDI[3]=new Option('XPDM_LOADING','XPDM_LOADING');
    state_MDI[4]=new Option('XPDM_LOADED','XPDM_LOADED');
    state_MDI[5]=new Option('CUSTOM_LOADING','CUSTOM_LOADING');
    state_MDI[6]=new Option('COMPLETED','COMPLETED');
    state_MDI[7]=new Option('ERROR','ERROR');

    state_LOAD[0]=new Option('All','All');
    state_LOAD[1]=new Option('CREATED','CREATED');
    state_LOAD[2]=new Option('PREPARED','PREPARED');
    state_LOAD[3]=new Option('READY','READY');
    state_LOAD[4]=new Option('SUBMITTED','SUBMITTED');
    state_LOAD[5]=new Option('LOADED','LOADED');

    state_FILE[0]=new Option('All','All');
    state_FILE[1]=new Option('CREATED','CREATED');
    state_FILE[2]=new Option('XPDM_READY','XPDM_READY');

    state_BASIC[0]=new Option('All','All');

    if(selected.startsWith("DOC")){
        array_rif = state_DOC;
    }else if(selected=="MDI SET"){
         array_rif = state_MDI;
    }else if(selected=="LOAD"){
         array_rif = state_LOAD;
    }else if(selected=="FILE"){
          array_rif = state_MDI;
    }else{
        array_rif = state_BASIC;
    }

	for(i=0;i<array_rif.length;i++){
		option.options[i]=array_rif[i];
    }
	//calculate size option
	dim_att = array_rif.length
	//remove exceeded option
	if(dim_att < dim_prec){
		for(var i=dim_att;i<dim_prec;i++){
			option.remove(option.length-1)
		}
	}



/*
Se  typeFormControlSelect è selezionato Object allora ->
valorizzare stateFormControlSelect con i valori (all,Exist)
ma prima controllare:
se il valore di -selState- è presente (in All, Exist) ---> se si: stateFormControlSelect deve restare come prima, altrimenti diventa: All

Object: All,Exist
Request: All,Exist

FILE:	All,CREATED,XPDM_READY

LOAD:	All,CREATED,PREPARED,READY,SUBMITTED,LOADED

DOC
DOC Extractor
DOC Loader
DOC BomLink
--> INIZIA con "DOC": All,CREATED,PROCESSING,COMPLETED,ERROR

MDI: All
MDI SET: All,CREATED,XPDM_READY,XPDM_LOADING,XPDM_LOADED,CUSTOM_LOADING,COMPLETED,ERROR
MDI Temp: All,Exists
*/
}