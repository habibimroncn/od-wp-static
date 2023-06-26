import { ComponentInterface } from '../../../stencil-public-runtime';
import { PlayerProps } from './PlayerProps';
import { PlayerEvents } from './PlayerEvents';
import { PlayerMethods } from './PlayerMethods';
declare type Indexable = {
  [P in keyof PlayerProps]: PlayerProps[P];
};
/**
 * The core media player interface.
 *
 * @ref https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
 */
export interface MediaPlayer extends ComponentInterface, PlayerProps, PlayerEvents, PlayerMethods, Indexable {
}
export {};
