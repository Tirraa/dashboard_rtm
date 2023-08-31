import { TFunction } from 'i18next';
import { ForwardRefExoticComponent, ReactNode, RefAttributes, SVGProps } from 'react';

export type Void = undefined;

export type PhantomLayoutProps = {
  children: ReactNode;
};

export type i18nNamespace = string | readonly string[];
export type i18nOptions = { keyPrefix?: string };

export type ServerSideT = TFunction<any, string>;
export type ClientSideT = TFunction<string, string>;

export type HeroicIconComponentType = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & { title?: string | undefined; titleId?: string | undefined } & RefAttributes<SVGSVGElement>
>;
