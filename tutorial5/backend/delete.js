$(document).ready(function() {
  function loadCities() {
    $.ajax({
      url: `http://localhost:2000/`,
      type: 'GET',
      success: function(response) {
        let cityOptions = '';
        response.forEach(city => {
          cityOptions += `<option value="${city.city}">${city.city}</option>`;
        });
        $('#city').html(cityOptions);
      },
      error: function(error) {
        $('#city').html('<option class="text-danger">Error fetching cities.</option>');
      }
    });
  }

  $('#deleteCityForm').on('submit', function(event) {
    event.preventDefault();

    const cityName = $('#city').val();

    $.ajax({
      url: `http://localhost:2000/${cityName}`,
      type: 'DELETE',
      success: function(response) {
        $('#deleteMessage').html('<div class="alert alert-success">City deleted successfully!</div>');
        loadCities();
      },
      error: function(error) {
        $('#deleteMessage').html('<div class="alert alert-danger">Error deleting city.</div>');
      }
    });
  });

  loadCities();
});
