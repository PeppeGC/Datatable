requirejs.config({
	"baseUrl": "js/lib",
	"paths": {
		"app": "../app",
		//"datatables.net": "../lib/datatables.min",
		"datatables.net": "../lib/jquery.dataTables.min",
		"datatables.net-buttons": "../lib/dataTables.buttons.min"
	},
	"shim": {
		"custom_leftbar": ["jquery"],
	}
});
// Load the main app module to start the app
requirejs(["app/showNavbar1"]);