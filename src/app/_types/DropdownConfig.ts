import { NavDataEntities } from './NavData';

export type DropdownsConfig<T extends string> = Partial<Record<T, NavDataEntities>>;
