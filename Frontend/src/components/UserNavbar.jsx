import { NavLink } from "react-router-dom";
import  useAuth  from '../hooks/useAuth';

function UserNavbar(){

    const { auth } = useAuth();

    return(
        <nav className="flex justify-between">
            <div className="">
                <h1 className="">CryptoStock Insights</h1>
            </div>
            <div className="flex">
                <NavLink to='/' className='p-2'>Home</NavLink>
                <NavLink to='/about' className='p-2'>About</NavLink>
                <NavLink to='/logout' className='p-2'>Logout</NavLink>
                <NavLink to='/articleData' className='p-2'>{auth.user}</NavLink>
            </div>
        </nav>
    )
}

export default UserNavbar;