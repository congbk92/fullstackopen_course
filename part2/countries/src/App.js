import { useState, useEffect } from 'react'
import axios from 'axios'

const Input = ({text, value, handleOnChange}) => {
  return (
    <div>
      {text} <input value={value} onChange={handleOnChange}/>
    </div>
  )
}

const ShowCountryName = ({country}) => {
  return (
    <div>
      <p>{country.name.common}</p>
    </div>
  )
}

const ShowCountry = ({country}) => {
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

const ShowCountries = ({countries}) => {
  console.log(countries)
  if (countries.length === 1){
    return (
      <div>
        <ShowCountry country={countries[0]}/>
      </div>
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map(country => <ShowCountryName key={country.cca3} country={country}/>)}
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
  const [countries, setCountries] = useState([]) 
  const [showWith, setNewShowWith] = useState('')
  
  useEffect(() => {
    console.log("effect")
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(respone => {
        console.log('promise fulfilled')
        setCountries(respone.data)
      })
  }, [])

  const handleShowWithChange = (event) => {
    setNewShowWith(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(showWith.toLowerCase()))

  return (
    <div>
      <Input text="find countries" value={showWith} handleOnChange={handleShowWithChange}/>
      <ShowCountries countries={countriesToShow}/>
    </div>
  )
}

export default App