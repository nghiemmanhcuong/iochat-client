import {Modal, useMantineTheme} from '@mantine/core';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {uploadImage} from '../../store/actions/uploadAction.js';
import {updateUser} from '../../store/actions/userAction.js';

function ProfileModal({openModal, onSetOpenModal, data}) {
    const theme = useMantineTheme();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(data);
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPicture, setCoverPicture] = useState(null);
    const params = useParams();

    const {user} = useSelector((state) => state.authReducer.authData);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            e.target.name == 'profile_img' ? setProfilePicture(img) : setCoverPicture(img);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = formData;
        if (profilePicture) {
            const data = new FormData();
            const filename = Date.now() + profilePicture.name;
            data.append('name', filename);
            data.append('file', profilePicture);
            userData.profilePicture = filename;

            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        }

        if (coverPicture) {
            const data = new FormData();
            const filename = Date.now() + coverPicture.name;
            data.append('name', filename);
            data.append('file', coverPicture);
            userData.coverPicture = filename;

            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(updateUser(user.id,userData));
        onSetOpenModal(false)
    };

    return (
        <Modal
            overlayColor={
                theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}
            size='45%'
            opened={openModal}
            onClose={() => onSetOpenModal(false)}
        >
            <form
                className='auth_right_form auth_right_profile-form'
                onSubmit={(e) => handleSubmit(e)}
            >
                <h3>Thông tin của bạn</h3>
                <div>
                    <input
                        type='text'
                        placeholder='Họ và tên đệm'
                        className='auth_right_form_input'
                        name='firstname'
                        value={formData.firstname}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='text'
                        placeholder='Tên'
                        className='auth_right_form_input'
                        name='lastname'
                        value={formData.lastname}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Công việc hiện tại'
                        className='auth_right_form_input'
                        name='worksAt'
                        value={formData.worksAt}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='text'
                        placeholder='Email'
                        className='auth_right_form_input'
                        name='email'
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Đang sống tại...'
                        className='auth_right_form_input'
                        name='livesIn'
                        value={formData.livesIn}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='text'
                        placeholder='Địa chỉ'
                        className='auth_right_form_input'
                        name='address'
                        value={formData.address}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Mối quan hệ'
                        className='auth_right_form_input'
                        name='relationships'
                        value={formData.relationships}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <input type='file' name='profile_img' onChange={(e) => handleImageChange(e)}/>
                    <input type='file' name='cover_img' onChange={(e) => handleImageChange(e)}/>
                </div>
                <button className='button profile-modal_button'>Lưu thay đổi</button>
            </form>
        </Modal>
    );
}

export default ProfileModal;
