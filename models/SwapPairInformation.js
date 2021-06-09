const { convertSPInfoFromDB } = require('../modules/fetchDataFromDB/utils/converterFromDB');
const { DataBaseNotAvailable } = require('../modules/utils/customException');
const ModelTemplate = require('./_Model');

//TODO: Паша: написать аннотации для параметров функций (а то `information` не особо информативно)

class SwapPairInformation extends ModelTemplate {
    static get _tableName() {
        return 'swap_pair_information';
    }

    static get _tableFields() {
        let addressType = this.CustomTypes.TON_ADDRESS;
        return {
            id: {
                type: this.CustomTypes.ID,
                primaryKey: true
            },
            swap_pair_address: { type: addressType },
            root_address: { type: addressType },
            token1_address: { type: addressType },
            token2_address: { type: addressType },
            lptoken_address: { type: addressType },
            wallet1_address: { type: addressType },
            wallet2_address: { type: addressType },
            lptoken_wallet_address: { type: addressType },
            swap_pair_name: { type: this.Types.STRING(200) }
        }
    }

    static get _tableOptions() {
        return {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        }
    }


    static async safeAddInformation(swapPairAddress, information) {
        let recordExists = await SwapPairInformation.getRecordByAddress(swapPairAddress);
        if (!recordExists) {
            await SwapPairInformation.create({
                ...information
            });
        }
    }


    /**
     * @param {String} address 
     */
    static async getRecordByAddress(address) {
        return SwapPairInformation.findOne({ where: { swap_pair_address: address } });
    }


    static async getSwapPairs(offset = 0, limit = 100) {
        let swapPairs = [];
        try {
            swapPairs = await SwapPairInformation.findAll({
                offset: offset,
                limit: limit,
                order: [
                    ['id', 'DESC']
                ]
            });
            swapPairs = swapPairs.map((element) => convertSPInfoFromDB(element.dataValues));
        } catch (err) {
            console.log(err);
            throw new DataBaseNotAvailable('SwapPairInformation');
        }
        return swapPairs;
    }

    static async getSwapPairIdByAddress(swapPairAddress) {
        let swapPairId = -1;
        try {
            swapPairId = await SwapPairInformation.findOne({ where: { swap_pair_address: swapPairAddress } });
            swapPairId = swapPairId.dataValues.id;
        } catch (err) {
            console.log(err);
            throw new DataBaseNotAvailable('SwapPairInformation');
        }
        return swapPairId;
    }

    static async getSwapPairIdByName(swapPairName) {
        let swapPairId = -1;
        try {
            swapPairId = await SwapPairInformation.findOne({ where: { swap_pair_name: swapPairName } });
            swapPairId = swapPairId.dataValues.id;
        } catch (err) {
            console.log(err);
            throw new DataBaseNotAvailable('SwapPairInformation');
        }
        return swapPairId;
    }
}


module.exports = SwapPairInformation;