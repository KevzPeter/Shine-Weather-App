import React from 'react';

export const Weather = (props) => {
    return (
        <div className="container justify-content-center" >
            <div className="cards pt-4 text-center">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.weathericon} display-1`}></i>
                </h5>
                {props.celsius ? (<h1 className="py-2">{props.celsius}&deg;C</h1>) : null}
                {MinMax(props.temp_min, props.temp_max)}
                <h4 className="py-3">{props.desc}</h4>
            </div>
        </div>
    );
}

const MinMax = (min, max) => {
    if (min && max) {
        return (
            <h5>
                <span className="px-4"><i className="fa fa-thermometer-full" aria-hidden="true"></i> {max}&deg;C</span>
                <span className="px-4"><i className="fa fa-thermometer-quarter" aria-hidden="true"></i> {min}&deg;C</span>
            </h5>
        );
    }

}
