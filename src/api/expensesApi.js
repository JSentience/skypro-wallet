import axios from 'axios';
import axiosRetry from 'axios-retry';
import { getToken } from './authApi';

const BASE_URL = '/api';

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

const getAuthHeaders = () => {
	const token = getToken();
	if (!token) {
		throw new Error('Токен авторизации не найден');
	}
	return {
		Authorization: `Bearer ${token}`,
		'Content-Type': '',
	};
};

const buildQueryParams = (filters) => {
	const params = new URLSearchParams();

	if (filters.sortBy) {
		params.append('sortBy', filters.sortBy);
	}

	if (filters.filterBy && filters.filterBy.length > 0) {
		params.append('filterBy', filters.filterBy.join(','));
	}

	return params.toString();
};

export const getTransactions = async (filters = {}) => {
	const headers = getAuthHeaders();
	const queryString = buildQueryParams(filters);
	const url = `${BASE_URL}/transactions${queryString ? `?${queryString}` : ''}`;

	const response = await axios.get(url, { headers });
	return response.data;
};

export const createTransaction = async (transactionData) => {
	const headers = getAuthHeaders();
	const response = await axios.post(
		`${BASE_URL}/transactions`,
		transactionData,
		{ headers },
	);
	return response.data;
};

const validateTransactionId = (transactionId) => {
	if (!transactionId) {
		throw new Error('ID транзакции обязателен');
	}
};

export const updateTransaction = async (transactionId, transactionData) => {
	validateTransactionId(transactionId);
	const headers = getAuthHeaders();

	const response = await axios.patch(
		`${BASE_URL}/transactions/${transactionId}`,
		transactionData,
		{ headers },
	);
	return response.data;
};

export const deleteTransaction = async (transactionId) => {
	validateTransactionId(transactionId);
	const headers = getAuthHeaders();

	const response = await axios.delete(
		`${BASE_URL}/transactions/${transactionId}`,
		{ headers },
	);
	return response.data;
};

const validateTransactionIds = (transactionIds) => {
	if (!Array.isArray(transactionIds) || transactionIds.length === 0) {
		throw new Error('Массив ID транзакций обязателен');
	}
};

const createDeleteRequest = (transactionId, headers) => {
	return axios.delete(`${BASE_URL}/transactions/${transactionId}`, { headers });
};

const formatBatchResult = (result, id) => ({
	id,
	success: result.status === 'fulfilled',
	error:
		result.status === 'rejected'
			? result.reason?.response?.data?.message || result.reason.message
			: null,
});

export const batchDeleteTransactions = async (transactionIds) => {
	validateTransactionIds(transactionIds);
	const headers = getAuthHeaders();

	const deletePromises = transactionIds.map((id) =>
		createDeleteRequest(id, headers),
	);

	const responses = await Promise.allSettled(deletePromises);

	return responses.map((result, index) =>
		formatBatchResult(result, transactionIds[index]),
	);
};

const validateBatchUpdates = (updates) => {
	if (!Array.isArray(updates) || updates.length === 0) {
		throw new Error('Массив обновлений обязателен');
	}
};

const createUpdateRequest = (transactionId, data, headers) => {
	return axios.patch(`${BASE_URL}/transactions/${transactionId}`, data, {
		headers,
	});
};

const formatBatchUpdateResult = (result, updateItem) => ({
	id: updateItem.id,
	success: result.status === 'fulfilled',
	data: result.status === 'fulfilled' ? result.value.data : null,
	error:
		result.status === 'rejected'
			? result.reason?.response?.data?.message || result.reason.message
			: null,
});

export const batchUpdateTransactions = async (updates) => {
	validateBatchUpdates(updates);
	const headers = getAuthHeaders();

	const updatePromises = updates.map(({ id, data }) =>
		createUpdateRequest(id, data, headers),
	);

	const responses = await Promise.allSettled(updatePromises);

	return responses.map((result, index) =>
		formatBatchUpdateResult(result, updates[index]),
	);
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
