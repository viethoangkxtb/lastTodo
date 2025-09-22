import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";

export default function TodoInput() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  return (
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
  );
}
