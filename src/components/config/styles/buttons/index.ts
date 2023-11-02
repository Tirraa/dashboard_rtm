type TButtonConfig = {
  CLASSNAME: string;
  NOT_ACTIVE_CLASSNAME: string;
  ACTIVE_CLASSNAME: string;
};

export const BUTTON_CONFIG: TButtonConfig = {
  CLASSNAME: 'font-bold',
  NOT_ACTIVE_CLASSNAME: 'text-muted-foreground hover:bg-accent bg-transparent hover:text-black dark:hover:text-primary-foreground',
  ACTIVE_CLASSNAME: 'bg-primary text-primary-foreground'
} as const;

export default BUTTON_CONFIG;
