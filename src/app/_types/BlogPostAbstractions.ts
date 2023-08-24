import { PhantomPost } from 'contentlayer/generated';

export type PostBase = Omit<PhantomPost, 'type'>;
export default PostBase;
