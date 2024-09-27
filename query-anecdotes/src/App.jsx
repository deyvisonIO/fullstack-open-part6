import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useNotificationDispatch } from './components/NotificationContext'


const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  const notify = useNotificationDispatch(); 

  const queryClient = useQueryClient();
  
  const voteAnecdoteMutation = useMutation({ 
    mutationFn: voteAnecdote,
    onSuccess: (votedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (prev) => {
        const newAnecdotes = prev.map(i => i.id === votedAnecdote.id ? votedAnecdote : i)
        return newAnecdotes
      })
      notify({ type: "SET_NOTIFICATION", payload: "anecdote " + votedAnecdote.content + " voted" })
      setTimeout(() => notify({ type: "CLEAR"}), 5000)
    }
  })

  const handleVote = (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1} 
    voteAnecdoteMutation.mutate(newAnecdote)
  }

  if(result.isLoading) {
    return <div>loading data...</div>
  }

  if(result.error) {
    return <div>An error ocurred with the server</div>
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default App
