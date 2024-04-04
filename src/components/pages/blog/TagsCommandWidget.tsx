import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent } from 'react';

export interface TagsCommandWidgetProps {
  tags: BlogTag[];
}

const TagsCommandWidget: FunctionComponent<TagsCommandWidgetProps> = () => {
  return <p>Hello</p>;
};

export default TagsCommandWidget;
