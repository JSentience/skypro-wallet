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
			throw new Error('Токен авторизации не найден');
		}

		console.log('Создание транзакции с данными:', transactionData);

		// Отправляем как простой объект - axios автоматически преобразует в JSON
		const response = await axios.post(
			`${BASE_URL}/transactions`,
			transactionData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': '',
				},
			},
		);

		console.log('Транзакция успешно создана, статус:', response.status);
		return response.data;
	} catch (error) {
		console.error('Ошибка при создании транзакции:', error);
		throw new Error(error.response?.data?.message || error.message);
	}
};

export const expensesApi = {
	getTransactions,
	createTransaction,
};

export default expensesApi;
