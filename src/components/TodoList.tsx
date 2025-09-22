import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import type { RootState } from "../store";

export default function TodoList() {
  const { todos, filter } = useSelector((state: RootState) => state.todos);

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
