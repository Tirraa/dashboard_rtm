import path from 'path';
import BlogTaxonomy from '../_taxonomies/blog';

const getCurrentDirAbsolutePath = () => __dirname;
const getCurrentDir = () => path.basename(getCurrentDirAbsolutePath());

function getCurrentBlogCategoryBasedOnGetCurrentDir(): '' | string {
  const curDir = getCurrentDirAbsolutePath();

  if (curDir.endsWith(`[${BlogTaxonomy.slug}]`)) return path.basename(path.dirname(curDir));
  return '';
}

export function getCurrentBlogDir() {
  const curBlogCateg = getCurrentBlogCategoryBasedOnGetCurrentDir();
  if (curBlogCateg === '') return getCurrentDir();
  return curBlogCateg;
}

export default getCurrentBlogDir;
