import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import TodoFooter from "../components/TodoFooter";

export default function TodoPage() {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[550px] shadow-lg bg-white">
        <h1 className="text-6xl text-center text-red-600 mb-6 font-thin">
          todos
        </h1>

        <TodoInput />
        <TodoList />
        <TodoFooter />
      </div>
    </div>
  );
}
