import styled from 'styled-components';

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background-color: #f8f9fa;
`;

export const PageTitle = styled.h1`
	color: #000000;
	font-family: 'Montserrat', sans-serif;
	font-size: 30px;
	font-weight: 700;
	line-height: 150%;
	text-align: left;
	margin-top: 36px;
`;

export const MainContent = styled.main`
	display: flex;
	align-items: center;
	gap: 34px;
`;

export const LoadingText = styled.div`
	text-align: center;
	padding: 40px;
	font-size: 16px;
	color: #666;
`;

export const ErrorText = styled.div`
	text-align: center;
	padding: 20px;
	color: #ff4444;
	font-size: 16px;
`;
