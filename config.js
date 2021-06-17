//TODO: IMPORTANT: не забыть убрать данные подключения перед открытием репозитория
const config = {
    isSqllite: false,

    db: {
        HOST: "localhost",
        USER: "paul",
        PASSWORD: "Fwd(/5PjK3-^jxqP",
        DB: "tonswap_explorer",
        dialect: "mysql",
        pool: {
            max: 15,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },


    // FAVORITO
    bindPort: 3001,
    //maxWorkers: 1,
    indexController: "Index",
    databases: [
       /* {
            type: "sequelize",
            name: "newdb",
            config: {path: "mysql://chats:d281983c@localhost:3306/chats"},
        },*/

    ],
    secret: "5a0239f8f8ad281983c16ee815974562",
    appUrl: "https://explorer.tonswap.com",
    salt: "19d62fc823eb117a148161310e05fba7a",
    uploadDir: "public/uploads",
    allowedExt: ["jpg", "jpeg", "png"],
}


if (config.isSqllite) {
    const dbConf = config.db;
    dbConf.HOST = "localhost";
    dbConf.dialect = 'sqlite';
    dbConf.dialectOptions = {
        multipleStatements: true
    };
    dbConf.storage = './test_db.db';
}




Object.freeze(config);

module.exports = config;