
import _UIComponent from "./_UIComponent.mjs";
import uiUtils from "../uiUtils.js";

class Holder extends _UIComponent {


    /**
     * Initialize holder
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
        return `
              <div id="${this.id}" ${attribStr}>
                    ${this._innerHTML}
            </div>`;
    }


    /**
     * Append components to box
     * @param componentsHTML
     * @returns {Promise<void>}
     */
    async appendComponents(componentsHTML) {
        this.wrappedComponent.append(componentsHTML);
        await this.page.initializeComponents();
    }

    /**
     * Clear holder content
     * @returns {Promise<void>}
     */
    async clearContent(){
        this.wrappedComponent.html('');
    }


}

export default Holder;