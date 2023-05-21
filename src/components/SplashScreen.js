import React from 'react'
import sunny from '../svg/sunny.svg'
export const SplashScreen = () => {
    return (
        <div className="text-center" style={{ marginTop: "10rem" }}>
            <h1><img height="200px" width="auto" src={sunny} alt="logo" className="sun">
            </img> <span className="title">Shine</span></h1>
        </div>
    )
}