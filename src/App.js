import React, { useState } from 'react';
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { Form } from './components/Form.js'
import { Weather } from './components/Weather.js';
import { DayCard } from './components/Forecast.js'
import { Logo } from './components/Logo.js'
import { Footer } from './components/Footer.js'
import weatherData from './config/weatherData.json';

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
  const [fclick, setfclick] = useState(null);
  const [glick, setglick] = useState(null);
  const [loaded, setloaded] = useState(null);
  const [error, setError] = useState(false);

  const weathericon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  }

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

  const getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    console.log("called geweather")
    if (city && country) {
      // const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key.api_key}`);
      // const response = await api_call.json();
      const response = weatherData;
      console.log(response);
      // const forecast_api = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${api_key.api_key}`);
      // const forecast_res = await forecast_api.json()

      if (response.cod !== 200) {
        setError(true);
      }
      else {
        setCity(`${response.name}, ${response.sys.country}`)
        setCelsius(convertKelvinToCelsius(response.main.temp))
        setTemp_max(convertKelvinToCelsius(response.main.temp_max))
        setTemp_min(convertKelvinToCelsius(response.main.temp_min))
        setDesc(response.weather[0].description.toUpperCase())
        setError(false);

        // let arr = [5]
        // let maxtemp = [5]
        // let mintemp = [5]
        // arr[0] = forecast_res.list.slice(0, 8)
        // arr[1] = forecast_res.list.slice(8, 16)
        // arr[2] = forecast_res.list.slice(16, 24)
        // arr[3] = forecast_res.list.slice(24, 32)
        // arr[4] = forecast_res.list.slice(32, 40)
        // console.log(arr)
        // for (var i = 0; i < 5; i++) {
        //   maxtemp[i] = arr[i][0].main.temp_max
        //   mintemp[i] = arr[i][0].main.temp_min
        //   for (var j = 0; j < 8; j++) {
        //     if (arr[i][j].main.temp_max >= maxtemp[i]) { maxtemp[i] = arr[i][j].main.temp_max }
        //     if (arr[i][j].main.temp_min <= mintemp[i]) { mintemp[i] = arr[i][j].main.temp_min }

        //   }
        // }
        // setMaxtemp(maxtemp);
        // setMinTemp(mintemp);
        // const dailyData = forecast_res.list.filter(reading => reading.dt_txt.includes("12:00:00"))
        //console.log(dailyData)
        //const day1Data = forecast_res.list.slice(0,8).map((reading)=>reading)
        setDailyData(dailyData);

        //changing background theme according to color
        // if (this.convertKelvinToCelsius(response.main.temp) > 16)
        //   this.setState({ backgroundImage: "linear-gradient(to right, #fc4a1a, #f7b733)" })
        // else
        //   this.setState({ backgroundImage: "linear-gradient(to right, #B2FEFA, #0ED2F7)" })
        getWeatherIcon(response.weather[0].id);
      }
    }
    else {
      setError(true);
    }
  }

  const Clicked = () => {
    setfclick(!fclick);
  }
  const GotWeather = () => {
    setglick(true);
  }

  const FormatDayCards = () => {
    if (fclick)
      return (
        dailyData.map((reading, index) => <DayCard reading={reading}
          key={index} dayview={Clicked} maxtemp={maxtemp[index]} mintemp={minTemp[index]} />)
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
        <Form loadweather={getWeather} clicked={Clicked}
          error={error} gotweather={GotWeather} />
        <Weather city={city}
          country={country}
          celsius={celsius}
          temp_max={temp_max}
          temp_min={temp_min}
          desc={desc}
          weathericon={icon} />
        {glick ? null : <Logo />}
        <div className="row justify-content-center">
          {/* {FormatDayCards()} */}
        </div>
      </div>
      <Footer style={{ backgroundImage: backgroundImage }} />
    </>
  );
}

export default App;
