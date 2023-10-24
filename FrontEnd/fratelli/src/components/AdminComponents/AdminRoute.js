import React from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

function AdminRoute() {

    const token = JSON.parse(localStorage.getItem('token'))
    let decoded; 
    const navigate = useNavigate()
    if (token) {
       decoded = jwtDecode(token)
    } else {
       
        navigate('/login')
    }

    return (
        <div>
            {!token}
            {decoded.role === "Admin" ? <Outlet /> : <Navigate to='/login' />}
        </div>
    )
}

export default AdminRoute