const cityForm = document.querySelector('.city_form');
const card = document.querySelector('.card');
const city_time = document.querySelector('img.city_time');
const weather_icon = document.querySelector('.weather_icon img')
const weather_details = document.querySelector('.weather_details');
// const clock = document.querySelector('.clock');

// const reg = / T([0-9]{2}\:[0-9]{2}\:[0-9]{2})\+ /g;
//update UI
const updateUi = (data) => {
    const {cityDetails, weather} = data;
    const clock = weather.LocalObservationDateTime;
    // console.log(clock.match(reg));
    weather_details.innerHTML = 
    `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
        <div class="clock my-3 mx-2 float-right">
            <span>${weather.LocalObservationDateTime}</span>
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

//update city UI
const updateCity = async (city)=>{
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    
    return {cityDetails, weather};
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
    updateCity(city).then(data => {
        console.log(data);
        updateUi(data);
    }).catch(err => {
        console.log(err);
    });

    //store city in local storage
    localStorage.setItem('city', city);
    
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
        .then(data => {
            updateUi(data);
        })
        .catch(err => console.log(err));    
}

