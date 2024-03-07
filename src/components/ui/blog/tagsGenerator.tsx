import type { BlogPostType } from '@/types/Blog';
import type { ReactElement } from 'react';

import { getCurrentLocale, getScopedI18n } from '@/i18n/server';
import { i18ns } from '##/config/i18n';

import { Badge } from '../badge';

async function tagsGenerator({ tags }: BlogPostType): Promise<ReactElement[]> {
  const scopedT = await getScopedI18n(i18ns.blogTags);
  const currentLocale = getCurrentLocale();

  const sortedTagsByCurrentLocale = tags.sort((a, b) => a.localeCompare(b, currentLocale));
  return sortedTagsByCurrentLocale.map((tag) => <Badge key={tag}>{scopedT(tag)}</Badge>);
}

export default tagsGenerator;
