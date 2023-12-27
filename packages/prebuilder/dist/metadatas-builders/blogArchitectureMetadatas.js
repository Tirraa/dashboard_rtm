"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
// https://github.com/vitest-dev/vitest/discussions/2484
const path = require('path');
const fs = require('fs');
function getSlug(filename) {
    const ext = path.extname(filename);
    if (ext === config_1.BLOG_POST_FILE_EXT)
        return path.basename(filename, path.extname(filename));
    return null;
}
/**
 * @throws {BuilderError}
 */
function buildCategoriesMetadatasFromPostsFolder(postsFolder) {
    const metadatas = {};
    const maybeCategories = fs.readdirSync(postsFolder, { withFileTypes: true });
    for (const maybeCategory of maybeCategories) {
        if (!maybeCategory.isDirectory())
            continue;
        const category = maybeCategory.name;
        const maybeSubcategories = fs.readdirSync([maybeCategory.path, maybeCategory.name].join('/'), { withFileTypes: true });
        const subcategoriesMetadatas = {};
        for (const maybeSubcategory of maybeSubcategories) {
            if (!maybeSubcategory.isDirectory())
                continue;
            const subcategory = maybeSubcategory.name;
            const languagesOrPosts = fs.readdirSync([maybeSubcategory.path, maybeSubcategory.name].join('/'), { withFileTypes: true });
            for (const maybeLanguage of languagesOrPosts) {
                if (maybeLanguage.isDirectory()) {
                    const posts = fs.readdirSync([maybeLanguage.path, maybeLanguage.name].join('/'), { withFileTypes: true });
                    for (const post of posts) {
                        const filename = post.name;
                        const slug = getSlug(filename);
                        if (slug === null)
                            continue;
                        const language = maybeLanguage.name;
                        if (subcategoriesMetadatas[subcategory] === undefined)
                            subcategoriesMetadatas[subcategory] = {};
                        if (subcategoriesMetadatas[subcategory][language] === undefined)
                            subcategoriesMetadatas[subcategory][language] = [];
                        subcategoriesMetadatas[subcategory][language].push(slug);
                    }
                }
                else if (maybeLanguage.isFile()) {
                    const postFilename = maybeLanguage.name;
                    const slug = getSlug(postFilename);
                    if (slug === null)
                        continue;
                    if (subcategoriesMetadatas[subcategory] === undefined)
                        subcategoriesMetadatas[subcategory] = {};
                    if (subcategoriesMetadatas[subcategory][config_1.BLOG_ARCHITECTURE_METADATAS_DEFAULT_LANGUAGE_KEY] === undefined)
                        subcategoriesMetadatas[subcategory][config_1.BLOG_ARCHITECTURE_METADATAS_DEFAULT_LANGUAGE_KEY] = [];
                    subcategoriesMetadatas[subcategory][config_1.BLOG_ARCHITECTURE_METADATAS_DEFAULT_LANGUAGE_KEY].push(slug);
                }
            }
            metadatas[category] = subcategoriesMetadatas;
        }
    }
    return metadatas;
}
function getBlogArchitectureMetadatas(postsFolder) {
    const blogArchitectureSysMetadata = buildCategoriesMetadatasFromPostsFolder(postsFolder);
    return blogArchitectureSysMetadata;
}
exports.default = getBlogArchitectureMetadatas;
