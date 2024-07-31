export const convertISOStringToDate = (isoDateString: string, hasYear?: boolean) => {
  const date = new Date(isoDateString);
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: hasYear ? "numeric" : undefined,
  });

  return formattedDate;
};
