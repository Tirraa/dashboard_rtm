/* v8 ignore start */
import type { ClassValue } from 'clsx';

import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
export default cn;
/* v8 ignore stop */
