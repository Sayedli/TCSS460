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
        $('#citySelect').html(cityOptions);
      },
      error: function(error) {
        $('#citySelect').html('<option class="text-danger">Error fetching cities.</option>');
      }
    });
  }

  function loadCityData(cityName) {
    $.ajax({
      url: `http://localhost:2000/${cityName}`,
      type: 'GET',
      success: function(response) {
        if(response.length > 0) {
          const city = response[0];
          $('#city').val(city.city);
          $('#population').val(city.population);
          $('#populationRank').val(city.populationRank);
          $('#landArea').val(city.landArea);
          $('#populationDensity').val(city.populationDensity);
          $('#populationDensityRank').val(city.populationDensityRank);
          $('#updateCityForm').show();
        } else {
          $('#updateMessage').html('<div class="alert alert-danger">City not found.</div>');
        }
      },
      error: function(error) {
        $('#updateMessage').html('<div class="alert alert-danger">Error fetching city data.</div>');
      }
    });
  }

  $('#selectCityForm').on('submit', function(event) {
    event.preventDefault();
    const cityName = $('#citySelect').val();
    loadCityData(cityName);
  });

  $('#updateCityForm').on('submit', function(event) {
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
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(cityData),
      success: function(response) {
        $('#updateMessage').html('<div class="alert alert-success">City updated successfully!</div>');
      },
      error: function(error) {
        $('#updateMessage').html('<div class="alert alert-danger">Error updating city.</div>');
      }
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const cityName = urlParams.get('city');
  if (cityName) {
    loadCityData(cityName);
  } else {
    loadCities();
  }
});
