import React from 'react';
import { ExpenseTable } from '../ExpenseTable/ExpenseTable';
import { NewExpense } from '../NewExpense/NewExpense';

export const ExpensesLayout = () => {
	return (
		<>
			<h2>Мои расходы</h2>
			<ExpenseTable />
			<NewExpense />
		</>
	);
};
