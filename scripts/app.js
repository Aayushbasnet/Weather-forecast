const cityForm = document.querySelector('.city_form');
const card = document.querySelector('.card');
const city_time = document.querySelector('img.city_time');
const weather_icon = document.querySelector('.weather_icon img')
const weather_details = document.querySelector('.weather_details');
const forecast = new Forecast();

const updateUi = (data) => {
    const {cityDetails, weather} = data;
    //to get time from weather api
    const localDateTime = weather.LocalObservationDateTime;
    const timeArray = Array.from(localDateTime);
    var cityTime = "";
    const clock = timeArray.slice(timeArray.indexOf('T')+1, timeArray.indexOf('+'));
    const strClock = clock.forEach(clk => {
        cityTime += clk.toString();
    });
    console.log(cityTime);
    //update ui after getting data
    weather_details.innerHTML = 
    `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
        <div class="clock my-3 mx-2 float-right">
            <span>Time: ${cityTime}</span>
        </div>  
    `;

    //update time images
    const timeSrc = weather.IsDayTime ? 'images/day.svg' : 'images/night.svg';
    city_time.setAttribute('src', timeSrc);

    //update icon
    const iconSrc = `images/icons/${weather.WeatherIcon}.svg`;
    weather_icon.setAttribute('src', iconSrc);

    //display card
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

//Get city form
cityForm.addEventListener('submit', e => {
    //prevent default reload
    e.preventDefault();

    //get city from user
    const city = cityForm.city.value.trim();
    //reset form
    cityForm.reset();

    //update city 
    forecast.updateCity(city).then(data => {
        console.log(data);
        updateUi(data);
    }).catch(err => {
        console.log(err);
    });

    //store city in local storage
    localStorage.setItem('city', city);
    
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => {
            updateUi(data);
        })
        .catch(err => console.log(err));    
}

