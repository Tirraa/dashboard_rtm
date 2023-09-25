import * as fs from 'fs';
import * as path from 'path';
import { BLOG_ARCHITECTURE_TYPE_NEEDLE, BLOG_ARCHITECTURE_TYPE_STR } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import getRawDataFromBracesDeclaration from '../lib/getRawDataFromBracesDeclaration';
import TFlagsAssoc from '../types/flags';
import { CategoriesMetadatas, DeclaredCategoriesMetadatas } from '../types/metadatas';
import isValidCategoryOrSubcategory, { NAMING_CONSTRAINTS_MSG } from '../validators/categoriesConvention';

const { INTERRUPTED: ERROR_HEAD } = CRITICAL_ERRORS_STR;
const CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL = '\n' + NAMING_CONSTRAINTS_MSG + '\n';

/**
 * @throws {Error}
 */
function buildCategoriesMetadatasFromPostsFolder(postsFolder: string): CategoriesMetadatas {
  const metadatas: CategoriesMetadatas = {};

  const categories = fs.readdirSync(postsFolder, { withFileTypes: true });
  for (const categ of categories) {
    if (categ.isDirectory()) {
      const category = categ.name;
      const subCategories = fs
        .readdirSync(path.join(postsFolder, category), { withFileTypes: true })
        .filter((subCategory) => subCategory.isDirectory())
        .map((subCategory) => subCategory.name);

      if (subCategories.length <= 0) continue;

      if (!isValidCategoryOrSubcategory(category)) {
        throw new Error(ERROR_HEAD + '\n' + `Unauthorized category folder name ('${category}').` + CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL);
      }

      for (const subCategory of subCategories) {
        if (!isValidCategoryOrSubcategory(subCategory)) {
          throw new Error(
            ERROR_HEAD + '\n' + `Unauthorized subcategory folder name ('${subCategory}').` + CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL
          );
        }
      }
      metadatas[category] = subCategories;
    }
  }

  return metadatas;
}

/**
 * @throws {Error}
 */
function buildCategoriesMetadatasFromBlogArchitectureInner(blogArchitectureInner: string): DeclaredCategoriesMetadatas {
  const throwIfCommentsInBlogArchitectureInner = (blogArchitectureInner: string) => {
    const tokens: string[] = ['//', '/*'];
    for (const token of tokens) {
      const tokenIdx = blogArchitectureInner.indexOf(token);
      if (tokenIdx !== -1) {
        throw new Error(
          ERROR_HEAD +
            '\n' +
            `Attempt to use a comment token inside the '${BLOG_ARCHITECTURE_TYPE_STR}' type definition detected. This is strictly forbidden!` +
            '\n'
        );
      }
    }
  };

  throwIfCommentsInBlogArchitectureInner(blogArchitectureInner);

  const removeQuotesEnvelope = (token: string) => (token.charAt(0) === "'" || token.charAt(0) === '"' ? token.slice(1, -1) : token);

  const instructions = blogArchitectureInner.replace(/\s|\n/g, '').split(';');
  const declaredCategoriesMetadatas: DeclaredCategoriesMetadatas = {};

  for (const instruction of instructions) {
    const [categ, subCategsSum] = instruction.split(':');
    if (!categ || !subCategsSum) continue;

    const category = removeQuotesEnvelope(categ);
    const subCategories = subCategsSum.split('|').map(removeQuotesEnvelope);
    if (declaredCategoriesMetadatas[category] !== undefined) {
      throw new Error(
        ERROR_HEAD +
          '\n' +
          `Attempt to use the same category key ('${category}') with trailing spaces abuses detected. This is strictly forbidden!` +
          '\n'
      );
    }

    if (!isValidCategoryOrSubcategory(category)) {
      throw new Error(ERROR_HEAD + '\n' + `Unauthorized category key ('${category}').` + CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL);
    }

    for (const subCategory of subCategories) {
      if (!isValidCategoryOrSubcategory(subCategory)) {
        throw new Error(ERROR_HEAD + '\n' + `Unauthorized subcategory key ('${subCategory}').` + CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL);
      }
    }
    declaredCategoriesMetadatas[category] = subCategories;
  }
  return declaredCategoriesMetadatas;
}

/**
 * @throws {Error}
 */
function buildCategoriesMetadatasFromBlogConfigFile(blogConfigFilePath: string): DeclaredCategoriesMetadatas {
  const blogConfigFileContent = fs.readFileSync(blogConfigFilePath, 'utf8');
  const startIndex = blogConfigFileContent.indexOf(BLOG_ARCHITECTURE_TYPE_NEEDLE);

  const blogArchitecture = getRawDataFromBracesDeclaration(blogConfigFileContent, startIndex);
  if (!blogArchitecture) throw new Error(ERROR_HEAD + '\n' + `Couldn't extract the content of the '${BLOG_ARCHITECTURE_TYPE_STR}' type!` + '\n');
  return buildCategoriesMetadatasFromBlogArchitectureInner(blogArchitecture);
}

export function retrieveMetadatas({ POSTS_FOLDER, BLOG_CONFIG_FILE }: TFlagsAssoc): [CategoriesMetadatas, DeclaredCategoriesMetadatas] {
  const blogArchitectureSysMetadata = buildCategoriesMetadatasFromPostsFolder(POSTS_FOLDER);
  const blogArchitectureDeclaredMetadata = buildCategoriesMetadatasFromBlogConfigFile(BLOG_CONFIG_FILE);

  return [blogArchitectureSysMetadata, blogArchitectureDeclaredMetadata];
}

export default retrieveMetadatas;
