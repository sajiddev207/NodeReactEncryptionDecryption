import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Header(props) {
    const [token, setToken] = useState('')
    const navigate = useNavigate();
    const navigateTo = (data) => {
        navigate('/' + data)
    }
    const logOut = () => {
        localStorage.removeItem('user')
        window.location.reload();
        navigate('/' + '')
    }
    useEffect(() => {
        let userToken = localStorage.getItem('user')
        console.log('userToken__________', userToken);
        setToken(userToken)
    }, [])


    return (
        <div>
            <nav class="bg-white border-gray-200 dark:bg-gray-900">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <div class="flex items-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNitlNtKwi4_eMI4sCIdBijgyDTGdtpdvsuw6N8GHCw&s" class="h-8 mr-3" alt="Flowbite Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Demo</span>
                    </div>




                </div>
            </nav>
            <nav class="bg-gray-50 dark:bg-gray-700">
                <div class="max-w-screen-xl px-4 py-3 mx-auto">
                    <div class="flex items-center">
                        <ul class="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                            <li>
                                <h5 href="#" class="text-gray-900 dark:text-white hover:underline cursor-pointer" aria-current="page" onClick={() => navigate('/userlist')}>User List</h5>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
