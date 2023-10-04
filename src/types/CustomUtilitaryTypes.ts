import { ReactNode } from 'react';

export type LayoutMinimalProps = {
  children: ReactNode;
};

export type RequiredFieldsOnly<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};

export type MakeHomogeneousValuesObjType<Obj extends object, ObjValuesType> = {
  [K in keyof Obj]: Obj[K] extends object ? MakeHomogeneousValuesObjType<Obj[K], ObjValuesType> : ObjValuesType;
};
