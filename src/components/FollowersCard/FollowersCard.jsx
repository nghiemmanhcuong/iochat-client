import './followers-card.css';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {getAllUser} from '../../api/userApi.js';

import User from '../User/User';

const FollowersCard = () => {
    const [persons, setPersons] = useState([]);
    const {user} = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fecthAllUser = async() => {
            try {
                const {data} = await getAllUser();
                setPersons(data.users);
            } catch (error) {
                console.log(error);
            }
        }
        fecthAllUser();
    },[])

    return (
        <div className='followers-card'>
            <h3>Những người bạn có thể biết</h3>
            {persons.map((item,index) => {
                if(item._id !== user.id && index <= 4) {
                    return <User person={item} key={index} />
                }
            })}
        </div>
    );
};

export default FollowersCard;
