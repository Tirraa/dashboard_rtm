import IButtonStyleBase from './types/IButtonStyleBase';

const COMMONS = 'transition-transform	duration-700 m-auto w-full h-full p-1 text-white lg:rtl:-scale-x-100';

export const SitebarDropdownButtonIconStyle: IButtonStyleBase = {
  isActiveClassList: COMMONS,
  isNotActiveClassList: COMMONS + ' ' + '-rotate-180 lg:rtl:rotate-180'
};

export default SitebarDropdownButtonIconStyle;
