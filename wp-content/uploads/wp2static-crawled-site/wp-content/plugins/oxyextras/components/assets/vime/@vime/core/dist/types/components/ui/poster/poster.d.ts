import { EventEmitter } from '../../../stencil-public-runtime';
import { PlayerProps } from '../../core/player/PlayerProps';
export declare class Poster {
  private lazyLoader;
  el: HTMLVimePosterElement;
  isHidden: boolean;
  isActive: boolean;
  hasLoaded: boolean;
  /**
   * How the poster image should be resized to fit the container (sets the `object-fit` property).
   */
  fit?: 'fill' | 'contain' | 'cover' | 'scale-down' | 'none';
  /**
   * @internal
   */
  isVideoView: PlayerProps['isVideoView'];
  /**
   * @internal
   */
  currentPoster?: PlayerProps['currentPoster'];
  onCurrentPosterChange(): void;
  /**
   * @internal
   */
  mediaTitle?: PlayerProps['mediaTitle'];
  /**
   * @internal
   */
  playbackStarted: PlayerProps['playbackStarted'];
  /**
   * @internal
   */
  currentTime: PlayerProps['currentTime'];
  /**
   * Emitted when the poster has loaded.
   */
  vLoaded: EventEmitter<void>;
  /**
   * Emitted when the poster will be shown.
   */
  vWillShow: EventEmitter<void>;
  /**
   * Emitted when the poster will be hidden.
   */
  vWillHide: EventEmitter<void>;
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  private onVisibilityChange;
  onEnabledChange(): void;
  onActiveChange(): void;
  private onPosterLoad;
  render(): any;
}
