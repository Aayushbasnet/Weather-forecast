class Forecast{
    constructor(){
        this.key = 'GxbQlc4DWYjwGWkWBap1Ohz8Vw18rdGu';
        this.weatherUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }

    // update city
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
        return {cityDetails, weather};
    }

    //get city api
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityUrl + query);
        const data = await response.json();
        return data[0];
    }

    //get weather api of that city
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherUrl + query);
        const data = await response.json();
        return data[0];
    }
}

