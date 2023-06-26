import { PlayerProps } from '../../core/player/PlayerProps';
export declare class DblClickFullscreen {
  canSetFullscreen: boolean;
  /**
   * By default this is disabled on mobile to not interfere with playback, set this to `true` to
   * enable it.
   */
  useOnMobile: boolean;
  /**
   * @internal
   */
  isFullscreenActive: PlayerProps['isFullscreenActive'];
  /**
   * @internal
   */
  isVideoView: PlayerProps['isVideoView'];
  /**
   * @internal
   */
  playbackReady: PlayerProps['playbackReady'];
  onPlaybackReadyChange(): Promise<void>;
  constructor();
  private onTriggerClickToPlay;
  private onToggleFullscreen;
  private clicks;
  private onClick;
  render(): any;
}
