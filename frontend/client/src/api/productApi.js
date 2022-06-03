import axiosClient from './axiosClient';

const productApi = {
	getAll: () => {
		const url = '/products';
		return axiosClient.get(url);
	},

	get: (id) => {
		const url = `/products/${id}`;
		return axiosClient.get(url);
	},
	createOrder: (order) => {
		const url = `/orders/create-order`;
		return axiosClient.post(url, { ...order });
	},
	getAllOrders: () => {
		const url = `/orders/`;
		return axiosClient.get(url);
	},
	createProduct: (data) => {
		const url = `/products/create-product`;
		return axiosClient.post(url, { ...data });
	},
	deleteProduct: (id) => {
		const url = `/products/${id}`;
		return axiosClient.delete(url);
	},
};

export default productApi;
