import { useRef, useState, useEffect } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import { Link } from 'react-router-dom'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = '/register';

function Register() {

    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus()
    }, [])

    const [firstname, setFirstname] = useState('');

    const [lastname, setLastname] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [username, setUser] = useState('');
    const [validUsername, setValidUsername] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(validUsername && validPwd && validMatch)) {
            setErrMsg('Invalid Entry');
            return;
        }
        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password
        }
        await axios.post(REGISTER_URL,
            data,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            .then(() => {
                setSuccess(true);
                setErrMsg('');
                setUser('');
                setEmail('');
                setFirstname('');
                setLastname('');
                setPassword('');
                setMatchPwd('');
            })
            .catch((err) => {
                setSuccess(false);
                if (!err?.response) {
                    setErrMsg('No Server response');
                }
                else if (err.response?.status === 409) {
                    setErrMsg('Username or Email ID is already in use');
                }
                else if (err.response?.status === 400) {
                    setErrMsg('ERROR');
                }
                else {
                    setErrMsg('Registration failed');
                }
            })


    }

    return (
        <>
            {success ? (
                <div className='flex justify-center items-center flex-col absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl '>
                        <div className='bg-green-700 text-white p-4 flex flex-col justify-center items-center rounded-lg'>
                            <p className='p-2 m-2'>User has been successfully created</p>
                            <Link to='/login' className='p-2 m-2 font-semibold text-center bg-violet-900 border-2 border-violet-900 hover:bg-white hover:text-violet-900 rounded-lg duration-150' ref={userRef}>SignIn</Link>
                        </div>
                </div>
            ) : (
                <div className='flex justify-between items-center flex-col mt-20 drop-shadow-xl'>
                    <div className='bg-gray-400 flex flex-col justify-center items-center p-4 rounded-xl w-72'>
                        <h1 className='font-bold text-xl'>Register</h1>
                        <div className={errMsg ? 'flex justify-center bg-red-600 p-1 m-2 text-white font-semibold rounded-md drop-shadow-xl' : 'hidden'}>
                            <div className='p-1'>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                            </div>
                            <div className='p-1'>
                                <p >{errMsg}</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center m-2 border-b-2 p-4 border-t-2 border-slate-900'>
                            <span className='flex justify-center items-center m-2'>
                                <FontAwesomeIcon icon={faUserCircle} className='bg-slate-900 text-white p-2 rounded-l-lg text-lg' />
                                <input
                                    placeholder='First Name'
                                    type='text'
                                    ref={userRef}
                                    onChange={(e) => { setFirstname(e.target.value) }}
                                    value={firstname}
                                    autoComplete='off'
                                    required
                                    className='p-1 rounded-r-lg'
                                />
                            </span>
                            <span className='flex justify-center items-center m-2'>
                                <FontAwesomeIcon icon={faUserCircle} className='bg-slate-900 text-white p-2 rounded-l-lg text-lg' />
                                <input
                                    placeholder='Last Name'
                                    type='text'
                                    onChange={(e) => { setLastname(e.target.value) }}
                                    value={lastname}
                                    autoComplete='off'
                                    required
                                    className='p-1 rounded-r-lg'
                                />
                            </span>
                            <span className='flex justify-center items-center m-2'>
                                <FontAwesomeIcon icon={faUser} className='bg-slate-900 text-white p-2 rounded-l-lg text-lg' />
                                <input
                                    placeholder='Username'
                                    type='type'
                                    onChange={(e) => { setUser(e.target.value) }}
                                    value={username}
                                    autoComplete='off'
                                    required
                                    className='p-1 rounded-r-lg'
                                />
                            </span>
                            <p className={validUsername || !username ? 'hidden' : 'flex justify-center text-sm p-1 mx-2 bg-red-300 rounded-lg'}>
                                <div className='p-1'>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                </div>
                                <div className='p-1'>
                                    4 to 24 characters. <br />
                                    Must begin with a letter. <br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </div>
                            </p>
                            <span className='flex justify-center items-center m-2'>
                                <FontAwesomeIcon icon={faEnvelope} className='bg-slate-900 text-white p-2 rounded-l-lg text-lg' />
                                <input
                                    placeholder='Email ID'
                                    type='email'
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    value={email}
                                    autoComplete='off'
                                    required
                                    className='p-1 rounded-r-lg'
                                />
                            </span>
                            <p className={validEmail || !email ? 'hidden' : 'flex justify-center text-sm p-1 bg-red-300 rounded-lg mx-2'}>
                                <div className='p-1'>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                </div>
                                <div className='p-1'>
                                    Email ID is Invalid. Please enter valid Email ID
                                </div>
                            </p>
                            <span className='flex justify-center items-center m-2'>
                                <FontAwesomeIcon icon={faLock} className='bg-slate-900 text-white p-2 rounded-l-lg text-lg' />
                                <input
                                    placeholder='Password'
                                    type='password'
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    value={password}
                                    required
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    className='p-1 rounded-r-lg'
                                />
                            </span>
                            <p className={!validPwd && pwdFocus ? 'flex justify-center text-sm p-1 bg-red-300 rounded-lg mx-2' : 'hidden '}>
                                <div className='p-1'>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                </div>
                                <div className='p-1'>
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                    Allowed special characters: ! @ # $ %
                                </div>
                            </p>
                            <span className='flex justify-center items-center m-2'>
                                <FontAwesomeIcon icon={faLock} className='bg-slate-900 text-white p-2 rounded-l-lg text-lg' />
                                <input
                                    placeholder='Confirm Password'
                                    type='password'
                                    onChange={(e) => { setMatchPwd(e.target.value) }}
                                    value={matchPwd}
                                    required
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    className='p-1 rounded-r-lg'
                                />
                            </span>
                            <p className={!validMatch && matchFocus ? 'flex justify-center text-sm p-1 bg-red-300 rounded-lg mx-2' : 'hidden'}>
                                <div className='p-1'>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                </div>
                                <div className='p-1'>
                                    Must match the first password input field.
                                </div>
                            </p>
                            <div className=''>
                                <button disabled={!firstname || !lastname || !validUsername || !validPwd || !validMatch ? true : false} className='p-2 px-20 bg-violet-950 text-white rounded-lg font-semibold border-2 border-violet-950 text-center hover:bg-white hover:text-violet-950 duration-150 w-full'>SignUp</button>
                            </div>
                        </form>
                        <div className='flex flex-col'>
                            <p className='text-md'>Already have an account ?</p>
                            <Link to='/login' className='underline font-semibold text-violet-950 hover:underline-offset-2 hover:text-violet-900 duration-150 w-1/4'>SignIn</Link>
                        </div>
                    </div>

                </div >
            )
            }
        </>



    )
}

export default Register;