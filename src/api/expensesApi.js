import axios from 'axios';
import { getToken } from './authApi';

const BASE_URL = 'https://wedev-api.sky.pro/api';

export const getTransactions = async () => {
	try {
		const token = getToken();

		if (!token) {
			throw new Error('Токен авторизации не найден');
		}

		const response = await axios.get(`${BASE_URL}/transactions`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error('Ошибка при получении транзакций:', error);
		throw new Error(error.response?.data?.message || error.message);
	}
};

export const createTransaction = async (transactionData) => {
	try {
		const token = getToken();

		if (!token) {
			throw new Error(
				'Токен авторизации не найден. Пожалуйста, войдите в систему.',
			);
		}

		console.log('Создание транзакции с данными:', transactionData);

		// Используем тот же подход, что и в authApi.js - создаем строку запроса вручную
		const dataString =
			`description=${encodeURIComponent(transactionData.description)}` +
			`&sum=${encodeURIComponent(transactionData.sum)}` +
			`&category=${encodeURIComponent(transactionData.category)}` +
			`&date=${encodeURIComponent(transactionData.date)}`;

		console.log('Отправляемая строка данных:', dataString);

		const response = await axios.post(
			`${BASE_URL}/transactions`,
			{ dataString },
			{
				headers: {
					Authorization: `Bearer ${token}`,
					// НЕ добавляем Content-Type, как в authApi.js
				},
			},
		);

		console.log('Транзакция успешно создана, статус:', response.status);
		return response.data;
	} catch (error) {
		console.error('Ошибка при создании транзакции:', error);

		if (error.response) {
			// Сервер ответил с ошибкой
			const serverError =
				error.response.data?.error || error.response.data?.message;
			throw new Error(
				serverError || `Ошибка сервера: ${error.response.status}`,
			);
		} else if (error.request) {
			// Запрос был отправлен, но ответ не получен
			throw new Error('Сервер не отвечает. Попробуйте позже.');
		} else {
			// Другие ошибки
			throw new Error(
				error.message || 'Неизвестная ошибка при создании транзакции',
			);
		}
	}
};

export const expensesApi = {
	getTransactions,
	createTransaction,
};

export default expensesApi;
