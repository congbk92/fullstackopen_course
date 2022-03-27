import { useState, useEffect } from 'react'
import dbService from './services/persons'

const Input = ({text, value, handleOnChange}) => {
  return (
    <div>
      {text} <input value={value} onChange={handleOnChange}/>
    </div>
  )
}

const AddForm = ({onSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Add a new</h2>
      <Input text="name:" value={newName} handleOnChange={handleNameChange}/>
      <Input text="number:" value={newNumber} handleOnChange={handleNumberChange}/>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const ShowPeople = ({people, onDelete}) => {
  const myStyle = {
    display : "flex",
    flexDirection: "row",
    alignItems: "center",
    lineHeight: "1px"
  }

  return (
    <div style={myStyle}>
      <p>{people.name} {people.number}</p>
      <button onClick={() => onDelete(people.id)}>delete</button>
    </div>
  )
}

const ShowPhoneBook = ({personsToShow, onDelete}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map(people => <ShowPeople key={people.id} people={people} onDelete={onDelete}/>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [showPersons, setShowPerson] = useState([])

  useEffect(() => {
    console.log("effect")
    dbService
      .getAll()
      .then(respone => {
        console.log('promise fulfilled')
        setPersons(respone.data)
        setShowPerson(respone.data)
      })
  }, [])

  const addPeople = (event) => {
    event.preventDefault()
    const newPeopleExisted = persons.map(people => people.name).includes(newName)
    if (newPeopleExisted){
      alert(`${newName} is already added to phonebook`)
    } else {
      const people = {
        name: newName,
        number: newNumber,
        id: Math.max(...persons.map(people => people.id)) + 1
      }

      dbService
      .create(people)
      .then(response => {
        console.log(response)
      })

      const newPersons = persons.concat(people)
      setPersons(newPersons)
      setShowPerson(newPersons)
      setNewName('')
      setNewNumber('')
      setSearchText('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTextChange = (event) => {
    const newSearchText = event.target.value
    setSearchText(newSearchText)
    const personsToShow = persons.filter(people => people.name.toLowerCase().includes(newSearchText.toLowerCase()))
    setShowPerson(personsToShow) 
  }

  const onDelete = (id) => {
    console.log("delete", id)
    dbService
    .remove(id)
    .then(() => {
      console.log("Finish delete")
    })

    const newPersons = persons.filter(people => people.id !== id)
    setPersons(newPersons)
    setShowPerson(newPersons)
    setNewName('')
    setNewNumber('')
    setSearchText('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input text="filter shown with:" value={searchText} handleOnChange={handleSearchTextChange}/>
      <AddForm onSubmit={addPeople} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <ShowPhoneBook personsToShow={showPersons} onDelete={onDelete}/>
    </div>
  )
}

export default App