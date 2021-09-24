

import _UIComponent from "./_UIComponent.mjs";
import uiUtils from "../uiUtils.js";

class NftListCatalog extends _UIComponent {


    /**
     * Initialize button
     * @returns {Promise<void>}
     */
    async init() {
        await super.init();
        this.nfts = [];

        let definedNfts = this.domObject.find('fw-component[type="NftListCard"]');

        for (let nft of definedNfts) {
            this.nfts.push({...uiUtils.attributesToObject(nft.attributes)})
        }

        let attributes = this.attributes;
        this.name = attributes.name ? attributes.name.value : this.id;


        //Construct button HTML
        this.domObject[0].outerHTML = (` 
             <div class="row" style="padding-bottom: 30px;" id="${this.id}">
                <div class="showIfEmpty" style="text-align: center;width: 100%;font-size: 18pt;">No nfts to show</div>
             </div>
      
        `);

        //Disabled state check
        if(this.attributes.disabled) {
            this.disabled = true;
        }

        if(this.nfts.length !== 0) {
            $(`#${this.id}`).find('.showIfEmpty').hide();
            await this._addNft(this.nfts, true);
        }

        return this.name;
    }

    /**
     * Add nfts to view
     * @param optionsArr
     * @param ignoreInit
     * @returns {Promise<void>}
     * @private
     */
    async _addNft(optionsArr = [], ignoreInit = false) {
        if(optionsArr.length !== 0) {
            $(`#${this.id}`).find('.showIfEmpty').hide();
            for (let nft of optionsArr) {
                let nftInner = nft.inner ? nft.inner : '';
                nft.inner = '';
                let nftComponent = this.page.constructComponent('NftListCard', nft, nftInner);
                $(`#${this.id}`).append(nftComponent);
            }

            if(!ignoreInit) {
                await this.page.initializeComponents();
            }
        } else {
            if(this.nfts.length === 0) {
                $(`#${this.id}`).find('.showIfEmpty').show();
            }
        }
    }

    /**
     * Add new nft
     * @param options
     * @returns {Promise<void>}
     */
    async addNft(options) {
        await this._addNft([options]);
        this.nfts.push(options);
    }

    /**
     * Add any nfts
     * @param optionsArr
     * @returns {Promise<void>}
     */
    async addNfts(optionsArr) {
        await this._addNft(optionsArr);

        this.nfts = [...this.nfts, ...optionsArr];
    }

    /**
     * Clear nfts list
     * @returns {Promise<void>}
     */
    async clear() {
        $(`#${this.id}`).find('[data-component="NftListCard"]').remove();
        this.nfts = [];
        $(`#${this.id}`).find('.showIfEmpty').show();

    }


}

export default NftListCatalog;