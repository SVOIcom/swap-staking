const CONFIG = {
   /* "stakingTIP3Root": "0:cace502afbd7b0b86d4ed64c7f4f56b75833dfcde245674245ae48e9a839c4f0",
    "rewardTIP3Root": "0:d9628e635d0aba9774be19703ce0abeb028cabecd3c5e24a38561f89fc76dffd",
    "userAccount": "0:6dd0cb3ac449fd55f0cc662ba7aed2768c9cf0a502daf87d5e31ca20b9a9edb8",*/
   // "stakingContract": "0:701626ff3cd72ec7fa76a8e2f8fec7a8631f372058bbe1556d447691969b94bc",
    "stakingContract": "0:66cbc02a1e2fd3c49f8a05c42bf9d68e4226635c263933636d69fdb74217bc3a",
    farms: [
        //{name: 'WTON-USDC LP', address: "0:701626ff3cd72ec7fa76a8e2f8fec7a8631f372058bbe1556d447691969b94bc"},
        {name: 'Stake WTON-USDC LP to get WTON reward', address: "0:66cbc02a1e2fd3c49f8a05c42bf9d68e4226635c263933636d69fdb74217bc3a"},
        {name: 'Stake WTON-USDT LP to get WTON reward', address: "0:3cb22fbeae904edc6b63e4c4fa694be6a86957d5c5da754faf805134027a6bc2"},
    ],
   /* //Server address used by default
    defaultNetworkServer: 'net1.ton.dev',
    //Name of network used by default
    defaultNetwork: 'test', */

    //Server address used by default
    defaultNetworkServer: 'main2.ton.dev',
    //Name of network used by default
    defaultNetwork: 'main',
}

export default CONFIG;