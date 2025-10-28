import { createSlice } from "@reduxjs/toolkit"; // Імпортуємо createSlice

export const statusFilters = {                 // Константи фільтрів
  all: "all",
  active: "active",
  completed: "completed",
};

const filtersSlice = createSlice({
  name: "filters",                             // Ім'я slice
  initialState: {                              // Початковий стан
    status: statusFilters.all,                 // За замовчуванням показуємо всі завдання
  },
  reducers: {
    setStatusFilter(state, action) {           // Зміна фільтру
      state.status = action.payload;           // Оновлюємо статус фільтру
    },
  },
});

export const { setStatusFilter } = filtersSlice.actions; // Експортуємо дію
export default filtersSlice.reducer;                     // Експортуємо редюсер