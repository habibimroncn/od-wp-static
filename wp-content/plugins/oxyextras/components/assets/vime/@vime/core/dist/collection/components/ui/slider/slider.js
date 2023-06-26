import { h, Host, Component, Prop, Event, Element, } from '@stencil/core';
export class Slider {
  constructor() {
    /**
     * A number that specifies the granularity that the value must adhere to.
     */
    this.step = 1;
    /**
     * The lowest value in the range of permitted values.
     */
    this.min = 0;
    /**
     * The greatest permitted value.
     */
    this.max = 10;
    /**
     * The current value.
     */
    this.value = 5;
  }
  getPercentage() {
    return `${(this.value / this.max) * 100}%`;
  }
  onValueChange(event) {
    var _a;
    const value = parseFloat((_a = event.target) === null || _a === void 0 ? void 0 : _a.value);
    this.vValueChange.emit(value);
  }
  calcTouchedValue(event) {
    const input = event.target;
    const touch = event.changedTouches[0];
    const min = parseFloat(input.getAttribute('min'));
    const max = parseFloat(input.getAttribute('max'));
    const step = parseFloat(input.getAttribute('step'));
    const delta = max - min;
    // Calculate percentage.
    let percent;
    const clientRect = input.getBoundingClientRect();
    const sliderThumbWidth = parseFloat(window.getComputedStyle(this.el).getPropertyValue('--vm-slider-thumb-width'));
    const thumbWidth = ((100 / clientRect.width) * (sliderThumbWidth / 2)) / 100;
    percent = (100 / clientRect.width) * (touch.clientX - clientRect.left);
    // Don't allow outside bounds.
    percent = Math.max(0, Math.min(percent, 100));
    // Factor in the thumb offset.
    if (percent < 50) {
      percent -= (100 - percent * 2) * thumbWidth;
    }
    else if (percent > 50) {
      percent += (percent - 50) * 2 * thumbWidth;
    }
    const position = delta * (percent / 100);
    if (step >= 1) {
      return min + Math.round(position / step) * step;
    }
    /**
     * This part differs from original implementation to save space. Only supports 2 decimal
     * places (0.01) as the step.
     */
    return min + parseFloat(position.toFixed(2));
  }
  /**
   * Basically input[range="type"] on touch devices sucks (particularly iOS), so this helps make it
   * better.
   *
   * @see https://github.com/sampotts/rangetouch
   */
  onTouch(event) {
    const input = event.target;
    if (input.disabled)
      return;
    event.preventDefault();
    this.value = this.calcTouchedValue(event);
    this.vValueChange.emit(this.value);
    input.dispatchEvent(new window.Event((event.type === 'touchend') ? 'change' : 'input', { bubbles: true }));
  }
  render() {
    var _a;
    return (h(Host, { style: {
        '--vm-value': this.getPercentage(),
      } },
      h("input", { type: "range", step: this.step, min: this.min, max: this.max, value: this.value, autocomplete: "off", "aria-label": this.label, "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this.value, "aria-valuetext": (_a = this.valueText) !== null && _a !== void 0 ? _a : this.getPercentage(), "aria-orientation": "horizontal", onInput: this.onValueChange.bind(this), onFocus: () => { this.el.dispatchEvent(new window.Event('focus', { bubbles: true })); }, onBlur: () => { this.el.dispatchEvent(new window.Event('blur', { bubbles: true })); }, onTouchStart: this.onTouch.bind(this), onTouchMove: this.onTouch.bind(this), onTouchEnd: this.onTouch.bind(this) })));
  }
  static get is() { return "vime-slider"; }
  static get originalStyleUrls() { return {
    "$": ["slider.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["slider.css"]
  }; }
  static get properties() { return {
    "step": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "A number that specifies the granularity that the value must adhere to."
      },
      "attribute": "step",
      "reflect": false,
      "defaultValue": "1"
    },
    "min": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The lowest value in the range of permitted values."
      },
      "attribute": "min",
      "reflect": false,
      "defaultValue": "0"
    },
    "max": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The greatest permitted value."
      },
      "attribute": "max",
      "reflect": false,
      "defaultValue": "10"
    },
    "value": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The current value."
      },
      "attribute": "value",
      "reflect": false,
      "defaultValue": "5"
    },
    "valueText": {
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
        "text": "Human-readable text alternative for the current value. Defaults to `value:max` percentage."
      },
      "attribute": "value-text",
      "reflect": false
    },
    "label": {
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
        "text": "A human-readable label for the purpose of the slider."
      },
      "attribute": "label",
      "reflect": false
    }
  }; }
  static get events() { return [{
      "method": "vValueChange",
      "name": "vValueChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the value of the underlying `input` field changes."
      },
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      }
    }]; }
  static get elementRef() { return "el"; }
}
