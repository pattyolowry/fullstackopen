const Country = ({name, country, buttonHandler}) => {
    if (!country) {
        return (
            <div>
                {name} <button onClick={() => {buttonHandler(name)}}>Show</button>
            </div>
        )
    }
    const languages = Object.values(country.languages)
    return (
        <div>
            <h1>{name}</h1>
            Capital {country.capital}<br/>
            Area {country.area}
            <h2>Languages</h2>
            <ul>
                {languages.map(l => <li key={l}>{l}</li>)}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${name}`} />
        </div>
    )
}

const CountryList = ({countries, buttonHandler}) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length > 1) {
        return (
            countries.map(country =>
                <Country
                    key={country.name.common}
                    name={country.name.common}
                    country={null}
                    buttonHandler={buttonHandler}
                />)
        )
    } else if (countries.length === 1) {
        return (
            countries.map(country =>
                <Country
                    key={country.name.common}
                    name={country.name.common}
                    country={country}
                />)
        )
    } else {
        return null
    }
}

export default CountryList