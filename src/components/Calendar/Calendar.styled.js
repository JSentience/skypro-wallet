import styled from 'styled-components';

export const ScrollContainer = styled.div`
	max-height: 400px;
	overflow-y: auto;
	padding-right: 32px;
	margin-right: -36px;
	display: flex;
	flex-direction: column;
	gap: 24px;

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 30px;
		margin: 8px 0;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(217, 217, 217, 1);
		border-radius: 30px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: rgba(180, 180, 180, 1);
	}

	/* Для Firefox */
	scrollbar-width: thin;
	scrollbar-color: rgba(217, 217, 217, 1) transparent;

	@media (max-width: 1023px) {
		max-height: 375px;
	}
`;

export const CalendarBlock = styled.div`
	display: grid;
	grid-column: span 4;
	gap: 24px;
	padding: 32px;
	border-radius: 30px;
	box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
	background: rgba(255, 255, 255, 1);
	position: relative;
	overflow: hidden;
	@media (1025px <= width <= 1439px) {
		padding: 25px;
	}

	@media (max-width: 1024px) {
		width: min-content;
	}
	@media (max-width: 1023px) {
		width: auto;
	}
	@media (max-width: 549px) {
		width: 100% !important;
		padding: 20px;
		margin: 0 auto;
		grid-column: unset;
	}
`;

export const CalendarNav = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const CalendarPeriod = styled.p`
	color: rgba(0, 0, 0, 1);
	font-size: 24px;
	font-weight: 700;
	line-height: 29px;
	letter-spacing: 0px;
	text-align: center;
	@media (max-width: 1024px) {
		font-size: 20px;
	}
`;

export const CalendarYearMonth = styled.div`
	display: flex;
	gap: 12px;
`;

export const CalendarButtons = styled.button`
	color: ${(props) =>
		props.$active ? 'rgba(31, 164, 108, 1)' : 'rgba(0, 0, 0, 1)'};
	font-family: Montserrat;
	font-size: 12px;
	font-weight: ${(props) => (props.$active ? '600' : '400')};
	line-height: 150%;
	text-align: center;
	text-decoration: ${(props) => (props.$active ? 'underline' : 'none')};
	background: none;
	border: none;
	cursor: pointer;

	&:hover {
		color: rgba(31, 164, 108, 1);
		font-weight: 600;
	}
`;

export const DaysOfWeek = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const DayOfWeek = styled.div`
	padding: 6px 13px;
	color: rgba(153, 153, 153, 1);
	font-size: 12px;
	font-weight: 400;
	line-height: 15px;
	letter-spacing: 0%;
	text-align: center;
`;

export const Month = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const MonthTitle = styled.h3`
	color: rgba(0, 0, 0, 1);
	font-size: 16px;
	font-weight: 600;
	line-height: 20px;
	letter-spacing: 0px;
	text-align: left;
	@media (max-width: 1024px) {
		font-size: 15px;
	}
`;

export const Days = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 6px;
	width: 100%;
	@media (1025px <= width <= 1439px) {
		gap: 2px;
	}
	@media (max-width: 1023px) {
		gap: 10px;
	}
	@media (max-width: 549px) {
		gap: 6px;
	}
`;

export const Day = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 60px;
	background: rgba(244, 245, 246, 1);
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	&:hover {
		background: rgba(219, 255, 233, 0.8);
	}

	@media (1023px <= width <= 1439px) {
		width: 35px;
		height: 35px;
	}
	@media (max-width: 1022px) {
		width: 50px;
		height: 50px;
	}
	@media (max-width: 549px) {
		width: 35px;
		height: 35px;
	}
`;

// потом сделать через псевдокласс,
// когда будет апи
export const DayChecked = styled(Day)`
	background: rgba(219, 255, 233, 1);
	color: rgba(31, 164, 108, 1);
`;

export const Year = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const YearNumber = styled.div`
	color: rgba(0, 0, 0, 1);
	font-size: 16px;
	font-weight: 600;
	line-height: 20px;
	letter-spacing: 0px;
	text-align: left;
`;

export const YearMonths = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	justify-content: space-between;
`;

export const MonthInYear = styled.div`
	border-radius: 30px;
	background: rgba(244, 245, 246, 1);
	width: 96px;
	height: 34px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 6;
	padding: 6px 0px 6px 0px;

	color: rgba(0, 0, 0, 1);
	font-size: 12px;
	font-weight: 400;
	line-height: 15px;
	letter-spacing: 0%;
	text-align: center;
	cursor: pointer;
`;

// потом сделать через псевдокласс,
// когда будет апи
export const MonthInYearChecked = styled(MonthInYear)`
	background: rgba(219, 255, 233, 1);
	color: rgba(31, 164, 108, 1);
`;

export const MonthScroll = styled.div`
	width: 6px;
	height: 100px;
	border-radius: 30px;
	background: rgba(217, 217, 217, 1);

	position: absolute;
	right: 0;
	top: 195px;
`;

export const YearScroll = styled(MonthScroll)`
	position: absolute;
	right: 0;
	top: 250px;
`;

export const EmptyDay = styled.div`
	width: 40px;
	height: 40px;
	background: transparent;

	@media (max-width: 1024px) {
		width: 35px;
		height: 35px;
	}
`;

export const MonthLine = styled.div`
	margin: 0 -32px;
	padding: 0 32px;
	border-bottom: 0.5px solid rgba(153, 153, 153, 1);
	margin-bottom: 16px;
`;

export const YearLine = styled(MonthLine)``;
