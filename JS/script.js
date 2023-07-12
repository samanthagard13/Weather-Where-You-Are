$(document).ready(function() {
let now = dayjs();
let apiKey = '0150c3b12a9d7824633c3bc8cc8ce43c';
 let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${apiKey}`;
let buttonContainer = $('#button-container');
let citiesArray = [
    { name: 'Atlanta'}, 
    { name: 'Denver'},
    { name: 'Seattle'},
    { name: 'San Fransisco'},
    { name: 'Orlando'},
    { name: 'New York'},
    { name: 'Chicago'},
    { name: 'Austin'},
];
let currentCity = $('#currentcity');
let currentTemp = $('#currenttemp');
let currentWind = $('#currentwind');
let currentHumidity = $('#currenthumidity');

var displayCity = function() {
    var cityname = $(this).data('cityname');
    var url = requestUrl.replace('{cityname}', cityname);

    fetch(url).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                currentCityBox(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error) {
        alert('Fetch error: ' + error);
      })
};

var currentCityBox = function(data) {
    currentCity.text(data.city.name);
    currentTemp.text(data.list[0].main.temp);
    currentWind.text(data.list[0].wind.speed);
    currentHumidity.text(data.list[0].main.humidity)
};

function updateCurrentTime() {
    $('#today').text(now.format('dddd, MMMM D YYYY'));
    };

for (var i = 0; i < citiesArray.length; i++) {
    var btnName = citiesArray[i].name;
    var cityBtns = $('<button>');
    cityBtns.addClass('h4 p-2');
    cityBtns.text(btnName);
    cityBtns.data('cityname', btnName);
    buttonContainer.append(cityBtns);
    cityBtns.on('click', displayCity); 
};

updateCurrentTime();

setInterval(updateCurrentTime, 1000);

});



