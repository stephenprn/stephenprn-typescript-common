// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const convertArrayToObject = (array: any[], key: any) =>
  array.reduce((acc, curr) => {
    acc[curr[key]] = curr;
    return acc;
  }, {});

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const convertEnumToList = (enum_: any, exclude?: any[]) => {
  const res = [];

  for (const value in enum_) {
    if (enum_.hasOwnProperty(value) && !exclude?.includes(value)) {
      res.push(enum_[value]);
    }
  }

  return res;
};

export const moveElementArray = (
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  arr: any[],
  fromIndex: number,
  toIndex: number
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
): any[] => {
  const element = arr[fromIndex];

  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);

  return arr;
};
