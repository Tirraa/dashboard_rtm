/* v8 ignore start */
// Stryker disable all
export type Thunk<T> = () => T;
export type Thunks<T> = Thunk<T>[];
// Stryker restore all
/* v8 ignore stop */
