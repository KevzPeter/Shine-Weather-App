import React from 'react';
import { getWeatherIcon } from '../utils/converter';
import Mountains from "../assets/mountain.png"

export const Weather = ({ data }) => {
    const icon = getWeatherIcon(data.iconID);

    return (
        <div className={`summary`}>
            <div className="weather-data">
                <h2 className='city'>{data.city}</h2>
                <span className="py-3">{data.description}</span>
                <div className='weather-stats'>
                    <i className={`wi wi-owm-${data.iconID} display-1`}></i>
                    <span className='display-4'>{data.temp}&deg;C</span>
                </div>
            </div>
            <div className='misc'>
                <h3>Overview</h3>
                <div>
                    <span><i className={`fa fa-solid fa-wind`}></i>&nbsp;{data.windSpeed} km/h</span>
                    <span><i className="wi wi-humidity"></i>&nbsp;{data.humidity}%</span>
                </div>
                <div>
                    <span><i className="fa fa-thermometer-full" aria-hidden="true"></i> {data.maxTemp}&deg;C</span>
                    <span><i className="fa fa-thermometer-quarter" aria-hidden="true"></i> {data.minTemp}&deg;C</span>
                </div>
                <div>
                    <span><i className="wi wi-sunrise"></i>&nbsp;{data.sunrise}</span>
                    <span><i className="wi wi-sunset"></i>&nbsp;{data.sunset}</span>
                </div>
            </div>
            <div className='mountains'>
                <img src={Mountains} alt="Mountains" />
            </div>
        </div>
    );
}
