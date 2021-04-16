export const millisecondsInOneDay = 24 * 60 * 60 * 1000;

export default function getDayCount(start: Date, end: Date) {
  return (end.getTime() - start.getTime()) / millisecondsInOneDay;
}
