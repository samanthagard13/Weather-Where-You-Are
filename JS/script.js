$(document).ready(function() {
let now = dayjs();
var APIKey = '0150c3b12a9d7824633c3bc8cc8ce43c';
let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={0150c3b12a9d7824633c3bc8cc8ce43c}'
let citiesArray = [
    { name: 'Atlanta', lat: 33.7490, lon: -84.3880 }, 
];
let Btns = [
    $('#atlantaBtn'), 
];

Btns.forEach(btn => {
    btn.on('click', function() {
        let city = citiesArray.find(city => city.name);
        let lat = city.lat;
        let lon = city.lon;
        let updatedRequestUrl = requestUrl.replace('{lat}', lat).replace('{lon}', lon);
        fetch(requestUrl)
    });
    fetch(updatedRequestUrl)
        .then(response => response.json())
        .then(data => {
        console.log(data);
})

function updateCurrentTime() {
$('#today').text(now.format('dddd, MMMM D YYYY'));
};

updateCurrentTime();

setInterval(updateCurrentTime(), 1000);

});
});
    
// take in search input
//get url info
//display in current city box

//current city get info for 5 days
//display each day on a card with weather icon