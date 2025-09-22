import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  setFilter,
  type FilterType,
} from "./store/todoSlice";
import { useState } from "react";
import type { RootState } from "./store";

export default function App() {
  const dispatch = useDispatch();
  const { todos, filter } = useSelector((state: RootState) => state.todos);
  const [text, setText] = useState("");

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="flex justify-center mt-10">
      <div className="w-[550px] shadow-lg bg-white">
        <h1 className="text-6xl text-center text-red-600 mb-6 font-thin">todos</h1>

        {/* Input */}
        <div className="border-b">
          <input
            type="text"
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 text-lg outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && text.trim() !== "") {
                dispatch(addTodo(text));
                setText("");
              }
            }}
          />
        </div>

        {/* List */}
        <ul>
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border-b px-4 py-3 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <input
                  placeholder="hello"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
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
          ))}
        </ul>

        {/* Footer */}
        <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-600">
          <span>{todos.filter((t) => !t.completed).length} items left!</span>
          <div className="flex gap-2">
            {(["all", "active", "completed"] as FilterType[]).map((f) => (
              <button
                key={f}
                className={`px-2 border rounded ${
                  filter === f ? "border-red-500" : "border-transparent"
                }`}
                onClick={() => dispatch(setFilter(f))}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={() => dispatch(clearCompleted())}>
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}
