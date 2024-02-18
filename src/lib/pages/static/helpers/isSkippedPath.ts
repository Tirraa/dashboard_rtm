import PagesConfig from '@/config/pages';

const isSkippedPath = (path: string) =>
  PagesConfig.SKIP_SSG.paths.includes(path as any) || PagesConfig.SKIP_SSG.prefixes.some((p) => path.startsWith(p));

export default isSkippedPath;
