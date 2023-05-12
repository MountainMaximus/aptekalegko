export const truncateString = (fullStr: string, strLen: number = 80) => {
  if (fullStr.length <= strLen) return fullStr;
  const lastSpace = fullStr.lastIndexOf(" ", strLen);
  return fullStr.slice(0, lastSpace) + "...";
};
