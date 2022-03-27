import { useState, useEffect } from 'react'
import axios from 'axios'

const Input = ({text, value, handleOnChange}) => {
  return (
    <div>
      {text} <input value={value} onChange={handleOnChange}/>
    </div>
  )
}

const ShowCountryInShort = ({country, showDetailHandler}) => {
  const myStyle = {
    display : "flex",
    flexDirection: "row",
    alignItems: "center",
    lineHeight: "1px"
  }
  return (
    <div style={myStyle}>
      <p>{country.name.common}</p>
      <button onClick={() => showDetailHandler(country)}>show</button>
    </div>
  )
}

const ShowWeatherInfo = ({weatherInfo}) => {
  const {city, temperature, wind, icon} = weatherInfo
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
  console.log("iconURL", iconURL)
  return (
    <div>
    <h3>Weather in {city}</h3>
    <p>temperature {temperature} Celcius</p>
    <img src={iconURL} alt="weather icon"/>
    <p>wind {wind} m/s</p>
    </div>
  )
}

const ShowCountryDetail = ({country}) => {
  console.log("Country info" , country)
  const [weatherInfo, setWeatherInfo] = useState({})
  const [lat, long] = country.capitalInfo.latlng
  const api_key = process.env.REACT_APP_OPEN_WEATHER_API_KEY
  const getWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`

  useEffect(() => {
    console.log("effect")
    axios
      .get(getWeatherAPI)
      .then(respone => {
        console.log('get weather promise fulfilled')
        console.log("Weather info" , respone.data)
        const newWeatherInfo = {
          city: respone.data.name,
          temperature: (respone.data.main.temp - 273.15).toFixed(2), // convert f to c
          wind: respone.data.wind.speed,
          icon: respone.data.weather[0].icon
        }
        setWeatherInfo(newWeatherInfo)
      })
  }, [getWeatherAPI])

  return (
    <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map((lang, idx) => <li key={idx}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt="new"/>
        <ShowWeatherInfo weatherInfo={weatherInfo}/>
    </div>
  )
}

const ShowCountries = ({countries, showDetailHandler}) => {
  if (countries.length === 1){
    return (
      <div>
        <ShowCountryDetail country={countries[0]}/>
      </div>
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map(country => <ShowCountryInShort key={country.cca3} country={country} showDetailHandler={showDetailHandler}/>)}
      </div>
    )
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

const App = () => {
  const [allCountries, setAllCountries] = useState('')
  const [searchText, setSearchText] = useState('')
  const [showCountries, setShowCountries] = useState([])
  
  useEffect(() => {
    console.log("effect")
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(respone => {
        console.log('promise fulfilled')
        setAllCountries(respone.data)
        setShowCountries(respone.data)
      })
  }, [])

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value)
    const countriesToShow = allCountries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setShowCountries(countriesToShow)
  }
 
  const handleShowCountryDetail = (countryToShowDetail) => {
    console.log("handleShowCountryDetail")
    console.log(countryToShowDetail)
    const countriesToShow = allCountries.filter(country => country.cca3 === countryToShowDetail.cca3)
    setShowCountries(countriesToShow)
  }

  return (
    <div>
      <Input text="find countries" value={searchText} handleOnChange={handleSearchTextChange}/>
      <ShowCountries countries={showCountries} showDetailHandler={handleShowCountryDetail}/>
    </div>
  )
}

export default App