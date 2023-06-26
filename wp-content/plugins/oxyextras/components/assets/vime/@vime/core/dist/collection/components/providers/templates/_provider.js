var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h, Prop, Method, Event, } from '@stencil/core';
import { withProviderContext, withProviderConnect, } from '../MediaProvider';
import { ViewType } from '../../core/player/ViewType';
import { createProviderDispatcher } from '../ProviderDispatcher';
// @component
export class Name {
  constructor() {
    /**
     * @internal
     */
    this.language = 'en';
    /**
     * @internal
     */
    this.autoplay = false;
    /**
     * @internal
     */
    this.controls = false;
    /**
     * @internal
     */
    this.loop = false;
    /**
     * @internal
     */
    this.muted = false;
    /**
     * @internal
     */
    this.playsinline = false;
    withProviderConnect(this);
    withProviderContext(this);
  }
  connectedCallback() {
    this.dispatch = createProviderDispatcher(this);
    // @TODO change this if view is of type audio.
    this.dispatch('viewType', ViewType.Video);
  }
  /**
   * @internal
   */
  async getAdapter() {
    // @TODO implement the following, commented out methods are optional and can be deleted.
    return {
      getInternalPlayer: async () => { },
      play: async () => { },
      pause: async () => { },
      canPlay: async () => false,
      setCurrentTime: async (time) => { this.logger.log(time); },
      setMuted: async (muted) => { this.logger.log(muted); },
      setVolume: async (volume) => { this.logger.log(volume); },
    };
  }
  // @TODO implement the render function.
  render() {
    return h("div", null);
  }
}
__decorate([
  Prop()
], Name.prototype, "language", void 0);
__decorate([
  Prop()
], Name.prototype, "autoplay", void 0);
__decorate([
  Prop()
], Name.prototype, "controls", void 0);
__decorate([
  Prop()
], Name.prototype, "logger", void 0);
__decorate([
  Prop()
], Name.prototype, "loop", void 0);
__decorate([
  Prop()
], Name.prototype, "muted", void 0);
__decorate([
  Prop()
], Name.prototype, "playsinline", void 0);
__decorate([
  Event()
], Name.prototype, "vLoadStart", void 0);
__decorate([
  Method()
], Name.prototype, "getAdapter", null);
