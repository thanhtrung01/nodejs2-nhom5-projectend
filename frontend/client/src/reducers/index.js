import productReducer from './product';
import cartReducer from './cart';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	product: productReducer,
	cart: cartReducer,
});

export default rootReducer;
