/* v8 ignore start */
// Stryker disable all

import { generateBlogAuthorOptionsVocabSchema, generateIndexedAuthorNames } from '../../../lib/builders/blogAuthorsGenerators';
import { authorNames } from './authors';

export const indexedBlogAuthorNames = generateIndexedAuthorNames(authorNames);

export const blogAuthorOptionsVocabSchema = generateBlogAuthorOptionsVocabSchema(authorNames);

// Stryker restore all
/* v8 ignore stop */
