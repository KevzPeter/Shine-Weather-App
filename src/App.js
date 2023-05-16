import React, { useState } from 'react';
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { Form } from './components/Form.js'
import { Weather } from './components/Weather.js';
import DayCard from './components/Forecast.js'
import { Logo } from './components/Logo.js'
import { Footer } from './components/Footer.js'
import weatherData from './config/weatherData.json';
import forecastData from "./config/forecastData.json"
import weathericon from "./config/weatherIcons.json";

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY;
  console.log(api_key);

  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [icon, setIcon] = useState(null);
  const [main, setMain] = useState(null);
  const [celsius, setCelsius] = useState(null);
  const [temp_max, setTemp_max] = useState(null);
  const [temp_min, setTemp_min] = useState(null);
  const [desc, setDesc] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [maxtemp, setMaxtemp] = useState([]);
  const [minTemp, setMinTemp] = useState([]);
  const [day1Data, setday1Data] = useState(null);
  const [fclick, setfclick] = useState(true);
  const [weatherFetched, setWeatherFetched] = useState(false);
  const [loaded, setloaded] = useState(null);
  const [error, setError] = useState(false);

  const getWeatherIcon = (rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        setIcon(weathericon.Thunderstorm);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(weathericon.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 521:
        setIcon(weathericon.Rain);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(weathericon.Snow);
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon(weathericon.Atmosphere);
        break;
      case rangeId === 800:
        setIcon(weathericon.Clear);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon(weathericon.Clouds);
        break;
      default:
        setIcon(weathericon.Clouds);
    }
  }

  const getWeather = async (e, city, country) => {
    e.preventDefault();
    if (city && country) {
      console.log('Fetching weather...')
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`);
      const response = await res.json();
      // const response = weatherData;
      console.log(response);
      const forecast_api = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${api_key}`);
      const forecast_res = await forecast_api.json()
      // const forecast_res = forecastData;
      console.log(forecast_res);

      if (response.cod !== 200) {
        setError(true);
      }
      else {
        setWeatherFetched(true);
        setCity(`${response.name}, ${response.sys.country}`)
        setCelsius(convertKelvinToCelsius(response.main.temp))
        setTemp_max(convertKelvinToCelsius(response.main.temp_max))
        setTemp_min(convertKelvinToCelsius(response.main.temp_min))
        setDesc(response.weather[0].description.toUpperCase())
        setError(false);

        let arr = [];
        let maxtemp = [];
        let mintemp = [];
        let sliceIdx = 0;
        for (let i = 0; i < 5; i++) {
          arr[i] = forecast_res.list.slice(sliceIdx, sliceIdx++ + 8);
        }
        for (let i = 0; i < 5; i++) {
          maxtemp[i] = arr[i][0].main.temp_max;
          mintemp[i] = arr[i][0].main.temp_min;
          for (let j = 0; j < 8; j++) {
            if (arr[i][j].main.temp_max >= maxtemp[i]) { maxtemp[i] = arr[i][j].main.temp_max }
            if (arr[i][j].main.temp_min <= mintemp[i]) { mintemp[i] = arr[i][j].main.temp_min }
          }
        }
        setMaxtemp(maxtemp);
        setMinTemp(mintemp);
        const dailyData = forecast_res.list.filter(reading => reading.dt_txt.includes("12:00:00"))
        //console.log(dailyData)
        //const day1Data = forecast_res.list.slice(0,8).map((reading)=>reading)
        setDailyData(dailyData);
        getWeatherIcon(response.weather[0].id);
      }
    }
    else {
      setError(true);
    }
  }

  const FormatDayCards = () => {
    return (
      dailyData ? dailyData.map((reading, index) => <DayCard reading={reading}
        key={index} maxtemp={maxtemp[index]} mintemp={minTemp[index]} />) : null
    )
  }
  /*
  getHourly=()=>{
  
    navigator.geolocation.getCurrentPosition( async(position)=> {
      const lat=position.coords.latitude
      const long=position.coords.longitude
      if(lat&&long){
        console.log('hey')
      const hourly_api=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,daily&appid=${api_key.api_key}`)
      const hourly_res=await hourly_api.json()
      const hourly_data=hourly_res.hourly.slice(0,24).map((reading)=>reading)
      this.setState({day1Data:JSON.stringify(hourly_data)})
      }
      else{
        this.setState({error:true})
      }
    });
    
    }
    */

  const convertKelvinToCelsius = (temp) => {
    temp = Math.floor(temp - 273.15);
    return temp;
  }

  return (
    <>
      <div className="App" style={{ backgroundImage: backgroundImage }}>
        <Form getWeather={(...args) => getWeather(...args)} error={error} />
        {weatherFetched && !error && <Weather city={city}
          country={country}
          celsius={celsius}
          temp_max={temp_max}
          temp_min={temp_min}
          desc={desc}
          weathericon={icon} />}
        {((weatherFetched && error) || (!weatherFetched)) && <Logo />}
        <div className='forecast'>
          {weatherFetched && !error && <FormatDayCards />}
        </div>
      </div>
      <Footer style={{ backgroundImage: backgroundImage }} />
    </>
  );
}

export default App;
