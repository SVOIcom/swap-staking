
import _UIComponent from "./_UIComponent.mjs";

class NftListCard extends _UIComponent {


    /**
     * Initialize button
     * @returns {Promise<void>}
     */
    async init() {
        await super.init();

        this._innerHTML = this.domObject.html();

        this.name = this.attributes.name ? this.attributes.name.value : this.id;

        //console.log(this.attrs)

        this.idx = this.attributes.idx.value;
        this.nftType = this.attrs.nfttype;
        // this.rank = this.attributes.rank.value;
        //   this.badges = this.attributes.badges.value;//.split(',');
        //this.parts = JSON.parse(this.attrs.parts);

        console.log(this.attrs)

        // console.log(this.parts);

        //Construct button HTML
        this.domObject[0].outerHTML = await this.buildHtml();

        this.wrappedComponent = $('#' + this.id);
        this.wrappedComponent.on('click', async () => {
            await this.runBindedEvent('click', [this, this.idx]);
            this.emit('click', this);
        });

        //Disabled state check
        if(this.attributes.disabled) {
            this.disabled = true;
        }

        return this.name;
    }

    /**
     * Build HTML
     * @returns {Promise<string>}
     */
    async buildHtml() {
        //Setup non-custom attributes
        let attribStr = this.attributesObjectToStr(this.attrs, ['type', 'class']);

        let parts = [];

        for (let part in this.parts) {
            for (let attibute of this.parts[part]) {
                if(attibute) {
                    parts.push(attibute)
                }
            }
        }

        return `
              <div class="col-md-12 col-lg-3" id="${this.id}" style="cursor: pointer" data-component="NftListCard" ${attribStr}>
          <div class="box box-default pull-up" style="min-height: 365px;">
                <div style="overflow: hidden;     background-position: center;     background: url('/images/background.jpg'); background-position-x: center; background-size: cover">
                    <img src="/bonguses/${this.idx}.png" style="transform: scale(1.5);">
                </div>
           <div class="box-body">            
                <h4 class="box-title" style="position: absolute;      top: -12px; left: 0px; width: 100%; text-align: center">Mongus ${this.idx}</h4>
                <h5 style="">${this.nftType}</h5>
                <span>${await bamongus.getName(this.idx)}</span>

                <br>
                ${this._innerHTML}
                </p>

           </div>
          </div>
        </div>`;
    }


}

export default NftListCard;