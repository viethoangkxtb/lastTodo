import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import TodoFooter from "../components/TodoFooter";

export default function TodoPage() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f5] justify-center items-center">
      <div className="relative w-[550px] shadow-lg bg-[#f5f5f5] mb-[50px]">
        <h1 className="text-[100px] text-center text-[#b83f45] mb-6 font-normal">
          todos
        </h1>
        <TodoInput />
        <TodoList />
        <TodoFooter />
      </div>
    </div>
  );
}
