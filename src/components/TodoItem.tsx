import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, updateTodo, type Todo } from "../store/todoSlice";

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const liRef = useRef<HTMLLIElement>(null);

  const handleSave = () => {
    const trimmedText = text.trim(); // trim đầu cuối
    if (trimmedText === "") return;   // nếu rỗng thì không lưu
    dispatch(updateTodo({ id: todo.id, text: trimmedText })); // lưu text đã trim
    setEditing(false);
  };

  const handleCancel = useCallback(() => {
    setText(todo.text);
    setEditing(false);
  }, [todo.text]);

  // Click ra ngoài li sẽ hủy edit
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editing && liRef.current && !liRef.current.contains(event.target as Node)) {
        handleCancel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editing, handleCancel]);

  return (
    <li
      ref={liRef}
      className={`group flex items-center justify-between border px-4 py-3 bg-white transition-colors duration-200 ${editing ? "border-[#AF2F2F]" : "border-[#e6e6e6]"
        }`}
      onDoubleClick={(e) => {
        const target = e.target as HTMLElement;
        // Nếu target là label, input hoặc button thì bỏ qua
        if (target.tagName === "LABEL" || target.tagName === "INPUT" || target.tagName === "BUTTON") return;
        setEditing(true);
      }}
    >
      <div className="flex items-center gap-3">
        {/* checkbox */}
        <label
          className={`flex items-center cursor-pointer ${editing ? "invisible" : "visible"}`}
          onDoubleClick={(e) => e.stopPropagation()} // <--- ngăn bubbling
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
            className="peer sr-only"
            aria-label={`Toggle ${todo.text}`}
            onDoubleClick={(e) => e.stopPropagation()} // <--- đảm bảo checkbox cũng không bật edit
          />
          <span
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-150 bg-white ${todo.completed ? "border-[#bddad5]" : "border-[#ededed]"
              }`}
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


        {/* text hoặc input */}
        {editing ? (
          <input
            type="text"
            className="text-xl border-none focus:outline-none w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
            aria-label="Edit todo text"
          />
        ) : (
          <span className={`text-xl ${todo.completed ? "line-through text-gray-400" : ""}`}>
            {todo.text}
          </span>
        )}
      </div>

      {/* delete button */}
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className={`transition duration-200 text-[#949494] hover:text-[#C18585] ${editing ? "invisible" : "opacity-0 group-hover:opacity-100 text-2xl"
          }`}
      >
        ×
      </button>
    </li>
  );
}
