const Person = ({person}) => {
  return (
    <div>
      {person.name} {person.phone}
    </div>
  )
}

const PersonList = ({persons}) => {
    return persons.map(person => <Person key={person.name} person={person} />)
}

export default PersonList