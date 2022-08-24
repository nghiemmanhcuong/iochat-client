import './posts.css';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';

import Post from '../Post/Post';

import {getTimeLinePosts} from '../../store/actions/postAction.js';

const Posts = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.authReducer.authData);
    let {posts, loading} = useSelector((state) => state.postReducer);
    if(id) {
        posts = posts.filter(post => post.userId === id);
    }

    useEffect(() => {
        dispatch(getTimeLinePosts(user.id));
    }, []);

    return (
        <div className='posts'>
            {loading
                ? 'Đang tải bài viết'
                : posts.map((post, index) => (
                      <div className='posts_item' key={index}>
                          <Post post={post} />
                      </div>
                  ))}
        </div>
    );
};

export default Posts;
