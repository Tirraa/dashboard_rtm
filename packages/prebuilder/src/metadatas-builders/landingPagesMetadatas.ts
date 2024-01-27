import type { LpMetadatas, LpSlug } from '../types/Metadatas';

import { DEFAULT_LANGUAGE_KEY, LP_FILE_EXT } from '../config';

// https://github.com/vitest-dev/vitest/discussions/2484
const path = require('path');
const fs = require('fs/promises');

function getSlug(filename: string): LpSlug | null {
  const ext = path.extname(filename);
  if (ext === LP_FILE_EXT) return path.basename(filename, ext);
  return null;
}

/**
 * @throws {BuilderError}
 */
async function buildLpMetadatasFromLpFolder(lpFolder: string): Promise<LpMetadatas> {
  const metadatas = {} as LpMetadatas;

  const maybeCategories = await fs.readdir(lpFolder, { withFileTypes: true });
  for (const maybeCategory of maybeCategories) {
    if (!maybeCategory.isDirectory()) continue;

    const category = maybeCategory.name;
    if (metadatas[category] === undefined) metadatas[category] = {};

    const maybePosts = await fs.readdir([lpFolder, category].join('/'), { withFileTypes: true });

    for (const maybePost of maybePosts) {
      if (maybePost.isDirectory()) {
        const maybeLanguage = maybePost;

        const lps = await fs.readdir([maybeLanguage.path, maybeLanguage.name].join('/'), { withFileTypes: true });
        for (const lp of lps) {
          const filename = lp.name;
          const slug = getSlug(filename);
          if (slug === null) continue;

          const language = maybeLanguage.name;
          if (metadatas[category][language] === undefined) metadatas[category][language] = [];
          metadatas[category][language].push(category + '-' + slug);
        }
      } else if (maybePost.isFile()) {
        const slug = getSlug(maybePost.name);
        if (!slug) continue;
        if (metadatas[category][DEFAULT_LANGUAGE_KEY] === undefined) metadatas[category][DEFAULT_LANGUAGE_KEY] = [];
        metadatas[category][DEFAULT_LANGUAGE_KEY].push(category + '-' + slug);
      }
    }
  }
  return metadatas;
}

export default async function getLpMetadatas(lpFolder: string): Promise<LpMetadatas> {
  const blogLpMetadata = await buildLpMetadatasFromLpFolder(lpFolder);

  return blogLpMetadata;
}
