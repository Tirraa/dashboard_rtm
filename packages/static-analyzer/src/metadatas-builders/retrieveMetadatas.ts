import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { BLOG_ARCHITECTURE_TYPE_NEEDLE, BLOG_ARCHITECTURE_TYPE_STR, FLAGS } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import BuilderError from '../errors/exceptions/BuilderError';
import { removeComments } from '../lib/etc';
import getRawDataFromBracesDeclaration from '../lib/getRawDataFromBracesDeclaration';
import type { CategoriesMetadatas, DeclaredCategoriesMetadatas } from '../types/metadatas';
import type { StringDelimiter } from '../types/parser';
import isValidTaxonomy, { NAMING_CONSTRAINTS_MSG } from '../validators/taxonomyConvention';

const { INTERRUPTED: ERROR_HEAD } = CRITICAL_ERRORS_STR;
const CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL = '\n' + NAMING_CONSTRAINTS_MSG;

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

      if (!isValidTaxonomy(category)) {
        throw new BuilderError(
          ERROR_HEAD + '\n' + `Unauthorized category folder name ('${category}').` + CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL
        );
      }

      for (const subcategory of subcategories) {
        if (!isValidTaxonomy(subcategory)) {
          throw new BuilderError(
            ERROR_HEAD + '\n' + `Unauthorized subcategory folder name ('${subcategory}').` + CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL
          );
        }
      }
      metadatas[category] = subcategories;
    }
  }

  return metadatas;
}

/**
 * @throws {BuilderError}
 */
function buildCategoriesMetadatasFromBlogArchitectureInner(blogArchitectureInner: string, blogConfigFilePath: string): DeclaredCategoriesMetadatas {
  const ERROR_SCOPE = `(${blogConfigFilePath})`;
  blogArchitectureInner = removeComments(blogArchitectureInner);

  const removeQuotesEnvelope = (token: string, delimiters: StringDelimiter[] = ['"', "'", '`']) =>
    delimiters.includes(token.charAt(0) as any) ? token.slice(1, -1) : token;

  function stripUselessSpacesFromSumType(code: string) {
    let result: string = '';
    let currentQuoteDelimiter: null | StringDelimiter = null;

    for (let i = 0; code[i]; i++) {
      const char = code[i];
      const prevChar = i > 0 ? code[i - 1] : '';
      const charBeforePrevChar = i > 1 ? code[i - 2] : '';

      const shouldSetCurrentQuoteDelimiterToSimpleQuotationMark = () => char === '"' && !currentQuoteDelimiter;
      const shouldSetCurrentQuoteDelimiterToDoubleQuotationMark = () => char === "'" && !currentQuoteDelimiter;
      const shouldSetCurrentQuoteDelimiterToBacktick = () => char === '`' && !currentQuoteDelimiter;
      const shouldResetCurrentQuoteDelimiter = () => char === currentQuoteDelimiter && prevChar !== '\\' && charBeforePrevChar !== '\\';
      const shouldSkipChar = () => char === ' ' && !currentQuoteDelimiter;

      if (shouldSetCurrentQuoteDelimiterToSimpleQuotationMark()) currentQuoteDelimiter = `"`;
      else if (shouldSetCurrentQuoteDelimiterToDoubleQuotationMark()) currentQuoteDelimiter = `'`;
      else if (shouldSetCurrentQuoteDelimiterToBacktick()) currentQuoteDelimiter = '`';
      else if (shouldResetCurrentQuoteDelimiter()) currentQuoteDelimiter = null;
      else if (shouldSkipChar()) continue;

      result += char;
    }
    return result;
  }

  const instructions = blogArchitectureInner
    .replace(/\n/g, '')
    .split(';')
    .map((a) => a.trim());
  const declaredCategoriesMetadatas: DeclaredCategoriesMetadatas = {};

  for (const instruction of instructions) {
    const [categ, subcategsSum] = instruction.split(':');
    if (!categ || !subcategsSum) continue;

    const category = removeQuotesEnvelope(categ);
    const subcategories = stripUselessSpacesFromSumType(subcategsSum)
      .split('|')
      .map((token) => removeQuotesEnvelope(token));

    if (!isValidTaxonomy(category)) {
      throw new BuilderError(ERROR_HEAD + '\n' + `Unauthorized category key: '${category}'.` + CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL);
    }

    for (const subcategory of subcategories) {
      if (!isValidTaxonomy(subcategory)) {
        throw new BuilderError(
          ERROR_HEAD + ' ' + ERROR_SCOPE + '\n' + `Unauthorized subcategory key: '${subcategory}'.` + CATEG_OR_SUBCATEG_UNAUTHORIZED_TOKEN_ERROR_TAIL
        );
      }
    }
    declaredCategoriesMetadatas[category] = subcategories;
  }
  return declaredCategoriesMetadatas;
}

/**
 * @throws {BuilderError}
 */
function buildCategoriesMetadatasFromBlogConfigFile(blogConfigFilePath: string): DeclaredCategoriesMetadatas {
  const blogConfigFileContent = readFileSync(blogConfigFilePath, 'utf8');
  const startIndex = blogConfigFileContent.indexOf(BLOG_ARCHITECTURE_TYPE_NEEDLE);

  const blogArchitecture = getRawDataFromBracesDeclaration(blogConfigFileContent, startIndex);
  if (!blogArchitecture)
    throw new BuilderError(ERROR_HEAD + '\n' + `Couldn't extract the content of the '${BLOG_ARCHITECTURE_TYPE_STR}' type!` + '\n');
  return buildCategoriesMetadatasFromBlogArchitectureInner(blogArchitecture, blogConfigFilePath);
}

export function retrieveMetadatas({ ...args }): [CategoriesMetadatas, DeclaredCategoriesMetadatas] {
  const { [FLAGS.POSTS_FOLDER]: POSTS_FOLDER, [FLAGS.BLOG_CONFIG_FILEPATH]: BLOG_CONFIG_FILEPATH } = args;
  const blogArchitectureSysMetadata = buildCategoriesMetadatasFromPostsFolder(POSTS_FOLDER);
  const blogArchitectureDeclaredMetadata = buildCategoriesMetadatasFromBlogConfigFile(BLOG_CONFIG_FILEPATH);

  return [blogArchitectureSysMetadata, blogArchitectureDeclaredMetadata];
}

export default retrieveMetadatas;
