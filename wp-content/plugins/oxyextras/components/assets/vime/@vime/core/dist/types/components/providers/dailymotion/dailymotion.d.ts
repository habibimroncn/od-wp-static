import { EventEmitter } from '../../../stencil-public-runtime';
import { MediaProvider } from '../MediaProvider';
import { Logger } from '../../core/player/PlayerLogger';
export declare class Dailymotion implements MediaProvider<HTMLVimeEmbedElement> {
  private embed;
  private dispatch;
  private initialMuted;
  private defaultInternalState;
  private fetchVideoInfo?;
  private pendingMediaTitleCall?;
  private internalState;
  embedSrc: string;
  mediaTitle: string;
  /**
   * The Dailymotion resource ID of the video to load.
   */
  videoId: string;
  onVideoIdChange(): void;
  /**
   * Whether to automatically play the next video in the queue.
   */
  shouldAutoplayQueue: boolean;
  /**
   * Whether to show the 'Up Next' queue.
   */
  showUpNextQueue: boolean;
  /**
   * Whether to show buttons for sharing the video.
   */
  showShareButtons: boolean;
  /**
   * Change the default highlight color used in the controls (hex value without the leading #).
   * Color set in the Partner HQ will override this prop.
   */
  color?: string;
  /**
   * Forwards your syndication key to the player.
   */
  syndication?: string;
  /**
   * Whether to display the Dailymotion logo.
   */
  showDailymotionLogo: boolean;
  /**
   * Whether to show video information (title and owner) on the start screen.
   */
  showVideoInfo: boolean;
  /**
   * @internal
   */
  language: string;
  /**
   * @internal
   */
  autoplay: boolean;
  /**
   * @internal
   */
  controls: boolean;
  onControlsChange(): void;
  /**
   * The absolute URL of a custom poster to be used for the current video.
   */
  poster?: string;
  onCustomPosterChange(): void;
  /**
   * @internal
   */
  logger?: Logger;
  /**
   * @internal
   */
  loop: boolean;
  /**
   * @internal
   */
  muted: boolean;
  /**
   * @internal
   */
  playsinline: boolean;
  /**
   * @internal
   */
  vLoadStart: EventEmitter<void>;
  constructor();
  connectedCallback(): void;
  private getOrigin;
  private getPreconnections;
  private remoteControl;
  private buildParams;
  private getVideoInfo;
  private onEmbedSrcChange;
  private onEmbedMessage;
  /**
   * @internal
   */
  getAdapter(): Promise<{
    getInternalPlayer: () => Promise<HTMLVimeEmbedElement>;
    play: () => Promise<void>;
    pause: () => Promise<void>;
    canPlay: (type: any) => Promise<boolean>;
    setCurrentTime: (time: number) => Promise<void>;
    setMuted: (muted: boolean) => Promise<void>;
    setVolume: (volume: number) => Promise<void>;
    canSetPlaybackQuality: () => Promise<boolean>;
    setPlaybackQuality: (quality: string) => Promise<void>;
    canSetFullscreen: () => Promise<boolean>;
    enterFullscreen: () => Promise<void>;
    exitFullscreen: () => Promise<void>;
  }>;
  render(): any;
}
