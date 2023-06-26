import { PlayerProps } from '../../core/player/PlayerProps';
/**
 * @slot - Used to pass in UI components for the player.
 */
export declare class UI {
  /**
   * @internal
   */
  isVideoView: PlayerProps['isVideoView'];
  /**
   * @internal
   */
  playsinline: PlayerProps['playsinline'];
  /**
   * @internal
   */
  isFullscreenActive: PlayerProps['isFullscreenActive'];
  constructor();
  render(): any;
}
