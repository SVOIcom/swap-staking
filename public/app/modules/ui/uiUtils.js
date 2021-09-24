const uiUtils = {
    /**
     * Load page content DOM
     * @param action
     * @param controller
     * @param baseUrl
     * @returns {Promise<*|jQuery>}
     */
    async getPageContent(action, controller = 'index', baseUrl = '') {
        let result = await $.get(`${baseUrl}/${controller}/${action}`);
        return $(result).find('#applicationContent')
    },

    /**
     * Converts attributes to mapped object
     * @param attributes
     * @returns {{}}
     */
    attributesToObject(attributes) {
        //console.log('AA', attributes);
        let object = {};
        for (let attribute of Array.from(attributes)) {
            //console.log(attribute, attributes[attribute])
            object[attribute.name] = attribute.value;
        }
        return object;
    },

    /**
     * Stack components together
     * @param components
     * @returns {string}
     */
    stackComponents(...components) {

        if(components.length === 1 && Array.isArray(components[0])) {
            return Array.from(components[0]).join(' ');
        }

        return Array.from(components).join(' ');
    },
    /**
     * Copy text to clipboard
     * @param text
     * @returns {Promise<void>}
     */
    copyToClipboard: async (text) => {
        await navigator.clipboard.writeText(text);
    },
    checkVisible(elm, evalType) {
        evalType = evalType || "visible";

        let vpH = $(window).height(), // Viewport Height
            st = $(window).scrollTop(), // Scroll Top
            y = $(elm).offset().top,
            elementHeight = $(elm).height();

        if(evalType === "visible") {
            return ((y < (vpH + st)) && (y > (st - elementHeight)));
        }
        if(evalType === "above") {
            return ((y < (vpH + st)));
        }
    },
    isMobile: {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (uiUtils.isMobile.Android() || uiUtils.isMobile.BlackBerry() || uiUtils.isMobile.iOS() || uiUtils.isMobile.Opera() || uiUtils.isMobile.Windows());
        }
    }
}

export default uiUtils;