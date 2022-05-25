const searchValue = {
	value: '',
};

const searchReducer = (state = searchValue, action) => {
	switch (action.type) {
		case 'ADD_VALUE_SEARCH':
			return {
				...state,
				value: action.payload,
			};
		default:
			return state;
	}
};

export default searchReducer;
