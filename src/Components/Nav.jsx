import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'


function Nav() {
    const isLoggedIn = localStorage.getItem("userId") !== null;

    return (
        <div className='flex justify-between bg-[#f0e9e4]'>
            <div className="logo w-[80px] h-[80px] mb-[20px]">
                <img src={logo} alt="Logo" />
            </div>
            <ul className='flex w-[20%] justify-between p-[10px] max-sm:w-[100%]'>
                <Link to='/'><li>Home</li></Link>
                {!isLoggedIn && (
                    <>
                        <Link to='/Login'><li>Login</li></Link>
                        <Link to='/SignUp'><li>SignUp</li></Link>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Link to='/Fevorite'><li>Favorite</li></Link>
                        <Link to='/Login'>
                        <li className='text-gray-600' onClick={()=> localStorage.clear()}><i class="fa-solid fa-right-from-bracket"></i></li>
                        </Link>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Nav;

