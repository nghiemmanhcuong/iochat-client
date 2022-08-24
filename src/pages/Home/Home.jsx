import './home.css';

import Profile from '../../components/Profile/Profile';
import Feed from '../../components/Feed/Feed';
import RightSide from '../../components/RightSide/RightSide';

const Home = () => {
    return (
        <div className='home'>
            <Profile />
            <Feed />
            <RightSide />
        </div>
    );
};

export default Home;
