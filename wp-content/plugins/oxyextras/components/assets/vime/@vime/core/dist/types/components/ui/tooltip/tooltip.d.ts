import { PlayerProps } from '../../core/player/PlayerProps';
import { TooltipDirection, TooltipPosition } from './types';
/**
 * @slot - Used to pass in the contents of the tooltip.
 */
export declare class Tooltip {
  private hasLoaded;
  el: HTMLVimeTooltipElement;
  /**
   * Whether the tooltip is displayed or not.
   */
  hidden: boolean;
  /**
   * Whether the tooltip is visible or not.
   */
  active: boolean;
  /**
   * Determines if the tooltip appears on top/bottom of it's parent.
   */
  position: TooltipPosition;
  /**
   * Determines if the tooltip should grow according to its contents to the left/right. By default
   * content grows outwards from the center.
   */
  direction?: TooltipDirection;
  /**
   * @internal
   */
  isTouch: PlayerProps['isTouch'];
  constructor();
  componentDidLoad(): void;
  private getId;
  render(): any;
}
