import { useDispatch, useSelector } from "react-redux";
import { clearCompleted, setFilter, type FilterType } from "../store/todoSlice";
import type { RootState } from "../store";

export default function TodoFooter() {
  const dispatch = useDispatch();
  const { todos, filter } = useSelector((state: RootState) => state.todos);

  const remaining = todos.filter((t) => !t.completed).length;

  // Nếu không có todo nào, không render footer
  if (todos.length === 0) return null;

  return (
    <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-600 bg-white border-b relative">
      {/* Shadow layers lòi ra phía sau */}
      <div className="absolute -bottom-1 left-1 right-1 h-1 bg-white border-x border-b border-[#e6e6e6] opacity-80"></div>
      <div className="absolute -bottom-2 left-2 right-2 h-1 bg-white border-x border-b border-[#e6e6e6] opacity-60"></div>
      <span className="w-24 flex-shrink-0">
        {remaining} {remaining === 1 ? "item" : "items"} left!
      </span>
      <div className="flex gap-2">
        {(["all", "active", "completed"] as FilterType[]).map((f) => (
          <button
            key={f}
            className={`px-2 border rounded transition-all duration-300 ${filter === f
              ? "border-[#ce4646] focus:shadow-[0_0_15px_rgba(206,70,70,0.4)]"
              : "border-transparent hover:border-[#ce4646]"
              }`}
            onClick={() => dispatch(setFilter(f))}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <button onClick={() => dispatch(clearCompleted())} className="hover:underline">
        Clear completed
      </button>
    </div>
  );
}
