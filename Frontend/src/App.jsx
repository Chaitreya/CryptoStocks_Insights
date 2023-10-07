import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import UserHistory from './pages/UserHistory';
import UserNavbar from './components/UserNavbar';
import PublicNavbar from './components/PublicNavbar';
import RequireAuth from './components/RequireAuth';
import Logout from './components/Logout';
import  useAuth  from './hooks/useAuth';


function App() {

  const { auth } = useAuth();

  return (
    <div className="bg-scroll bg-[url('./assets/bgDoodle175.png')] bg-repeat w-full h-screen bg-opacity-100" >
      {auth?.user ?
        (<UserNavbar />) :
        (<PublicNavbar />)
      }   
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route element={<RequireAuth />}>
          <Route path='/articleData' element={<UserHistory />} />
          <Route path='/logout' element={<Logout />} />
        </Route>
      </Routes>
    </div>
    
    
  )
}

export default App
