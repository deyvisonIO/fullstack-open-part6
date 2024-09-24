import { useSelector, useDispatch } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if(state.filter.trim().length > 0) {
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }

    return state.anecdotes
  })
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(incrementVote(id))
  }

  return (
    <div>
    {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </div>
  );
};

export default AnecdoteList
