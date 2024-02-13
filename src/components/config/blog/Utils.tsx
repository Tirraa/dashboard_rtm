/* v8 ignore start */
// Stryker disable all
import Homepage from '@/components/pages/Homepage';

const Utils: Record<PropertyKey, (...args: any[]) => JSX.Element> = {
  Homepage: ({ ...props }) => <Homepage {...props} />
};

export default Utils;
// Stryker restore all
/* v8 ignore stop */
