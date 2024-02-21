import PagesConfig from '@/config/pages';

const isSkippedPath = (path: string) =>
  PagesConfig.SKIP_AUTOMOUNT.paths.includes(path as any) || PagesConfig.SKIP_AUTOMOUNT.prefixes.some((p) => path.startsWith(p));

export default isSkippedPath;
