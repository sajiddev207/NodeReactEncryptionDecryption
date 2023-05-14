const db = require('../../db/index')
const { User } = db;
const CONSTANTMESSAGE = require('../../utils/constantMessage')
const CONSTANTS = require('../../utils/constant')
const bcrypt = require('bcrypt');

const findUserByEmail = async (email) => {
    try {
        let userData = await User.findOne({
            email: email.toString().toLowerCase()
        });
        console.log('userData**********', userData);
        if (userData == null || userData == [] || userData.length == 0) {
            return ({ data: null, message: CONSTANTMESSAGE.NOT_FOUND, statusCode: CONSTANTS.NOT_FOUND })
        }
        else {
            return ({ data: userData, message: CONSTANTMESSAGE.SUCCESS, statusCode: CONSTANTS.SUCCESS })
        }
    } catch (error) {

    }
}

const saveUser = async (user) => {
    try {
        console.log('user__________', user);
        let userData = new User(user);
        let saveData = await userData.save();
        console.log('userData**********11111', saveData);
        return ({ data: saveData, message: CONSTANTMESSAGE.SUCCESS, statusCode: CONSTANTS.SUCCESS })

    } catch (error) {
        return ({ data: null, message: error.message, statusCode: CONSTANTS.NOT_FOUND })
    }

}

const verifyAccount = async (data) => {
    try {
        let userData = await getUserByUsername(data.userName);
        console.log('userData_________', userData);
        if (userData && userData.data == null) {
            return ({ data: null, message: CONSTANTMESSAGE.NOT_FOUND, statusCode: CONSTANTS.NOT_FOUND })
        }
        else {
            let verifyPass = null
            console.log('**************', userData.data.password, data.password);
            verifyPass = await bcrypt.compare(data.password, userData.data.password)
            console.log("verifypassverifypass______________", verifyPass)

            if (verifyPass) {
                return ({ data: userData.data, message: CONSTANTMESSAGE.SUCCESS, statusCode: CONSTANTS.SUCCESS })
            }
            else {
                return ({ data: null, message: 'Passwords do not match', statusCode: CONSTANTS.NOT_FOUND })
            }
            // let comparison = await bcrypt.compare(userData.data.password, data.password, function (err, res) {
            //     console.log('11111111111');
            //     if (userData.data.password != data.password) {
            //         console.log('^^^^^^^^^');
            //     } else {
            //         console.log('3333333333');
            //     }
            // });
        }
        // let saveData = await userData.save();
        // console.log('userData**********11111', saveData);
        // return ({ data: saveData, message: CONSTANTMESSAGE.SUCCESS, statusCode: CONSTANTS.SUCCESS })

    } catch (error) {
        return ({ data: null, message: error.message, statusCode: CONSTANTS.NOT_FOUND })
    }

}

const getUserByUsername = async (userName) => {
    try {
        console.log('userName_______', userName);
        let userData = await User.findOne({ userName: userName });
        if (userData == null || userData == [] || userData.length == 0) {
            return ({ data: null, message: CONSTANTMESSAGE.NOT_FOUND, statusCode: CONSTANTS.NOT_FOUND })
        }
        else {
            return ({ data: userData, message: CONSTANTMESSAGE.SUCCESS, statusCode: CONSTANTS.SUCCESS })
        }

    } catch (error) {
        return ({ data: null, message: error.message, statusCode: CONSTANTS.NOT_FOUND })
    }

}

const getUserList = async (user) => {
    try {
        let userData = await User.find();
        console.log('userData**********', userData);
        if (userData == null || userData == [] || userData.length == 0) {
            return ({ data: null, message: CONSTANTMESSAGE.NOT_FOUND, statusCode: CONSTANTS.NOT_FOUND })
        }
        else {
            return ({ data: userData, message: CONSTANTMESSAGE.SUCCESS, statusCode: CONSTANTS.SUCCESS })
        }

    } catch (error) {
        return ({ data: null, message: error.message, statusCode: CONSTANTS.NOT_FOUND })
    }

}
module.exports = {
    findUserByEmail,
    saveUser,
    getUserList,
    verifyAccount
}