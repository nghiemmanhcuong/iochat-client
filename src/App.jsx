import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Chat from './pages/Chat/Chat';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
    const user = useSelector((state) => state.authReducer.authData);

    return (
        <div className='app'>
            <div className='blur' style={{top: '-16%', right: '0'}}></div>
            <div className='blur' style={{top: '36%', left: '-10%'}}></div>
            <Routes>
                <Route path='/' element={user ? <Navigate to='/home' /> : <Navigate to='/auth' />} />
                <Route path='home' element={user ? <Home /> : <Navigate to='/auth' />} />
                <Route path='auth' element={!user ? <Auth /> : <Navigate to='/home' />} />
                <Route path='profile/:id' element={user ? <ProfilePage /> : <Navigate to='/auth' />} />
                <Route path='chat' element={user ? <Chat /> : <Navigate to='/auth' />} />
            </Routes>
        </div>
    );
}

export default App;
