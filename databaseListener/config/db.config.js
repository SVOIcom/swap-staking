module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "1234",
    DB: "tonswap_explorer",
    dialect: "mysql",
    pool: {
        max: 15,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};