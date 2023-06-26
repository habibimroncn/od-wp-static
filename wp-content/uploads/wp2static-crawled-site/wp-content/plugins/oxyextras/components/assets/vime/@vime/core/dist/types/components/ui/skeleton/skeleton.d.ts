import { PlayerProps } from '../../core/player/PlayerProps';
export declare class Skeleton {
  hidden: boolean;
  /**
   * Determines which effect the skeleton will use.
   * */
  effect: 'sheen' | 'none';
  /**
   * @internal
   */
  ready: PlayerProps['ready'];
  onReadyChange(): void;
  constructor();
  render(): any;
}
