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
    "buttons.html5.min"
], function($) {
	$(function() {
	    //TO DO
	    //$('body').addptodom();
        console.log('required plugins loading...');
		//writeLeftBar("selB1");
		dt();
	    console.log('required plugins loaded...');

	});
});
