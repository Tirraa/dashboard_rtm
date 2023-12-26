import type { WriterFunction } from 'ts-morph';

import { StructureKind, Project, Writers } from 'ts-morph';

import type { CategoriesMetadatas } from '../../types/metadatas';

import { AUTOGENERATED_CODE_COMMENT_STR, TS_MORPH_FORMATTER_SETTINGS, BLOG_ARCHITECTURE_TYPE_STR, GENERATIONS_TARGET_FOLDER } from '../../config';

export default function generateBlogArchitectureType(
  blogArchitecture: CategoriesMetadatas,
  __BLOG_ARCHITECTURE_TYPE_STR: string = BLOG_ARCHITECTURE_TYPE_STR,
  __TARGET_FOLDER: string = GENERATIONS_TARGET_FOLDER
) {
  const project = new Project();

  const writerFunction: WriterFunction = Writers.objectType({
    properties: Object.entries(blogArchitecture).map(([category, subcategories]) => ({
      type: Object.keys(subcategories)
        .map((subcategory) => `'${subcategory}'`)
        .join(' | '),
      name: `'${category}'`
    }))
  });

  const sourceFile = project.createSourceFile(
    `${__TARGET_FOLDER}/${__BLOG_ARCHITECTURE_TYPE_STR}.ts`,
    {
      statements: [
        {
          name: __BLOG_ARCHITECTURE_TYPE_STR,
          kind: StructureKind.TypeAlias,
          type: writerFunction,
          isExported: false
        }
      ]
    },
    { overwrite: true }
  );
  const oldTextLength = sourceFile.getText().length;

  sourceFile.insertText(0, AUTOGENERATED_CODE_COMMENT_STR);
  sourceFile.insertText(oldTextLength + AUTOGENERATED_CODE_COMMENT_STR.length, `export default ${__BLOG_ARCHITECTURE_TYPE_STR};`);
  sourceFile.formatText(TS_MORPH_FORMATTER_SETTINGS);
  sourceFile.saveSync();
}
