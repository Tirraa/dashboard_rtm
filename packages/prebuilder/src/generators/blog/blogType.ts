import { Project, StructureKind } from 'ts-morph';
import { AUTOGENERATED_CODE_COMMENT_STR, BLOG_TYPE_STR, GENERATIONS_TARGET_FOLDER } from '../../config';
import type { CategoriesMetadatas } from '../../types/metadatas';

export default function generateBlogType(blogArchitecture: CategoriesMetadatas) {
  const project = new Project();

  const sourceFile = project.createSourceFile(
    `${GENERATIONS_TARGET_FOLDER}/${BLOG_TYPE_STR}.ts`,
    {
      statements: [
        {
          kind: StructureKind.TypeAlias,
          name: BLOG_TYPE_STR,
          type: JSON.stringify(blogArchitecture, (_, v) => (Array.isArray(v) ? v.map((slug) => `'${slug}'`).join(' | ') : v), 2).replace(
            /"'|'"/g,
            "'"
          ),
          isExported: false
        }
      ]
    },
    { overwrite: true }
  );
  const oldTextLength = sourceFile.getText().length;

  sourceFile.insertText(0, AUTOGENERATED_CODE_COMMENT_STR);
  sourceFile.insertText(oldTextLength + AUTOGENERATED_CODE_COMMENT_STR.length, `export default ${BLOG_TYPE_STR};`);
  sourceFile.formatText({ ensureNewLineAtEndOfFile: true });
  sourceFile.saveSync();
}
