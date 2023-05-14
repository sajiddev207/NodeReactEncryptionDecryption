import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios'
import moment from 'moment'
import CryptoJS from 'crypto-js'

export default function Login() {
    const [userList, setSetUserList] = useState(0);

    useEffect(() => {
        let token = localStorage.getItem('user')
        var authOptions = {
            method: 'post',
            url: 'http://localhost:8000/api/user/getUserList',
            // data: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            json: true
        };
        axios(authOptions)
            .then((response) => {
                console.log("response________", response);
                const secretKey = 'asdfghjklasdfghjkl12345678912345'; //It is mandatory that the key used in the frontend code is the same as the key used in the backend code.
                const decryptedBytes = CryptoJS.AES.decrypt(response.data.data, secretKey);
                const decryptedPlaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
                const decryptedData = JSON.parse(decryptedPlaintext) // This line parse the string data 
                console.log('decryptedData______', decryptedData);
                setSetUserList(decryptedData)
            })
            .catch((error) => {
                console.log('error___________', error);
            })
    }, [])


    return (
        <div>
            <table class="table-fixed">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Mobile No.</th>
                        <th>Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {userList && userList.length > 0 ?
                        userList.map((element) =>
                        (<tr>
                            <td className='p-9'>{element ? element.userName : "-"}</td>
                            <td className='p-9'>{element ? element.mobileNo : "-"}</td>
                            <td className='p-9'>{moment(element.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                        </tr>))
                        :
                        null}
                </tbody>
            </table>
        </div>
    )
}
