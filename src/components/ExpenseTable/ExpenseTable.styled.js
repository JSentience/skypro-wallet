import styled from 'styled-components';
import { breakpoints } from '../../breakpoints';

export const Container = styled.div`
	width: 789px;
	height: 618px;
	display: flex;
	flex-direction: column;
	border-radius: 30px;
	box-shadow: 0 20px 67px -12px rgba(0, 0, 0, 0.13);
	background-color: white;
	margin-top: 32px;
	@media (max-width: ${breakpoints.mobile}) {
		width: 480px;
		background-color: #fff;
		min-height: 24px;
		border-radius: 0;
		box-shadow: none;
	}
`;

export const HeaderWrapper = styled.div``;

export const HeaderContainer = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	margin-left: 32px;
	@media (max-width: ${breakpoints.mobile}) {
		display: flex;
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
	margin-top: 32px;
	margin-bottom: 32px;
	@media (max-width: ${breakpoints.mobile}) {
		margin-bottom: 21px;
	}
`;

export const ItemsContainer = styled.div`
	display: flex;
	align-items: center;
	@media (max-width: ${breakpoints.mobile}) {
		margin-bottom: 24px;
	}
`;

export const FilterSection = styled.div`
	display: flex;
	align-items: baseline;
	position: relative;
	margin-left: ${(props) => props.$marginleft};
	margin-right: ${(props) => props.$marginright};
`;

export const FilterText = styled.div`
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
	}
`;

export const FilterIcon = styled.img`
	height: 7px;
	width: 7px;
	margin-left: 8px;
	@media (max-width: ${breakpoints.mobile}) {
		margin-left: 6px;
	}
`;

export const TableHeader = styled.div`
	font-family: 'Montserrat', sans-serif;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: 0;
	width: 723px;
	height: 15px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-left: 32px;
	padding-right: 69px;
	color: #999999;
	@media (max-width: ${breakpoints.mobile}) {
		width: 480px;
		padding: 0 16px;
		margin-left: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}
`;

export const HeaderItem = styled.div`
	font-size: 12px;
	width: 141px;
	height: 15px;
	margin-left: ${(props) => props.$marginleft || '0px'};
	padding-left: ${(props) => props.$paddingleft};
	padding-right: ${(props) => props.$paddingright};
	@media (max-width: ${breakpoints.mobile}) {
		width: 74px;
		height: 12px;
	}
`;

export const Divider = styled.div`
	width: 789px;
	height: 0;
	border-top: 0.5px solid #999999;
	margin-top: 5.75px;
	@media (max-width: ${breakpoints.mobile}) {
		width: 480px;
	}
`;

export const TableContent = styled.div`
	width: 789px;
	height: 479px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 14px;
	padding: 18.25px 6px 0 0;
	overflow-y: auto;
	overflow-x: hidden;
	@media (max-width: ${breakpoints.mobile}) {
		width: 480px;
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

export const TableRow = styled.div`
	font-weight: 400;
	line-height: 150%;
	letter-spacing: 0;
	width: 723px;
	height: 15px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-left: 32px;
	cursor: pointer;
	margin-left: ${(props) => props.$marginleft};
	@media (max-width: ${breakpoints.mobile}) {
		width: 480px;
		display: flex;
		margin-left: 0px;
	}
`;

export const RowItem = styled.div`
	font-size: 12px;
	width: 141px;
	height: 15px;
	margin-left: ${(props) => props.$marginleft || '0px'};
	@media (max-width: ${breakpoints.mobile}) {
		font-size: 10px;
		width: 71px;
	}
`;

export const ActionsContainer = styled.div`
	display: flex;
	width: 36px;
	height: 12px;
	margin-left: 32px;
	@media (max-width: ${breakpoints.mobile}) {
		display: none;
	}
`;

export const ActionIcon = styled.img`
	width: 12px;
	height: 12px;
	margin-right: ${(props) => props.$marginright || '0px'};
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
