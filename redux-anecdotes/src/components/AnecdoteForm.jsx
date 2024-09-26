import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAnecdoteCreation = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const anecdote = formData.get("anecdote");

    if (!anecdote) return;

    dispatch(createAnecdote(anecdote));
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
