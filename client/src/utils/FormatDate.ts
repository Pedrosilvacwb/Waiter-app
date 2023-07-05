export const formatDate = (data: string) => {
  const date = new Date(data);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${year}`;
};
