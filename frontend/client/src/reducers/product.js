const initialProductState = [
	{
		id: 1,
		value: 'Item product',
	},
];

const productReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case 'ADD_PRODUCT':
			return [...state, action.payload];
		default:
			return state;
	}
};

export default productReducer;
