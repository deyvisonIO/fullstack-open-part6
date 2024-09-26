import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { getAll } from '../services/anecdotes'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))  
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
