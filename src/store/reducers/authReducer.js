const authReducer = (
    state = {authData: null, loading: false, error: null, updateLoading: false},
    action,
) => {
    switch (action.type) {
        case 'AUTH_START':
            return {...state, loading: true, error: null};
        case 'AUTH_SUCCESS':
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action.data, loading: false, error: null};
        case 'AUTH_FAIL':
            return {...state, loading: false, error: action.payload};
        case 'UPDATE_FAIL':
            return {...state, updateLoading: true, error: true};
        case 'UPDATE_START':
            return {...state, updateLoading: true, error: null};
        case 'UPDATE_SUCCESS':
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action.data, updateLoading: false, error: null};
        case 'FOLLOW_USER':
            return {
                ...state,
                authData: {
                    ...state.authData,
                    user: {
                        ...state.authData.user,
                        followings: [...state.authData.user.followings, action.data],
                    },
                },
            };

        case 'UNFOLLOW_USER':
            return {
                ...state,
                authData: {
                    ...state.authData,
                    user: {
                        ...state.authData.user,
                        followings: [
                            ...state.authData.user.followings.filter(
                                (personId) => personId !== action.data,
                            ),
                        ],
                    },
                },
            };
        case 'LOG_OUT':
            localStorage.clear();
            return {...state, authData: null, loading: false, error: true};
        default:
            return state;
    }
};

export default authReducer;
