import type { CategoriesMetadatasEntity, CategoriesMetadatas, BlogSlug } from '../types/Metadatas';

import { DEFAULT_LANGUAGE_KEY, BLOG_POST_FILE_EXT } from '../config';

// https://github.com/vitest-dev/vitest/discussions/2484
const path = require('path');
const fs = require('fs/promises');

function getSlug(filename: string): BlogSlug | null {
  const ext = path.extname(filename);
  if (ext === BLOG_POST_FILE_EXT) return path.basename(filename, path.extname(filename));
  return null;
}

/**
 * @throws {BuilderError}
 */
async function buildCategoriesMetadatasFromPostsFolder(postsFolder: string): Promise<CategoriesMetadatas> {
  const metadatas: CategoriesMetadatas = {};

  const maybeCategories = await fs.readdir(postsFolder, { withFileTypes: true });
  for (const maybeCategory of maybeCategories) {
    if (!maybeCategory.isDirectory()) continue;

    const category = maybeCategory.name;
    const maybeSubcategories = await fs.readdir([maybeCategory.path, maybeCategory.name].join('/'), { withFileTypes: true });
    const subcategoriesMetadatas = {} as CategoriesMetadatasEntity;

    for (const maybeSubcategory of maybeSubcategories) {
      if (!maybeSubcategory.isDirectory()) continue;
      const subcategory = maybeSubcategory.name;

      const languagesOrPosts = await fs.readdir([maybeSubcategory.path, maybeSubcategory.name].join('/'), { withFileTypes: true });

      for (const maybeLanguage of languagesOrPosts) {
        if (maybeLanguage.isDirectory()) {
          const posts = await fs.readdir([maybeLanguage.path, maybeLanguage.name].join('/'), { withFileTypes: true });
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

export default async function getBlogArchitectureMetadatas(postsFolder: string): Promise<CategoriesMetadatas> {
  const blogArchitectureSysMetadata = await buildCategoriesMetadatasFromPostsFolder(postsFolder);

  return blogArchitectureSysMetadata;
}
