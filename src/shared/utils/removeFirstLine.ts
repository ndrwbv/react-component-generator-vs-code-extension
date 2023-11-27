export const removeFirstLine = (value: string): string => {
  const valueArr = value.split("\n");
  valueArr.shift();
  return valueArr.join("\n");
};
