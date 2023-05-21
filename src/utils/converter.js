import weathericon from "../config/weatherIcons.json";

export const convertKelvinToCelsius = (temp) => {
    temp = Math.floor(temp - 273.15);
    return temp;
}

export const getWeatherIcon = (rangeId) => {
    switch (true) {
        case rangeId >= 200 && rangeId < 232:
            return weathericon.Thunderstorm;
        case rangeId >= 300 && rangeId <= 321:
            return weathericon.Drizzle;
        case rangeId >= 500 && rangeId <= 521:
            return weathericon.Rain;
        case rangeId >= 600 && rangeId <= 622:
            return weathericon.Snow;
        case rangeId >= 701 && rangeId <= 781:
            return weathericon.Atmosphere;
        case rangeId === 800:
            return weathericon.Clear;
        case rangeId >= 801 && rangeId <= 804:
            return weathericon.Clouds;
        default:
            return weathericon.Clouds;
    }
}