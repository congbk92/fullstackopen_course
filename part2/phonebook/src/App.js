import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      id: 0
    }
  ]) 
  const [newName, setNewName] = useState('')

  const addPeople = (event) => {
    event.preventDefault()
    const newPeopleExisted = persons.map(people => people.name).includes(newName)
    if (newPeopleExisted){
      alert(`${newName} is already added to phonebook`)
    } else {
      const people = {
        name: newName,
        id: persons.length
      }
      setPersons(persons.concat(people))
      setNewName('')
    }
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
      {persons.map(people => <p key={people.id}>{people.name}</p>)}
      <h1>debug: {newName}</h1>
    </div>
  )
}

export default App