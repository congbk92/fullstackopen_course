import { useState } from 'react'


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

const ShowPeople = ({people}) => {
  return (
    <div>
      <p>{people.name} {people.number}</p>
    </div>
  )
}

const ShowPhoneBook = ({personsToShow}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map(people => <ShowPeople key={people.id} people={people}/>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showWith, setNewShowWith] = useState('')

  const addPeople = (event) => {
    event.preventDefault()
    const newPeopleExisted = persons.map(people => people.name).includes(newName)
    if (newPeopleExisted){
      alert(`${newName} is already added to phonebook`)
    } else {
      const people = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(people))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShowWithChange = (event) => {
    setNewShowWith(event.target.value)
  }

  const personsToShow = persons.filter(people => people.name.toLowerCase().includes(showWith.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Input text="filter shown with:" value={showWith} handleOnChange={handleShowWithChange}/>
      <AddForm onSubmit={addPeople} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <ShowPhoneBook personsToShow={personsToShow}/>
    </div>
  )
}

export default App