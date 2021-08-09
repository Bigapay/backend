export const findKeyByValue = (object: any, value: string): string | null => {
  let matchedKey = null;
  const keys = Object.keys(object);

  keys.forEach((key) => {
    if (object[key] === value) {
      matchedKey = key;
    }
  });

  return matchedKey;
};

export const findValuesByKeys = (object: any): string[] => {
  const values = Object.values<string>(object);

  return values;
};
