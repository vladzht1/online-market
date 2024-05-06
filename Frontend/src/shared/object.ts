export const isObjectEmpty = (object: object): boolean => {
  return Object.entries(object).length === 0;
}
