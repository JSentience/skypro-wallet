import * as S from './Calendar.styled';
import { useState } from 'react';

const DAYS_OF_WEEK = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const MONTHS = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];

const generateNumbers = (count, startFrom = 1) => {
	return Array.from({ length: count }, (_, i) => i + startFrom);
};

export const Calendar = () => {
	const [viewMode, setViewMode] = useState('month');

	return (
		<S.CalendarBlock>
			<S.CalendarNav>
				<S.CalendarPeriod>Период</S.CalendarPeriod>
				<S.CalendarYearMonth>
					<S.CalendarButtons
						$active={viewMode === 'month'}
						onClick={() => setViewMode('month')}
					>
						Месяц
					</S.CalendarButtons>
					<S.CalendarButtons
						$active={viewMode === 'year'}
						onClick={() => setViewMode('year')}
					>
						Год
					</S.CalendarButtons>
				</S.CalendarYearMonth>
			</S.CalendarNav>

			{viewMode === 'year' && <S.YearLine />}

			{viewMode === 'month' ? <S.MonthScroll /> : <S.YearScroll />}

			{viewMode === 'month' ? <MonthView /> : <YearView />}
		</S.CalendarBlock>
	);
};

const MonthView = () => (
	<>
		<S.DaysOfWeek>
			{DAYS_OF_WEEK.map((day) => (
				<S.DayOfWeek key={day}>{day}</S.DayOfWeek>
			))}
		</S.DaysOfWeek>
		<S.MonthLine />
		<S.Month>
			<S.MonthTitle>Июль 2024</S.MonthTitle>
			<S.Days>
				{generateNumbers(31).map((day) =>
					day === 10 ? (
						<S.DayChecked key={day}>{day}</S.DayChecked>
					) : (
						<S.Day key={day}>{day}</S.Day>
					),
				)}
			</S.Days>
		</S.Month>
		<S.Month>
			<S.MonthTitle>Август 2024</S.MonthTitle>
			<S.Days>
				<S.Day style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}></S.Day>
				<S.Day style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}></S.Day>
				<S.Day style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}></S.Day>
				{generateNumbers(11).map((day) => (
					<S.Day key={day}>{day}</S.Day>
				))}
			</S.Days>
		</S.Month>
	</>
);

const YearView = () => (
	<>
		<S.Year>
			<S.YearMonths>
				<S.MonthInYearChecked>Октябрь</S.MonthInYearChecked>
				<S.MonthInYearChecked>Ноябрь</S.MonthInYearChecked>
				<S.MonthInYearChecked>Декабрь</S.MonthInYearChecked>
			</S.YearMonths>
		</S.Year>
		<S.Year>
			<S.YearNumber>2025</S.YearNumber>
			<S.YearMonths>
				{MONTHS.map((month) => (
					<S.MonthInYear key={month}>{month}</S.MonthInYear>
				))}
				{/* <MonthInYearChecked>Январь</MonthInYearChecked>
				 */}
			</S.YearMonths>
		</S.Year>
		<S.Year>
			<S.YearNumber>2026</S.YearNumber>
			<S.YearMonths>
				{MONTHS.map((month) => (
					<S.MonthInYear key={month}>{month}</S.MonthInYear>
				))}
			</S.YearMonths>
		</S.Year>
	</>
);
