/*_______ ____  _   _  _____
 |__   __/ __ \| \ | |/ ____|
    | | | |  | |  \| | (_____      ____ _ _ __
    | | | |  | | . ` |\___ \ \ /\ / / _` | '_ \
    | | | |__| | |\  |____) \ V  V / (_| | |_) |
    |_|  \____/|_| \_|_____/ \_/\_/ \__,_| .__/
                                         | |
                                         |_| */
import utils from "../../utils.mjs";

/**
 * @name TONSwap project - tonswap.com
 * @copyright SVOI.dev Labs - https://svoi.dev
 * @license Apache-2.0
 * @version 1.0
 */


class FarmContract {
    /**
     *
     * @param {TonWallet} ton
     * @param {object} config
     */
    constructor(ton, config) {
        this.ton = ton;
        this.config = config;
        this.contract = null;
    }

    async init(address) {
        this.contract = await this.ton.loadContract('/contracts/abi/FarmContract.abi.json', address);
        return this;
    }

    async getUserAccountAddress(walletAddress) {
        return (await this.contract.getUserAccountAddress({_answer_id: 0, userAccountOwner: walletAddress})).value0;
        
    }
}


export default FarmContract;