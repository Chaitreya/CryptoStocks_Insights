import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from '../api/axios';

const LOGOUT_URL = '/logout';

const Logout =  () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect( () => {
        
        const logout = async() => {
            await axios.get(LOGOUT_URL,{
                withCredentials: true
            })
            .then((res)=>{
                console.log(res)
                setAuth({});
                navigate('/login');
            })
            .catch((err)=>{
                console.error(err);
            });
        }

        logout();
        
    },[])

    return null;
}

export default Logout;