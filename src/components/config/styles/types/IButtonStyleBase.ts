import type IStyleBase from './IStyleBase';

export interface IButtonStyleBase extends IStyleBase {
  isActiveClassList: string;
  isNotActiveClassList: string;
}

export default IButtonStyleBase;
