import { basename, extname } from 'path';
import { readdirSync } from 'fs';

import type { CategoriesMetadatasEntity, CategoriesMetadatas, BlogSlug } from '../types/metadatas';

import { BLOG_ARCHITECTURE_METADATAS_DEFAULT_LANGUAGE_KEY as DEFAULT_LANGUAGE_KEY, BLOG_POST_FILE_EXT } from '../config';

function getSlug(filename: string): BlogSlug | null {
  const ext = extname(filename);
  if (ext === BLOG_POST_FILE_EXT) return basename(filename, extname(filename));
  return null;
}

/**
 * @throws {BuilderError}
 */
function buildCategoriesMetadatasFromPostsFolder(postsFolder: string): CategoriesMetadatas {
  const metadatas: CategoriesMetadatas = {};

  const maybeCategories = readdirSync(postsFolder, { withFileTypes: true });
  for (const maybeCategory of maybeCategories) {
    if (!maybeCategory.isDirectory()) continue;

    const category = maybeCategory.name;
    const maybeSubcategories = readdirSync([maybeCategory.path, maybeCategory.name].join('/'), { withFileTypes: true });
    const subcategoriesMetadatas = {} as CategoriesMetadatasEntity;

    for (const maybeSubcategory of maybeSubcategories) {
      if (!maybeSubcategory.isDirectory()) continue;
      const subcategory = maybeSubcategory.name;

      const languagesOrPosts = readdirSync([maybeSubcategory.path, maybeSubcategory.name].join('/'), { withFileTypes: true });

      for (const maybeLanguage of languagesOrPosts) {
        if (maybeLanguage.isDirectory()) {
          const posts = readdirSync([maybeLanguage.path, maybeLanguage.name].join('/'), { withFileTypes: true });
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
          const postFilename = maybeLanguage.name;
          const slug = getSlug(postFilename);
          if (slug === null) continue;

          if (subcategoriesMetadatas[subcategory] === undefined) subcategoriesMetadatas[subcategory] = {};
          if (subcategoriesMetadatas[subcategory][DEFAULT_LANGUAGE_KEY] === undefined) subcategoriesMetadatas[subcategory][DEFAULT_LANGUAGE_KEY] = [];
          subcategoriesMetadatas[subcategory][DEFAULT_LANGUAGE_KEY].push(slug);
        }
      }

      metadatas[category] = subcategoriesMetadatas;
    }
  }

  return metadatas;
}

export default function getBlogArchitectureMetadatas(postsFolder: string): CategoriesMetadatas {
  const blogArchitectureSysMetadata = buildCategoriesMetadatasFromPostsFolder(postsFolder);

  return blogArchitectureSysMetadata;
}
