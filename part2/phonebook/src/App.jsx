import { useState } from 'react'

const Person = ({person}) => {
  return (
    <div>
      {person.name} {person.phone}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '867-5309', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameExists = persons.some(person => person.name === newName)
    const phoneExists = persons.some(person => person.phone === newPhone)

    if (nameExists) {
      return (
        alert(`${newName} is already added to phonebook`)
      )
    } else if (newPhone && phoneExists) {
      return (
        alert(`${newPhone} is already added to phonebook`)
      )
    }

    const personObject = {
      name: newName,
      phone: newPhone,
      id: String(persons.length + 1)
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const handleNameFilter = (event) => {
    console.log(event.target.value)
    setNameFilter(event.target.value.toLowerCase())
  }

  const personsToShow = nameFilter
    ? persons.filter(person => person.name.toLowerCase().includes(nameFilter))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={nameFilter} onChange={handleNameFilter}/>
      </div>
      <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default App