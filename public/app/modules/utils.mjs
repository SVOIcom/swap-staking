const utils = {
    /**
     * Shorten pubkey or address
     * @param pubkey
     * @param delimiter
     * @returns {string}
     */
    shortenPubkey: (pubkey, delimiter = '...') => {
        pubkey = String(pubkey);
        return pubkey.substr(0, 6) + delimiter + pubkey.substr(-4);
    },
    /**
     * Convert string to hex string
     * @param {string} str
     * @returns {string}
     */
    toHex(str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            result += str.charCodeAt(i).toString(16);
        }
        return result;
    },
    EMPTY_TON_ADDRESS: '0:0000000000000000000000000000000000000000000000000000000000000000',
    /**
     * Transfer hack ABI
     */
    TRANSFER_BODY: {
        "ABI version": 2,
        "functions": [
            {
                "name": "transfer",
                "id": "0x00000000",
                "inputs": [
                    {
                        "name": "pubkey",
                        "type": "uint256"
                    }
                ],
                "outputs": []
            }
        ],
        "events": [],
        "data": []
    },

    /**
     * Big hex string to big dec string
     * @param {string} s
     * @returns {string}
     */
    hexString2DecString(s) {

        function add(x, y) {
            let c = 0, r = [];
            x = x.split('').map(Number);
            y = y.split('').map(Number);
            while (x.length || y.length) {
                let s = (x.pop() || 0) + (y.pop() || 0) + c;
                r.unshift(s < 10 ? s : s - 10);
                c = s < 10 ? 0 : 1;
            }
            if(c) {
                r.unshift(c);
            }
            return r.join('');
        }

        let dec = '0';
        s.split('').forEach(function (chr) {
            let n = parseInt(chr, 16);
            for (let t = 8; t; t >>= 1) {
                dec = add(dec, dec);
                if(n & t) {
                    dec = add(dec, '1');
                }
            }
        });
        return dec;
    },
    /**
     * Show token
     * @param {number|string} amount
     * @param {number} precision
     * @returns {string}
     */
    showToken(amount, precision = 9) {
        amount = Number(amount);
        if(!amount) {
            return '0';
        }

        return String(BigNumber(amount).toFixed(precision));
    },
    /**
     * Js number to raw unsigned number
     * @param num
     * @param decimals
     * @returns {number}
     */
    numberToUnsignedNumber(num, decimals = 9) {
        if(decimals === 0) {
            return BigNumber(num).toFixed(decimals);
        }
        return (BigNumber(num).toFixed(decimals).replace('.', ''))
    },
    /**
     * Raw unsigned number to js number
     * @param num
     * @param decimals
     * @returns {number}
     */
    unsignedNumberToSigned(num, decimals = 9) {
        if(decimals === 0) {
            return BigNumber(num).toFixed(decimals);
        }
        return BigNumber(num).div(Math.pow(10, decimals)).toFixed(decimals);
    },
    /**
     * Big number to big string
     * @param number
     * @returns {string}
     */
    bigNumberToString(number) {
        return Number(number).toLocaleString('en').replace(/,/g, '');
    },
    /**
     * Extract transaction id
     * @param tx
     * @returns {null|*}
     */
    getTxId(tx) {
        if(tx.txid) {
            return tx.txid;
        }

        if(tx.transaction) {
            if(tx.transaction.id) {
                return tx.transaction.id
            }
        }

        if(tx.tx) {
            if(tx.tx.lastBlockId) {
                return tx.tx.lastBlockId
            }

        }


    },
    /**
     * Hex string to base64 string
     * @param hexstring
     * @returns {string}
     */
    hexToBase64(hexstring) {
        return btoa(hexstring.match(/\w{2}/g).map(function (a) {
            return String.fromCharCode(parseInt(a, 16));
        }).join(""));
    },

    /**
     * Async JSONP
     * @async
     * @param url
     * @param callback
     * @returns {Promise<unknown>}
     */
    jsonp(url, callback = "jsonpCallback_" + String(Math.round(Math.random() * 100000))) {
        return new Promise((resolve, reject) => {
            try {
                let script = document.createElement("script");

                window[callback] = function (data) {
                    window[callback] = undefined;
                    resolve(data);
                };
                script.src = `${url}?callback=${callback}`;
                document.body.appendChild(script);
            } catch (e) {
                reject(e);
            }
        });
    },

    /**
     * Get JSON file
     * @param {string} url
     * @param {boolean} local
     * @returns {Promise<any>}
     */
    async fetchJSON(url, local = false) {
        if(url.includes('file:') || local) {
            if(!url.includes('file:') && window._isApp) {
                url = 'file:///android_asset/www' + url;
            }
            return await (await this.fetchLocal(url)).json();
        }
        return await ((await fetch(url))).json();
    },
    /**
     * Hex encoded string to string
     * @param {string} hexString
     * @returns {string}
     */
    hex2String(hexString) {
        return Buffer.from(hexString, 'hex').toString();
    },

    /**
     * String to hex string
     * @param {string} str
     * @returns {string}
     */
    string2Hex(str) {
        return Buffer.from(str, 'utf8').toString('hex');
    },

    /**
     * Create tvm cell payload with public key
     * @param pubkey
     * @returns {string}
     */
    createPubkeyTVMCELL(pubkey) {
        let data = 'b5ee9c720101010100' + '22000040' + pubkey;
        return this.hexToBase64(data);
    },

    /**
     * Returns random id
     * @returns {number}
     */
    randomId() {
        return Math.round(Math.random() * 1000000);
    },

    /**
     * Simple async wait
     * @param timeout
     * @async
     * @returns {Promise<unknown>}
     */
    wait: (timeout = 1000) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        })
    },

    async resolveArrayPromises(from = 0, to, generator = (index) => {
    }) {
        let promises = [];
        for (let i = from; i < to; i++) {
            promises.push(generator(i));
        }

        return await Promise.all(promises);
    },

    fixZeroes(str) {
        str = String(str);
        if(!str.includes('.')) {
            return str;
        }

        str = str.replace(/0*$/g, '');

        if(str.substr(-1) === '.') {
            str = str.substr(0, str.length - 1);
        }
        return str;
    },

    capitalize(str) {
        let first = str.substr(0, 1).toUpperCase();
        let second = str.substr(1).toLowerCase();

        return first + second
    }


}
export default utils;