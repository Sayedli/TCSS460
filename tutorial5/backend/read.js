$(document).ready(function() {
  function loadCities(searchQuery = '') {
    $.ajax({
      url: `http://localhost:2000/`,
      type: 'GET',
      success: function(response) {
        console.log('Response:', response); // Debugging output
        const filteredCities = response.filter(city => city.city.toLowerCase().includes(searchQuery.toLowerCase()));
        console.log('Filtered Cities:', filteredCities); // Debugging output

        let cityTableHtml = '';
        filteredCities.forEach(city => {
          cityTableHtml += `
            <tr>
              <td>${city.city}</td>
              <td>${city.population}</td>
              <td>
                <button class="btn btn-info view-btn" data-city="${city.city}">View</button>
                <button class="btn btn-warning update-btn" data-city="${city.city}">Update</button>
                <button class="btn btn-danger delete-btn" data-city="${city.city}">Delete</button>
              </td>
            </tr>`;
        });

        if (cityTableHtml === '') {
          cityTableHtml = '<tr><td colspan="3" class="text-center">No cities found.</td></tr>';
        }

        $('#cityTable').html(cityTableHtml);
      },
      error: function(error) {
        console.log('Error:', error); // Debugging output
        $('#cityTable').html('<tr><td colspan="3" class="text-danger">Error fetching cities.</td></tr>');
      }
    });
  }

  $('#searchCity').on('input', function() {
    const searchQuery = $(this).val();
    loadCities(searchQuery);
  });

  $(document).on('click', '.view-btn', function() {
    const cityName = $(this).data('city');
    window.location.href = `view.html?city=${cityName}`;
  });

  $(document).on('click', '.update-btn', function() {
    const cityName = $(this).data('city');
    window.location.href = `update.html?city=${cityName}`;
  });

  $(document).on('click', '.delete-btn', function() {
    const cityName = $(this).data('city');
    $.ajax({
      url: `http://localhost:2000/${cityName}`,
      type: 'DELETE',
      success: function(response) {
        alert('City deleted successfully!');
        loadCities();
      },
      error: function(error) {
        alert('Error deleting city.');
      }
    });
  });

  loadCities();
});
