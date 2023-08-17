import StyleBase from './IStyleBase';

export interface IButtonStyleBase extends StyleBase {
  isActiveClassList: string;
  isNotActiveClassList: string;
}

export default IButtonStyleBase;
