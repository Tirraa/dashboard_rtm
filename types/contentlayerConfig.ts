export type BaseFields = {
  title: { type: 'string'; required: true };
  metadescription: { type: 'string'; required: true };
  description: { type: 'string'; required: false };
  date: { type: 'date'; required: true };
  url: { type: 'string'; required: true };
};

export type DocumentConfigType<ComputedFields extends keyof BaseFields | never = never> = {
  name: string;
  filePathPattern: string;
  fields: Omit<BaseFields, ComputedFields>;
  computedFields?: ComputedFields extends never
    ? never
    : {
        [K in ComputedFields]?: Omit<BaseFields[K], 'required'> & { resolve: (...args: any[]) => unknown };
      };
};

export const PHANTOM_POST_CONFIG: DocumentConfigType = {
  name: 'PhantomPost',
  filePathPattern: '',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: false },
    metadescription: { type: 'string', required: true },
    date: { type: 'date', required: true },
    url: { type: 'string', required: true }
  }
} as const;
