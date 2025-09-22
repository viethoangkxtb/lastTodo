export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export type FilterType = 'All' | 'Active' | 'Completed'

export interface TodoState {
  todos: Todo[]
  filter: FilterType
  isEditing: string | null
}