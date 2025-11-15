import React from 'react';
import { ExpenseTable } from '../ExpenseTable/ExpenseTable';
import { NewExpense } from '../NewExpense/NewExpense';

export const ExpensesLayout = () => {
	return (
		<>
			<h3>Мои расходы</h3>
			<ExpenseTable />
			<NewExpense />
		</>
	);
};
