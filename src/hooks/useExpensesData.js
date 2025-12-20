import { useEffect, useRef, useState } from 'react';
import { transactionsAPI } from '../api/postApiForAnalytics';
import { useAuth } from './useAuth';

const createEmptyCategoryData = () => ({
	food: 0,
	transport: 0,
	housing: 0,
	joy: 0,
	education: 0,
	other: 0,
	total: 0,
});

const addTransactionToCategory = (acc, transaction) => {
	const category = transaction.category;
	const amount = transaction.sum || 0;

	if (acc[category] !== undefined) {
		acc[category] += amount;
	} else {
		acc.other += amount;
	}

	acc.total += amount;

	return acc;
};

const groupTransactionsByCategory = (transactions) => {
	if (!transactions || !Array.isArray(transactions)) {
		return createEmptyCategoryData();
	}

	return transactions.reduce(
		addTransactionToCategory,
		createEmptyCategoryData(),
	);
};

const isAbortError = (error) => error.name === 'AbortError';

const shouldFetchData = (dateRange) => dateRange.start && dateRange.end;

export const useExpensesData = (dateRange) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { user } = useAuth();

	const abortControllerRef = useRef(null);

	useEffect(() => {
		const cancelPreviousRequest = () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};

		const fetchTransactionsData = async () => {
			if (!shouldFetchData(dateRange)) {
				setData(null);
				return;
			}

			cancelPreviousRequest();
			abortControllerRef.current = new AbortController();

			setLoading(true);
			setError(null);

			try {
				const transactions = await transactionsAPI.getTransactionsByPeriod(
					dateRange.start,
					dateRange.end,
					user?.token,
				);

				const groupedData = groupTransactionsByCategory(transactions || []);
				setData(groupedData);
			} catch (err) {
				if (isAbortError(err)) {
					return;
				}

				setError(err.message);
				setData(null);
			} finally {
				setLoading(false);
			}
		};

		const timeoutId = setTimeout(fetchTransactionsData, 100);

		return () => {
			clearTimeout(timeoutId);
			cancelPreviousRequest();
		};
	}, [dateRange.start, dateRange.end, user]);

	return { data, loading, error };
};
