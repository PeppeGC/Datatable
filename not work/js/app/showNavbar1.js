define([
    "jquery",
    "custom_leftbar",
    "jquery.dataTables.min",
    "dataTables.buttons.min",
    //"datatables.net",
    //"datatables.net-buttons",
    "buttons.flash.min",
    "buttons.print.min",
    "jszip.min",
    "pdfmake",
    "vfs_fonts",
    "buttons.html5.min",
    "datepicker.min"
], function($) {
	    //Solution for missing Excel Button:
	    //https://datatables.net/forums/discussion/49747/excel-button-not-showing-up-using-webpack
        window.JSZip = require('jszip.min');
        $(function() {
	    //TO DO
	    //$('body').addptodom();
        console.log('required plugins loading...');
		dt();
	    console.log('required plugins loaded...');

 $('.it-date-datepicker').datepicker({
      inputFormat: ["dd/MM/yyyy"],
      outputFormat: 'dd/MM/yyyy',
    });

	    $('.input-daterange input').each(function() {
        	  //$(this).datepicker('clearDates');
        	 // alert($(this.value));
        	  $(this).datepicker();
          });
	    });
});
