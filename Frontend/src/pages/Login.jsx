import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import Loading from '../components/Loading';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const LOGIN_URL = '/login';

function Login() {

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus()
    }, []);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [loading,setLoading] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: user,
            password: pwd
        }
        setLoading(true);
        await axios.post(LOGIN_URL, 
            data,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            .then((res) => {
                const accessToken = res?.data?.accessToken;
                setAuth({ user, pwd, accessToken });
                console.log(accessToken);
                setPwd('');
                setUser('');
                setLoading(false);
                navigate('/articleData');
            })
            .catch((err) => {
                setLoading(false);
                if (!err?.response) {
                    setErrMsg('No server Response');
                }
                else if (err.response?.status === 400) {
                    setErrMsg('Missing Username or Password');
                }
                else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                }
                else {
                    setErrMsg('Login Failed');
                }
            })
        
    }


    return (
        <div className='flex justify-center items-center flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='flex flex-col justify-center items-center bg-gray-400 p-4 rounded-xl drop-shadow-xl w-72'>
                <h1 className='font-bold text-xl'>Login</h1>
                <div className={errMsg ? 'flex justify-center bg-red-600 p-1 m-2 text-white font-semibold rounded-md drop-shadow-xl' : 'hidden'}>
                    <div className='p-1'>
                        <FontAwesomeIcon icon={faTriangleExclamation} className=''/>
                    </div>
                    <div className='p-1'>
                        <p className=''>{errMsg}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center m-2 border-b-2 p-4 border-t-2 border-slate-900'>
                    <span className='flex justify-center items-center m-2'>
                        <FontAwesomeIcon icon={faUser} className='bg-slate-900 text-white p-2 rounded-l-lg text-lg'/>
                        <input
                            placeholder='Username'
                            type="text"
                            ref={userRef}
                            autoComplete='off'
                            id='username'
                            onChange={(e) => { setUser(e.target.value) }}
                            value={user}
                            required
                            className='p-1 rounded-r-lg'
                        />
                    </span>
                    <span className='flex justify-center items-center m-2'>
                        <FontAwesomeIcon icon={faLock} className='bg-slate-900 text-white p-2 rounded-l-lg text-lg'/>
                        <input
                            placeholder='Password'
                            type="password"
                            id='password'
                            onChange={(e) => { setPwd(e.target.value) }}
                            value={pwd}
                            className='p-1 rounded-r-lg'
                        // required   
                        />
                    </span>
                    <div className='m-2'>
                        <button className='p-2 px-20 bg-violet-950 text-white rounded-lg font-semibold border-2 border-violet-950 text-center hover:bg-white hover:text-violet-950 duration-150 w-full'>SignIn</button>
                    </div>
                </form>
                <div className='flex justify-center items-start flex-col px-2 mx-2'>
                    <p className=''>Do not have an account? Create one.</p>
                    <Link to='/register' className='underline font-semibold text-violet-950 hover:underline-offset-2 hover:text-violet-900 duration-150 w-1/4'>Sign up</Link>
                </div>
            </div>
            <div className={loading? "": "hidden"}>
                <Loading />
            </div>
        </div>
    )
}

export default Login;