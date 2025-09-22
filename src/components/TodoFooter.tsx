import { useDispatch, useSelector } from "react-redux";
import { clearCompleted, setFilter, type FilterType } from "../store/todoSlice";
import type { RootState } from "../store";

export default function TodoFooter() {
  const dispatch = useDispatch();
  const { todos, filter } = useSelector((state: RootState) => state.todos);

  return (
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
  );
}
