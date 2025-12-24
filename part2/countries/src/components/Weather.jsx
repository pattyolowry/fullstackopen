const Weather = ({weather}) => {
    if (!weather) {
        return null
    } else {
        return (
            <div>
                <h2>Weather in {weather.city}</h2>
                Temperature {weather.temperature} Celcius<br/>
                <img src={weather.icon} alt='weather icon' /><br/>
                Wind {weather.wind} m/s
            </div>
        )
    }
}

export default Weather