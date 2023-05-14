import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Login() {
    const [userName, setUserName] = useState(0);
    const [password, setPassword] = useState(0);
    const [token, setToken] = useState(0);
    const navigate = useNavigate();
    const inputChangeEmail = (e) => {
        e.preventDefault();
        setUserName(e.target.value)
    }
    const inputChangePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }

    const loginSubmit = async () => {
        let obj = {
            userName: userName,
            password: password,
        }
        var authOptions = {
            method: 'post',
            url: 'http://localhost:8000/api/user/login',
            data: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };
        axios(authOptions)
            .then((response) => {
                console.log("response________", response);
                localStorage.setItem('user', response.data.token);
                navigate('/app/userlist')
                window.location.reload();
            })
            .catch((error) => {
                // alert(error)
                console.log('error___________', error);
            })






    }
    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div className='w-full justify-center text-center p-10'>
                <label className='text-left text-lg'>
                    SIGN IN
                </label>
                <div className=' pt-4 '>
                    <input className='border border-gray-300 text-gray-900 sm:text-sm ' placeholder='Your Email...' name='userName' onChange={inputChangeEmail}>
                    </input>
                </div>
                <div className=' pt-4 '>
                    <input className='border border-gray-300 text-gray-900 sm:text-sm ' placeholder='********' name='password' onChange={inputChangePassword}>
                    </input>
                </div>
                <div>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent cursor-pointer rounded"
                        onClick={loginSubmit}>
                        Button
                    </button>
                </div>
            </div>
        </section>
    )
}
