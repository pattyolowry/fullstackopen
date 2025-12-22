import { useState, useEffect } from 'react'
import CountryInput from './components/CountryInput'
import CountryList from './components/CountryList'
import countryService from './services/country'

const App =() => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    console.log('effect run, fetching countries')
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])

  const handleCountry = (event) => {
    const newCountry = event.target.value
    console.log(`country is '${newCountry}'`)
    setCountry(event.target.value.toLowerCase())
  }

  const countriesToShow = country
    ? countries.filter(c => c.name.common.toLowerCase().includes(country))
    : []

  return (
    <div>
      <CountryInput value={country} handler={handleCountry} />
      <CountryList countries={countriesToShow} />
    </div>
  )
}

export default App
