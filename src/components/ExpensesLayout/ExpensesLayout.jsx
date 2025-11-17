import { useState } from 'react';
import { ExpenseTable } from '../ExpenseTable/ExpenseTable';
import { NewExpense } from '../NewExpense/NewExpense';
import * as S from './ExpensesLayout.styled';

export const ExpensesLayout = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [editingExpense, setEditingExpense] = useState(null);

	const handleEdit = (expense) => {
		setIsEditing(true);
		setEditingExpense(expense);
	};

	const handleSave = () => {
		setIsEditing(false);
		setEditingExpense(null);
	};
	return (
		<div>
			<S.PageTitle>Мои расходы</S.PageTitle>
			<S.MainContent>
				<ExpenseTable onEdit={handleEdit} />
				<NewExpense
					isEditing={isEditing}
					editingExpense={editingExpense}
					onSave={handleSave}
				/>
			</S.MainContent>
		</div>
	);
};
