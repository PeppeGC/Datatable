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
	//Solution for missing Excel Button:
	//https://datatables.net/forums/discussion/49747/excel-button-not-showing-up-using-webpack
    window.JSZip = require('jszip.min');

	$(function() {
	    //TO DO
	    //$('body').addptodom();
        console.log('required plugins loading...');
		//writeLeftBar("selB1");
		dt();
	    console.log('required plugins loaded...');

	});
});
