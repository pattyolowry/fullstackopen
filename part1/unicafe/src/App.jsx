import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      good {good}<br/>
      neutral {neutral}<br/>
      bad {bad}<br/>
      all {good + neutral + bad}<br/>
      average {(good - bad) / (good + neutral + bad)}<br/>
      positive {good / (good + neutral + bad) * 100} %
    </div>
  )
}

export default App