import { CSSProperties, FunctionComponent } from 'react';

interface SidebarBtnSeparatorProps {
  style?: CSSProperties;
}

const DEFAULT_STYLE_VALUE = {};

const STYLING_CLASSLIST = 'm-auto my-2 w-5/6 hidden lg:block';

export const SidebarBtnSeparator: FunctionComponent<SidebarBtnSeparatorProps> = ({ style: styleValue }) => (
  <hr className={STYLING_CLASSLIST} {...{ style: styleValue || DEFAULT_STYLE_VALUE }} />
);

export default SidebarBtnSeparator;
