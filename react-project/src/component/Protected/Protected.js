import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from "react-router-dom";
const Protected = (props) => {
    const navigate = useNavigate();

    // let user = localStorage.getItem('user')
    let user = true
    // if (!user) {
    //     navigate('/login')
    // }
    // else {
    //     return <Outlet />
    // }

    return user ? <Outlet /> : navigate('/login')

}
export default Protected;
