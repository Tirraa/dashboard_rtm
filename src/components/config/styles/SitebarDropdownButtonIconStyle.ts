import IButtonStyleBase from './types/IButtonStyleBase';

const COMMONS = 'bg-black rounded-full w-8 h-8 p-1 lg:mt-0 text-white';

export const SitebarDropdownButtonIconStyle: IButtonStyleBase = {
  isActiveClassList: COMMONS + ' ' + '-mt-2 lg:-mr-1 rounded-b-full rounded-t-none lg:rounded-r-full lg:rounded-l-none',
  isNotActiveClassList: COMMONS + ' ' + '-mt-4 lg:-ml-4'
};

export default SitebarDropdownButtonIconStyle;
