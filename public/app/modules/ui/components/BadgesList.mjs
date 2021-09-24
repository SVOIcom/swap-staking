

import _UIComponent from "./_UIComponent.mjs";

class BadgesList extends _UIComponent {


    /**
     * Initialize
     * @returns {Promise<void>}
     */
    async init() {



        let attributes = this.domObject[0].attributes;

        this.name = attributes.name ? attributes.name.value : this.id;

        this._disabled = !!attributes.disabled;
        this._badges = attributes.badges.value;



        //Construct button HTML
        this.domObject[0].outerHTML = (`
        <div id="${this.id}" > </p> `)
        this.wrappedComponent = $('#' + this.id);

        this.badges = this._badges;

        return this.name;
    }

    /**
     * Get btn caption
     * @returns {*}
     */
    get badges() {
        return this._badges;
    }

    /**
     * Set BTN caption
     * @param html
     */
    set badges(badges) {
        this._badges = badges;
        let badgesHtml = '';

        for (let badge of this._badges.split(',')) {
            badgesHtml += `<span class="badge badge-pill badge-warning" style="margin-bottom: 6px;">${badge}</span> &nbsp;`;
        }

        this.wrappedComponent.html(badgesHtml);
    }


}

export default BadgesList;