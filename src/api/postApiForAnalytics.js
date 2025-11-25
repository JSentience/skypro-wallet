const API_BASE_URL = 'http://wedev-api.sky.pro/api';

const formatDateForAPI = (date) => {
	if (!date) return '';

	const dateObj = new Date(date);
	if (isNaN(dateObj.getTime())) return '';

	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, '0');
	const day = String(dateObj.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

export const transactionsAPI = {
	getTransactionsByPeriod: async (startDate, endDate, authToken) => {
		try {
			const requestBody = {
				start: formatDateForAPI(startDate),
				end: formatDateForAPI(endDate),
			};

			const headers = {
				'Content-Type': '',
			};

			const token = authToken || localStorage.getItem('walletToken');

			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}

			const response = await fetch(`${API_BASE_URL}/transactions/period`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				let errorMessage = `HTTP error! status: ${response.status}`;
				try {
					const errorData = await response.json();
					errorMessage = errorData.error || errorData.message || errorMessage;
				} catch (e) {}
				throw new Error(errorMessage);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
};
