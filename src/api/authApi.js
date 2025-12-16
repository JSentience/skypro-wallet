import axios from 'axios';
import axiosRetry from 'axios-retry';

const AUTH_URL = '/api/user';

// Настройка retry для axios
axiosRetry(axios, {
	retries: 3,
	retryDelay: (retryCount) => {
		return retryCount * 1000; // Увеличивающаяся задержка
	},
	retryCondition: (error) => {
		// Повторять при сетевых ошибках или 5xx статусах
		return (
			axiosRetry.isNetworkOrIdempotentRequestError(error) ||
			(error.response && error.response.status >= 500)
		);
	},
});

export const getToken = () => localStorage.getItem('walletToken');

const saveUserData = (token, name, login) => {
	localStorage.setItem('walletToken', token);
	localStorage.setItem('userName', name);
	localStorage.setItem('userLogin', login);
};

export const login = async (login, password) => {
	const response = await axios.post(
		`${AUTH_URL}/login`,
		{ login, password },
		{ headers: { 'Content-Type': null } },
	);

	const { token, name, login: userLogin } = response.data.user;
	saveUserData(token, name, userLogin);

	return response.data;
};

export const register = async (name, login, password) => {
	const response = await axios.post(
		AUTH_URL,
		{ name, login, password },
		{ headers: { 'Content-Type': null } },
	);

	const { token, name: userName, login: userLogin } = response.data.user;
	saveUserData(token, userName, userLogin);

	return response.data;
};
