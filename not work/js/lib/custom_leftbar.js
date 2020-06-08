
function writeLeftBar(selectedBar){
alert(selectedBar);
}


function dt(){
		$('#example').DataTable( {
			  "scrollY":        "200px",
			  "scrollCollapse": true,
			  "paging":         false,
			  "scrollX": true,
			  "dom": "Bfrtip",
			  "buttons": [
			              "copy", "csv", "excel", "pdf", "print"

        				]
		} );
}