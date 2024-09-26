import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import { createNew } from "../../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAnecdoteCreation = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const anecdote = formData.get("anecdote");

    if (!anecdote) return;

    const newAnecdote = await createNew(anecdote)

    dispatch(appendAnecdote(newAnecdote));
  };

  return (
    <form onSubmit={handleAnecdoteCreation}>
      <h2>create new</h2>
      <div>
        <input type="text" name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm
