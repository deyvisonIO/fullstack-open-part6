import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notify = useNotificationDispatch(); 

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notify({ type: "SET_NOTIFICATION", payload: "anecdote " + newAnecdote.content + " created" })
      setTimeout(() => notify({ type: "CLEAR"}), 5000)
    },
    onError: (error) => {
      console.log("error:", error)
      notify({ type: "SET_NOTIFICATION", payload: error?.response?.data?.error ?? error.message })
      setTimeout(() => notify({ type: "CLEAR"}), 5000)
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 }) 
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
