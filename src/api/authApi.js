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
	try {
		const response = await axios.post(
			`${AUTH_URL}/login`,
			{ login, password },
			{ headers: { 'Content-Type': null } },
		);

		const { token, name, login: userLogin } = response.data.user;
		saveUserData(token, name, userLogin);

		return response.data;
	} catch (error) {
		if (error.response) {
			// Сервер вернул ответ с ошибкой
			switch (error.response.status) {
				case 400:
					throw new Error('Неверный логин или пароль');
				case 401:
					throw new Error('Неверный логин или пароль');
				case 404:
					throw new Error('Пользователь не найден');
				case 500:
					throw new Error('Ошибка сервера. Попробуйте позже');
				default:
					throw new Error('Ошибка авторизации. Попробуйте снова');
			}
		} else if (error.request) {
			// Запрос был отправлен, но ответа не получено
			throw new Error('Нет соединения с сервером');
		} else {
			// Произошла ошибка при настройке запроса
			throw new Error('Ошибка при отправке запроса');
		}
	}
};

export const register = async (name, login, password) => {
	try {
		const response = await axios.post(
			AUTH_URL,
			{ name, login, password },
			{ headers: { 'Content-Type': null } },
		);

		const { token, name: userName, login: userLogin } = response.data.user;
		saveUserData(token, userName, userLogin);

		return response.data;
	} catch (error) {
		if (error.response) {
			// Сервер вернул ответ с ошибкой
			switch (error.response.status) {
				case 400:
					throw new Error('Некорректные данные. Проверьте введённые значения');
				case 409:
					throw new Error('Пользователь с таким email уже существует');
				case 500:
					throw new Error('Ошибка сервера. Попробуйте позже');
				default:
					throw new Error('Ошибка регистрации. Попробуйте снова');
			}
		} else if (error.request) {
			// Запрос был отправлен, но ответа не получено
			throw new Error('Нет соединения с сервером');
		} else {
			// Произошла ошибка при настройке запроса
			throw new Error('Ошибка при отправке запроса');
		}
	}
};
