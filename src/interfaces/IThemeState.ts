import { ColorMode } from '../enums/ColorMode';
import { Theme } from '../enums/Theme';

export interface IThemeState {
  readonly theme: Theme;
  readonly colorMode: ColorMode;
}