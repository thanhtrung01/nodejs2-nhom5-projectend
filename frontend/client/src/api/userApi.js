import axiosClient from './axiosClient';

const userApi = {
	getAll: (params) => {
		const url = `/users`;
		// console.log('123', url);
		// return axiosClient.get(url, { params });
		return axiosClient.get(url);
	},

	get: (id) => {
		const url = `/user/${id}`;
		return axiosClient.get(url);
	},
	editUserPut: (id, dataEdit) => {
		const url = `/users/${id}`;
		return axiosClient.put(url, { ...dataEdit });
	},
	createUser: (params) => {
		const url = `/auth/register`;
		console.log('params in sign up:', params);
		return axiosClient.post(url, params);
	},
	loginUser: (params) => {
		const url = `/auth/login`;
		// console.log('params:', params);
		return axiosClient.post(url, params);
	},
};

export default userApi;
