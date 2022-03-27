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

const Notification = ({ notiMessage }) => {
  if (notiMessage === null) {
    return null
  }

  return (
    <div className={notiMessage.type}>
      {notiMessage.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [showPersons, setShowPerson] = useState([])
  const [notiMessage, setNotiMessage] = useState(null)

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
    const updatePeople = persons.filter(people => people.name === newName)
    console.log(updatePeople)
    if (updatePeople.length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        console.log("You pressed OK!");
        const newPeople = {
          name: newName,
          number: newNumber,
          id: updatePeople[0].id
        }

        dbService
        .update(newPeople.id, newPeople)
        .then(response => {
          console.log(response)
          setNotiMessage(
            {
              type: "info",
              message: `Update ${newPeople.name}`
            }
          )
          setTimeout(() => {
            setNotiMessage(null)
          }, 5000)
    
          const newPersons = persons.map(people => people.id === newPeople.id ? newPeople : people)
          setPersons(newPersons)
          setShowPerson(newPersons)
          setNewName('')
          setNewNumber('')
          setSearchText('')
        })
        .catch(error => {
          console.log("update fail")
          setNotiMessage(
            {
              type: "error",
              message: `Infomation of ${newPeople.name} has already been removed from server`
            }
          )
          setTimeout(() => {
            setNotiMessage(null)
          }, 5000)

          const newPersons = persons.filter(people => people.id !== newPeople.id)
          setPersons(newPersons)
          setShowPerson(newPersons)
          setNewName('')
          setNewNumber('')
          setSearchText('')

        })

      } else {
        console.log("You pressed Cancel!");
      }
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
      
      setNotiMessage(
        {
          type: "info",
          message: `Add ${people.name}`
        }
      )
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)

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
      const newPersons = persons.filter(people => people.id !== id)
      setPersons(newPersons)
      setShowPerson(newPersons)
      setNewName('')
      setNewNumber('')
      setSearchText('')
    })
    .catch(error => {
      console.log("delete fail")
      const deletePeople = persons.filter(people => people.id === id)
      setNotiMessage(
        {
          type: "error",
          message: `Infomation of ${deletePeople[0].name} has already been removed from server`
        }
      )
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)

      const newPersons = persons.filter(people => people.id !== id)
      setPersons(newPersons)
      setShowPerson(newPersons)
      setNewName('')
      setNewNumber('')
      setSearchText('')

    })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notiMessage={notiMessage} />
      <Input text="filter shown with:" value={searchText} handleOnChange={handleSearchTextChange}/>
      <AddForm onSubmit={addPeople} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <ShowPhoneBook personsToShow={showPersons} onDelete={onDelete}/>
    </div>
  )
}

export default App