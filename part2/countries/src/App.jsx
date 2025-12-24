import { useState, useEffect } from 'react'
import CountryInput from './components/CountryInput'
import CountryList from './components/CountryList'
import countryService from './services/country'

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
    </div>
  )
}

export default App
