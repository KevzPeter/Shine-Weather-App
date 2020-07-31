import React,{Component} from 'react';
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css"
import {Form} from './app_component/form.component.js'
import {Weather} from './app_component/weather.component.js';
import {DayCard} from './app_component/Forecast'
import {Logo} from './app_component/logo'
import api_key from './apikey'
import {Footer} from'./app_component/Footer'

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
      error:false,
      backgroundImage:"",
      dailyData:[],
      maxtemp:[],
      mintemp:[],
      day1Data:null,
      fclick:false,
      gclick:false,
      loaded:false,
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
    console.log("called geweather")
    if(city && country){
      
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key.api_key}`);
    const response = await api_call.json();
    const forecast_api = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${api_key.api_key}`);
    const forecast_res = await forecast_api.json()

    if(response.cod!==200)
    {
      this.setState({error:true})
    }
    else{
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
   // this.getHourly()
   
   let arr=[5]
   let maxtemp=[5]
   let mintemp=[5]
   arr[0]=forecast_res.list.slice(0,8)
   arr[1]=forecast_res.list.slice(8,16)
   arr[2]=forecast_res.list.slice(16,24)
   arr[3]=forecast_res.list.slice(24,32)
   arr[4]=forecast_res.list.slice(32,40)
   console.log(arr)
   for(var i=0;i<5;i++)
   {
      maxtemp[i]=arr[i][0].main.temp_max
      mintemp[i]=arr[i][0].main.temp_min
     for(var j=0;j<8;j++)
     {
        if(arr[i][j].main.temp_max>=maxtemp[i]){maxtemp[i]=arr[i][j].main.temp_max}
        if(arr[i][j].main.temp_min<=mintemp[i]){mintemp[i]=arr[i][j].main.temp_min}
        
     }
   }
   console.log(maxtemp)
   console.log(mintemp)
   this.setState({maxtemp:maxtemp,mintemp:mintemp})
    const dailyData = forecast_res.list.filter(reading => reading.dt_txt.includes("12:00:00"))
    //console.log(dailyData)
    //const day1Data = forecast_res.list.slice(0,8).map((reading)=>reading)
    this.setState({dailyData: dailyData })

    //changing background theme according to color
      if(this.calcCelsius(response.main.temp)>16)
        this.setState({backgroundImage:"linear-gradient(to right, #fc4a1a, #f7b733)"})
      else
        this.setState({backgroundImage:"linear-gradient(to right, #B2FEFA, #0ED2F7)"})
    this.get_WeatherIcon(this.weathericon,response.weather[0].id);
    }
  }
    else{
      this.setState({error:true});
    }
  }
  
    Clicked=()=>{
      this.setState({fclick:!this.state.fclick})
    }
    GotWeather=()=>{
      this.setState({gclick:true})
    }
    showlogo=()=>{
      if(this.state.gclick===false)
      return <Logo />
    }
    
    formatDayCards=()=>{
      if(this.state.fclick===true)
      return (
        this.state.dailyData.map((reading, index) => <DayCard reading={reading} 
        key={index} dayview={this.Clicked} maxtemp={this.state.maxtemp[index]} mintemp={this.state.mintemp[index]}/>)
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
            
   calcCelsius(temp) {
    temp=Math.floor(temp-273.15);
    return temp;
    }

    componentDidMount(){
          this.setState({loaded:true})
    }
  render(){
    return ( 
       <>
        <div className="App" style={{backgroundImage:this.state.backgroundImage}}>
        <Form loadweather={this.getWeather} clicked={this.Clicked}
        error={this.state.error} gotweather={this.GotWeather} />
        <Weather city={this.state.city} 
        country={this.state.country}
        celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        desc={this.state.desc.toUpperCase()}
        weathericon={this.state.icon}/>
        {this.showlogo()}
        <div className="row justify-content-center">
        {this.formatDayCards()}
        </div>
        </div>
        <Footer style={{backgroundImage:this.state.backgroundImage}} />
      </> 
    );
  }
}

export default App;
