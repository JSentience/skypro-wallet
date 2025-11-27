import { useState, useEffect, useCallback } from 'react';
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

	// Используем useCallback для стабильной ссылки на функцию
	const fetchTransactions = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			// Подготавливаем параметры для API
			const apiFilters = {};

			if (filters.sortBy) {
				apiFilters.sortBy = filters.sortBy;
			}

			if (filters.filterBy && filters.filterBy.length > 0) {
				apiFilters.filterBy = filters.filterBy;
			}

			const data = await getTransactions(apiFilters);
			setTransactions(Array.isArray(data) ? data : []);
		} catch {
			setError('Не удалось загрузить транзакции');
			setTransactions([]);
		} finally {
			setLoading(false);
		}
	}, [filters]);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	const handleEdit = (expense) => {
		setIsEditing(true);
		setEditingExpense(expense);
	};

	const handleSave = async () => {
		await fetchTransactions();

		setIsEditing(false);
		setEditingExpense(null);
	};

	const handleTransactionUpdate = async () => {
		await fetchTransactions();
	};

	const handleFiltersChange = (newFilters) => {
		setFilters(newFilters);
	};

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
