import { readdirSync } from 'fs';
import { join } from 'path';
import type { WriterFunction } from 'ts-morph';
import { Project, StructureKind, Writers } from 'ts-morph';
import { BLOG_ARCHITECTURE_TYPE_STR, FLAGS, GENERATIONS_TARGET_FOLDER } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import BuilderError from '../errors/exceptions/BuilderError';
import type { CategoriesMetadatas } from '../types/metadatas';
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

export function generateBlogArchitectureMetadatas({ ...args }): CategoriesMetadatas {
  const { [FLAGS.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER } = args;
  const blogArchitectureSysMetadata = buildCategoriesMetadatasFromPostsFolder(BLOG_POSTS_FOLDER);

  return blogArchitectureSysMetadata;
}

export function generateBlogArchitectureType(blogArchitecture: CategoriesMetadatas) {
  const project = new Project();

  const writerFunction = (blogArchitecture: CategoriesMetadatas): WriterFunction =>
    Writers.objectType({
      properties: Object.entries(blogArchitecture).map(([category, subcategories]) => ({
        name: `'${category}'`,
        type: subcategories.map((sc) => `'${sc}'`).join(' | ')
      }))
    });

  const sourceFile = project.createSourceFile(
    `${GENERATIONS_TARGET_FOLDER}/${BLOG_ARCHITECTURE_TYPE_STR}.ts`,
    {
      statements: [
        {
          kind: StructureKind.TypeAlias,
          name: BLOG_ARCHITECTURE_TYPE_STR,
          type: writerFunction(blogArchitecture),
          isExported: false
        }
      ]
    },
    { overwrite: true }
  );
  sourceFile.insertText(sourceFile.getText().length, `export default ${BLOG_ARCHITECTURE_TYPE_STR};\n`);
  sourceFile.saveSync();
}
