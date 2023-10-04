import IButtonStyleBase from './types/IButtonStyleBase';

const COMMONS = 'z-0 transition-opacity relative h-0 flex lg:w-0 lg:block';

export const SitebarDropdownButtonWrapperStyle: IButtonStyleBase = {
  isActiveClassList: COMMONS,
  isNotActiveClassList: COMMONS + ' ' + 'opacity-20 hover:opacity-100'
};

export default SitebarDropdownButtonWrapperStyle;
