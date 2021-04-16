import { Task } from '../contexts/project';

export default function sortTaskList(taskList: Task[]) {
  taskList.sort((a, b) => a.start.getTime() - b.start.getTime());

  return taskList;
}
