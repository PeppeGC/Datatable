function initTime(){
          // Aggiunto TimePicker https://timepicker.co/
          $('.timepicker').timepicker({
              change: function(time) {
              reDrawTable();
              },
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
}

function initDate(){
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
}

function reDrawTable(){
        table.draw();
        $('#max-time').attr('disabled', $('#max-date').val() == '');
        $('#min-time').attr('disabled', $('#min-date').val() == '');
}

function initDateTime(){
console.log('initDateTime');
    initDate();
    initTime();

      $('#max-date').attr('readonly', true);
      $('#min-date').attr('readonly', true);
      $('#max-time').attr('disabled', true);
      $('#min-time').attr('disabled', true);

      // Re-draw the table when the a date range filter changes - controllare
      $('.date-range-filter').change(function() {
        reDrawTable();
      });

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