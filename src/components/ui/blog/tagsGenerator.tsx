import type { getScopedI18n } from '@/i18n/server';
import type { BlogPostType } from '@/types/Blog';
import type { i18ns } from '##/config/i18n';
import type { ReactElement } from 'react';

import { Badge } from '@/components/ui/Badge';

function tagsGenerator({
  language,
  scopedT,
  tags
}: Pick<BlogPostType, 'language' | 'tags'> & { scopedT: Awaited<ReturnType<typeof getScopedI18n<typeof i18ns.blogTags>>> }): ReactElement[] {
  const sortedTagsByCurrentLocale = tags.sort((a, b) => a.localeCompare(b, language));
  return sortedTagsByCurrentLocale.map((tag) => <Badge key={tag}>{scopedT(tag)}</Badge>);
}

export default tagsGenerator;
