$(document).ready(function() {

  // Aggiunto DatePicker https://github.com/eureka2/ab-datepicker
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

  $('#max-date').attr('readonly', true);
  $('#min-date').attr('readonly', true);
  $('#max-time').attr('disabled', true);
  $('#min-time').attr('disabled', true);

  // Aggiunto TimePicker https://timepicker.co/
  $('.timepicker').timepicker({
      timeFormat: 'hh:mm p',
      interval: 30,
      minTime: '24:00',
      maxTime: '23:59',
      //defaultTime: 'now',
      startTime: '08:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true
  });

  // Re-draw the table when the a date range filter changes - controllare
  $('.date-range-filter').change(function() {
    table.draw();

    $('#max-time').attr('disabled', $('#max-date').val() == '');
    $('#min-time').attr('disabled', $('#min-date').val() == '');

  });
});

//Gestione filtro data della table
$.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {

        var DATE_COLUMN = data[4];

        let max = new Date($('#max-date').val());
        let min = new Date($('#min-date').val());


        //let max = new Date($('#max-date').val() + ' ' + $('max-time').val());
        //let min = new Date($('#min-date').val() + ' ' + $('min-time').val());
        let createdAt = new Date(DATE_COLUMN);

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