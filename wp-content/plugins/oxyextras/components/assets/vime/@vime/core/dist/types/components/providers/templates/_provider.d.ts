import { EventEmitter } from '../../../stencil-public-runtime';
import { MediaProvider, MediaProviderAdapter } from '../MediaProvider';
import { Logger } from '../../core/player/PlayerLogger';
export declare class Name implements MediaProvider {
  private dispatch;
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
  /**
   * @internal
   */
  getAdapter(): Promise<MediaProviderAdapter>;
  render(): any;
}
