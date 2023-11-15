import type pm2 from "pm2";
type pm2Type = typeof pm2;

interface IPm2WithPromises extends pm2Type {
  promise: Promisified<pm2Type>;
}

/**
 * WiP - wrapped methods to handle PM2 with promises, exposed as `pm2.promise`
 * NOTE - does not pass type definitions correctly when multi-type options
 * e.g. pm2.promise.start
 *
 * Adapted from: https://github.com/3axap4eHko/pm2-promise/blob/master/index.js
 * Designed to match syntax of https://github.com/expo/pm2
 * */
export const Pm2WithPromises = () => {
  const API = require("pm2").custom;
  const promises = {};
  const descriptors = Object.getOwnPropertyDescriptors(API.prototype);
  Object.keys(descriptors).forEach((name) => {
    const descriptor = descriptors[name];
    if (/^[a-z]/.test(name) && typeof descriptor.value === "function") {
      const method = descriptor.value;
      descriptor.value = function (...args) {
        // If last argument is function then we have callback
        if (typeof args[args.length - 1] === "function") {
          return method.apply(this, args);
        } else {
          return new Promise((resolve, reject) => {
            args.push((error, value) => {
              if (error) {
                reject(error);
              } else {
                resolve(value);
              }
            });
            return method.apply(this, args);
          }).catch((error) => {
            console.error(error);
            throw error;
          });
        }
      };
      Object.defineProperty(promises, name, descriptor);
    }
  });
  Object.defineProperty(API, "promise", promises);

  return new API() as IPm2WithPromises;
};

// Utility types for inferring types from promisified functions
// https://stackoverflow.com/a/52731696/5693245
type Callback<A> = (args: A) => void;

type GenericFunction<TS extends any[], R> = (...args: TS) => R;
type Promisified<T> = {
  [K in keyof T]: T[K] extends GenericFunction<infer TS, infer R> ? (...args: TS) => Promise<Awaited<R>> : never;
};

/**
 *  Type-save conversion of callback function to promise
 *  https://dev.to/_gdelgado/implement-a-type-safe-version-of-node-s-promisify-in-7-lines-of-code-in-typescript-2j34
 **/
export const promisify =
  <T, A>(fn: (args: T, cb: Callback<A>) => void): ((args: T) => Promise<A>) =>
  (args: T) =>
    new Promise((resolve) => {
      fn(args, (callbackArgs) => {
        resolve(callbackArgs);
      });
    });
