const key = 'GxbQlc4DWYjwGWkWBap1Ohz8Vw18rdGu';

const getCity = async (city) =>{
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();
    console.log(data);
}

getCity('manchester');