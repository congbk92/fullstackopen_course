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
    alignItems: "center"
  }
  return (
    <div style={myStyle}>
      <p>{country.name.common}</p>
      <button onClick={() => showDetailHandler(country)}>show</button>
    </div>
  )
}

const ShowCountryDetail = ({country}) => {
  console.log(Object.values(country.languages))
  console.log(country.flags.png)
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