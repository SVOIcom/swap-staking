

import _UIComponent from "./_UIComponent.mjs";
import uiUtils from "../uiUtils.js";

class ProgressBar extends _UIComponent {


    /**
     * Initialize button
     * @returns {Promise<void>}
     */
    async init() {

        this._max = this.attrs.max ?? 100;
        this._min = this.attrs.min ?? 0;
        this._value = this.attrs.value ?? 0;
        this._percentage = 0;

        this.name = this.attributes.name ? this.attributes.name.value : this.id;

        this._disabled = !!this.attributes.disabled;

        //console.log('AA',this.attrs)
        this._vertical = this.attrs.vertical!==undefined;
        this._animated = this.attrs.animated!==undefined;


        //Construct button HTML
        this.domObject[0].outerHTML = await this.buildHtml();

        //Save constructed element DOM
        this.wrappedComponent = $('#' + this.id);

        await this.update();


        return this.name;
    }

    /**
     * Build element HTML
     * @returns {Promise<string>}
     */
    async buildHtml() {
        //Setup non-custom attributes
        let attribStr = this.attributesObjectToStr(this.attrs, ['type', 'style']);

        return `
              <div class="progress" id="${this.id}" ${attribStr}>
                ${await this.buildProgressPart()}
              </div>
                `;
    }

    async buildProgressPart() {
        return ` ${this._vertical ? '<div class="progress vertical active">' : ''} <div class="progress-bar progress-bar-yellow  ${this._animated ? 'progress-bar-animated' : ''}" role="progressbar"  style="${this._vertical ? 'height' : 'width'}: ${this._percentage}%">
                  <span class="sr-only"></span>
                </div> ${this._vertical ? '</div>' : ''}`;
    }

    async update() {
        this._percentage = ((this._value / (this._max - this._min)) * 100);
        this.wrappedComponent.html(await this.buildProgressPart());
    }


    /**
     * Redefine value
     * @returns {*}
     */
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.update();
    }

    get max() {
        return this._max;
    }

    set max(value) {
        this._max = value;
        this.update();
    }

    get vertical() {
        return this._vertical;
    }

    set vertical(value) {
        this._vertical = value;
        this.update();
    }

    get animated() {
        return this._animated;
    }

    set animated(value) {
        this._animated = value;
        this.update();
    }


    get min() {
        return this._min;
    }

    set min(value) {
        this._min = value;
        this.update();
    }


    get percentage() {
        return this._percentage;
    }

}

export default ProgressBar;