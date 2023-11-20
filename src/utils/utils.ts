export const formattedDate = (year: number, month: string, day: string): string => {
  return year + "-" + month + "-" + day;
};

export const randomNumber = (num: number, start = 0) => {
  return Math.floor(Math.random() * (num - start + 1)) + start;
};

export const toHoursAndMinutes = (totalMinutes: number): string => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours} hr ${minutes} mins`;
};
