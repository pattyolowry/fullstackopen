import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      const updatedState = state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
      return updatedState.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes, createAnecdote, addVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes)))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVote(id)
    dispatch(addVote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
