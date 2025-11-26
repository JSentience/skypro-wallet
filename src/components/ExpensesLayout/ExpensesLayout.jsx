import { useState, useEffect } from 'react';
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

	// Загрузка транзакций при монтировании компонента
	useEffect(() => {
		fetchTransactions();
	}, []);

	const fetchTransactions = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await getTransactions();
			// Убедимся что data - массив
			setTransactions(Array.isArray(data) ? data : []);
		} catch (err) {
			console.error('Ошибка загрузки транзакций:', err);
			setError('Не удалось загрузить транзакции');
			setTransactions([]);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (expense) => {
		setIsEditing(true);
		setEditingExpense(expense);
	};

	const handleSave = async (responseData) => {
		try {
			console.log('Ответ от API при сохранении:', responseData);

			// Всегда перезагружаем список транзакций после сохранения
			await fetchTransactions();

			setIsEditing(false);
			setEditingExpense(null);
		} catch (err) {
			console.error('Ошибка при обновлении списка:', err);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditingExpense(null);
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
				<ExpenseTable transactions={transactions} onEdit={handleEdit} />
				<NewExpense
					isEditing={isEditing}
					editingExpense={editingExpense}
					onSave={handleSave}
					onCancel={handleCancel}
				/>
			</S.MainContent>
		</div>
	);
};
