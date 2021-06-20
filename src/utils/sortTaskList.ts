import { Task } from '../contexts/project';
import getDayCount from './getDayCount';

export default function sortTaskList(taskList: Task[]) {
  taskList.sort((a, b) => a.start.getTime() - b.start.getTime() || getDayCount(b.start, b.end) - getDayCount(a.start, a.end));

  return taskList;
}
