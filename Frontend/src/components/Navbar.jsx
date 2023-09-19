import { NavLink } from "react-router-dom";

function Navbar(){
    return(
        <nav className="flex justify-between">
            <div className="">
                <h1 className="">CryptoStock Insights</h1>
            </div>
            <div className="">
                <NavLink to='/' className='p-2'>Home</NavLink>
                <NavLink to='/about' className='p-2'>About</NavLink>
                <NavLink to='/register' className='p-2'>Register</NavLink>
                <NavLink to='/login' className='p-2'>Login</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;