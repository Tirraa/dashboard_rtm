import * as fs from 'fs';
import * as path from 'path';
import { BLOG_ARCHITECTURE_TYPE_NEEDLE } from '../config/config';
import { ERRORS_SUFFIXES } from '../config/vocab';
import TFlagsAssoc from '../types/flags';
import { CategoriesMetadatas, DeclaredCategoriesMetadatas } from '../types/metadatas';
import isValidCategoryOrSubcategory from '../validators/categoriesConvention';

const { METADATAS_BUILDERS: ERROR_SUFFIX } = ERRORS_SUFFIXES;
const NAMING_CONSTRAINTS_MSG = 'Only dashes, underscores and alphanumerical characters are allowed! You also MUST use at least one letter or digit.';

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
        throw new Error(`Unauthorized category folder name ('${category}').` + ' ' + NAMING_CONSTRAINTS_MSG + ' ' + ERROR_SUFFIX);
      }

      for (const subCategory of subCategories) {
        if (!isValidCategoryOrSubcategory(subCategory)) {
          throw new Error(`Unauthorized subcategory folder name ('${subCategory}').` + ' ' + NAMING_CONSTRAINTS_MSG + ' ' + ERROR_SUFFIX);
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
  const assertions = blogArchitectureInner.replace(/'|\s|\n/g, '').split(';');
  const declaredCategoriesMetadatas: DeclaredCategoriesMetadatas = {};

  for (const assertion of assertions) {
    const [category, subCategsSum] = assertion.split(':');
    if (category && subCategsSum) {
      const subCategories = subCategsSum.split('|');
      if (declaredCategoriesMetadatas[category] !== undefined) {
        throw new Error(
          `Attempt to use the same category key ('${category}') with trailing spaces detected. This is strictly forbidden!` + ' ' + ERROR_SUFFIX
        );
      }
      if (!isValidCategoryOrSubcategory(category)) {
        throw new Error(`Unauthorized category key ('${category}').` + ' ' + NAMING_CONSTRAINTS_MSG + ' ' + ERROR_SUFFIX);
      }

      for (const subCategory of subCategories) {
        if (!isValidCategoryOrSubcategory(subCategory)) {
          throw new Error(`Unauthorized subcategory key ('${subCategory}').` + ' ' + NAMING_CONSTRAINTS_MSG + ' ' + ERROR_SUFFIX);
        }
      }
      declaredCategoriesMetadatas[category] = subCategories;
    }
  }
  return declaredCategoriesMetadatas;
}

function extractBlogArchitecture(blogConfigFilePath: string): string | null {
  const blogConfigFileContent = fs.readFileSync(blogConfigFilePath, 'utf8');
  let startIndex = blogConfigFileContent.indexOf(BLOG_ARCHITECTURE_TYPE_NEEDLE);

  if (startIndex !== -1) {
    let openBracesDepth = 0;
    let endIndex = -1;

    for (let i = startIndex; blogConfigFileContent[i]; i++) {
      if (blogConfigFileContent[i] === '{') {
        if (openBracesDepth === 0) startIndex = i + 1;
        openBracesDepth += 1;
      } else if (blogConfigFileContent[i] === '}') {
        openBracesDepth -= 1;
        if (openBracesDepth === 0) {
          endIndex = i;
          break;
        }
      }
    }

    if (endIndex !== -1) {
      const extractedContent = blogConfigFileContent.substring(startIndex, endIndex);
      return extractedContent;
    }
  }
  return null;
}

/**
 * @throws {Error}
 */
function buildCategoriesMetadatasFromBlogConfigFile(blogConfigFilePath: string): DeclaredCategoriesMetadatas {
  const blogArchitecture = extractBlogArchitecture(blogConfigFilePath);
  if (!blogArchitecture) throw new Error("Couldn't extract the 'BlogArchitecture' content!" + ' ' + ERROR_SUFFIX);
  return buildCategoriesMetadatasFromBlogArchitectureInner(blogArchitecture);
}

export function retrieveMetadatas(retrievedValuesFromArgs: TFlagsAssoc): [CategoriesMetadatas, DeclaredCategoriesMetadatas] {
  const blogArchitectureSysMetadata = buildCategoriesMetadatasFromPostsFolder(retrievedValuesFromArgs.POSTS_FOLDER);
  const blogArchitectureDeclaredMetadata = buildCategoriesMetadatasFromBlogConfigFile(retrievedValuesFromArgs.BLOG_CONFIG_FILE);

  return [blogArchitectureSysMetadata, blogArchitectureDeclaredMetadata];
}

export default retrieveMetadatas;
