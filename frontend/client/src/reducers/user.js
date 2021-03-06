const initialUser = {
	_id: '',
	isLogin: false,
	username: '',
	email: '',
	password: '',
	phone: '',
	isAdmin: false,
};

const userReducer = (state = initialUser, action) => {
	switch (action.type) {
		case 'SET_LOGIN':
			return {
				...state,
				isLogin: false,
			};
		case 'CREATE_LOGIN':
			console.log('create_login', action.payload);
			return {
				...state,
				isLogin: true,
				...action.payload,
			};
		case 'SIGN_IN_USER':
			return {
				...state,
				isLogin: true,
				...action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
