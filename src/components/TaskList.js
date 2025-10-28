import { useSelector, useDispatch } from "react-redux";
import { selectVisibleTasks } from "../redux/selectors";
import { toggleTask } from "../redux/tasksSlice";

  function TaskList  () {
  const tasks = useSelector(selectVisibleTasks); // мемоізований селектор
  const dispatch = useDispatch(); // хук для відправки дій

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <label>
            <input type="checkbox"
                   checked={task.completed} // стан чекбоксу
                   onChange={() => dispatch(toggleTask(task.id))} /> {/* зміна стану */}
            {task.text} {/* текст завдання */}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TaskList