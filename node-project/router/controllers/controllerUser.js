const express = require("express")
const router = express.Router();
const serviceUser = require('../services/serviceUser')
const CONSTANTS = require('../../utils/constant')
const CONSTANTMESSAGE = require('../../utils/constantMessage')
const CryptoJS = require('crypto-js');

const getUserList = async (req, res) => {

    let responseData = [
        {
            userName: 'test01',
            mobileNo: '123456780',
            createdAt: 1680894054466,
        },
        {
            userName: 'test02',
            mobileNo: '1234567809',
            createdAt: 1681000007330,
        },
        {
            userName: 'test03',
            mobileNo: '5555555',
            createdAt: 1681582156297,
        }
    ]
    let secrateKey = 'asdfghjklasdfghjkl12345678912345'
    /*
        responseData = It contain the api data in array of object format
        process.env.ENCRYPT_SECRET_KEY = This is 32 character alphanumeric key (asdfghjklasdfghjkl12345678912345)
    */
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(responseData), secrateKey).toString();   // This line encrypt the code 

    res.status(CONSTANTS.SUCCESS).json({ message: CONSTANTMESSAGE.SUCCESS, data: encrypted })


}

router.post('/getUserList', getUserList)

module.exports = router;
