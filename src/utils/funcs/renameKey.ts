type KeysMap<T> = { [key: string]: keyof T };

export const renameKeys = <T>(keysMap: KeysMap<T>, obj: Record<string, any>): Record<keyof T, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    const renamedKey = keysMap[key] || key;
    return {
      ...acc,
      [renamedKey]: obj[key],
    };
  }, {} as Record<keyof T, any>);
};