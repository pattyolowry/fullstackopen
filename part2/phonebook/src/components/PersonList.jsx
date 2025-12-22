const Person = ({person, deletePerson}) => {
  return (
    <div>
      {person.name} {person.phone}
      <button onClick={deletePerson}>{'delete'}</button>
    </div>
  )
}

const PersonList = ({persons, deletePerson}) => {
    return persons.map(person =>
        <Person
            key={person.name}
            person={person}
            deletePerson={() => deletePerson(person)}
        />)
}

export default PersonList