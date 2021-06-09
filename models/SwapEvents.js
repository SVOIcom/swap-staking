const ModelTemplate = require('./_Model');

//TODO: Паша: написать аннотации для параметров функций (а то `information` не особо информативно)

class SwapEvents extends ModelTemplate {
    static get _tableName() {
        return 'swap_events';
    }

    static get _tableFields() {
        let addressType = this.CustomTypes.TON_ADDRESS;
        let numbersType = this.CustomTypes.NUMBER;
        return {
            id: {
                type: this.CustomTypes.ID,
                primaryKey: true,
                autoIncrement: true
            },
            tx_id: {
                type: this.CustomTypes.TON_TX,
                unique: true
            },
            swap_pair_id:         { type: this.CustomTypes.ID },
            provided_token_root:  { type: addressType },
            target_token_root:    { type: addressType },
            tokens_used_for_swap: { type: numbersType },
            tokens_received:      { type: numbersType },
            fee:                  { type: numbersType },
            timestamp:            { type: this.CustomTypes.TIMESTAMP }
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


    static async getRecordByTxId(txId) {
        return SwapEvents.findOne({ where: { tx_id: txId } });
    }


    static async safeAddSwapEvent(information) {
        let recordExists = await SwapEvents.getRecordByTxId(information.tx_id);
        if (!recordExists) {
            await SwapEvents.create({
                ...information
            });
        }
    }
}



module.exports = SwapEvents;