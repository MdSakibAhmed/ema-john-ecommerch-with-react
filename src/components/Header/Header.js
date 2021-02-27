import React from 'react';
import  logo  from "../../images/logo.png";
import   "./Header.css";

const Header = () => {
    return (
        <header>
            <div className="header">
                <img src={logo} alt=""/>

                <nav>
                <a href="/shop">shop</a>
                <a href="/review">Order review</a>
                <a href="/manage">Manage inventory</a>
            </nav>
            </div>
           
        </header>
    );
};

export default Header;