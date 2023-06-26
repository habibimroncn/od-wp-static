import { PlayerProps } from '../../../core/player/PlayerProps';
export declare class CurrentTime {
  /**
   * @internal
   */
  currentTime: PlayerProps['currentTime'];
  /**
   * @internal
   */
  i18n: PlayerProps['i18n'];
  /**
   * Whether the time should always show the hours unit, even if the time is less than
   * 1 hour (eg: `20:35` -> `00:20:35`).
   */
  alwaysShowHours: boolean;
  constructor();
  render(): any;
}
