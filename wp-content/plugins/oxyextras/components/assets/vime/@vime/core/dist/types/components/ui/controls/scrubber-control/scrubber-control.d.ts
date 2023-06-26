import { PlayerProps } from '../../../core/player/PlayerProps';
export declare class ScrubberControl {
  private slider;
  private tooltip;
  private dispatch;
  private keyboardDisposal;
  el: HTMLVimeScrubberControlElement;
  timestamp: string;
  endTime: number;
  /**
   * Whether the timestamp in the tooltip should show the hours unit, even if the time is less than
   * 1 hour (eg: `20:35` -> `00:20:35`).
   */
  alwaysShowHours: boolean;
  /**
   * Whether the tooltip should not be displayed.
   */
  hideTooltip: boolean;
  /**
   * @internal
   */
  currentTime: PlayerProps['currentTime'];
  /**
   * @internal
   */
  duration: PlayerProps['duration'];
  /**
   * Prevents seeking forward/backward by using the Left/Right arrow keys.
   */
  noKeyboard: boolean;
  onNoKeyboardChange(): void;
  onDurationChange(): void;
  /**
   * @internal
   */
  buffering: PlayerProps['buffering'];
  /**
   * @internal
   */
  buffered: PlayerProps['buffered'];
  /**
   * @internal
   */
  i18n: PlayerProps['i18n'];
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  private setTooltipPosition;
  private onSeek;
  private onSeeking;
  private getSliderInput;
  render(): any;
}
