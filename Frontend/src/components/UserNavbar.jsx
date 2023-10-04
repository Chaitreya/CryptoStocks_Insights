import { NavLink } from "react-router-dom";
import  useAuth  from '../hooks/useAuth';

function UserNavbar(){

    const { auth } = useAuth();

    return(
        <nav className="flex justify-between bg-slate-800 text-white p-4">
            <div className="">
                <h1 className="font-bold text-xl">CryptoStock Insights</h1>
            </div>
            <div className="">
                <NavLink to='/' className='py-2 px-4 mx-2 hover:bg-white hover:text-slate-900 rounded-lg text-center duration-100 font-semibold'>Home</NavLink>
                <NavLink to='/about' className='py-2 px-4 mx-2 hover:bg-white hover:text-slate-900 rounded-lg text-center duration-100 font-semibold'>About</NavLink>
                <NavLink to='/logout' className='py-2 px-4 mx-2 hover:bg-white hover:text-slate-900 rounded-lg text-center duration-100 font-semibold'>Logout</NavLink>
                <NavLink to='/articleData' className='py-2 px-4 mx-2 hover:bg-red-600 hover:text-white text-slate-900 rounded-lg text-center duration-100 bg-white font-semibold'>{auth.user}</NavLink>
            </div>
        </nav>
    )
}

export default UserNavbar;