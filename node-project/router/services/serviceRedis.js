const asyncRedis = require("async-redis");

const client = asyncRedis.createClient();
const global_fun = require('../../utils/globalFunction'),
    CONSTANTS = require('../../utils/constant');
let resultdb = global_fun.resultdb;

let getKey = async (key) => {
    try {
        const value = await client.get(key.toString());
        if (value === null) {
            return resultdb(CONSTANTS.NOT_FOUND)
        } else {
            return resultdb(CONSTANTS.SUCCESS, value)
        }

    } catch (error) {
        console.log(error);

        return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL)
    }
};
let setKey = async (key, value) => {
    try {
        let tempData = await client.set(key, value);
        console.log('tempData___________', tempData);
        return resultdb(CONSTANTS.SUCCESS)
    } catch (error) {
        console.log(error);
        return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL)
    }
};
let setKeyWithTime = async (key, value, time = 5) => {
    try {
        await client.set(key, value, 'EX', 60 * time);
        return resultdb(CONSTANTS.SUCCESS)
    } catch (error) {
        console.log(error);
        return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL)
    }
};
let removeKey = async (key) => {
    try {
        const value = await client.del(key.toString());
        if (value === null) {
            return resultdb(CONSTANTS.NOT_FOUND)
        } else {
            return resultdb(CONSTANTS.SUCCESS, value)
        }

    } catch (error) {
        console.log(error);

        return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL)
    }
};
module.exports = {
    getKey,
    removeKey,
    setKeyWithTime,
    setKey
};