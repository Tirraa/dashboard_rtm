import { generateBlogTagOptionsVocabSchema, generateIndexedBlogTagOptions } from '../../../lib/builders/blogTagsGenerators';

export const indexedBlogTagOptions = generateIndexedBlogTagOptions();

export const blogTagOptionsVocabSchema = generateBlogTagOptionsVocabSchema();
