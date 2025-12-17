import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = ({anecdote, votes}) => (
  <>
    {anecdote}<br/>
    has {votes} votes<br/>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6:0, 7:0 })
  const [mostVotes, setMost] = useState({index: 0, votes: 0})


  const handleNext = () => {
    let randomNumber = Math.floor(Math.random() * 8)
    setSelected(randomNumber)
  }

  const handleVote = () => {
    const votesCopy = {...votes}
    votesCopy[selected] += 1
    setVotes(votesCopy)
    if (votesCopy[selected] > mostVotes.votes) {
      setMost({index: selected, votes: votesCopy[selected]})
    }
  }

  return (
    <div>
      <h2>Anecote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected] }/>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNext} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={anecdotes[mostVotes.index]} votes={mostVotes.votes }/>
    </div>
  )
}

export default App