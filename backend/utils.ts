export const wait = (msToWait: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), msToWait);
  });
};
