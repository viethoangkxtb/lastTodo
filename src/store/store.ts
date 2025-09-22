import { configureStore } from '@reduxjs/toolkit'

// Import các slice reducer ở đây (sẽ tạo sau)
// import counterSlice from './slices/counterSlice'

export const store = configureStore({
  reducer: {
    // Thêm các reducer ở đây
    // counter: counterSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch