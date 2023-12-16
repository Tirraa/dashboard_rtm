import { readdirSync } from 'fs';
import { basename, extname } from 'path';
import { BLOG_POST_FILE_EXT, BLOG_ARCHITECTURE_METADATAS_DEFAULT_LANGUAGE_KEY as DEFAULT_LANGUAGE_KEY, FLAGS } from '../config';
import type { BlogSlug, CategoriesMetadatas, CategoriesMetadatasEntity } from '../types/metadatas';

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

export default function getBlogArchitectureMetadatas({ ...args }): CategoriesMetadatas {
  const { [FLAGS.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER } = args;
  const blogArchitectureSysMetadata = buildCategoriesMetadatasFromPostsFolder(BLOG_POSTS_FOLDER);

  return blogArchitectureSysMetadata;
}
