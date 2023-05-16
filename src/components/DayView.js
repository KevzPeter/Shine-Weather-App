import React  from 'react'
import {AreaChart,Area,XAxis,YAxis,Tooltip} from 'recharts'


export const DayView=(props)=>{
    
    if(props.reading!=null)
    {
        var i=0;
        var j=0;
    const data2=  JSON.parse(props.reading)
        data2.forEach(element => {
            element.temp=Math.floor(element.temp-273.15)
            if(i<12)
            {   
                if(i===0){ element.dt="12am"}
                else{element.dt=i+"am"}
                
            }
            else{
                element.dt=j+"pm"
                j++;
            }
            
            i++
        });
        console.log(data2)
    
    return (
      <div className="graph justify-content-center py-3">
                <AreaChart width={300} height={200} data={data2}>
                <XAxis dataKey="dt"/>
                <YAxis />
                <Tooltip/>
                <Area type='monotone' dataKey='temp' stroke='#673AB7' fill='white' />
                <Area type="monotone" dataKey="rain.1h" stackId="1" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
      </div>
    )
    }
    else
    return(<div className="justify-content-center py-3">
        <h4 className="text-center">Please provide location access for hourly data</h4>
        </div>)

}