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


class UserAccount {
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
        this.contract = await this.ton.loadContract('/contracts/abi/UserAccount.abi.json', address);
        return this;
    }

    /**
     * Get tokens balance
     * @returns {Promise<number>}
     */
    async getBalance() {
        return ((await this.contract.balance({_answer_id: 0})).value0);
    }

    async userHasAccount() {
        try {
            await this.getAllUserFarmInfo();
            return true;
        } catch (e) {
            return false;
        }
    }

    async getAllUserFarmInfo() {
        return (await this.contract.getAllUserFarmInfo({_answer_id: 0})).value0;
    }

    async getUserFarmInfo(farm) {
        let farmData = (await this.contract.getUserFarmInfo({_answer_id: 0, farm})).value0;
        farmData.pendingReward = Number(farmData.pendingReward);
        farmData.rewardPerTokenSum = Number(farmData.rewardPerTokenSum);
        farmData.stackedTokens = Number(farmData.stackedTokens);
        farmData.start = Number(farmData.start);
        farmData.finish = Number(farmData.finish);
        return farmData;
    }

    async enterFarmPayload(farm, stackingTIP3UserWallet, rewardTIP3Wallet) {
        return await this.contract.enterFarm.payload({farm, stackingTIP3UserWallet, rewardTIP3Wallet});
    }

    async withdrawAllWithPendingRewardPayload(farm) {
        return await this.contract.withdrawAllWithPendingReward.payload({farm});
    }

    async createPayload(farm) {
        return (await this.contract.createPayload({_answer_id:0,
            farm
        })).value0;
    }
}


export default UserAccount;