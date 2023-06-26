import { h, Host, Component, Prop, State, Watch, Element, } from '@stencil/core';
import { withPlayerContext } from '../../../core/player/PlayerContext';
import { formatTime } from '../../../../utils/formatters';
import { createDispatcher } from '../../../core/player/PlayerDispatcher';
import { Disposal } from '../../../core/player/Disposal';
import { listen } from '../../../../utils/dom';
import { findRootPlayer } from '../../../core/player/utils';
export class ScrubberControl {
  constructor() {
    this.keyboardDisposal = new Disposal();
    this.timestamp = '';
    this.endTime = 0;
    /**
     * Whether the timestamp in the tooltip should show the hours unit, even if the time is less than
     * 1 hour (eg: `20:35` -> `00:20:35`).
     */
    this.alwaysShowHours = false;
    /**
     * Whether the tooltip should not be displayed.
     */
    this.hideTooltip = false;
    /**
     * @internal
     */
    this.currentTime = 0;
    /**
     * @internal
     */
    this.duration = -1;
    /**
     * Prevents seeking forward/backward by using the Left/Right arrow keys.
     */
    this.noKeyboard = false;
    /**
     * @internal
     */
    this.buffering = false;
    /**
     * @internal
     */
    this.buffered = 0;
    /**
     * @internal
     */
    this.i18n = {};
    withPlayerContext(this, [
      'i18n',
      'currentTime',
      'duration',
      'buffering',
      'buffered',
    ]);
  }
  onNoKeyboardChange() {
    this.keyboardDisposal.empty();
    if (this.noKeyboard)
      return;
    const player = findRootPlayer(this);
    const onKeyDown = (event) => {
      if ((event.key !== 'ArrowLeft') && (event.key !== 'ArrowRight'))
        return;
      event.preventDefault();
      const isLeftArrow = (event.key === 'ArrowLeft');
      const seekTo = isLeftArrow
        ? Math.max(0, this.currentTime - 5)
        : Math.min(this.duration, this.currentTime + 5);
      this.dispatch('currentTime', seekTo);
    };
    this.keyboardDisposal.add(listen(player, 'keydown', onKeyDown));
  }
  onDurationChange() {
    // Avoid -1.
    this.endTime = Math.max(0, this.duration);
  }
  connectedCallback() {
    this.dispatch = createDispatcher(this);
    this.timestamp = formatTime(this.currentTime, this.alwaysShowHours);
    this.onNoKeyboardChange();
  }
  disconnectedCallback() {
    this.keyboardDisposal.empty();
  }
  setTooltipPosition(value) {
    const tooltipRect = this.tooltip.getBoundingClientRect();
    const bounds = this.slider.getBoundingClientRect();
    const thumbWidth = parseFloat(window.getComputedStyle(this.slider)
      .getPropertyValue('--vm-slider-thumb-width'));
    const leftLimit = (tooltipRect.width / 2) - (thumbWidth / 2);
    const rightLimit = bounds.width - (tooltipRect.width / 2) - (thumbWidth / 2);
    const xPos = Math.max(leftLimit, Math.min(value, rightLimit));
    this.tooltip.style.left = `${xPos}px`;
  }
  onSeek(event) {
    this.dispatch('currentTime', event.detail);
  }
  onSeeking(event) {
    if (this.duration < 0 || this.tooltip.hidden)
      return;
    if (event.type === 'mouseleave') {
      this.getSliderInput().blur();
      this.tooltip.active = false;
      return;
    }
    const rect = this.el.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, (100 / rect.width) * (event.pageX - rect.left)));
    this.timestamp = formatTime((this.duration / 100) * percent, this.alwaysShowHours);
    this.setTooltipPosition((percent / 100) * rect.width);
    if (!this.tooltip.active) {
      this.getSliderInput().focus();
      this.tooltip.active = true;
    }
  }
  getSliderInput() {
    return this.slider.querySelector('input');
  }
  render() {
    const sliderValueText = this.i18n.scrubberLabel
      .replace(/{currentTime}/, formatTime(this.currentTime))
      .replace(/{duration}/, formatTime(this.endTime));
    return (h(Host, { onMouseEnter: this.onSeeking.bind(this), onMouseLeave: this.onSeeking.bind(this), onMouseMove: this.onSeeking.bind(this), onTouchMove: () => { this.getSliderInput().focus(); }, onTouchEnd: () => { this.getSliderInput().blur(); } },
      h("vime-slider", { step: 0.01, max: this.endTime, value: this.currentTime, label: this.i18n.scrubber, valueText: sliderValueText, onVValueChange: this.onSeek.bind(this), ref: (el) => { this.slider = el; } }),
      h("progress", { class: {
          loading: this.buffering,
        }, 
        // @ts-ignore
        min: 0, max: this.endTime, value: this.buffered, "aria-label": this.i18n.buffered, "aria-valuemin": "0", "aria-valuemax": this.endTime, "aria-valuenow": this.buffered, "aria-valuetext": `${((this.endTime > 0) ? (this.buffered / this.endTime) : 0).toFixed(0)}%` }, "% buffered"),
      h("vime-tooltip", { hidden: this.hideTooltip, ref: (el) => { this.tooltip = el; } }, this.timestamp)));
  }
  static get is() { return "vime-scrubber-control"; }
  static get originalStyleUrls() { return {
    "$": ["scrubber-control.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["scrubber-control.css"]
  }; }
  static get properties() { return {
    "alwaysShowHours": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Whether the timestamp in the tooltip should show the hours unit, even if the time is less than\n1 hour (eg: `20:35` -> `00:20:35`)."
      },
      "attribute": "always-show-hours",
      "reflect": false,
      "defaultValue": "false"
    },
    "hideTooltip": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Whether the tooltip should not be displayed."
      },
      "attribute": "hide-tooltip",
      "reflect": false,
      "defaultValue": "false"
    },
    "currentTime": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "PlayerProps['currentTime']",
        "resolved": "number",
        "references": {
          "PlayerProps": {
            "location": "import",
            "path": "../../../core/player/PlayerProps"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": ""
      },
      "attribute": "current-time",
      "reflect": false,
      "defaultValue": "0"
    },
    "duration": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "PlayerProps['duration']",
        "resolved": "number",
        "references": {
          "PlayerProps": {
            "location": "import",
            "path": "../../../core/player/PlayerProps"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": ""
      },
      "attribute": "duration",
      "reflect": false,
      "defaultValue": "-1"
    },
    "noKeyboard": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Prevents seeking forward/backward by using the Left/Right arrow keys."
      },
      "attribute": "no-keyboard",
      "reflect": false,
      "defaultValue": "false"
    },
    "buffering": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "PlayerProps['buffering']",
        "resolved": "boolean",
        "references": {
          "PlayerProps": {
            "location": "import",
            "path": "../../../core/player/PlayerProps"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": ""
      },
      "attribute": "buffering",
      "reflect": false,
      "defaultValue": "false"
    },
    "buffered": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "PlayerProps['buffered']",
        "resolved": "number",
        "references": {
          "PlayerProps": {
            "location": "import",
            "path": "../../../core/player/PlayerProps"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": ""
      },
      "attribute": "buffered",
      "reflect": false,
      "defaultValue": "0"
    },
    "i18n": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "PlayerProps['i18n']",
        "resolved": "Translation | { [x: string]: string; }",
        "references": {
          "PlayerProps": {
            "location": "import",
            "path": "../../../core/player/PlayerProps"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "internal"
          }],
        "text": ""
      },
      "defaultValue": "{}"
    }
  }; }
  static get states() { return {
    "timestamp": {},
    "endTime": {}
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "noKeyboard",
      "methodName": "onNoKeyboardChange"
    }, {
      "propName": "duration",
      "methodName": "onDurationChange"
    }]; }
}
