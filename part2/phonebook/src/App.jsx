import { useState, useEffect } from 'react'
import personService from './services/persons'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

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
    const person = persons.find(p => p.name === newName)
    const phoneExists = persons.some(person => person.number === newPhone)

    if (person) {
      if (window.confirm(`${person.name} is already added to phonebook. Replace the old number with a new one?`)) {
        console.log(`Update number for ${person.name} to ${newPhone}`)
        const changedPerson = {...person, number: newPhone}
        console.log(changedPerson)
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
            setNewName('')
            setNewPhone('')
            setNotificationMessage(`Updated ${returnedPerson.name} `)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
    } else if (newPhone && phoneExists) {
      return (
        alert(`${newPhone} is already added to phonebook`)
      )
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
          setNotificationMessage(`Added ${returnedPerson.name} `)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
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

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log(`person id ${person.id} needs to be deleted`)
      personService
        .deleteOne(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    } else {
      console.log('cancelled delete')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
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
      <PersonList
        persons={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App