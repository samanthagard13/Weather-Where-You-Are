$(document).ready(function() {
let now = dayjs();
let apiKey = '0150c3b12a9d7824633c3bc8cc8ce43c';
let buttonContainer = $('#button-container');
let citiesArray = [
    { name: 'Boston'},
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
let icon = $('#icon');
let currentTemp = $('#currenttemp');
let currentWind = $('#currentwind');
let currentHumidity = $('#currenthumidity');
let searchBtn = $('#searchbtn');
let fiveDayCards = $('#five-day-cards');
let fiveDays = [
    {dayOne: $('#day1')},
    {dayTwo: $('#day2')},
    {dayThree: $('#day3')},
    {dayFour: $('#day4')},
    {dayFive: $('#day5')},
];
let iconArray = [
    {icon1: $('#day-one-icon')},
    {icon2: $('#day-two-icon')},
    {icon3: $('#day-three-icon')},
    {icon4: $('#day-four-icon')},
    {icon5: $('#day-five-icon')},
];
let tempArray = [
    {temp1: $('#temp')},
    {temp2: $('#temp2')},
    {temp3: $('#temp3')},
    {temp4: $('#temp4')},
    {temp5: $('#temp5')},
];
let windArray = [
    {wind1: $('#wind')},
    {wind2: $('#wind2')},
    {wind3: $('#wind3')},
    {wind4: $('#wind4')},
    {wind5: $('#wind5')},
];
let humidityArray = [
    {humidity1: $('#humidity')},
    {humidity2: $('#humidity2')},
    {humidity3: $('#humidity3')},
    {humidity4: $('#humidity4')},
    {humidity5: $('#humidity5')},
];
var defaultCity = 'San Diego';

var pageLoad = function() {
    for (var i = 0; i < citiesArray.length; i++) {
        var btnName = citiesArray[i].name;
        var cityBtns = $('<button>');
        cityBtns.addClass('h4 p-2');
        cityBtns.text(btnName);
        cityBtns.data('cityname', btnName);
        buttonContainer.append(cityBtns);
        cityBtns.on('click', function() {
            var cityname = $(this).data('cityname');
            displayCity(cityname);
          });
        }
        initialDisplay();
      };

var displayCity = function(firstCity) {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${firstCity}&cnt=6&units=imperial&appid=${apiKey}`;
    fetch(url).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                currentCityBox(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};

var currentCityBox = function(data) {
    currentCity.text(data.city.name);
    currentTemp.text("Current Temperature   " + data.list[0].main.temp + " Degrees");
    currentWind.text("Current Wind Speed   " + data.list[0].wind.speed + " Mph");
    currentHumidity.text("Current Humidity   " + data.list[0].main.humidity + " Percent");

    var iconCode = data.list[0].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var iconImg = $("<img>").attr("src", iconUrl);
    icon.empty().append(iconImg);
    fiveDayForecast(data);
};

var fiveDayForecast = function(data) {
    for (var i = 0; i < fiveDays.length; i++) {
        var singleDay = fiveDays[i];
        var dayEl = Object.values(singleDay)[0];
        dayEl.addClass('h5');
        dayEl.text(dayjs().add(i + 1, 'day').format('dddd, MMMM D'));
    }
    for (var i = 0; i < iconArray.length; i++) {
        var singleIcon = iconArray[i];
        var iconEl = Object.values(singleIcon)[0];
        var iconCode = data.list[i].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var iconImg = $("<img>").attr("src", iconUrl);
        iconEl.empty().append(iconImg);
    }
    for (var i = 0; i < tempArray.length; i++) {
        var singleTemp = tempArray[i];
        var tempEl = Object.values(singleTemp)[0];
        tempEl.text("Temp: " + data.list[i].main.temp + " *");
    }
    for (var i = 0; i < windArray.length; i++) {
        var singleWind = windArray[i];
        var windEl = Object.values(singleWind)[0];
        windEl.text('Wind:  ' + data.list[i].wind.speed + " Mph");
    }
    for (var i = 0; i < humidityArray.length; i++) {
        var singleHumid = humidityArray[i];
        var humidEl = Object.values(singleHumid)[0];
        humidEl.text('Humidity:  ' + data.list[i].main.humidity + " %");
    }
};

var initialDisplay = function() {
    displayCity(defaultCity);
};

var citySearch = function(e) {
    e.preventDefault();
    let cityInput = $('#cityinput').val();
    defaultCity = cityInput;
    displayCity(cityInput);
};

function updateCurrentTime() {
    $('#today').text(now.format('dddd, MMMM D YYYY'));
};

$('#cityinput').on('keypress', function(e) {
    if (e.which === 13) {
      citySearch(e);
    }
  });

pageLoad();

searchBtn.on('click', citySearch);

updateCurrentTime();

setInterval(updateCurrentTime, 1000);

});



