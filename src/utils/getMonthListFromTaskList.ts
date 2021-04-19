import { Task } from '../contexts/project';

export type Month = {
  display: string; // mm/yyyy
  dayCount: number; // Number of days
  date: Date;
};

export default function getMonthListFromTaskList(tasks: Task[]): Month[] {
  // On tasks change, reload month list
  // Get first day of the first month
  let firstMonthValue: Date = null as unknown as Date;
  let lastMonthValue: Date = null as unknown as Date;

  tasks.forEach((task) => {
    if (firstMonthValue === null || task.start.getTime() < firstMonthValue.getTime()) {
      firstMonthValue = new Date(task.start);
    }
    if (lastMonthValue === null || task.end.getTime() > lastMonthValue.getTime()) {
      lastMonthValue = new Date(task.end);
    }
  });

  // Set first day
  firstMonthValue.setDate(1);
  lastMonthValue.setDate(1);

  // Get month list
  const monthList: Month[] = [];

  while (firstMonthValue <= lastMonthValue) {
    const year = firstMonthValue.getFullYear();
    const month = firstMonthValue.getMonth();

    monthList.push({
      display: `${month + 1}/${year}`,
      dayCount: new Date(year, month + 1, 0).getDate(),
      date: new Date(year, month, 1),
    });

    // Add one month
    firstMonthValue = new Date(firstMonthValue.setMonth(month + 1));
  }

  return monthList;
}
