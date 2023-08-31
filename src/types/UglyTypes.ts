import { TFunction } from 'i18next';
import { ReactNode } from 'react';

export type Void = undefined;

export type PhantomLayoutProps = {
  children: ReactNode;
};

export type i18nNamespace = string | readonly string[];
export type i18nOptions = { keyPrefix?: string };

export type ServerSideT = TFunction<any, string>;
export type ClientSideT = TFunction<string, string>;
