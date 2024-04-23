import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { DocumentHeading } from '@rtm/shared-types/Documents';

import GithubSlugger from 'github-slugger';

const MAX_HEADING_DEPTH = 6;
const MATCHER = /^#+/;

function buildBlogPostHeadingsFromPostObj(post: DocumentToCompute): DocumentHeading[] {
  const slugger = new GithubSlugger();
  const markdown = post.body.raw as string;

  const lines = markdown.split('\n');
  const headings: DocumentHeading[] = [];

  for (const line of lines) {
    const matches = line.match(MATCHER);
    if (!matches) continue;

    /* eslint-disable no-magic-numbers */
    const depth = matches[0].length;
    if (depth > MAX_HEADING_DEPTH) continue;
    /* eslint-enable no-magic-numbers */

    const content = line.replace(MATCHER, '').trim();
    if (!content) continue;

    const slug = slugger.slug(content);

    const heading: DocumentHeading = {
      content,
      depth,
      slug
    };

    headings.push(heading);
  }

  return headings;
}

const buildBlogPostHeadings = (post: DocumentToCompute): DocumentHeading[] => buildBlogPostHeadingsFromPostObj(post);

export default buildBlogPostHeadings;
