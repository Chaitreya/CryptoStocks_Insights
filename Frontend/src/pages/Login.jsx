import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';


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
                navigate('/articleData');
            })
            .catch((err) => {
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
        <div className='flex justify-center items-center flex-col mt-20  '>
            <div className='flex flex-col justify-center items-center w-64 bg-gray-400 p-4'>

                <h1>Login</h1>
                <p className={errMsg ? '' : 'hidden'}>{errMsg}</p>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        ref={userRef}
                        autoComplete='off'
                        id='username'
                        onChange={(e) => { setUser(e.target.value) }}
                        value={user}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id='password'
                        onChange={(e) => { setPwd(e.target.value) }}
                        value={pwd}
                    // required   
                    />
                    <button>Sign in</button>
                </form>
                <p className=''>Create Account</p>
                <Link to='/register' className=''>Sign up</Link>
            </div>
        </div>
    )
}

export default Login;