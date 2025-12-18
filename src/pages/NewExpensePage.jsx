import React from 'react';
import { NewExpense } from '../components/NewExpense/NewExpense';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
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

export const NewExpensePage = () => {
	const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
	const navigate = useNavigate();

	if (!isMobile) {
		navigate('/expenses');
		return null;
	}

	return (
		<PageContainer>
			<NewExpense />
		</PageContainer>
	);
};
