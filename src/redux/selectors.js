import { createSelector } from "reselect";
import { statusFilters } from "./filtersSlice";

export const selectTasks = state => state.tasks.items;
export const selectFilter = state => state.filters.status;
export const selectVisibleTasks = createSelector(
  [selectTasks, selectFilter],
  (tasks, statusFilter) => {
    switch (statusFilter) {
      case statusFilters.active:
        return tasks.filter(task => !task.completed);
      case statusFilters.completed:
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }
);

export const selectTaskCount = createSelector([selectTasks], tasks => {
  const completed = tasks.filter(task => task.completed).length;
  const active = tasks.filter(task => !task.completed).length;
  return { active, completed };
});
