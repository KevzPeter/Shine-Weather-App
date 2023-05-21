import { useState } from "react";
import React from 'react';
import "../styles/form.css";
export const Form = props => {

    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    return (
        <form className="form-container" onSubmit={e => null} method="post">
            <div>
                <input type="text" className="form-control" name="city" autoComplete="off" placeholder="City" onChange={e => setCity(e.target.value)} />
            </div>
            <div>
                <input type="text" className="form-control" name="country" autoComplete="off" placeholder="Country" onChange={e => setCountry(e.target.value)} />
            </div>
            <div>
                <button className="btn-circle" onClick={e => props.getWeather(e, city, country)}><i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </form>
    )
};

