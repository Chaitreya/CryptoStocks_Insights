import { useRef , useState, useEffect } from 'react';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from '../api/axios'; 
import { Link } from 'react-router-dom'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = '/register';

function Register(){

    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus()
    },[])

    const [firstname, setFirstname] = useState('');
    
    const [lastname, setLastname] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [username, setUser] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    
    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    
    const [matchPwd , setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg ] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    },[username]);
    
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    },[email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    },[password,matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if( !(validUsername && validPwd && validMatch) ){
            setErrMsg('Invalid Entry');
            return ;
        }
        try {
            const data = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                password: password
            }
            const response = await axios.post('http://localhost:3000/api/v1/register',data)
            setSuccess(true);
            setErrMsg('');
            setUser('');
            setEmail('');
            setFirstname('');
            setLastname('');
            setPassword('');
            setMatchPwd('');
        } catch (err) {
            setSuccess(false);
            if(!err?.response){
                setErrMsg('No Server response');
            } 
            else if(err.response?.status === 409){
                setErrMsg('Username or Email ID is already in use');
            } 
            else if(err.response?.status === 400){
                setErrMsg('ERROR');
            } 
            else {
                setErrMsg('Registration failed');
            }
            console.log(response)
        }
    }
    
    return(
        <div className='flex justify-center items-center flex-col mt-20  '>
            <p className={success ? 'bg-green-600 text-white' : 'hidden'}>User has been successfully created</p>
            <Link to='/login' className={success ? '' : 'hidden'}>Sign in</Link>
            <h1 className={success ? 'hidden' : ''}>Register</h1>
            <form onSubmit={handleSubmit} className={success ? 'hidden' : 'flex flex-col justify-center items-center w-64 bg-gray-400 p-4'}
            >
                <p className={errMsg ? 'bg-red-600 text-white' : 'hidden'}>{errMsg}</p>
                <label>First Name</label>
                <input 
                    type='text' 
                    ref={userRef}
                    onChange={(e) => {setFirstname(e.target.value)}}
                    value = {firstname}
                    required
                    className=''
                    />
                <label>Last Name</label>
                <input 
                    type='text'
                    ref={userRef}
                    onChange={(e) => {setLastname(e.target.value)}}
                    value = {lastname}
                    required
                    className=''
                    />
                <label>Email ID</label>
                <input 
                    type = 'email'
                    ref={userRef}
                    onChange = {(e) => {setEmail(e.target.value)}}
                    value = {email}
                    required 
                    className={validEmail || !email ? 'outline-2 outline-green-600' : 'outline-2 outline-red-600'}
                    />
                <p className={validEmail || !email ? 'hidden' : ''}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Email ID is Invalid
                </p>
                <label>Username</label>
                <input 
                    type = 'type'
                    ref={userRef}
                    onChange = {(e) => {setUser(e.target.value)}}
                    value = {username}
                    required 
                    className={validUsername || !username ? 'outline-2 outline-green-600' : 'outline-2 outline-red-600'}
                    />
                <p className={validUsername || !username ? 'hidden' : ''}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                <label>Password</label>
                <input 
                    type = 'password'
                    ref={userRef}
                    onChange = {(e) => {setPassword(e.target.value)}}
                    value = {password}
                    required
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    className=''
                    />
                <p className={!validPwd && pwdFocus ? '' : 'hidden '}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: ! @ # $ %
                </p>
                <label>Confirm Password</label>
                <input 
                    type = 'password'
                    ref={userRef}
                    onChange = {(e) => {setMatchPwd(e.target.value)}}
                    value = {matchPwd}
                    required
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    className=''
                />
                <p className={!validMatch && matchFocus ? '' : 'hidden'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>
                <button disabled={!firstname || !lastname || !validUsername || !validPwd || !validMatch ? true : false}>Sign Up</button>
            </form>
            <p className={success ? 'hidden' : ''}>Already have an account</p>
            <Link to='/login' className={success ? 'hidden' : ''}>Sign in</Link>
        </div>
        
    )
}

export default Register;