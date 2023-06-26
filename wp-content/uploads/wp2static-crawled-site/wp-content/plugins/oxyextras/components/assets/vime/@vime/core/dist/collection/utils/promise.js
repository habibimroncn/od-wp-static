export const deferredPromise = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  // @ts-ignore
  return { promise, resolve, reject };
};
export const makeCancellablePromise = (promise) => {
  let rejectFn;
  const wrappedPromise = new Promise((resolve, reject) => {
    rejectFn = reject;
    Promise.resolve(promise)
      .then(resolve)
      .catch(reject);
  });
  wrappedPromise.cancel = () => { rejectFn(Error('Cancelled.')); };
  return wrappedPromise;
};
