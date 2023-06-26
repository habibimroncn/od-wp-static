import { EventEmitter } from '../../../../stencil-public-runtime';
import { PlayerProps } from '../../../core/player/PlayerProps';
import { KeyboardControl } from './KeyboardControl';
/**
 * @slot - Used to pass in the content of the control (text/icon/tooltip).
 */
export declare class Control implements KeyboardControl {
  private button;
  private keyboardDisposal;
  el: HTMLVimeControlElement;
  describedBy?: string;
  showTapHighlight: boolean;
  /**
   * @inheritdoc
   */
  keys?: string;
  onKeysChange(): void;
  /**
   * The `id` attribute of the control.
   */
  identifier?: string;
  /**
   * Whether the control should be displayed or not.
   */
  hidden: boolean;
  /**
   * The `aria-label` property of the control.
   */
  label: string;
  /**
   * If the control has a popup menu, then this should be the `id` of said menu. Sets the
   * `aria-controls` property.
   */
  menu?: string;
  /**
   * If the control has a popup menu, this indicates whether the menu is open or not. Sets the
   * `aria-expanded` property.
   */
  expanded?: boolean;
  /**
   * If the control is a toggle, this indicated whether the control is in a "pressed" state or not.
   * Sets the `aria-pressed` property.
   */
  pressed?: boolean;
  /**
   * @internal
   */
  isTouch: PlayerProps['isTouch'];
  /**
   * Emitted when the user is interacting with the control by focusing, touching or hovering on it.
   */
  vInteractionChange: EventEmitter<boolean>;
  constructor();
  connectedCallback(): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  private onTouchStart;
  private findTooltip;
  private onShowTooltip;
  private onHideTooltip;
  private onFocus;
  private onBlur;
  private onMouseEnter;
  private onMouseLeave;
  render(): any;
}
