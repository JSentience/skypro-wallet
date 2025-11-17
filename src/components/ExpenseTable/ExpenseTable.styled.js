import styled from 'styled-components';

export const Container = styled.div`
	width: 789px;
	height: 618px;
	display: flex;
	flex-direction: column;
	border-radius: 30px;
	box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
	background-color: white;
	margin-top: 32px;
`;

export const HeaderWrapper = styled.div``;

export const HeaderContainer = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	margin-left: 32px;
`;

export const Title = styled.h2`
	font-family: 'Montserrat', sans-serif;
	font-size: 24px;
	font-weight: 700;
	line-height: 29px;
	text-align: center;
	margin-top: 32px;
	margin-bottom: 32px;
`;

export const ItemsContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const FilterSection = styled.div`
	display: flex;
	align-items: baseline;
	position: relative;
	margin-left: ${(props) => props.marginleft || '0px'};
	margin-right: ${(props) => props.marginright || '0px'};
`;

export const FilterText = styled.div`
	font-size: 12px;
	font-weight: 400;
	line-height: 150%;
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
	margin-left: ${(props) => props.marginleft || '6.5px'};
`;

export const FilterIcon = styled.img`
	height: 7px;
	width: 7px;
	margin-left: 8px;
`;

export const TableHeader = styled.div`
	font-family: 'Montserrat', sans-serif;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: 0px;
	width: 723px;
	height: 15px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-left: 32px;
	padding-right: 69px;
	color: #999;
`;

export const HeaderItem = styled.div`
	font-size: 12px;
	width: 141px;
	height: 15px;
	margin-left: ${(props) => props.marginleft || '0px'};
`;

export const Divider = styled.div`
	width: 789px;
	height: 0;
	border-top: 0.5px solid #a0a0a0;
	margin-top: 5.75px;
`;

export const TableContent = styled.div`
	width: 723px;
	height: 479px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 14px;
	padding-top: 18.25px;
`;

export const TableRow = styled.div`
	font-weight: 400;
	line-height: 150%;
	letter-spacing: 0px;
	width: 723px;
	height: 15px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-left: 32px;
`;

export const RowItem = styled.div`
	font-size: 12px;
	width: 141px;
	height: 15px;
	margin-left: ${(props) => props.marginleft || '0px'};
`;

export const ActionsContainer = styled.div`
	display: flex;
	width: 36px;
	height: 12px;
	margin-left: 32px;
`;

export const ActionIcon = styled.img`
	width: 12px;
	height: 12px;
	margin-right: ${(props) => props.marginright || '0px'};
`;
