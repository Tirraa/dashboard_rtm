import IButtonStyleBase from './types/IButtonStyleBase';

const COMMONS = 'transition-opacity relative h-0 lg:w-0';

export const SitebarDropdownButtonStyle: IButtonStyleBase = {
  isActiveClassList: COMMONS,
  isNotActiveClassList: COMMONS + ' ' + 'opacity-20 hover:opacity-100'
};

export default SitebarDropdownButtonStyle;
