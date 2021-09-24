

import _UIComponent from "./_UIComponent.mjs";
import uiUtils from "../uiUtils.js";

class TemplateLoader extends _UIComponent {


    /**
     * Initialize template loader
     * @returns {Promise<void>}
     */
    async init() {
        await super.init();

        this._innerHTML = this.domObject.html();

        this.name = this.attributes.name ? this.attributes.name.value : this.id;

        this.domObject[0].outerHTML = await this.buildHtml();
        this.wrappedComponent = $('#' + this.id);

        return this.name;
    }

    /**
     * Build HTML
     * @returns {Promise<string>}
     */
    async buildHtml() {
        let attribStr = this.attributesObjectToStr(this.attrs, [ 'type']);

        let html = await $.get(this.attrs.src);

        return `
              <div id="${this.id}" ${attribStr} data-component="TemplateLoader">
                    ${html}
                    ${this._innerHTML}
            </div>`;
    }





}

export default TemplateLoader;