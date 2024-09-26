import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'



const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdote = {
    content: content,
    id: getId(),
    votes: 0
  }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const vote = async (id) => {
  const anecdote = await axios.get(baseUrl + "/" + id);
  anecdote.data.votes++;
  const updatedAnecdote = await axios.put(baseUrl + "/" + id, anecdote.data)
  return updatedAnecdote.data
}

export { getAll, createNew, vote }
