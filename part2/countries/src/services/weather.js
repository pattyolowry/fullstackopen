import axios from 'axios'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (lat, lng) => {
    const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default {getWeather}