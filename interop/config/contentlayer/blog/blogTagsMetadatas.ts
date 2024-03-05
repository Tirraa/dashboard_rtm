import { generateBlogTagOptionsVocabSchema, generateIndexedBlogTagOptions } from '../../../lib/builders/blogTagsGenerators';
import { blogTagOptions } from './blogTags';

export const indexedBlogTagOptions = generateIndexedBlogTagOptions(blogTagOptions);

export const blogTagOptionsVocabSchema = generateBlogTagOptionsVocabSchema(blogTagOptions);
