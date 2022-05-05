import product1 from '../assets/images/product1.jpg';
import product2 from '../assets/images/product2.jpg';

const initialCart = [];

const cartReducer = (state = initialCart, action) => {
	switch (action.type) {
		case 'ADD_PRODUCT_TO_CART':
			return [...state, action.payload];
		case 'UPDATE_PRODUCT_TO_CART':
			console.log('action.payload ', action.payload);
			const indexUpdateProduct = state.findIndex(
				(item) => item.index === action.payload
			);

			const updateProduct = state.find(
				(item) => item.index === action.payload
			);

			// console.log('indexUpdateProduct', indexUpdateProduct);

			const newState = [...state];

			// delete newState[indexUpdateProduct]
			newState.splice(indexUpdateProduct, 1, {
				...updateProduct,
				quantityToBuy: updateProduct.quantityToBuy + 1,
			});
			// console.log('newState', newState);

			return [...newState];
		case 'REDUCE_PRODUCT_TO_CART':
			const indexToReduceProduct = state.findIndex(
				(item) => item.index === action.payload
			);

			const reduceProduct = state.find(
				(item) => item.index === action.payload
			);

			// console.log('indexUpdateProduct', indexUpdateProduct);

			const newReduceState = [...state];

			if (reduceProduct.quantityToBuy - 1 <= 0) {
				newReduceState.splice(indexToReduceProduct, 1, {
					...reduceProduct,
					quantityToBuy: 1,
				});
			} else {
				newReduceState.splice(indexToReduceProduct, 1, {
					...reduceProduct,
					quantityToBuy: reduceProduct.quantityToBuy - 1,
				});
			}
			// console.log('newState', newState);

			return [...newReduceState];

		case 'DELETE_PRODUCT_TO_CART':
			const indexDeleteProduct = state.findIndex(
				(item) => item.index === action.payload
			);

			const newStateInCart = [...state];

			newStateInCart.splice(indexDeleteProduct, 1);
			console.log('running...');
			console.log('running...', newStateInCart);
			return [...newStateInCart];
		case 'DELETE_ALL_PRODUCT_TO_CART':
			// let newStateToDelete = [...state];
			// newStateToDelete = [];

			// newStateInCart.splice(indexDeleteProduct, 1);
			// console.log('running...');
			// console.log('running...', newStateInCart);
			return [];
		default:
			return state;
	}
};

export default cartReducer;
