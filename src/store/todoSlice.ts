import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type FilterType = "all" | "active" | "completed";

interface TodoState {
  todos: Todo[];
  filter: FilterType;
}

const initialState: TodoState = {
  todos: [],
  filter: "all",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((t) => !t.completed);
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) todo.text = action.payload.text;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, clearCompleted, setFilter, updateTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
