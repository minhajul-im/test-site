import createWebStorage from "redux-persist/lib/storage/createWebStorage";

interface Storage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<string>;
  removeItem: (key: string) => Promise<void>;
}

const createNoopStorage = (): Storage => ({
  getItem: () => Promise.resolve(null),
  setItem: (_key: string, _value: string) => Promise.resolve(_value),
  removeItem: () => Promise.resolve(),
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
