import React from 'react';
import { NewExpense } from '../components/NewExpense/NewExpense';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { breakpoints } from '../breakpoints';

export const NewExpensePage = () => {
	const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
	const navigate = useNavigate();

	if (!isMobile) {
		navigate('/expenses');
		return null;
	}

	return (
		<div>
			<NewExpense />
		</div>
	);
};
