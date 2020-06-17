
function writeLeftBar(selectedBar){
alert(selectedBar);
}


function dt(){
		table = $('#example').DataTable( {
			  "scrollY":        "200px",
			  "scrollCollapse": true,
			  "paging":         false,
			  "scrollX": true,
			  "dom": "Bfrtip",
			  "buttons": ["copy",
                        {extend: 'csv', exportOptions: {columns: ':visible'}},
			        "excel", "pdf", "print"]
		} );

	// Get the column number
	var headers = table.columns().header();
	var number = table.columns().data().length;

	// Set Toggle Columns
	$( ".toggle-vis" ).remove();
	for(var i = 0; i < number; i++){
		var row = '<a class="toggle-vis" data-column="'+i+'">'+headers[i].innerText+'</a> '
		$('#toggle-columns').append(row);
	}

    $('a.toggle-vis').on( 'click', function (e) {
        e.preventDefault();

        // Get the column API object
        var column = table.column( $(this).attr('data-column') );

        // Toggle the visibility
        column.visible( ! column.visible() );
    } );

}