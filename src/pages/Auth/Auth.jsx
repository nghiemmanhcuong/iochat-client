import './auth.css';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {login, signUp} from '../../store/actions/authAction.js';

import logo from '../../images/logo.png';

const Auth = () => {
    const dispatch = useDispatch();
    const {loading,error} = useSelector((state) => state.authReducer);
    const [isSignUp, setIsSignUp] = useState(false);
    const [data, setData] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        comfirmpass: '',
    });
    const [isConfirmPass, setIsConfirmPass] = useState(true);

    const handleInputChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            data.password === data.comfirmpass ? dispatch(signUp(data)) : setIsConfirmPass(false);
        } else {
            dispatch(login(data));
        }
    };

    return (
        <div className='auth'>
            <div className='auth_left'>
                <img src={logo} alt='logo' />
                <div className='auth_left_name'>
                    <h1>LINDER Media</h1>
                    <h6>Khám phá những ý tưởng trên khắp thế giới</h6>
                </div>
            </div>
            {isSignUp ? (
                <SignUp
                    onSetIsSignUp={setIsSignUp}
                    onHandleInputChange={handleInputChange}
                    isConfirmPass={isConfirmPass}
                    onHandleSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                />
            ) : (
                <Login
                    onSetIsSignUp={setIsSignUp}
                    onHandleInputChange={handleInputChange}
                    onHandleSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                />
            )}
        </div>
    );
};

export default Auth;

const SignUp = (props) => {
    return (
        <div className='auth_right'>
            <form
                className='auth_right_form auth_right_auth-form'
                onSubmit={(e) => props.onHandleSubmit(e)}
            >
                <h3>Đăng ký tài khoản</h3>
                <div>
                    <input
                        type='text'
                        placeholder='Họ và tên đệm'
                        className='auth_right_form_input'
                        name='firstname'
                        onChange={(e) => props.onHandleInputChange(e)}
                    />
                    <input
                        type='text'
                        placeholder='Tên'
                        className='auth_right_form_input'
                        name='lastname'
                        onChange={(e) => props.onHandleInputChange(e)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Tên đăng nhập'
                        className='auth_right_form_input'
                        name='username'
                        onChange={(e) => props.onHandleInputChange(e)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Địa chỉ email'
                        className='auth_right_form_input'
                        name='email'
                        onChange={(e) => props.onHandleInputChange(e)}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        placeholder='Mật khẩu'
                        className='auth_right_form_input'
                        name='password'
                        onChange={(e) => props.onHandleInputChange(e)}
                    />
                    <input
                        type='password'
                        placeholder='Nhập lại mật khẩu'
                        className='auth_right_form_input'
                        name='comfirmpass'
                        onChange={(e) => props.onHandleInputChange(e)}
                    />
                </div>
                <div
                    className='auth_right_form_comfirmpass'
                    style={{
                        display: props.isConfirmPass ? 'none' : 'flex',
                        color: 'red',
                        fontSize: '12px',
                        alignSelf: 'flex-end',
                        height: 'auto',
                    }}
                >
                    * Mật khẩu không khớp
                </div>
                {props.error && <p style={{color: 'red', fontSize: '12px',marginTop:'-15px'}}>{props.error}</p>}
                <div className='auth_right_form_text'>
                    <div>
                        Bạn đã có tài khoản?{' '}
                        <span onClick={() => props.onSetIsSignUp(false)}>Đăng nhập</span>
                    </div>
                </div>
                <div>
                    <button className='button auth_right_form_btn' type='submit' disabled={props.loading}>
                        {props.loading ? 'Loading...' : 'Đăng ký'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const Login = (props) => {
    return (
        <div className='auth_right'>
            <form
                className='auth_right_form-login auth_right_auth-form'
                onSubmit={(e) => props.onHandleSubmit(e)}
            >
                <h3>Đăng nhập</h3>
                <div>
                    <input
                        type='text'
                        placeholder='Tên đăng nhập'
                        className='auth_right_form_input'
                        name='username'
                        onChange={(e) => props.onHandleInputChange(e)}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        placeholder='Mật khẩu'
                        className='auth_right_form_input'
                        name='password'
                        onChange={(e) => props.onHandleInputChange(e)}
                    />
                </div>
                {props.error && <p style={{color: 'red', fontSize: '12px',marginTop:'-15px'}}>{props.error}</p>}
                <div className='auth_right_form_text'>
                    <div>
                        Bạn chưa có tài khoản?{' '}
                        <span onClick={() => props.onSetIsSignUp(true)}>Đăng ký</span>
                    </div>
                </div>
                <div>
                    <button className='button auth_right_form_btn' type='submit' disabled={props.loading}>
                        {props.loading ? 'Loading...' : 'Đăng nhập'}
                    </button>
                </div>
            </form>
        </div>
    );
};
