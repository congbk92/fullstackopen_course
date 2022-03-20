import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPeople = (event) => {
    event.preventDefault()
    const people = {
      name: newName,
    }
    setPersons(persons.concat(people))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPeople}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(people => <p>{people.name}</p>)}
      <h1>debug: {newName}</h1>
    </div>
  )
}

export default App