import product1 from '../assets/images/product1.jpg';
import product2 from '../assets/images/product2.jpg';

const initialCart = [];

const cartReducer = (state = initialCart, action) => {
	switch (action.type) {
		case 'ADD_PRODUCT_TO_CART':
			return [...state, action.payload];
		case 'UPDATE_PRODUCT_TO_CART':
			console.log('action.payload ', typeof action.payload);
			const indexUpdateProduct = state.findIndex(
				(item) => item.index === action.payload
			);

			const updateProduct = state.find(
				(item) => item.index === action.payload
			);

			console.log('indexUpdateProduct', indexUpdateProduct);

			const newState = [...state];

			// delete newState[indexUpdateProduct]
			newState.splice(indexUpdateProduct, 1, {
				...updateProduct,
				quantityToBuy: updateProduct.quantityToBuy + 1,
			});
			console.log('newState', newState);

			return [...newState];
		default:
			return state;
	}
};

export default cartReducer;
