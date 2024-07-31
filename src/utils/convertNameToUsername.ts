export const convertNameToUsername = (name?: string | null): string => {
  if (!name) {
    return "";
  }
  return name.toLowerCase().trim().replace(/\s+/g, "_");
};
