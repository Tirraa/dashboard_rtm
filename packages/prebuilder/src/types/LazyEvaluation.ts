/* v8 ignore start */
// Stryker disable all
export type Thunk<T> = () => T;
export type Thunks<T> = Thunk<T>[];
/* v8 ignore stop */
// Stryker restore all
