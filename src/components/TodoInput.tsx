import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, toggleAllTodos } from "../store/todoSlice";
import type { AppDispatch } from "../store";

export default function TodoInput() {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState("");

  return (
    <div className="flex items-center w-[550px] h-[80px] border-2 border-[#e6e6e6] has-[input:focus]:border-[#af2f2f]">
      {/* Nút bên trái */}
      <button
        type="button"
        className="w-[50px] h-full flex items-center justify-center text-gray-400 
                   rounded-none outline-none bg-white border-2 border-transparent
                   focus:border-[#af2f2f]"
        onClick={() => dispatch(toggleAllTodos())}
      >
        <span className="transform rotate-90">❯</span>
      </button>

      {/* Input */}
      <input
        type="text"
        placeholder="What needs to be done?"
        className="flex-1 h-full px-4 text-[24px] bg-white 
                   placeholder-[#a9a9a9] placeholder:italic placeholder:text-[24px] 
                   text-[#121212] outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const trimmedText = text.trim();
            if (trimmedText) {
              dispatch(addTodo(trimmedText));
              setText("");
            }
          }
        }}
      />
    </div>
  );
}