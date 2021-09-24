
import _UIComponent from "./_UIComponent.mjs";
import uiUtils from "../uiUtils.js";
import CaptionedBox from "./CaptionedBox.mjs";

class FoldableBox extends CaptionedBox {


    /**
     * Initialize button
     * @returns {Promise<void>}
     */
    async init() {
        let name = await super.init();

        //this.slided = false;

        this.slided = !!this.attributes.slided;

        this.wrappedComponent.find('.box-btn-slide').click(async (event) => {
            event.preventDefault();
            this.toggle();
        })

        return name;

    }

    /**
     * Build HTML
     * @param internalObjects
     * @returns {Promise<string>}
     */
    async buildHtml(internalObjects) {
        //Setup non-custom attributes
        let attribStr = this.attributesObjectToStr(this.attrs, [ 'type']);

        return `
              <div class="box   ${this.slided ? 'box-slided-up' : ''} ${this.attrs.class?this.attrs.class:''}" id="${this.id}" ${attribStr}>
                <div class="box-header with-border">
                    <h3 class="box-title">${this.attributes.caption?this.attributes.caption.value:''}</h3>
                    <ul class="box-controls pull-right">
                        <li><a class="box-btn-slide" href="#"></a></li>
                    </ul>
                </div>
                <div class="box-body">
                    ${internalObjects}
                </div>
            </div>`;
    }


    /**
     * Toggle slide state
     */
    toggle(){
        this.slided = !!this.slided;
        this.wrappedComponent.find('.box-btn-slide').toggleClass('rotate-180').parents('.box').find('.box-content, .box-body').slideToggle();
    }

    /**
     * Slide up
     */
    slideUp(){
        if(!this.slided){
            this.toggle();
        }
    }

    /**
     * Slide down
     */
    slideDown(){
        if(this.slided){
            this.toggle();
        }
    }


}

export default FoldableBox;