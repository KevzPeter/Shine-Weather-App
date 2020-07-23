import React from 'react';
var moment = require('moment');

export const DayCard = (props) => {
  let newDate = new Date();
  const weekday = props.reading.dt * 1000
  newDate.setTime(weekday)
  
  
  return (
    <div className="col-sm-2 justify-content-center">
      <div className="tag card text-center" onClick={props.dayview}>
        <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
        <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
        <h2>{Math.floor(props.reading.main.temp-273.15)}°C</h2>
        <div className="card-body">
          <p className="card-text">{props.reading.weather[0].description.toUpperCase()}</p>
        </div>
      </div>
    </div>
  )
}

