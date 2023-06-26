import { h, Host, Component, Prop, State, Watch, } from '@stencil/core';
import { isUndefined } from '../../../../utils/unit';
import { findRootPlayer } from '../../../core/player/utils';
import { withPlayerContext } from '../../../core/player/PlayerContext';
export class FullscreenControl {
  constructor() {
    this.canSetFullscreen = false;
    /**
     * The URL to an SVG element or fragment to display for entering fullscreen.
     */
    this.enterIcon = '#vime-enter-fullscreen';
    /**
     * The URL to an SVG element or fragment to display for exiting fullscreen.
     */
    this.exitIcon = '#vime-exit-fullscreen';
    /**
     * Whether the tooltip is positioned above/below the control.
     */
    this.tooltipPosition = 'top';
    /**
     * Whether the tooltip should not be displayed.
     */
    this.hideTooltip = false;
    /**
     * @inheritdoc
     */
    this.keys = 'f';
    /**
     * @internal
     */
    this.isFullscreenActive = false;
    /**
     * @internal
     */
    this.i18n = {};
    /**
     * @internal
     */
    this.playbackReady = false;
    withPlayerContext(this, [
      'isFullscreenActive',
      'playbackReady',
      'i18n',
    ]);
  }
  async onPlaybackReadyChange() {
    const player = findRootPlayer(this);
    this.canSetFullscreen = await player.canSetFullscreen();
  }
  onClick() {
    const player = findRootPlayer(this);
    !this.isFullscreenActive ? player.enterFullscreen() : player.exitFullscreen();
  }
  render() {
    const tooltip = this.isFullscreenActive ? this.i18n.exitFullscreen : this.i18n.enterFullscreen;
    const tooltipWithHint = !isUndefined(this.keys) ? `${tooltip} (${this.keys})` : tooltip;
    return (h(Host, { class: {
        hidden: !this.canSetFullscreen,
      } },
      h("vime-control", { label: this.i18n.fullscreen, keys: this.keys, pressed: this.isFullscreenActive, hidden: !this.canSetFullscreen, onClick: this.onClick.bind(this) },
        h("vime-icon", { href: this.isFullscreenActive ? this.exitIcon : this.enterIcon }),
        h("vime-tooltip", { hidden: this.hideTooltip, position: this.tooltipPosition, direction: this.tooltipDirection }, tooltipWithHint))));
  }
  static get is() { return "vime-fullscreen-control"; }
  static get originalStyleUrls() { return {
    "$": ["fullscreen-control.css"]
  }; }
  static get styleUrls() { return {
    "$": ["fullscreen-control.css"]
  }; }
  static get properties() { return {
    "enterIcon": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The URL to an SVG element or fragment to display for entering fullscreen."
      },
      "attribute": "enter-icon",
      "reflect": false,
      "defaultValue": "'#vime-enter-fullscreen'"
    },
    "exitIcon": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The URL to an SVG element or fragment to display for exiting fullscreen."
      },
      "attribute": "exit-icon",
      "reflect": false,
      "defaultValue": "'#vime-exit-fullscreen'"
    },
    "tooltipPosition": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "TooltipPosition",
        "resolved": "\"bottom\" | \"top\"",
        "references": {
          "TooltipPosition": {
            "location": "import",
            "path": "../../tooltip/types"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Whether the tooltip is positioned above/below the control."
      },
      "attribute": "tooltip-position",
      "reflect": false,
      "defaultValue": "'top'"
    },
    "tooltipDirection": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "TooltipDirection",
        "resolved": "\"left\" | \"right\" | undefined",
        "references": {
          "TooltipDirection": {
            "location": "import",
            "path": "../../tooltip/types"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The direction in which the tooltip should grow."
      },
      "attribute": "tooltip-direction",
      "reflect": false
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
    "keys": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [{
            "text": undefined,
            "name": "inheritdoc"
          }],
        "text": "A slash (`/`) separated string of JS keyboard keys (`KeyboardEvent.key`), that when caught in\na `keydown` event, will trigger a `click` event on the control."
      },
      "attribute": "keys",
      "reflect": false,
      "defaultValue": "'f'"
    },
    "isFullscreenActive": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "PlayerProps['isFullscreenActive']",
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
      "attribute": "is-fullscreen-active",
      "reflect": false,
      "defaultValue": "false"
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
    },
    "playbackReady": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "PlayerProps['playbackReady']",
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
      "attribute": "playback-ready",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "canSetFullscreen": {}
  }; }
  static get watchers() { return [{
      "propName": "playbackReady",
      "methodName": "onPlaybackReadyChange"
    }]; }
}
