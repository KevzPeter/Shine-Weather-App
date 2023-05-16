import { useState } from "react";
import React from 'react';
import "../styles/form.css";
export const Form = props => {

    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    return (
        <div className="container my-4">
            <div>{props.error ? error() : null}</div>
            <form onSubmit={e => null} method="post">
                <div className="row justify-content-center" >
                    <div className=" col-md-3 py-2 offset-md-1">
                        <input type="text" className="form-control" name="city" autoComplete="off" placeholder="City" onChange={e => setCity(e.target.value)} />
                    </div>
                    <div className="col-md-3 py-2">
                        <input type="text" className="form-control" name="country" autoComplete="off" placeholder="Country" onChange={e => setCountry(e.target.value)} />
                    </div>
                    <div className="col-md-2 py-2 offset-md-1 text-center">
                        <button className="btn btn-warning" onClick={e => props.getWeather(e, city, country)}><i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </form>
        </div>
    )
};

function error() {
    return (
        <div className="alert alert-danger mx-5 my-4" role="alert">
            Enter valid City and Country
        </div>
    );
}

