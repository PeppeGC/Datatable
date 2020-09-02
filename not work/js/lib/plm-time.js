function initDate(){
      // Added DatePicker
      $('#min-date').datepicker({
        next: '#max-date',
        outputFormat: 'MM/dd/y',
        firstDayOfWeek: 1
      });

      $('#max-date').datepicker({
        previous: '#min-date',
        outputFormat: 'MM/dd/y',
        firstDayOfWeek: 1
        });
}

function initTime(){
    // Added TimePicker
    $('.timepicker').timepicker({
        change: function(time) {
        reDrawTable();
        },
        timeFormat: 'hh:mm:ss p',
        interval: 30,
        minTime: '24:00',
        maxTime: '23:59',
        //defaultTime: 'now',
        startTime: '08:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
}


function initDateTime(){
	  console.log('initDateTime');
      initDate();
      initTime();

      $('#min-date').attr('readonly', true);
      $('#max-date').attr('readonly', true);

      var date = new Date();
      //var day = date.getDate();
      //var month = date.getMonth() + 1;
      //var year = date.getFullYear();
      //if (month < 10) month = "0" + month;
      //if (day < 10) day = "0" + day;
      //var today =  month + "/" + day + "/" + year;
      //$("#min-date").attr("value", today);
      $('#min-date').datepicker('setDate', date);

      $('#max-time').attr('disabled', true);
      //$('#min-time').attr('disabled', true);

      $('#clear-min').click(function() {
        $('#min-date').val('');
        $('#min-time').val('');
        reDrawTable();
      });

      $('#clear-max').click(function() {
        $('#max-date').val('');
        $('#max-time').val('');
        reDrawTable();
      });

      // Re-draw the table when the a date range filter changes
      $('.date-range-filter').change(function() {
        reDrawTable();
      });
}


function reDrawTable(){
    	$('#min-time').attr('disabled', $('#min-date').val() == '');
    	$('#max-time').attr('disabled', $('#max-date').val() == '');

	 		filterDateTime();
	 		table.draw();

}



function filterDateTime(){
      //Gestione filtro data della table
      $.fn.dataTable.ext.search.push(
          function(settings, data, dataIndex) {

              var DATE_COLUMN = data[4];

              var maxDate = $('#max-date').val();
              var minDate = $('#min-date').val();

              var minTime = $('#min-time').val();
              var maxTime = $('#max-time').val();
              if(minTime === undefined) minTime = '';
              if(maxTime === undefined) maxTime = '';

              var max = new Date(maxDate + " " + maxTime);
              var min = new Date(minDate + " " + minTime);

              var createdAt = new Date(DATE_COLUMN);

              if (min == 'Invalid Date' && max == 'Invalid Date'){
                  return true;
              } else if (min != 'Invalid Date' && max == 'Invalid Date'){
                  if (createdAt >= min) return true;
              } else if (min == 'Invalid Date' && max != 'Invalid Date'){
                  if (createdAt <= max) return true;
              } else if ((createdAt >= min) && (createdAt <= max)){
                  return true;
              }
              return false;
          }
      );
}