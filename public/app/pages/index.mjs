import utils from "../modules/utils.mjs";
import Popups from "../modules/ui/helpers/popups.mjs";
import FarmContract from "/app/modules/tonswap/contracts/FarmContract.mjs";
import CONFIG from "/app/config.mjs";
import UserAccount from "/app/modules/tonswap/contracts/UserAccount.mjs";
import TokenRootContract from "../modules/tonswap/contracts/TokenRootContract.mjs";
import TokenWalletContract from "../modules/tonswap/contracts/TokenWalletContract.mjs";

export default {
    methods: {
        page: null,
        components: {},
        lastIndex: 0,
        tokenPrice: 0,
        test: async function (...a) {
            console.log(...a);
        },

        async createAccount() {
            await this.components.waitPopup.show();

            try {
                let deployAccountPayload = await this.farmContract.deployUserAccountPayload(this.currentWallet);
                console.log('DEPLOY ACCOUNT PAYLOAD', deployAccountPayload);

                let deployResult = await TON.walletTransfer(CONFIG.stakingContract, 2e9, deployAccountPayload)
                console.log('DEPLOY RESULT', deployResult);

                await utils.wait(10000);


                await this.components.waitPopup.hide();

                await this.page.popups.alert('Success', 'Account deploy initiated');

                //Update page state
                await this.init(this.page, this.runParams);

            } catch (e) {
                console.log('DEPLOY ACCOUNT ERROR', e);
                await this.components.waitPopup.hide();
                await this.page.popups.error('Error', 'Account deploy error.\n Error info: ' + e.message + '\n' + e.stack);

            }
        },

        async enterStake(button) {
            console.log(button);
            let farm = button.attrs.farm;
            let farmData = await this.userAccount.getUserFarmInfo(farm);

            let stakingTokenRootContract = await (new TokenRootContract(TON, CONFIG)).init(CONFIG.stakingTIP3Root);
            let rewardTokenRootContract = await (new TokenRootContract(TON, CONFIG)).init(CONFIG.rewardTIP3Root);

            let stakeAddress = await stakingTokenRootContract.getWalletAddress();
            let rewardAddress = await rewardTokenRootContract.getWalletAddress();

            //TODO check wallets exists

            let enterFarmPayload = await this.userAccount.enterFarmPayload(farm, stakeAddress, rewardAddress);
            console.log('ENTER FARM PAYLOAD', enterFarmPayload);

            console.log(farm, stakeAddress, rewardAddress)

            await this.components.waitPopup.show();

            try {

                let enterFarmResult = await TON.walletTransfer(this.userAccountAddress, 2e9, enterFarmPayload)
                console.log('ENTER FARM RESULT', enterFarmResult);

                await utils.wait(10000);

                let amount = prompt('Token amount to stake', 1);

                amount = utils.numberToUnsignedNumber(amount);

                let userStakingTip3Wallet = await (new TokenWalletContract(TON, CONFIG)).init(stakeAddress);

                let userAccountPayload = await this.userAccount.createPayload(farm);
                console.log('PAYLOAD1', userAccountPayload);
                let transferPayload = await userStakingTip3Wallet.transferPayload(farmData.stackingTIP3Wallet, amount, userAccountPayload);
                console.log('PAYLOAD2', transferPayload)

                let enterStakeResult = await TON.walletTransfer(stakeAddress, 2e9, transferPayload)
                console.log('ENTER STAKE RESULT', enterStakeResult);


                await utils.wait(10000);


                await this.components.waitPopup.hide();

                await this.page.popups.alert('Success', 'Staking initiated');

                //Update page state
                await this.init(this.page, this.runParams);

            } catch (e) {
                console.log('DEPLOY ACCOUNT ERROR', e);
                await this.components.waitPopup.hide();
                await this.page.popups.error('Error', 'Account deploy error.\n Error info: ' + e.message + '\n' + e.stack);

            }
        },
        async exitStake(button) {
            let farm = button.attrs.farm;
            await this.components.waitPopup.show();

            try {

                //let localFarmContract = await (new FarmContract(TON, CONFIG)).init(farm);

                let exitStakePayload = await this.userAccount.withdrawAllWithPendingRewardPayload(farm);
                console.log('EXIT STAKE PAYLOAD', exitStakePayload);

                let deployResult = await TON.walletTransfer(this.userAccountAddress, 2e9, exitStakePayload)
                console.log('EXIT RESULT', deployResult);

                await utils.wait(10000);


                await this.components.waitPopup.hide();

                await this.page.popups.alert('Success', 'Claiming initiated');

                //Update page state
                await this.init(this.page, this.runParams);

            } catch (e) {
                console.log('EXIT ERROR', e);
                await this.components.waitPopup.hide();
                await this.page.popups.error('Error', 'Exit error.\n Error info: ' + e.message + '\n' + e.stack);

            }
        },
        /**
         * Page intialize
         * @param page
         * @param runParams
         * @returns {Promise<void>}
         */
        init: async function (page, runParams) {
            this.page = page;
            this.components = page.components;
            this.runParams = runParams;

            this.CONFIG = runParams.CONFIG;

            window.testPage = this.page;

            this.farmContract = await (new FarmContract(TON, CONFIG)).init(this.CONFIG.stakingContract);
            window.farmContract = this.farmContract;


            this.currentWallet = (await TON.getWallet()).address;

            if(!this.currentWallet) {
                this.components.userAccountState.setState('walletNotConnected');
                return;
            }

            try {
                this.userAccountAddress = await this.farmContract.getUserAccountAddress(this.currentWallet)


                this.userAccount = await (new UserAccount(TON, this.CONFIG)).init(this.userAccountAddress);
                window.userAccount = this.userAccount;

                if(!await this.userAccount.userHasAccount()) {
                    this.components.userAccountState.setState('notExists');
                    return;
                }

                this.components.userWallet.caption = `User account: ${this.userAccountAddress}`;

                await this.components.farmsList.clearContent();


                for (let farm of CONFIG.farms) {
                    let farmData = await this.userAccount.getUserFarmInfo(farm.address);
                    console.log('FARM DATA', farmData);

                    let farmHtml = `<h4>${farm.name}</h4>
                         <p>Pending: ${utils.fixZeroes(utils.unsignedNumberToSigned(farmData.pendingReward))}</p>
                         <p>Tokens in stake: ${utils.fixZeroes(utils.unsignedNumberToSigned(farmData.stackedTokens))}</p>
                        <br>`;

                    if(farmData.stackedTokens === 0) {
                        farmHtml += `<fw-component type="PrimaryButton" @click="enterStake" farm="${farm.address}">Enter stake</fw-component>`;
                    }

                    /* if(farmData.stackedTokens !== 0) {
                         farmHtml += `<fw-component type="PrimaryButton" @click="claimStake" farm="${farm.address}">Claim ${utils.unsignedNumberToSigned(farmData.stackedTokens)}</fw-component>`;
                     }        */

                    if(farmData.stackedTokens !== 0) {
                        farmHtml += `<fw-component type="PrimaryButton" @click="exitStake" farm="${farm.address}">Exit stake and claim reward</fw-component>`;
                    }
                    farmHtml += '<hr>';
                    await this.components.farmsList.appendComponents(farmHtml);
                }


                this.components.userAccountState.setState('active');
            } catch (e) {
                console.log(e);
                this.components.userAccountState.setState('error');
            }


        },

    }
};