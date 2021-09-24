

import Button from "./Button.mjs";

class PrimaryButton extends Button {

    /**
     * Build element HTML
     * @returns {Promise<string>}
     */
    async buildHtml() {
        //Setup non-custom attributes
        let attribStr = this.attributesObjectToStr(this.attrs, ['disabled', 'href', 'type', 'class', 'style', 'visible']);

        return `
            <button id="${this.id}" style="${this._visible?'':'display: none;'} ${this.attrs.style??this.attrs.style}" class="btn btn-primary ${this.attributes.flat ? 'btn-flat' : 'btn-default'} ${this.attributes.right ? 'float-right' : ''} ${this.attributes.large ? 'btn-lg' : ''} ${this._disabled ? 'disabled' : ''} ${this.attributes.block ? 'btn-block' : ''}  "   ${this.attributes.href ? 'href="' + this.attributes.href.value + '"' : ''} ${attribStr}>
                ${this._caption}
            </button>`;
    }

}

export default PrimaryButton;