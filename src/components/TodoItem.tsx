import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, type Todo } from "../store/todoSlice";

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();

  return (
    <li className="group flex items-center justify-between border-b border-[#e6e6e6] px-4 py-3 bg-white">
      <div className="flex items-center gap-3">
        {/* custom checkbox */}
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
            className="peer sr-only"
            aria-label={`Toggle ${todo.text}`}
          />

          <span
            className={`
          w-6 h-6 rounded-full border-2 
          flex items-center justify-center
          transition-all duration-150
          bg-white
          ${todo.completed ? "border-[#bddad5]" : "border-[#ededed]"}
        `}
          >
            <svg
              className={`w-4 h-4 text-[#5dc2af] transition-opacity duration-150 ${todo.completed ? "opacity-100" : "opacity-0"
                }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </label>

        {/* text */}
        <span
          className={`text-xl ${todo.completed ? "line-through text-gray-400" : ""
            }`}
        >
          {todo.text}
        </span>
      </div>

      {/* delete */}
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="opacity-0 group-hover:opacity-100 transition duration-200 
       text-gray-500 hover:text-red-400"
      >
        ✖
      </button>
    </li>

  );
}
