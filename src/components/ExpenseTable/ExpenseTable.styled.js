import styled from 'styled-components';
import { breakpoints } from '../../breakpoints';

export const Container = styled.div`
	max-width: 789px;
	height: 618px;
	display: flex;
	flex-direction: column;
	border-radius: 30px;
	box-shadow: 0 20px 67px -12px rgba(0, 0, 0, 0.13);
	background-color: white;
	//margin-top: 32px;
	@media (max-width: ${breakpoints.mobile}) {
		background-color: #fdfdfd;
		max-width: 375px;
		min-height: 24px;
		border-radius: 0;
		box-shadow: none;
		height: auto;
	}
`;

export const AddExpenseButton = styled.button`
	display: flex;
	align-items: center;
	gap: 4px;
	color: #000;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 12px;
	font-style: normal;
	font-weight: 600;
	line-height: 150%; /* 18px */
`;

export const HeaderWrapper = styled.div`
	display: flex;
	padding: 24px 0 0 0;
	gap: 30px;
	align-items: baseline;
`;

export const HeaderContainer = styled.div`
	width: auto;
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	margin-left: 32px;
	@media (max-width: ${breakpoints.mobile}) {
		display: flex;
		max-width: 375px;
		flex-direction: column;
		padding: 0 16px;
		margin-left: 0;
	}
`;

export const Title = styled.h2`
	font-family: 'Montserrat', sans-serif;
	font-size: 24px;
	font-weight: 700;
	line-height: 29px;
	//margin-top: 32px;
	margin-bottom: 32px;
	@media (max-width: ${breakpoints.mobile}) {
		margin-bottom: 21px;
	}
`;

export const ItemsContainer = styled.div`
	display: flex;
	align-items: center;
	@media (max-width: ${breakpoints.mobile}) {
		display: inline-flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 24px;
	}
`;

export const FilterSection = styled.div`
	display: flex;
	align-items: baseline;
	position: relative;
	margin-left: ${(props) => props.$marginleft};
	margin-right: ${(props) => props.$marginright};

	@media (max-width: ${breakpoints.mobile}) {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-left: 0;
		margin-right: 0;
	}
`;

export const FilterText = styled.p`
	font-size: 12px;
	font-weight: 400;
	line-height: 150%;
	@media (max-width: ${breakpoints.mobile}) {
		font-size: 10px;
	}
`;

export const FilterButton = styled.button`
	display: flex;
	align-items: baseline;
	cursor: pointer;
	border: none;
	background: none;
	padding: 0;

	@media (max-width: ${breakpoints.mobile}) {
		display: inline-flex;
		//padding: 7px 5px;
		align-items: center;
		gap: 6px;
	}
`;

export const FilterValue = styled.div`
	color: #1fa46c;
	font-family: 'Montserrat', sans-serif;
	font-size: 12px;
	font-weight: 600;
	line-height: 150%;
	text-align: center;
	border-bottom: 0.5px solid #1fa46c;
	margin-left: ${(props) => props.$marginleft || '6.5px'};
	@media (max-width: ${breakpoints.mobile}) {
		font-size: 10px;
		border-bottom: none;
		margin-left: 0;
	}
`;

export const FilterIcon = styled.img`
	height: 7px;
	width: 7px;
	margin-left: 8px;
	@media (max-width: ${breakpoints.mobile}) {
		width: 6px;
		height: 6px;
		margin-left: 0;
	}
`;

export const TableHeader = styled.div`
	font-family: 'Montserrat', sans-serif;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: 0;
	display: grid;
	grid-template-columns: 173px 173px 173px 173px 32px;
	align-items: center;
	padding: 0 32px 0 32px;
	color: #999999;
	@media (max-width: ${breakpoints.mobile}) {
		display: grid;
		grid-template-columns: 74px 74px 74px 74px;
		padding: 0 16px;
		column-gap: 16px;
	}
`;

export const HeaderItem = styled.div`
	font-size: 12px;
	@media (max-width: ${breakpoints.mobile}) {
		font-size: 10px;
	}
`;

export const Divider = styled.div`
	max-width: 789px;
	height: 0;
	border-top: 0.5px solid #999999;
	margin-top: 5.75px;
	@media (max-width: ${breakpoints.mobile}) {
		width: 100%;
	}
`;

export const TableContent = styled.div`
	width: 789px;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 14px;
	padding: 18px 8px 16px 0;
	overflow-y: auto;
	overflow-x: hidden;
	@media (max-width: ${breakpoints.mobile}) {
		max-width: 375px;
		width: 100%;
	}

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 3px;
		margin: 5px 0;
	}

	&::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 3px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: #a8a8a8;
	}
`;

export const ButtonWrapper = styled.div`
	background: #ffffff;
	box-shadow: 0 -20px 67px -12px rgba(0, 0, 0, 0.13);
	position: fixed;
	bottom: 0;
	display: flex;
	width: 375px;
	padding: 24px 16px;
	gap: 12px;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-size: 12px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;

export const DeleteExpenseButton = styled.a`
	color: #999;
	text-align: center;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%; /* 18px */
	cursor: pointer;
	text-decoration: underline;
`;

export const TableRow = styled.div`
	font-weight: 400;
	line-height: 150%;
	letter-spacing: 0;
	display: grid;
	grid-template-columns: 173px 173px 173px 173px 32px;
	align-items: center;
	padding: 0 32px 0 32px;
	cursor: pointer;
	@media (max-width: ${breakpoints.mobile}) {
		display: grid;
		grid-template-columns: 74px 74px 74px 74px;
		padding: 0 16px;
		column-gap: 16px;
		background-color: ${(props) =>
			props.$isSelected ? '#e8f5f0' : 'transparent'};
		border-radius: 8px;
		transition: background-color 0.2s ease;
	}
`;

export const RowItem = styled.div`
	font-size: 12px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	@media (max-width: ${breakpoints.mobile}) {
		font-size: 10px;
	}
`;

export const ActionsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 12px;
	@media (max-width: ${breakpoints.mobile}) {
		display: none;
	}
`;

export const ActionIcon = styled.img`
	width: 12px;
	height: 12px;
	cursor: pointer;
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

export const RetryButton = styled.button`
	background: #007bff;
	color: white;
	border: none;
	padding: 10px 20px;
	border-radius: 4px;
	cursor: pointer;
	margin: 10px auto;
	display: block;

	&:hover {
		background: #0056b3;
	}
`;

export const EmptyState = styled.div`
	text-align: center;
	padding: 40px;
`;

export const EmptyText = styled.p`
	color: #666;
	font-size: 16px;
	margin: 0;
`;
