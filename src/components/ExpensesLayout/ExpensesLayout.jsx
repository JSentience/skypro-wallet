import { useState, useEffect, useCallback, useMemo } from 'react';
import { ExpenseTable } from '../ExpenseTable/ExpenseTable';
import { NewExpense } from '../NewExpense/NewExpense';
import { getTransactions } from '../../api/expensesApi';
import * as S from './ExpensesLayout.styled';

export const ExpensesLayout = () => {
	const [transactions, setTransactions] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editingExpense, setEditingExpense] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Состояния для фильтров
	const [filters, setFilters] = useState({
		sortBy: null,
		filterBy: [],
	});

	// Мемоизация параметров для API
	const apiFilters = useMemo(() => {
		const result = {};
		if (filters.sortBy) {
			result.sortBy = filters.sortBy;
		}
		if (filters.filterBy && filters.filterBy.length > 0) {
			result.filterBy = filters.filterBy;
		}
		return result;
	}, [filters.sortBy, filters.filterBy]);

	// Используем useCallback для стабильной ссылки на функцию
	const fetchTransactions = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const data = await getTransactions(apiFilters);
			setTransactions(Array.isArray(data) ? data : []);
		} catch {
			setError('Не удалось загрузить транзакции');
			setTransactions([]);
		} finally {
			setLoading(false);
		}
	}, [apiFilters]);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	const handleEdit = useCallback((expense) => {
		setIsEditing(true);
		setEditingExpense(expense);
	}, []);

	const handleSave = useCallback(async () => {
		await fetchTransactions();
		setIsEditing(false);
		setEditingExpense(null);
	}, [fetchTransactions]);

	const handleTransactionUpdate = useCallback(async () => {
		await fetchTransactions();
	}, [fetchTransactions]);

	const handleFiltersChange = useCallback((newFilters) => {
		setFilters(newFilters);
	}, []);

	if (loading) {
		return (
			<div>
				<S.PageTitle>Мои расходы</S.PageTitle>
				<S.LoadingText>Загрузка транзакций...</S.LoadingText>
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<S.PageTitle>Мои расходы</S.PageTitle>
				<S.ErrorText>{error}</S.ErrorText>
			</div>
		);
	}

	return (
		<div>
			<S.PageTitle>Мои расходы</S.PageTitle>
			<S.MainContent>
				<ExpenseTable
					transactions={transactions}
					onEdit={handleEdit}
					onTransactionUpdate={handleTransactionUpdate}
					filters={filters}
					onFiltersChange={handleFiltersChange}
				/>
				<NewExpense
					isEditing={isEditing}
					editingExpense={editingExpense}
					onSave={handleSave}
				/>
			</S.MainContent>
		</div>
	);
};
