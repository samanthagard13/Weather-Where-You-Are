$(document).ready(function() {
let now = dayjs();
let apiKey = '0150c3b12a9d7824633c3bc8cc8ce43c';
let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`;
let buttonContainer = $('#button-container');
let citiesArray = [
    { name: 'Atlanta', lat: 33.7490, lon: -84.3880 }, 
    { name: 'Denver', lat: 39.7392, lon: 104.9903 },
    { name: 'Seattle', lat: 47.6062, lon: 122.3321 },
];
let currentCity = $('#currentcity');
let currentTemp = $('#currenttemp');
let currentWind = $('#currentwind');
let currentHumidity = $('#currenthumidity');

var displayCity = function() {
    var lat = $(this).data('lat');
    var lon = $(this).data('lon');
    var url = requestUrl.replace('{lat}', lat).replace('{lon}', lon);

    fetch(url).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                currentCityBox(data)
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};

for (var i = 0; i < citiesArray.length; i++) {
    var btnName = citiesArray[i].name;
    var cityBtns = $('<button>');
    cityBtns.addClass('h4 p-2');
    cityBtns.text(btnName);
    cityBtns.data('lat', citiesArray[i].lat);
    cityBtns.data('lon', citiesArray[i].lon);
    buttonContainer.append(cityBtns);
    cityBtns.on('click', displayCity);
};

var currentCityBox = function(event) {
    var cityName = event.target.textContent;
    currentCity.text(cityName);
};

function updateCurrentTime() {
$('#today').text(now.format('dddd, MMMM D YYYY'));
};

updateCurrentTime();

setInterval(updateCurrentTime(), 1000);

displayCity();

});



