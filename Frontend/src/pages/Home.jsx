import { Link } from 'react-router-dom';

function Home(){
    return(
        <div>
            <h1>Hello</h1>
            <Link to='/register'>Register</Link>
        </div>
    )
}

export default Home;