/* v8 ignore start */
type TButtonConfig = {
  NOT_ACTIVE_CLASSNAME: string;
  ACTIVE_CLASSNAME: string;
  CLASSNAME: string;
};

const BUTTON_CONFIG: TButtonConfig = {
  NOT_ACTIVE_CLASSNAME:
    'text-white text-opacity-75 dark:text-opacity-100 dark:text-muted-foreground bg-transparent focus:bg-accent hover:bg-accent focus:text-black hover:text-black dark:hover:text-primary-foreground dark:focus:text-primary-foreground',
  ACTIVE_CLASSNAME: 'bg-primary text-primary-foreground',
  CLASSNAME: 'font-bold'
} as const;

export default BUTTON_CONFIG;
/* v8 ignore stop */
