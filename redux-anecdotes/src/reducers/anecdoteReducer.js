import { createSlice } from "@reduxjs/toolkit"
import { createNew, getAll, vote } from "../../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const anecdoteIndex = state.findIndex(anecdote => anecdote.id === action.payload.id)
      state[anecdoteIndex] = action.payload;
      state.sort((a,b) => b.votes - a.votes)
    }
  }
})


export const { incrementVote, setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {    
    const notes = await getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await vote(id)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}


export default anecdoteSlice.reducer
