import { useDispatch } from "react-redux";
import { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { addTask } from "./redux/tasksSlice";
import { statusFilters, setStatusFilter } from "./redux/filtersSlice";
import TaskList from "./components/TaskList";
import TaskCounter from "./components/TaskCounter";

// 🎨 Теми
const lightTheme = {
  bg: "#f5f7fb",
  card: "#ffffff",
  text: "#222",
  button: "#4e73df",
  buttonHover: "#3b5bcc",
  filterBg: "#e8ebf5",
  filterHover: "#d8dcf0",
  shadow: "rgba(0, 0, 0, 0.08)"
};

const darkTheme = {
  bg: "#1e1f24",
  card: "#2a2b31",
  text: "#f5f5f5",
  button: "#6b8afd",
  buttonHover: "#5673e0",
  filterBg: "#3b3d44",
  filterHover: "#4a4c55",
  shadow: "rgba(0, 0, 0, 0.5)"
};

// 🌍 Глобальні стилі
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    transition: background-color 0.25s ease, color 0.25s ease;
  }

  body {
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
  }
`;

// 📦 Стильові компоненти
const Container = styled.div`
  max-width: 600px;
  margin: 60px auto;
  padding: 30px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: 0 6px 20px ${({ theme }) => theme.shadow};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-bottom: 25px;
`;

const AddButton = styled.button`
  display: block;
  margin: 0 auto 20px;
  background-color: ${({ theme }) => theme.button};
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
`;

const FilterButton = styled.button`
  background-color: ${({ active, theme }) =>
    active ? theme.button : theme.filterBg};
  color: ${({ active, theme }) => (active ? "#fff" : theme.text)};
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.buttonHover : theme.filterHover};
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.filterBg};
  border-radius: 20px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.filterBg};
  }
`;

function App() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const addNewTask = () => {
    const textAdd = prompt("Введіть текст завдання");
    if (textAdd) dispatch(addTask(textAdd));
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <ToggleButton onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </ToggleButton>

      <Container>
        <Title>Redux Todo з Reselect</Title>

        <AddButton onClick={addNewTask}>+ Додати завдання</AddButton>

        <FilterContainer>
          <FilterButton onClick={() => dispatch(setStatusFilter(statusFilters.all))}>
            Всі
          </FilterButton>
          <FilterButton onClick={() => dispatch(setStatusFilter(statusFilters.active))}>
            Активні
          </FilterButton>
          <FilterButton onClick={() => dispatch(setStatusFilter(statusFilters.completed))}>
            Виконані
          </FilterButton>
        </FilterContainer>

        <TaskCounter />
        <TaskList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
