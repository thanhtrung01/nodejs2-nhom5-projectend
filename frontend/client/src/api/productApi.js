import axiosClient from './axiosClient';

const productApi = {
	getAll: (params) => {
		const url = '/products';
		return axiosClient.get(url, { params });
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
};

export default productApi;
