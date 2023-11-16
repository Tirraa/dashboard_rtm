import type { PostBase } from '@/types/Blog';
import type { AppPath } from '@/types/Next';

export const buildBlogPostUrl = (post: PostBase): AppPath => `/${post._raw.flattenedPath}`;
export default buildBlogPostUrl;
