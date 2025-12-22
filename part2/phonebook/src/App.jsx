import { useState, useEffect } from 'react'
import personService from './services/persons'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewPhone('')
      })
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
      <Search value={nameFilter} handler={handleNameFilter}/>
      <h2>Add New</h2>
      <PersonForm
        submissionHandler={addPerson}
        nameValue={newName}
        nameHandler={handleNameChange}
        phoneValue={newPhone}
        phoneHandler={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <PersonList persons={personsToShow} />
    </div>
  )
}

export default App