import axios from 'axios';
import axiosRetry from 'axios-retry';
import { getToken } from './authApi';

const BASE_URL = '/api';

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

// Batch операции для объединения нескольких запросов
export const batchDeleteTransactions = async (transactionIds) => {
	try {
		const token = getToken();

		if (!token) {
			throw new Error('Токен авторизации не найден');
		}

		if (!Array.isArray(transactionIds) || transactionIds.length === 0) {
			throw new Error('Массив ID транзакций обязателен');
		}

		// Выполняем удаления параллельно
		const deletePromises = transactionIds.map(id =>
			axios.delete(`${BASE_URL}/transactions/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': '',
				},
			})
		);

		const responses = await Promise.allSettled(deletePromises);

		// Обрабатываем результаты
		const results = responses.map((result, index) => ({
			id: transactionIds[index],
			success: result.status === 'fulfilled',
			error: result.status === 'rejected' ? result.reason?.response?.data?.message || result.reason.message : null,
		}));

		return results;
	} catch (error) {
		throw new Error(error.response?.data?.message || error.message);
	}
};

export const batchUpdateTransactions = async (updates) => {
	try {
		const token = getToken();

		if (!token) {
			throw new Error('Токен авторизации не найден');
		}

		if (!Array.isArray(updates) || updates.length === 0) {
			throw new Error('Массив обновлений обязателен');
		}

		// Выполняем обновления параллельно
		const updatePromises = updates.map(({ id, data }) =>
			axios.patch(`${BASE_URL}/transactions/${id}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': '',
				},
			})
		);

		const responses = await Promise.allSettled(updatePromises);

		// Обрабатываем результаты
		const results = responses.map((result, index) => ({
			id: updates[index].id,
			success: result.status === 'fulfilled',
			data: result.status === 'fulfilled' ? result.value.data : null,
			error: result.status === 'rejected' ? result.reason?.response?.data?.message || result.reason.message : null,
		}));

		return results;
	} catch (error) {
		throw new Error(error.response?.data?.message || error.message);
	}
};

export const expensesApi = {
	getTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
	batchDeleteTransactions,
	batchUpdateTransactions,
};

export default expensesApi;
