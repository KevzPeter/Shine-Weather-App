import React from 'react';

export const Weather = (props)=>{
    return (
        <div className="container justify-content-center" >
       <div className="cards pt-4 text-center">
        <h1>{props.city}</h1>
           <h5 className="py-4">
               <i className={`wi ${props.weathericon} display-1`}></i>
           </h5>
            {props.celsius?(<h1 className="py-2">{props.celsius}&deg;</h1>):null}
           {minmax(props.temp_min,props.temp_max)}
           <h4 className="py-3">{props.desc}</h4>
       </div>
       </div>
    );
}

function minmax(min,max){
        if(min&&max){
            return(
                <h3>
                    <span className="px-4">{min}&deg;</span>
                    <span className="px-4">{max}&deg;</span>
                </h3>
            );
        }
   
}
