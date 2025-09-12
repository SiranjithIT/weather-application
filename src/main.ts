import './style.css'

interface weatherData{
  city: string;
  condition: string;
  temperature_celsius: number;
  humidity: number;
  wind_speed_kmph: number;
}

let weather: weatherData[]; 


const getWeatherData = async()=>{
  const response = await fetch('weather.json');
  if(!response.ok) throw new Error("Failed to fetch weather data");
  return await response.json();
}

weather = (await getWeatherData()).weatherData;
console.log(weather);

const getWeatherByCity = (city: string): weatherData | null => {
  const result = weather.find(item => item.city.toLowerCase() === city.toLowerCase());
  return result || null;
}

const changeBackground = (condition: string)=>{
  const body = document.body;
  body.classList = "";

  switch(condition){
    case "sunny":
      body.classList = "sunny";
      break;
    case "rainy":
      body.classList = "rainy";
      break;
    case "freezing":
      body.classList = "freeze";
      break;
    case "breeze":
      body.classList = "breeze";
      break;
    default:
      body.classList = "default";
      break;
  }
}



const searchCity = ()=>{
  const searchInput = document.querySelector('.search-input') as HTMLInputElement;
  const result = document.querySelector('.result') as HTMLDivElement;

  const query = searchInput.value;
  searchInput.value = "";
  const cityWeather: weatherData|null = getWeatherByCity(query);
  if(!cityWeather){
    result.innerHTML=`
    <div class="flex-col">
      <div>City ${query} not found</div>
    </div>
    `
    changeBackground("default");
  }else{
    result.innerHTML = `
      <div class="flex-col">
        <div>${ cityWeather.city.toLocaleUpperCase()  }</div>
        <div>Temp: ${ cityWeather.temperature_celsius }&#176; C</div>
      </div>
      <div class="flex-col">
        <div>Humidity: ${ cityWeather.humidity  }</div>
        <div>Wind Speed: ${ cityWeather.wind_speed_kmph}km/h</div>
      </div>
    `;
    changeBackground(cityWeather.condition);
  }
}

const searchBtn = document.querySelector('.search-button') as HTMLButtonElement;
searchBtn.addEventListener('click', searchCity);