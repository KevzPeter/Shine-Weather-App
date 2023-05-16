import React from 'react';
var moment = require('moment');

export const DayCard = (props) => {
  let newDate = new Date();
  const weekday = props.reading.dt * 1000
  newDate.setTime(weekday)
  var Id="wi-day-fog";
  const get_WeatherIcon=(rangeId)=> {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        Id="wi-thunderstorm"
        break;
      case rangeId >= 300 && rangeId <= 321:
        Id="wi-sleet"
        break;
      case rangeId >= 500 && rangeId <= 521:
        Id="wi-storm-showers"
        break;
      case rangeId >= 600 && rangeId <= 622:
        Id="wi-snow"
        break;
      case rangeId >= 701 && rangeId <= 781:
        Id="wi-fog"
        break;
      case rangeId === 800:
        Id="wi-day-sunny"
        break;
      case rangeId >= 801 && rangeId <= 804:
        Id="wi-day-fog"
        break;
      default:
        Id="wi-day-fog"
    }
  }
  get_WeatherIcon(props.reading.weather[0].id)
  return (
    <div className="col-sm-2 justify-content-center">
      <div className="tag card text-center" onClick={props.dayview}>
      <span class="badge badge-warning"><h3 className="card-title">{moment(newDate).format('dddd')}</h3></span>
        <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
        <h6 className="py-4">
               <i className={`wi ${Id} display-1`}></i>
           </h6>
        <h2>{Math.floor(props.reading.main.temp-273.15)}°C</h2>
        <h5>
        <span className="px-4">{Math.floor(props.maxtemp-273.15)}&deg;C</span>
        <span className="px-4">{Math.floor(props.mintemp-273.15)}&deg;C</span>
        </h5>
        <div className="card-body">
        <span class="badge badge-info"><p className="card-text">{props.reading.weather[0].description.toUpperCase()}</p></span>
        </div>
      </div>
    </div>
  )
}

