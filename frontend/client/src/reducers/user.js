const initialUser = {
	isLogin: true,
};

const cartReducer = (state = initialUser, action) => {
	switch (action.type) {
		case 'SET_LOGIN':
			return {
				...state,
				isLogin: false,
			};
		default:
			return state;
	}
};

export default cartReducer;
