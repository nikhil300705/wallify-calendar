export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const days: Date[] = [];

  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= lastDay; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
};

export const isSameDay = (d1: Date, d2: Date) => {
  return d1.toDateString() === d2.toDateString();
};