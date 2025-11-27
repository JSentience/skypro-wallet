import axios from 'axios';
import { getToken } from './authApi';

const BASE_URL = 'https://wedev-api.sky.pro/api';

export const getTransactions = async (filters = {}) => {
	try {
		const token = getToken();

		if (!token) {
			throw new Error('Токен авторизации не найден');
		}

		// Создаем параметры запроса
		const params = new URLSearchParams();

		// Добавляем параметр сортировки
		if (filters.sortBy) {
			params.append('sortBy', filters.sortBy);
		}

		// Добавляем параметр фильтрации по категориям
		if (filters.filterBy && filters.filterBy.length > 0) {
			params.append('filterBy', filters.filterBy.join(','));
		}

		const url = `${BASE_URL}/transactions${params.toString() ? `?${params.toString()}` : ''}`;

		const response = await axios.get(url, {
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

		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || error.message);
	}
};

export const updateTransaction = async (transactionId, transactionData) => {
	try {
		const token = getToken();

		if (!token) {
			throw new Error('Токен авторизации не найден');
		}

		if (!transactionId) {
			throw new Error('ID транзакции обязателен');
		}

		const response = await axios.patch(
			`${BASE_URL}/transactions/${transactionId}`,
			transactionData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': '',
				},
			},
		);

		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || error.message);
	}
};

export const deleteTransaction = async (transactionId) => {
	try {
		const token = getToken();

		if (!token) {
			throw new Error('Токен авторизации не найден');
		}

		if (!transactionId) {
			throw new Error('ID транзакции обязателен');
		}

		const response = await axios.delete(
			`${BASE_URL}/transactions/${transactionId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': '',
				},
			},
		);

		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || error.message);
	}
};

export const expensesApi = {
	getTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
};

export default expensesApi;
