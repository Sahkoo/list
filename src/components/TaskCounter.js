import { useSelector } from "react-redux";
import { selectTaskCount } from "../redux/selectors";

export const TaskCounter = () => {
  const count = useSelector(selectTaskCount); // мемоізований селектор

  return (
    <div>
      <p>Активних: {count.active}</p>    {/* виводимо активні */}
      <p>Виконаних: {count.completed}</p> {/* виводимо виконані */}
    </div>
  );
};


export default TaskCounter