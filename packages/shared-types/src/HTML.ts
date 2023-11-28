enum EFlexJustify {
  'normal',
  'start',
  'end',
  'center',
  'between',
  'around',
  'evenly',
  'stretch'
}

enum EFlexDirection {
  'col',
  'row',
  'col-reverse',
  'row-reverse'
}

enum EFlexWrap {
  'wrap',
  'wrap-reverse',
  'nowrap'
}

enum EDirection {
  'rtl',
  'ltr'
}

enum ETitleType {
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6'
}

enum EAnchorTarget {
  '_blank',
  '_self',
  '_parent',
  '_top'
}
type EAnchorTargetFrameName = string;

export type FlexJustify = keyof typeof EFlexJustify;
export type FlexDirection = keyof typeof EFlexDirection;
export type FlexWrap = keyof typeof EFlexWrap;
export type Direction = keyof typeof EDirection;
export type TitleType = keyof typeof ETitleType;
export type AnchorTarget = keyof typeof EAnchorTarget | EAnchorTargetFrameName;
