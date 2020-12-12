import React from 'react'
import './logo.css'
import logo from './jienigui.jpg'
export default function Logo(){
    return(
        <div className="logo-container">
            <img src={logo} alt="logoImage" className="logo-img" />

        </div>
    )
}