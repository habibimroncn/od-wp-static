import { EventEmitter } from '../../../stencil-public-runtime';
import { MediaFileProvider, MediaPreloadOption, MediaCrossOriginOption } from '../file/MediaFileProvider';
/**
 * @slot - Pass `<source>` elements to the underlying HTML5 media player.
 */
export declare class HLS implements MediaFileProvider {
  private hls?;
  private videoProvider;
  private mediaEl?;
  private dispatch;
  hasAttached: boolean;
  /**
   * The NPM package version of the `hls.js` library to download and use if HLS is not natively
   * supported.
   */
  version: string;
  /**
   * The `hls.js` configuration.
   */
  config?: any;
  /**
   * @inheritdoc
   */
  crossOrigin?: MediaCrossOriginOption;
  /**
   * @inheritdoc
   */
  preload?: MediaPreloadOption;
  /**
   * @inheritdoc
   */
  poster?: string;
  /**
   * @inheritdoc
   */
  controlsList?: string;
  /**
   * @inheritdoc
   */
  autoPiP?: boolean;
  /**
   * @inheritdoc
   */
  disablePiP?: boolean;
  /**
   * @inheritdoc
   */
  disableRemotePlayback?: boolean;
  /**
   * The title of the current media.
   */
  mediaTitle?: string;
  /**
   * @internal
   */
  vLoadStart: EventEmitter<void>;
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  get src(): string | undefined;
  private setupHls;
  private destroyHls;
  onMediaElChange(event: CustomEvent<HTMLVideoElement | undefined>): Promise<void>;
  private onSrcChange;
  /**
   * @internal
   */
  getAdapter(): Promise<{
    getInternalPlayer: () => Promise<any>;
    canPlay: (type: any) => Promise<boolean>;
    play: () => Promise<void | undefined>;
    pause: () => Promise<void | undefined>;
    setCurrentTime: (time: number) => Promise<void>;
    setMuted: (muted: boolean) => Promise<void>;
    setVolume: (volume: number) => Promise<void>;
    canSetPlaybackRate: () => Promise<boolean>;
    setPlaybackRate: (rate: number) => Promise<void>;
    canSetPlaybackQuality: () => Promise<boolean>;
    setPlaybackQuality: (quality: string) => Promise<void>;
    canSetPiP: () => Promise<boolean>;
    enterPiP: () => Promise<any>;
    exitPiP: () => Promise<any>;
    canSetFullscreen: () => Promise<boolean>;
    enterFullscreen: () => Promise<any>;
    exitFullscreen: () => Promise<any>;
  }>;
  render(): any;
}
