import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (lat, lng) => {
    const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lng}&appid=`)
    return request.then(response => response.data)
}

export default {getWeather}