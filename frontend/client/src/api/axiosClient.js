import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
	baseURL: 'http://localhost:5000/api/v1',
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => {
		return queryString.stringify(params);
	},
});

axiosClient.interceptors.request.use(async (config) => {
	// Handle token here ...
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	(error) => {
		// Handle errors
		throw error;
	}
);

export default axiosClient;
