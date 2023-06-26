import { PlayerProps } from '../../../core/player/PlayerProps';
export declare class DefaultControls {
  /**
   * The length in milliseconds that the controls are active for before fading out. Audio players
   * are not effected by this prop.
   */
  activeDuration: number;
  /**
   * Whether the controls should wait for playback to start before being shown. Audio players
   * are not effected by this prop.
   */
  waitForPlaybackStart: boolean;
  /**
   * Whether the controls should show/hide when paused. Audio players are not effected by this prop.
   */
  hideWhenPaused: boolean;
  /**
   * Whether the controls should hide when the mouse leaves the player. Audio players are not
   * effected by this prop.
   */
  hideOnMouseLeave: boolean;
  /**
   * @internal
   */
  theme?: PlayerProps['theme'];
  /**
   * @internal
   */
  isMobile: PlayerProps['isMobile'];
  /**
   * @internal
   */
  isLive: PlayerProps['isLive'];
  /**
   * @internal
   */
  isAudioView: PlayerProps['isAudioView'];
  /**
   * @internal
   */
  isVideoView: PlayerProps['isVideoView'];
  constructor();
  private buildAudioControls;
  private buildMobileVideoControls;
  private buildDesktopVideoControls;
  render(): any;
}
