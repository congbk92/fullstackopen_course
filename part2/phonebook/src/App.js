import { useState } from 'react'

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
      <form onSubmit={addPeople}>
        <div>
          filter shown with: <input value={showWith} onChange={handleShowWithChange}/>
        </div>
        <h2>Add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(people => <p key={people.id}>{people.name} {people.number}</p>)}
    </div>
  )
}

export default App