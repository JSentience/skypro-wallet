import { useState, useEffect, useRef } from 'react';
import { transactionsAPI } from '../api/postApiForAnalytics';
import { useAuth } from './useAuth';

const CATEGORIES = {
	food: 'Еда',
	transport: 'Транспорт',
	housing: 'Жилье',
	joy: 'Развлечения',
	education: 'Образование',
	other: 'Другое',
};

const groupTransactionsByCategory = (transactions) => {
	console.log('📊 Группируем транзакции:', transactions);

	const initialData = {
		food: 0,
		transport: 0,
		housing: 0,
		joy: 0,
		education: 0,
		other: 0,
		total: 0,
	};

	if (!transactions || !Array.isArray(transactions)) {
		return initialData;
	}

	const result = transactions.reduce(
		(acc, transaction) => {
			const category = transaction.category;
			const amount = transaction.sum || 0;

			console.log(`📊 Обрабатываем транзакцию: ${category} - ${amount} руб`);

			if (acc[category] !== undefined) {
				acc[category] += amount;
			} else {
				acc.other += amount;
			}

			acc.total += amount;

			return acc;
		},
		{ ...initialData },
	);

	return result;
};

export const useExpensesData = (dateRange) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { user } = useAuth();

	const abortControllerRef = useRef(null);

	useEffect(() => {
		console.log('🔁 useExpensesData эффект сработал', {
			start: dateRange.start?.toISOString(),
			end: dateRange.end?.toISOString(),
			hasUser: !!user,
		});

		const fetchData = async () => {
			if (!dateRange.start || !dateRange.end) {
				setData(null);
				return;
			}

			// Отменяем предыдущий запрос
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}

			// Создаем новый AbortController
			abortControllerRef.current = new AbortController();

			console.log('🔄 Начало загрузки данных для периода:', {
				start: dateRange.start.toLocaleDateString('ru-RU'),
				end: dateRange.end.toLocaleDateString('ru-RU'),
			});

			setLoading(true);
			setError(null);

			try {
				const transactions = await transactionsAPI.getTransactionsByPeriod(
					dateRange.start,
					dateRange.end,
					user?.token,
				);

				console.log('📊 Получено транзакций:', transactions?.length || 0);

				const groupedData = groupTransactionsByCategory(transactions || []);
				console.log('📈 Сгруппированные данные:', groupedData);

				setData(groupedData);
			} catch (err) {
				// Игнорируем ошибки отмены запроса
				if (err.name === 'AbortError') {
					console.log('⏹️ Запрос был отменен');
					return;
				}

				console.error('💥 Ошибка при загрузке данных:', err);
				setError(err.message);
				setData(null);
			} finally {
				setLoading(false);
				console.log('🏁 Загрузка завершена');
			}
		};

		const timeoutId = setTimeout(fetchData, 100);

		return () => {
			clearTimeout(timeoutId);
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, [dateRange.start, dateRange.end, user]);

	return { data, loading, error };
};
