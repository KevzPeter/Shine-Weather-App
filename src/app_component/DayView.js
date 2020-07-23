import React  from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid, Tooltip} from 'recharts'


export const DayView=(props)=>{
    
    const data=JSON.parse(props.reading)
    
    return (
        <div className="graph">
        <AreaChart width={600} height={300} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="dt_txt"/>
        <YAxis />
        <Tooltip/>
        <Area type='monotone' dataKey='main.temp' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
      </div>
    )

}