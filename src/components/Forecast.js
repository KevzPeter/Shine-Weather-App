import React, { useState, memo } from 'react';
import weathericon from "../config/weatherIcons.json";
var moment = require('moment');

const DayCard = (props) => {

  let icon = "";

  let newDate = new Date();
  const weekday = props.reading.dt * 1000
  newDate.setTime(weekday)

  const getWeatherIcon = (rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        icon = weathericon.Thunderstorm;
        break;
      case rangeId >= 300 && rangeId <= 321:
        icon = weathericon.Drizzle;
        break;
      case rangeId >= 500 && rangeId <= 521:
        icon = weathericon.Rain;
        break;
      case rangeId >= 600 && rangeId <= 622:
        icon = weathericon.Snow;
        break;
      case rangeId >= 701 && rangeId <= 781:
        icon = weathericon.Atmosphere;
        break;
      case rangeId === 800:
        icon = weathericon.Clear;
        break;
      case rangeId >= 801 && rangeId <= 804:
        icon = weathericon.Clouds;
        break;
      default:
        icon = weathericon.Clouds;
    }
  }

  getWeatherIcon(props.reading.weather[0].id)

  return (
    <div className={`daycard card-${icon}`}>
      <span className="day">{moment(newDate).format('dddd')}</span>
      <span className="month">{moment(newDate).format('MMMM')}</span>
      <span className="date">{moment(newDate).format('D')}</span>
      <span className="weather-icon-temp">
        <i className={`wi ${icon} display-4`}></i>
        <h2>{Math.floor(props.reading.main.temp - 273.15)}°C</h2>
      </span>
      <div className='high-low'>
        <div>
          <span>High</span>
          <span>{Math.floor(props.maxtemp - 273.15)}&deg;C</span>
        </div>
        <div>
          <span>Low</span>
          <span>{Math.floor(props.mintemp - 273.15)}&deg;C</span>
        </div>
      </div>
      <span className='description'>{props.reading.weather[0].description.toUpperCase()}</span>
    </div>
  )
}

export default memo(DayCard);