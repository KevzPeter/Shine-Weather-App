import React, { memo } from 'react';
import { getWeatherIcon } from '../utils/converter';
const moment = require('moment');


const DayCard = (props) => {

  const icon = getWeatherIcon(props.reading.weather[0].id);

  let newDate = new Date();
  const weekday = props.reading.dt * 1000
  newDate.setTime(weekday);
  const day = moment(newDate).format('dddd');
  const month = moment(newDate).format('MMMM');
  const date = moment(newDate).format('D');
  const iconID = props.reading.weather[0].id;

  return (
    <div className={`daycard card-${icon}`}>
      <span className="day">{day}</span>
      <span className="month">{month}</span>
      <span className="date">{date}</span>
      <span className="weather-icon-temp">
        <i className={`wi wi-owm-${iconID} display-4`}></i>
      </span>
      <div className='high-low'>
        <div>
          <span>High</span>
          <span>{Math.floor(props.dailyMaxTemp - 273.15)}&deg;C</span>
        </div>
        <div>
          <span>Low</span>
          <span>{Math.floor(props.dailyMinTemp - 273.15)}&deg;C</span>
        </div>
      </div>
      <span className='description'>{props.reading.weather[0].description.toUpperCase()}</span>
    </div>
  )
}

export default memo(DayCard);