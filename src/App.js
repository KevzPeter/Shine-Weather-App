import React, { useState } from 'react';
import './styles/weather-icons.min.css';
import './styles/weather-icons-wind.css';
import './styles/weather-icons-wind.min.css';
import { Form } from './components/Form.js'
import { Weather } from './components/Weather.js';
import DayCard from './components/DayCard.js'
import { SplashScreen } from './components/SplashScreen.js'
import { Footer } from './components/Footer.js'
import weatherData from './config/weatherData.json';
import forecastData from "./config/forecastData.json"
import Error from "./components/Error.js";
const moment = require('moment');

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY;

  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [dailyData, setDailyData] = useState(null);
  const [dailyMaxTemp, setDailyMaxTemp] = useState([]);
  const [dailyMinTemp, setDailyMinTemp] = useState([]);
  const [weatherFetched, setWeatherFetched] = useState(false);
  const [error, setError] = useState(false);

  const getWeather = async (e, city, country) => {
    e.preventDefault();
    if (city && country) {
      console.log('Fetching weather...')
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}&units=metric`);
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
        let weatherDataObj = {
          city: `${response.name}, ${response.sys.country}`,
          temp: Math.round(response.main.temp),
          maxTemp: Math.round(response.main.temp_max),
          minTemp: Math.round(response.main.temp_min),
          pressure: response.main.pressure,
          humidity: response.main.humidity,
          windSpeed: Math.round(response.wind.speed),
          windDirection: response.wind.deg,
          sunrise: moment.unix(response.sys.sunrise + response.timezone).utc().format("h:mm a"),
          sunset: moment.unix(response.sys.sunset + response.timezone).utc().format("h:mm a"),
          visibility: response.visibility,
          description: response.weather[0].description.toUpperCase(),
          iconID: response.weather[0].id
        }
        setCurrentWeatherData(weatherDataObj);
        setError(false);

        let arr = [];
        let maxtemp = new Array(5).fill(-1000);
        let mintemp = new Array(5).fill(1000);
        let sliceIdx = 0;
        for (let i = 0; i < 5; i++) {
          arr[i] = forecast_res.list.slice(sliceIdx, sliceIdx++ + 8);
        }
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 8; j++) {
            maxtemp[i] = Math.max(maxtemp[i], arr[i][j].main.temp_max);
            mintemp[i] = Math.min(mintemp[i], arr[i][j].main.temp_min);
          }
        }
        setDailyMaxTemp(maxtemp);
        setDailyMinTemp(mintemp);
        const dailyData = forecast_res.list.filter(reading => reading.dt_txt.includes("12:00:00"))
        setDailyData(dailyData);
      }
    }
    else {
      setError(true);
    }
  }

  const FormatDayCards = () => {
    return (
      dailyData ? dailyData.map((reading, i) => <DayCard reading={reading}
        key={i} dailyMaxTemp={dailyMaxTemp[i]} dailyMinTemp={dailyMinTemp[i]} />) : null
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

  return (
    <div className='container-fluid'>
      {error && <Error />}
      <Form getWeather={(...args) => getWeather(...args)} />
      {weatherFetched && <Weather data={currentWeatherData} />}
      {!weatherFetched && <SplashScreen />}
      {weatherFetched && (<div className='forecast-container'>
        <h2>5 Day Forecast</h2>
        <div className='forecast'>
          <FormatDayCards />
        </div>
      </div>)}
    </div>
  );
}

export default App;
