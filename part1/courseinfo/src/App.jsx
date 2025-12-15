const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0]} exercises={props.exercises[0]} />
      <Part name={props.parts[1]} exercises={props.exercises[1]} />
      <Part name={props.parts[2]} exercises={props.exercises[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.numExercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
      <Total numExercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App