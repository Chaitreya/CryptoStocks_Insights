import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import UserHistory from './pages/UserHistory';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <div className='m-4'>
      <Navbar />    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route element={<RequireAuth />}>
          <Route path='/articleData' element={<UserHistory />} />
        </Route>
      </Routes>
    </div>
    
    
  )
}

export default App
