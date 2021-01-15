export const classCombs = (classArr: string[]) => {
  if (classArr && classArr.length) {
    const combs = classArr.filter((item) => item).join(' ');
    return combs;
  }
  return '';
};
