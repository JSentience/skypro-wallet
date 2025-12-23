import React from 'react';
import { NewExpense } from '../components/NewExpense/NewExpense';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';
import { breakpoints } from '../breakpoints';
import styled from 'styled-components';

const PageContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	background-color: #f4f5f6;

	@media (max-width: ${breakpoints.mobile}) {
		background-color: #ffffff;
	}
`;

export const EditExpensePage = () => {
	const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
	const navigate = useNavigate();
	const location = useLocation();
	const editingExpense = location.state?.expense;

	// Если не мобильная версия или нет данных о расходе, редирект на страницу расходов
	if (!isMobile || !editingExpense) {
		navigate('/expenses');
		return null;
	}

	const handleSave = () => {
		// После сохранения возвращаемся на страницу расходов
		// Контекст уже обновлен, GET запрос не нужен
		navigate('/expenses');
	};

	return (
		<PageContainer>
			<NewExpense
				isEditing={true}
				editingExpense={editingExpense}
				onSave={handleSave}
			/>
		</PageContainer>
	);
};
