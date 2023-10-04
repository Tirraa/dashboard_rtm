import IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';

const COMMONS = 'z-10 transition-opacity delay-300 duration-1000 relative h-0 flex lg:w-0 lg:block';

export const SidebarCollapseButtonWrapperStyle: IButtonStyleBase = {
  isActiveClassList: COMMONS + ' ' + 'opacity-100',
  isNotActiveClassList: COMMONS + ' ' + 'opacity-20 hover:opacity-100 hover:delay-0 hover:duration-300'
};

export default SidebarCollapseButtonWrapperStyle;
