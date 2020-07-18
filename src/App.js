import React,{Component} from 'react';
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css"
import Form from './app_component/form.component'
import './App.css';
import Weather from './app_component/weather.component';
//api.openweathermap.org/data/2.5/weather?q=Mumbai
const api_key="37c70b216c90e0b74b3dd8a5bd96c2bd";

class App extends Component{
  constructor()
  {
    super();
    this.state={
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      desc:"",
      error:false
    };

    
    this.weathericon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }
  }
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon:this.weathericon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon:this.weathericon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({icon:this.weathericon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon:this.weathericon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon:this.weathericon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon:this.weathericon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon:this.weathericon.Clouds });
        break;
      default:
        this.setState({ icon:this.weathericon.Clouds });
    }
  }

  getWeather=async(e)=>{

    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
    
    if(city && country){
      
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`);
    const response = await api_call.json();
    this.setState(
      {
        city:`${response.name},${response.sys.country}`,
        celsius:this.calcCelsius(response.main.temp),
        temp_max:this.calcCelsius(response.main.temp_max),
        temp_min:this.calcCelsius(response.main.temp_min),
        desc:response.weather[0].description,
        error:false
      }
    )
      
    this.get_WeatherIcon(this.weathericon,response.weather[0].id);
    }
    else{
      this.setState({error:true});
    }
  }
  
   calcCelsius(temp) {
    temp=Math.floor(temp-273.15);
    return temp;
  }


  render(){
    return (  
   
        <div className="App">
          <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather city={this.state.city} 
        country={this.state.country}
        celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        desc={this.state.desc}
        weathericon={this.state.icon}/>
        </div>
    );
  }
}

export default App;
