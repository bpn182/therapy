export const joinClassNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};
