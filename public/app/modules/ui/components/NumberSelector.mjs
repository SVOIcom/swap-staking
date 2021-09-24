

import Slider from "./Slider.mjs";
import uiUtils from "../uiUtils.js";

class NumberSelector extends Slider {

    /**
     * Build element HTML
     * @returns {Promise<string>}
     */
    async buildHtml() {
        //Setup non-custom attributes
        let attribStr = this.attributesObjectToStr(this.attrs, ['style', 'type']);

        return `
            <input id="${this.id}" style="width: 100%; ${this.attrs.style?this.attrs.style:''}" type="number" min="${this.attrs.min ? this.attrs.min : 0}" max="${this.attrs.max ? this.attrs.max : 10000}" value="${this.attrs.value ? this.attrs.value : 0}" step="${this.attrs.step ? this.attrs.step : 1}" ${attribStr}>`;
    }


}

export default NumberSelector;