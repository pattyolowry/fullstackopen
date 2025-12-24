import { useState, useEffect } from 'react'
import CountryInput from './components/CountryInput'
import CountryList from './components/CountryList'
import Weather from './components/Weather'
import countryService from './services/country'
import weatherService from './services/weather'

const App =() => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    console.log('effect run, fetching countries')
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
        console.log('countries fetched')
      })
  }, [])

  useEffect(() => {
    if (results.length === 1) {
      console.log('country selected, fetch weather')
      const lat = results[0].capitalInfo.latlng[0]
      const lng = results[0].capitalInfo.latlng[1]
      weatherService
        .getWeather(lat, lng)
        .then(response => {
          console.log(response)
          const temperature = response.main.temp
          const icon = response.weather[0].icon
          const city = results[0].capital[0]
          const wind = response.wind.speed
          setWeather({
            city: city,
            temperature: temperature,
            wind: wind,
            icon: `https://openweathermap.org/img/wn/${icon}@2x.png`
          })
        })
    } else {
      setWeather(null)
    }
  }, [results])

  const handleCountry = (event) => {
    const newCountry = event.target.value.toLowerCase()
    setCountry(newCountry)
    console.log(`country is '${newCountry}'`)
    const countriesToShow = newCountry
      ? countries.filter(c => c.name.common.toLowerCase().includes(newCountry))
      : []
    setResults(countriesToShow)
  }

  const handleShow = (countryName) => {
    console.log('button clicked')
    console.log(countryName)
    const countriesToShow = countryName
      ? countries.filter(c => c.name.common === countryName)
      : []
    console.log(countriesToShow)
    setResults(countriesToShow)
  }

  return (
    <div>
      <CountryInput value={country} handler={handleCountry} />
      <CountryList countries={results} buttonHandler={handleShow} />
      <Weather weather={weather} />
    </div>
  )
}

export default App
