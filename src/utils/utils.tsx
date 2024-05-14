export const joinClassNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

export const toPascalCase = (str: string = "") => {
  return str.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
};
