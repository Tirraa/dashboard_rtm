import { readdirSync } from 'fs';
import { basename, extname, join } from 'path';
import { FLAGS } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import BuilderError from '../errors/BuilderError';
import type { CategoriesMetadatas, CategoriesMetadatasEntity, Slug } from '../types/metadatas';
import isValidTaxonomy, { NAMING_CONSTRAINTS_MSG } from '../validators/taxonomyConvention';

const { INTERRUPTED: ERROR_HEAD } = CRITICAL_ERRORS_STR;
const CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL = '\n' + NAMING_CONSTRAINTS_MSG;

function getSlug(filename: string): Slug | null {
  const ext = extname(filename);
  if (ext === '.mdx') return basename(filename, extname(filename));
  return null;
}

/**
 * @throws {BuilderError}
 */
function buildCategoriesMetadatasFromPostsFolder(postsFolder: string): CategoriesMetadatas {
  const metadatas: CategoriesMetadatas = {};

  const categories = readdirSync(postsFolder, { withFileTypes: true });
  for (const categ of categories) {
    if (categ.isDirectory()) {
      const category = categ.name;
      const subcategories = readdirSync(join(postsFolder, category), { withFileTypes: true })
        .filter((subcategory) => subcategory.isDirectory())
        .map((subcategory) => subcategory.name);

      if (subcategories.length <= 0) continue;

      const subcategoriesMetadatas = {} as CategoriesMetadatasEntity;

      // {ToDo} Don't validate here
      if (!isValidTaxonomy(category)) {
        throw new BuilderError(
          ERROR_HEAD + '\n' + `Unauthorized category folder name ('${category}').` + CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL
        );
      }

      for (const subcategory of subcategories) {
        // {ToDo} Don't validate here
        if (!isValidTaxonomy(subcategory)) {
          throw new BuilderError(
            ERROR_HEAD + '\n' + `Unauthorized subcategory folder name ('${subcategory}').` + CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL
          );
        }

        const languagesOrPosts = readdirSync([postsFolder, category, subcategory].join('/'), { withFileTypes: true });

        for (const maybeLanguage of languagesOrPosts) {
          if (maybeLanguage.isDirectory()) {
            const posts = readdirSync(maybeLanguage.path, { withFileTypes: true });
            for (const post of posts) {
              const filename = post.name;
              const slug = getSlug(filename);
              if (slug === null) continue;

              const language = maybeLanguage.name;
              if (subcategoriesMetadatas[subcategory] === undefined) subcategoriesMetadatas[subcategory] = {};
              if (subcategoriesMetadatas[subcategory][language] === undefined) subcategoriesMetadatas[subcategory][language] = [];
              subcategoriesMetadatas[subcategory][language].push(slug);
            }
          } else if (maybeLanguage.isFile()) {
            const filename = maybeLanguage.name;
            const slug = getSlug(filename);
            if (slug === null) continue;

            if (subcategoriesMetadatas[subcategory] === undefined) subcategoriesMetadatas[subcategory] = {};
            if (subcategoriesMetadatas[subcategory].DEFAULT_LANGUAGE === undefined) subcategoriesMetadatas[subcategory].DEFAULT_LANGUAGE = [];
            subcategoriesMetadatas[subcategory].DEFAULT_LANGUAGE.push(slug);
          }
        }
      }

      metadatas[category] = subcategoriesMetadatas;
    }
  }

  return metadatas;
}

export default function getBlogArchitectureMetadatas({ ...args }): CategoriesMetadatas {
  const { [FLAGS.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER } = args;
  const blogArchitectureSysMetadata = buildCategoriesMetadatasFromPostsFolder(BLOG_POSTS_FOLDER);

  return blogArchitectureSysMetadata;
}
