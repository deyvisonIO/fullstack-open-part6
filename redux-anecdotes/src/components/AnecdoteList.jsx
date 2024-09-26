import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter.trim().length > 0) {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase()),
      );
    }

    return state.anecdotes;
  });
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(notify(`you voted '${content}'`, 1000))
  };

  return (
    <div>
      {anecdotes
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
