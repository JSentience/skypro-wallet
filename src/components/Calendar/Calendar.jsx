import * as S from './Calendar.styled';
import { useRef, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

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

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => {
	const day = new Date(year, month, 1).getDay();
	return day === 0 ? 6 : day - 1;
};

const generateMonthData = (year, month) => {
	const daysInMonth = getDaysInMonth(year, month);
	const firstDay = getFirstDayOfMonth(year, month);

	const days = [];

	for (let i = 0; i < firstDay; i++) {
		days.push({ day: null, isEmpty: true });
	}

	for (let i = 1; i <= daysInMonth; i++) {
		const date = new Date(year, month, i);
		days.push({
			day: i,
			date: date,
			isEmpty: false,
		});
	}

	return days;
};

export const Calendar = ({ selectedRange, onSelectionChange }) => {
	const isMobile = useMediaQuery('(max-width: 480px)');

	const [viewMode, setViewMode] = useState('month');

	const handleViewModeChange = (newViewMode) => {
		setViewMode(newViewMode);
	};

	const handleSelectionChange = (newSelection) => {
		// Вызываем функцию из пропсов вместо setSelectedRange
		onSelectionChange(newSelection);
	};

	return (
		<S.CalendarBlock>
			<S.CalendarNav>
				<S.CalendarPeriod>
					{isMobile ? 'Выбор периода' : 'Период'}
				</S.CalendarPeriod>
				<S.CalendarYearMonth>
					<S.CalendarButtons
						$active={viewMode === 'month'}
						onClick={() => handleViewModeChange('month')}
					>
						Месяц
					</S.CalendarButtons>
					<S.CalendarButtons
						$active={viewMode === 'year'}
						onClick={() => handleViewModeChange('year')}
					>
						Год
					</S.CalendarButtons>
				</S.CalendarYearMonth>
			</S.CalendarNav>

			{viewMode === 'year' && <S.YearLine />}

			{viewMode === 'month' ? (
				<MonthView
					selection={selectedRange}
					onSelectionChange={handleSelectionChange}
				/>
			) : (
				<YearView
					selection={selectedRange}
					onSelectionChange={handleSelectionChange}
				/>
			)}
		</S.CalendarBlock>
	);
};

const MonthView = ({ selection, onSelectionChange }) => {
	const [visibleMonths, setVisibleMonths] = useState([-1, 0, 1, 2]);
	const scrollContainerRef = useRef(null);
	const currentDate = new Date();

	const handleDateClick = (date) => {
		if (!date) return;

		if (!selection.start || (selection.start && selection.end)) {
			onSelectionChange({ start: date, end: null });
		} else {
			const newStart = date < selection.start ? date : selection.start;
			const newEnd = date < selection.start ? selection.start : date;
			onSelectionChange({ start: newStart, end: newEnd });
		}
	};

	const loadMoreMonths = (direction) => {
		if (direction === 'up') {
			const firstIndex = visibleMonths[0];
			setVisibleMonths((prev) => [firstIndex - 2, firstIndex - 1, ...prev]);
		} else {
			const lastIndex = visibleMonths[visibleMonths.length - 1];
			setVisibleMonths((prev) => [...prev, lastIndex + 1, lastIndex + 2]);
		}
	};

	const handleScroll = (e) => {
		const { scrollTop, scrollHeight, clientHeight } = e.target;

		if (scrollHeight - scrollTop <= clientHeight + 50) {
			loadMoreMonths('down');
		}

		if (scrollTop <= 50 && visibleMonths[0] > -24) {
			loadMoreMonths('up');
		}
	};

	return (
		<>
			<S.DaysOfWeek>
				{DAYS_OF_WEEK.map((day) => (
					<S.DayOfWeek key={day}>{day}</S.DayOfWeek>
				))}
			</S.DaysOfWeek>
			<S.MonthLine />

			<S.ScrollContainer ref={scrollContainerRef} onScroll={handleScroll}>
				{visibleMonths.map((monthOffset) => {
					const targetDate = new Date(currentDate);
					targetDate.setMonth(targetDate.getMonth() + monthOffset);

					const year = targetDate.getFullYear();
					const month = targetDate.getMonth();

					// Создаем уникальный ключ с offset
					const uniqueKey = `month-${monthOffset}-${year}-${month}`;
					const monthData = generateMonthData(year, month);

					return (
						<S.Month key={uniqueKey}>
							<S.MonthTitle>
								{MONTHS[month]} {year}
							</S.MonthTitle>
							<S.Days>
								{monthData.map((dayData, index) => {
									if (dayData.isEmpty) {
										return <S.EmptyDay key={`${uniqueKey}-empty-${index}`} />;
									}

									const isSelected =
										selection.start && selection.end
											? dayData.date >= selection.start &&
												dayData.date <= selection.end
											: selection.start &&
												dayData.date.getTime() === selection.start.getTime();

									const DayComponent = isSelected ? S.DayChecked : S.Day;

									return (
										<DayComponent
											key={`${uniqueKey}-day-${dayData.day}`}
											onClick={() => handleDateClick(dayData.date)}
										>
											{dayData.day}
										</DayComponent>
									);
								})}
							</S.Days>
						</S.Month>
					);
				})}
			</S.ScrollContainer>
		</>
	);
};

const YearView = ({ selection, onSelectionChange }) => {
	const [visibleYears, setVisibleYears] = useState([-1, 0, 1, 2]);
	const currentDate = new Date();

	const handleMonthClick = (year, monthIndex) => {
		const monthStart = new Date(year, monthIndex, 1);
		const monthEnd = new Date(year, monthIndex + 1, 0);

		if (!selection.start || (selection.start && selection.end)) {
			onSelectionChange({ start: monthStart, end: null });
		} else {
			const newStart =
				monthStart < selection.start ? monthStart : selection.start;
			const newEnd =
				monthStart < selection.start
					? new Date(
							selection.start.getFullYear(),
							selection.start.getMonth() + 1,
							0,
						)
					: monthEnd;
			onSelectionChange({ start: newStart, end: newEnd });
		}
	};

	const loadMoreYears = (direction) => {
		if (direction === 'up') {
			const firstIndex = visibleYears[0];
			setVisibleYears((prev) => [firstIndex - 1, ...prev]);
		} else {
			const lastIndex = visibleYears[visibleYears.length - 1];
			setVisibleYears((prev) => [...prev, lastIndex + 1]);
		}
	};

	const handleScroll = (e) => {
		const { scrollTop, scrollHeight, clientHeight } = e.target;

		if (scrollHeight - scrollTop <= clientHeight + 50) {
			loadMoreYears('down');
		}

		if (scrollTop <= 50) {
			loadMoreYears('up');
		}
	};

	return (
		<S.ScrollContainer onScroll={handleScroll}>
			{visibleYears.map((yearOffset) => {
				const year = currentDate.getFullYear() + yearOffset;

				// Создаем уникальный ключ с offset
				const uniqueKey = `year-${yearOffset}-${year}`;

				return (
					<S.Year key={uniqueKey}>
						<S.YearNumber>{year}</S.YearNumber>
						<S.YearMonths>
							{MONTHS.map((month, monthIndex) => {
								const monthStart = new Date(year, monthIndex, 1);
								const isSelected =
									selection.start && selection.end
										? monthStart >= selection.start &&
											monthStart <= selection.end
										: selection.start &&
											selection.start.getMonth() === monthIndex &&
											selection.start.getFullYear() === year;

								const MonthComponent = isSelected
									? S.MonthInYearChecked
									: S.MonthInYear;

								return (
									<MonthComponent
										key={`${uniqueKey}-${monthIndex}`}
										onClick={() => handleMonthClick(year, monthIndex)}
									>
										{month}
									</MonthComponent>
								);
							})}
						</S.YearMonths>
					</S.Year>
				);
			})}
		</S.ScrollContainer>
	);
};
