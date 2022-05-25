import productReducer from './product';
import cartReducer from './cart';
import userReducer from './user';
import searchReducer from './searchProduct';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	product: productReducer,
	cart: cartReducer,
	user: userReducer,
	search: searchReducer,
});

export default rootReducer;
