$(document).ready(function() {
  $('#createCityForm').on('submit', function(event) {
    event.preventDefault();

    const cityData = {
      city: $('#city').val(),
      population: $('#population').val(),
      populationRank: $('#populationRank').val(),
      landArea: $('#landArea').val(),
      populationDensity: $('#populationDensity').val(),
      populationDensityRank: $('#populationDensityRank').val()
    };

    $.ajax({
      url: `http://localhost:2000/${cityData.city}`,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(cityData),
      success: function(response) {
        $('#createMessage').html('<div class="alert alert-success">City created successfully!</div>');
        $('#createCityForm')[0].reset();
      },
      error: function(error) {
        $('#createMessage').html('<div class="alert alert-danger">Error creating city.</div>');
      }
    });
  });
});
