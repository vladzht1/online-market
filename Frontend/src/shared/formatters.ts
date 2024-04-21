export const formatDateTimeString = (date: Date | string): string => {
  const normalizedDate = typeof date === "string" ? new Date(date) : date;

  let hours: string = normalizedDate.getHours().toString();
  hours = hours.length === 1 ? "0" + hours : hours;

  let minutes: string = normalizedDate.getMinutes().toString();
  minutes = minutes.length === 1 ? "0" + minutes : minutes;

  let seconds: string = normalizedDate.getSeconds().toString();
  seconds = seconds.length === 1 ? "0" + seconds : seconds;

  return `${normalizedDate.toDateString()} at ${hours}:${minutes}:${seconds}`;
}
