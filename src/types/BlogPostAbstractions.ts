import { PhantomPost } from 'contentlayer/generated';

type PhantomType = 'type';

export type PostBase = Omit<PhantomPost, PhantomType>;
export default PostBase;
