import { useEffect, useRef, useState , useContext} from 'react';
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import axios from '../api/axios';


const LOGIN_URL = '/login';

function Login(){

    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus()
    },[]);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [success , setSuccess ] = useState(false);

    const [errMsg ,setErrMsg] = useState('');

    useEffect( () => {
        setErrMsg('');
    },[user,pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: user,
            password: pwd
        }

        await axios.post(LOGIN_URL,data)
            .then((res) => {
                setPwd('');
                setUser('');
                setSuccess(true);
                const accessToken = res?.data?.accessToken;
                setAuth({user , pwd , accessToken});
                console.log(accessToken);
            })
            .catch((err) => {
                if(!err?.response){
                    setErrMsg('No server Response');
                }
                else if(err.response?.status === 400){
                    setErrMsg('Missing Username or Password');
                }
                else if(err.response?.status === 401){
                    setErrMsg('Unauthorized');
                }
                else{
                    setErrMsg('Login Failed');
                }
            })
    }


    return(
        <>
            { success ? (
                <div className='flex justify-center items-center flex-col mt-20  '>
                    <p className='bg-green-600 text-white'>Login successful</p>
                    <Link to='/' className=''>Go to home</Link>
                </div>               
            ) : (
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
                                onChange={(e) => {setUser(e.target.value)}} 
                                value={user}
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id='password'
                                onChange={(e) => {setPwd(e.target.value)}} 
                                value={pwd}
                                // required   
                            />
                            <button>Sign in</button>
                        </form>
                        <p className=''>Create Account</p>
                        <Link to='/register' className=''>Sign up</Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login;