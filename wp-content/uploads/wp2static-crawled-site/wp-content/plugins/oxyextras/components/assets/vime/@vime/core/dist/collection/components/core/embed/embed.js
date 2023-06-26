import { Component, Element, Event, h, Listen, Method, Prop, State, Watch, } from '@stencil/core';
import { isNull, isString } from '../../../utils/unit';
import { appendParamsToURL, preconnect } from '../../../utils/network';
import { LazyLoader } from '../player/LazyLoader';
let idCount = 0;
const connected = new Set();
export class Embed {
  constructor() {
    this.srcWithParams = '';
    this.hasEnteredViewport = false;
    /**
     * A URL that will load the external player and media (Eg: https://www.youtube.com/embed/DyTCOwB0DVw).
     */
    this.embedSrc = '';
    /**
     * The title of the current media so it can be set on the inner `iframe` for screen readers.
     */
    this.mediaTitle = '';
    /**
     * The parameters to pass to the embedded player which are appended to the `embedSrc` prop. These
     * can be passed in as a query string or object.
     */
    this.params = '';
    /**
     * A collection of URLs to that the browser should immediately start establishing a connection
     * with.
     */
    this.preconnections = [];
  }
  srcChange() {
    this.srcWithParams = appendParamsToURL(this.embedSrc, this.params);
  }
  srcWithParamsChange() {
    if (!this.hasEnteredViewport && !connected.has(this.embedSrc)) {
      if (preconnect(this.srcWithParams))
        connected.add(this.embedSrc);
    }
    this.vEmbedSrcChange.emit(this.srcWithParams);
  }
  preconnectionsChange() {
    if (this.hasEnteredViewport) {
      return;
    }
    this.preconnections
      .filter((connection) => !connected.has(connection))
      .forEach((connection) => {
      if (preconnect(connection))
        connected.add(connection);
    });
  }
  connectedCallback() {
    this.lazyLoader = new LazyLoader(this.el, ['data-src'], (el) => {
      const src = el.getAttribute('data-src');
      el.removeAttribute('src');
      if (!isNull(src))
        el.setAttribute('src', src);
    });
    this.srcChange();
    this.genIframeId();
  }
  disconnectedCallback() {
    this.lazyLoader.destroy();
  }
  onWindowMessage(e) {
    var _a, _b, _c;
    const originMatches = (e.source === ((_a = this.iframe) === null || _a === void 0 ? void 0 : _a.contentWindow))
      && (!isString(this.origin) || this.origin === e.origin);
    if (!originMatches)
      return;
    const message = (_c = (_b = this.decoder) === null || _b === void 0 ? void 0 : _b.call(this, e.data)) !== null && _c !== void 0 ? _c : e.data;
    if (message)
      this.vEmbedMessage.emit(message);
  }
  /**
   * Posts a message to the embedded media player.
   */
  async postMessage(message, target) {
    var _a, _b;
    (_b = (_a = this.iframe) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage(JSON.stringify(message), (target !== null && target !== void 0 ? target : '*'));
  }
  onLoad() {
    this.vEmbedLoaded.emit();
  }
  genIframeId() {
    idCount += 1;
    this.id = `vime-iframe-${idCount}`;
  }
  render() {
    return (h("iframe", { id: this.id, class: "lazy", title: this.mediaTitle, "data-src": this.srcWithParams, 
      // @ts-ignore
      allowfullscreen: "1", allow: "autoplay; encrypted-media; picture-in-picture", onLoad: this.onLoad.bind(this), ref: (el) => { this.iframe = el; } }));
  }
  static get is() { return "vime-embed"; }
  static get originalStyleUrls() { return {
    "$": ["embed.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["embed.css"]
  }; }
  static get properties() { return {
    "embedSrc": {
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
        "text": "A URL that will load the external player and media (Eg: https://www.youtube.com/embed/DyTCOwB0DVw)."
      },
      "attribute": "embed-src",
      "reflect": false,
      "defaultValue": "''"
    },
    "mediaTitle": {
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
        "text": "The title of the current media so it can be set on the inner `iframe` for screen readers."
      },
      "attribute": "media-title",
      "reflect": false,
      "defaultValue": "''"
    },
    "params": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string | Params",
        "resolved": "string | { [x: string]: any; }",
        "references": {
          "Params": {
            "location": "import",
            "path": "../../../utils/network"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The parameters to pass to the embedded player which are appended to the `embedSrc` prop. These\ncan be passed in as a query string or object."
      },
      "attribute": "params",
      "reflect": false,
      "defaultValue": "''"
    },
    "origin": {
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
        "tags": [],
        "text": "Where the src request had originated from without any path information."
      },
      "attribute": "origin",
      "reflect": false
    },
    "preconnections": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "string[]",
        "resolved": "string[]",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "A collection of URLs to that the browser should immediately start establishing a connection\nwith."
      },
      "defaultValue": "[]"
    },
    "decoder": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "(data: string) => Params | undefined",
        "resolved": "((data: string) => Record<string, any> | undefined) | undefined",
        "references": {
          "Params": {
            "location": "import",
            "path": "../../../utils/network"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "A function which accepts the raw message received from the embedded media player via\n`postMessage` and converts it into a POJO."
      }
    }
  }; }
  static get states() { return {
    "srcWithParams": {},
    "hasEnteredViewport": {}
  }; }
  static get events() { return [{
      "method": "vEmbedSrcChange",
      "name": "vEmbedSrcChange",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the `embedSrc` or `params` props change. The payload contains the `params`\nserialized into a query string and appended to `embedSrc`."
      },
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      }
    }, {
      "method": "vEmbedMessage",
      "name": "vEmbedMessage",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when a new message is received from the embedded player via `postMessage`."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "vEmbedLoaded",
      "name": "vEmbedLoaded",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the embedded player and any new media has loaded."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "postMessage": {
      "complexType": {
        "signature": "(message: any, target?: string | undefined) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }, {
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Posts a message to the embedded media player.",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "embedSrc",
      "methodName": "srcChange"
    }, {
      "propName": "params",
      "methodName": "srcChange"
    }, {
      "propName": "srcWithParams",
      "methodName": "srcWithParamsChange"
    }, {
      "propName": "preconnections",
      "methodName": "preconnectionsChange"
    }]; }
  static get listeners() { return [{
      "name": "message",
      "method": "onWindowMessage",
      "target": "window",
      "capture": false,
      "passive": false
    }]; }
}
