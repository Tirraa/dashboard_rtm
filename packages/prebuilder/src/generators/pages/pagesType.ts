import { StructureKind, Project } from 'ts-morph';

import type { PagesMetadatas } from '../../types/Metadatas';

import { AUTOGENERATED_CODE_COMMENT_STR, TS_MORPH_FORMATTER_SETTINGS, GENERATIONS_TARGET_FOLDER, PAGES_TYPE_STR } from '../../config';

// {ToDo} Write tests
export default async function generatePagesType(
  pagesArchitecture: PagesMetadatas,
  pretty: boolean,
  __PAGES_TYPE_STR: string = PAGES_TYPE_STR,
  __TARGET_FOLDER: string = GENERATIONS_TARGET_FOLDER
) {
  const project = new Project();

  const sourceFile = project.createSourceFile(
    `${__TARGET_FOLDER}/${__PAGES_TYPE_STR}.ts`,
    {
      statements: [
        {
          type: JSON.stringify(pagesArchitecture, null, pretty ? 2 : undefined),
          kind: StructureKind.TypeAlias,
          name: __PAGES_TYPE_STR,
          isExported: false
        }
      ]
    },
    { overwrite: true }
  );
  const oldTextLength = sourceFile.getText().length;

  sourceFile.insertText(0, AUTOGENERATED_CODE_COMMENT_STR);
  sourceFile.insertText(oldTextLength + AUTOGENERATED_CODE_COMMENT_STR.length, `export default ${__PAGES_TYPE_STR};`);
  if (pretty) sourceFile.formatText(TS_MORPH_FORMATTER_SETTINGS);
  await sourceFile.save();
}