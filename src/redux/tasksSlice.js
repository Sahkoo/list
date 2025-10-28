import { createSlice, nanoid } from "@reduxjs/toolkit"; // Імпортуємо createSlice та nanoid для генерації id

const tasksSlice = createSlice({
  name: "tasks",                                  // Ім'я slice
  initialState: {                                 // Початковий стан
    items: [                                      // Масив завдань
      { id: 1, text: "Learn Redux", completed: false },
      { id: 2, text: "Drink coffee", completed: true },
    ],
    isLoading: false,                             // Прапорець завантаження
    error: null,                                  // Поле для помилок
  },
  reducers: {                                     // Методи для зміни стану
    addTask: {                                    // Додавання нового завдання
      reducer(state, action) {                   // Основна функція
        state.items.push(action.payload);        // Додаємо нове завдання в масив
      },
      prepare(text) {                             // Підготовка payload
        return { payload: { id: nanoid(), text, completed: false } }; // Генеруємо id і створюємо нове завдання
      },
    },
    toggleTask(state, action) {                   // Змінити стан виконання завдання
      const task = state.items.find(task => task.id === action.payload); // Знаходимо завдання по id
      if (task) task.completed = !task.completed; // Міняємо completed на протилежне
    },
  },
});

export const { addTask, toggleTask } = tasksSlice.actions; // Експортуємо дії
export default tasksSlice.reducer;                         // Експортуємо редюсер