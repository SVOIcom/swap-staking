import utils from "./modules/utils.mjs";
import darkside from './modules/darkside.mjs';
import {default as globalize} from './modules/globalize.mjs';
import {default as getProvider, PROVIDERS, UTILS} from "https://tonconnect.svoi.dev/freeton/getProvider.mjs";
import CONFIG from "./config.mjs";
import UserAccount from "./modules/tonswap/contracts/UserAccount.mjs";
import FarmContract from "./modules/tonswap/contracts/FarmContract.mjs";

import PageStack from "./modules/ui/PageStack.mjs";

import Page from "./modules/ui/Page.mjs";

async function main() {

    window.showLoading = () => {
        $('#loadingHolder').fadeIn(100);
    }

    window.hideLoading = () => {
        $('#loadingHolder').fadeOut(100);
    }

    showLoading();

    /**
     * Provide elements visibility
     */
    //Make dark theme controller globally
    globalize.makeVisible(darkside, 'darkside');

    /**
     * Configuration
     */
    //Disable dark theme if white enabled
    if(window.localStorage.theme) {
        if(window.localStorage.theme === 'dark') {
            darkside.makeDark();
        } else {
            darkside.makeLight();
        }
    } else if(!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        console.log('Make light')
        darkside.makeLight();
    } else {
        darkside.makeDark();
    }


    /**
     * Initialize TON
     * @type {TonWallet}
     */
    let TON = null;
    try {

        if(!localStorage.wallet) {
            throw 'NoWalletSelected';
        }

        //Initialize provider
        TON = await getProvider({}, localStorage.wallet)//.init();
        await TON.requestPermissions();
        await TON.start();

        let wallet = await TON.getWallet();

        $('#connectWalletButton').html(`<img src="${TON.getIconUrl()}" style="height: 30px;"> &nbsp;` + utils.shortenPubkey(wallet.address));

    } catch (e) {
        console.log(e);
        TON = await getProvider({
            network: CONFIG.defaultNetwork,
            networkServer: CONFIG.defaultNetworkServer
        }, PROVIDERS.TonBackendWeb);
        await TON.requestPermissions();
        await TON.start();

    }

    //Reserve TON provider
    let TONBackend = window.TONBackend = await getProvider({
        network: CONFIG.defaultNetwork,
        networkServer: CONFIG.defaultNetworkServer,
        crystalWalletPayloadFormat: localStorage.wallet === PROVIDERS.CrystalWallet
    }, PROVIDERS.TonBackendWeb);
    await window.TONBackend.requestPermissions();
    await window.TONBackend.start();


    $('#loadingPlaceholder').hide();

    window.TON = TON;




    let page = await (new Page(undefined, undefined, {
        pageContainer: $('#pageContent'),
        containerPolicy: 'replace'
    })).loadHtml($('#pageContent').html(),{CONFIG, TON});
    await page.show();
    window.page = page;

    /**
     * Disconnect wallets
     * @returns {Promise<void>}
     */
    window.disconnectWallet = async function () {
        delete localStorage.wallet;
        await TON.revokePermissions();
        window.location.href = window.location.href;
    }

    /**
     * Connect crystalWallet
     * @returns {Promise<void>}
     */
    window.connectCrystalWallet = async function () {
        localStorage.wallet = PROVIDERS.CrystalWallet;
        window.location.href = window.location.href;
    }

    /**
     * Connect TonWallet
     * @returns {Promise<void>}
     */
    window.connectTonWallet = async function () {
        localStorage.wallet = PROVIDERS.TonWallet;
        window.location.href = window.location.href;
    }

    window.connectTonWeb = async function () {
        localStorage.wallet = PROVIDERS.TonWeb;
        window.location.href = window.location.href;
    }


}


main();