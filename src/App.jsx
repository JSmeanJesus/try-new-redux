import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import NewTodoForm from "./components/NewTodoForm";
import { addNewTodo, fetchTodos } from "./store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.todos);

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="App">
      <NewTodoForm
        value={text}
        updateText={setText}
        handleAction={handleAction}
      />
      {status === "loading" && <h3>loading...</h3>}
      {error && <h3>{error}</h3>}

      <TodoList />
    </div>
  );
}

export default App;
