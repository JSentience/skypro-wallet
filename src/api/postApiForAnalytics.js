import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE_URL = '/api';

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

const formatDateForAPI = (date) => {
	if (!date) return '';

	const dateObj = new Date(date);
	if (isNaN(dateObj.getTime())) return '';

	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, '0');
	const day = String(dateObj.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

const buildPeriodRequestBody = (startDate, endDate) => ({
	start: formatDateForAPI(startDate),
	end: formatDateForAPI(endDate),
});

const getAuthTokenFromStorage = (providedToken) => {
	return providedToken || localStorage.getItem('walletToken');
};

const buildRequestConfig = (token) => {
	const config = {
		headers: {
			'Content-Type': '',
		},
	};

	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
};

const getTransactionsByPeriod = async (startDate, endDate, authToken) => {
	const requestBody = buildPeriodRequestBody(startDate, endDate);
	const token = getAuthTokenFromStorage(authToken);
	const config = buildRequestConfig(token);

	const response = await axios.post(
		`${API_BASE_URL}/transactions/period`,
		requestBody,
		config,
	);

	return response.data;
};

export const transactionsAPI = {
	getTransactionsByPeriod,
};
