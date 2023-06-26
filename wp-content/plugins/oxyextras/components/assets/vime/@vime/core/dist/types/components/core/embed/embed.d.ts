import { ComponentInterface, EventEmitter } from '../../../stencil-public-runtime';
import { Params } from '../../../utils/network';
export declare class Embed implements ComponentInterface {
  private id;
  private iframe?;
  private lazyLoader;
  el: HTMLVimeEmbedElement;
  srcWithParams: string;
  hasEnteredViewport: boolean;
  /**
   * A URL that will load the external player and media (Eg: https://www.youtube.com/embed/DyTCOwB0DVw).
   */
  embedSrc: string;
  /**
   * The title of the current media so it can be set on the inner `iframe` for screen readers.
   */
  mediaTitle: string;
  /**
   * The parameters to pass to the embedded player which are appended to the `embedSrc` prop. These
   * can be passed in as a query string or object.
   */
  params: string | Params;
  srcChange(): void;
  srcWithParamsChange(): void;
  /**
   * Where the src request had originated from without any path information.
   */
  origin?: string;
  /**
   * A collection of URLs to that the browser should immediately start establishing a connection
   * with.
   */
  preconnections: string[];
  /**
   * A function which accepts the raw message received from the embedded media player via
   * `postMessage` and converts it into a POJO.
   */
  decoder?: (data: string) => Params | undefined;
  /**
   * Emitted when the `embedSrc` or `params` props change. The payload contains the `params`
   * serialized into a query string and appended to `embedSrc`.
   */
  vEmbedSrcChange: EventEmitter<string>;
  /**
   * Emitted when a new message is received from the embedded player via `postMessage`.
   */
  vEmbedMessage: EventEmitter<any>;
  /**
   * Emitted when the embedded player and any new media has loaded.
   */
  vEmbedLoaded: EventEmitter<void>;
  preconnectionsChange(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  onWindowMessage(e: MessageEvent): void;
  /**
   * Posts a message to the embedded media player.
   */
  postMessage(message: any, target?: string): Promise<void>;
  private onLoad;
  private genIframeId;
  render(): any;
}
