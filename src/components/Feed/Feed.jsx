import './feed.css';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Share from '../Share/Share';
import Posts from '../Posts/Posts';

const Feed = () => {
    const {id} = useParams();
    const {user} = useSelector((state) => state.authReducer.authData);

    return (
        <div className='feed'>
            {!id || user.id == id ? <Share /> : null}
            <Posts />
        </div>
    );
};

export default Feed;
