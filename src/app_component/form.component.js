import React from 'react';
import "./form.style.css";
export const Form = props=>{
    return(
        <div className="container">
            <div>{props.error?error():null}</div>
            <form onSubmit={props.loadweather}>
            <div className="row justify-content-center" >
                <div className="col-md-3 offset-md-1">
                    <input type="text" className="form-control"name="city" autoComplete="off" placeholder="City"/>
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control"name="country" autoComplete="off"placeholder="Country"/>
                </div>
                <div className="col-md-2 pt-2 offset-md-1 text-center">
                    <button className="btn btn-warning">Get Weather</button>
                </div>
                <div className="col-md-2 pt-2 text-center">
                    <button className="btn btn-warning" onClick={props.clicked}>5 day Forecast</button>
                </div>
            </div>
            </form>
        </div>
    )
};

function error(){
    return (
            <div className="alert alert-danger mx-5" role="alert">
                Please Enter Correct City and Country
            </div>
    );
}

