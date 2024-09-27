import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes" 


export const getAnecdotes = () => {
  return axios.get(baseUrl).then(response => response.data) 
}

export const createAnecdote = newAnecdote => {
  return axios.post(baseUrl, newAnecdote).then(response => response.data) 
}

export const voteAnecdote = updatedAnecdote => {
  return axios.put(baseUrl + "/" + updatedAnecdote.id, updatedAnecdote).then(response => response.data) 
}
