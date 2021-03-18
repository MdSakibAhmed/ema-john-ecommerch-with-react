import React, { useContext } from 'react';
import { Link, Route, Router } from 'react-router-dom';
import { UserContext } from '../../App';
import  logo  from "../../images/logo.png";
import   "./Header.css";

const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    return (
        <header>
            <div className="header">
                <img src={logo} alt=""/>

         <nav>

               
                <Link to="/shop"> Shop</Link>
               
               <Link to="/review">Order review</Link>
               <Link to="/inventory">Manage inventory</Link>
             { !loggedInUser.email && <button>Sign in</button>}
            { !loggedInUser.email && <button>Sign up</button>  } 
            
             {loggedInUser.email && <button onClick={() => setLoggedInUser({})}>Sign out</button> }  
              
                
                {/* <a href="/shop">Shop</a>
                <a href="/review">Order review</a>
                <a href="/inventory">Manage inventory</a> */}
            </nav>
            </div>
           
        </header>
    );
};

export default Header;