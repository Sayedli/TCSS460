$(document).ready(function() {
  function loadCityDetails(cityName) {
    $.ajax({
      url: `http://localhost:2000/${cityName}`,
      type: 'GET',
      success: function(response) {
        console.log('Response:', response); // Debugging output
        if(response.length > 0) {
          const city = response[0];
          let cityDetailsHtml = `
            <tr><th>City</th><td>${city.city}</td></tr>
            <tr><th>Population</th><td>${city.population}</td></tr>
            <tr><th>Population Rank</th><td>${city.populationRank}</td></tr>
            <tr><th>Land Area</th><td>${city.landArea}</td></tr>
            <tr><th>Population Density</th><td>${city.populationDensity}</td></tr>
            <tr><th>Population Density Rank</th><td>${city.populationDensityRank}</td></tr>
          `;
          $('#cityDetailsTable').html(cityDetailsHtml);
        } else {
          $('#cityDetailsTable').html('<tr><td class="text-danger">City not found.</td></tr>');
        }
      },
      error: function(error) {
        console.log('Error:', error); // Debugging output
        $('#cityDetailsTable').html('<tr><td class="text-danger">Error fetching city details.</td></tr>');
      }
    });
  }

  // Get city name from URL parameters (for example, view.html?city=Seattle)
  const urlParams = new URLSearchParams(window.location.search);
  const cityName = urlParams.get('city');
  if (cityName) {
    loadCityDetails(cityName);
  } else {
    $('#cityDetailsTable').html('<tr><td class="text-danger">No city specified.</td></tr>');
  }
});
