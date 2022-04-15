import product1 from '../assets/images/product1.jpg';
import product2 from '../assets/images/product2.jpg';

const initialCart = [
	{
		id: 1,
		title: 'Balo du lịch đi học giá rẻ thời trang cute đẹp MiniCat BL464 ( không có móc gấu)',
		description: 'Meat Balls For Pet',
		category: '',
		price: 89,
		// priceOld: '108.000₫',
		imageUrl: product1,
		categorySlug: 'meat-balls-for-pet',
		slug: 'meat-balls-for-pet',
		sale: true,
		quantity: 121,
		quantityToBuy: 1,
	},
	{
		id: 2,
		title: 'Giày Jordan 1 High Panda, Giày Thể Thao JD1 Cao Cổ Màu Đen, Da Bò Cao Cấp Full Size Nam Nữ | JDD002',
		description: 'Meat Balls For Pet',
		category: '',
		price: 90,
		// priceOld: '108.000₫',
		imageUrl: product2,
		categorySlug: 'meat-balls-for-pet',
		slug: 'meat-balls-for-pet',
		sale: true,
		quantity: 121,
		quantityToBuy: 1,
	},
];

const cartReducer = (state = initialCart, action) => {
	switch (action.type) {
		case 'ADD_PRODUCT_TO_CART': {
			break;
		}
		default:
			return state;
	}
};

export default cartReducer;
