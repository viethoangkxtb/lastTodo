import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, type Todo } from "../store/todoSlice";

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();

  return (
    <li className="flex items-center justify-between border-b px-4 py-3 hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
          placeholder="hello"
        />
        <span
          className={`text-xl ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="text-red-500"
      >
        ✖
      </button>
    </li>
  );
}
