import { StructureKind, Project } from 'ts-morph';

import type { LpMetadatas } from '../../types/Metadatas';

import { AUTOGENERATED_CODE_COMMENT_STR, TS_MORPH_FORMATTER_SETTINGS, GENERATIONS_TARGET_FOLDER, LP_TYPE_STR } from '../../config';

export default async function generateLandingPageType(
  lpArchitecture: LpMetadatas,
  pretty: boolean,
  __LP_TYPE_STR: string = LP_TYPE_STR,
  __TARGET_FOLDER: string = GENERATIONS_TARGET_FOLDER
) {
  const project = new Project();

  const sourceFile = project.createSourceFile(
    `${__TARGET_FOLDER}/${__LP_TYPE_STR}.ts`,
    {
      statements: [
        {
          type: JSON.stringify(lpArchitecture, (_, v) => (Array.isArray(v) ? v.map((slug) => `'${slug}'`).join(' | ') : v), 2).replace(/"'|'"/g, "'"),
          kind: StructureKind.TypeAlias,
          name: __LP_TYPE_STR,
          isExported: false
        }
      ]
    },
    { overwrite: true }
  );
  const oldTextLength = sourceFile.getText().length;

  sourceFile.insertText(0, AUTOGENERATED_CODE_COMMENT_STR);
  sourceFile.insertText(oldTextLength + AUTOGENERATED_CODE_COMMENT_STR.length, `export default ${__LP_TYPE_STR};`);
  if (pretty) sourceFile.formatText(TS_MORPH_FORMATTER_SETTINGS);
  await sourceFile.save();
}
