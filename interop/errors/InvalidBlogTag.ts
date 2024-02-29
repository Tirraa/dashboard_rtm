// {ToDo} Build error msg with Damerau Levenshtein

import damerauLevenshtein from '../lib/misc/damerauLevenshtein';

class InvalidBlogTag extends Error {
  constructor(blogTags: string[]) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const message = blogTags.length === 1 ? `${blogTags[0]}` : `${blogTags.join(', ')}`;
    damerauLevenshtein('', '');
    super(message);
    this.name = 'InvalidBlogTagError';
  }
}

export default InvalidBlogTag;
