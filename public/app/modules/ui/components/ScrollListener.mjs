import _UIComponent from "./_UIComponent.mjs";
import uiUtils from "../uiUtils.js";

class ScrollListener extends _UIComponent {


    /**
     * Initialize button
     * @returns {Promise<void>}
     */
    async init() {
        //console.log('Init button', this.domObject, this.pageId);


        this._caption = this.domObject.html();

        // let attributes = this.domObject[0].attributes;

        this.name = this.attributes.name ? this.attributes.name.value : this.id;


        //Construct button HTML
        this.domObject[0].outerHTML = await this.buildHtml();

        //Save constructed element DOM
        this.wrappedComponent = $('#' + this.id);

        this.isVisible = uiUtils.checkVisible(this.wrappedComponent, 'visible');

        this.interval = setInterval(async () => {
            let currentStatus = uiUtils.checkVisible(this.wrappedComponent, 'visible');
            if(currentStatus !== this.isVisible) {
                if(currentStatus === false && this.isVisible === true) {
                    await this.runAction('hidden')
                }

                if(currentStatus === true && this.isVisible === false) {
                    await this.runAction('shown')
                }
            }
        }, 1000);
        return this.name;
    }

    async runAction(action = 'shown') {
        await this.runBindedEvent(action, [this]);
        this.emit(action, this);
    }

    /**
     * Build element HTML
     * @returns {Promise<string>}
     */
    async buildHtml() {
        //Setup non-custom attributes
        let attribStr = this.attributesObjectToStr(this.attrs, ['type',]);

        return `
            <div id="${this.id}"   ${attribStr}>
                ${this._caption}
            </div>`;
    }

    /**
     * Get btn caption
     * @returns {*}
     */
    get caption() {
        return this._caption;
    }

    /**
     * Set BTN caption
     * @param html
     */
    set caption(html) {
        this._caption = html;
        $(`#${this.id}`).html(html);
    }

    async destroy(...params) {
        clearInterval(this.interval);
        return await super.destroy(...params);
    }

}

export default ScrollListener;