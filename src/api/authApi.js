import axios from 'axios';
import axiosRetry from 'axios-retry';

const AUTH_URL = '/api/user';

// Настройка retry для axios
axiosRetry(axios, {
	retries: 3,
	retryDelay: (retryCount) => {
		console.warn(`Повторная попытка запроса #${retryCount}`);
		return retryCount * 1000; // Увеличивающаяся задержка
	},
	retryCondition: (error) => {
		// Повторять при сетевых ошибках или 5xx статусах
		return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
			   (error.response && error.response.status >= 500);
	},
});

export const getToken = () => localStorage.getItem('walletToken');

export const login = async (login, password) => {
	try {
		const response = await axios.post(
			`${AUTH_URL}/login`,
			{
				login,
				password,
			},
			{
				headers: { 'Content-Type': null },
			},
		);
		const { token, name, login: userLogin } = response.data.user;
		console.log('Login response:', response.data);
		localStorage.setItem('walletToken', token);
		localStorage.setItem('userName', name);
		localStorage.setItem('userLogin', userLogin);
		return response.data;
	} catch (error) {
		console.error('Login error:', error);
		throw new Error(error.response?.data?.message || error.message);
	}
};

export const register = async (name, login, password) => {
	try {
		const response = await axios.post(
			AUTH_URL,
			{
				name,
				login,
				password,
			},
			{
				headers: { 'Content-Type': null },
			},
		);
		const { token, name: userName, login: userLogin } = response.data.user;
		console.log('Register response:', response.data);
		localStorage.setItem('walletToken', token);
		localStorage.setItem('userName', userName);
		localStorage.setItem('userLogin', userLogin);
		return response.data;
	} catch (error) {
		console.error('Registration error:', error);
		console.error('Response data:', error.response?.data);
		throw new Error(error.response?.data?.message || error.message);
	}
};

// export const authRequest = async (config) => {
// 	const token = getToken();
// 	if (!token) throw new Error('Требуется авторизация');
//
// 	try {
// 		const response = await axios({
// 			...config,
// 			headers: {
// 				Authorization: `Bearer ${token}`,
// 				...config.headers,
// 			},
// 		});
// 		return response.data;
// 	} catch (error) {
// 		throw new Error(error.response?.data?.message || 'Ошибка запроса');
// 	}
// };
