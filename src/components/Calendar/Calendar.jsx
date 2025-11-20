import {
	CalendarBlock,
	CalendarNav,
	CalendarPeriod,
	CalendarYearMonth,
	CalendarButtons,
	DaysOfWeek,
	DayOfWeek,
	Month,
	MonthTitle,
	Days,
	Day,
	DayChecked,
	MonthLine,
	YearLine,
	Year,
	YearNumber,
	YearMonths,
	MonthInYear,
	MonthInYearChecked,
	MonthScroll,
	YearScroll,
} from './Calendar.styled';
import { useState } from 'react';

export const Calendar = () => {
	const [viewMode, setViewMode] = useState('month');

	return (
		<CalendarBlock>
			<CalendarNav>
				<CalendarPeriod>Период</CalendarPeriod>
				<CalendarYearMonth>
					<CalendarButtons
						$active={viewMode === 'month'}
						onClick={() => setViewMode('month')}
					>
						Месяц
					</CalendarButtons>
					<CalendarButtons
						$active={viewMode === 'year'}
						onClick={() => setViewMode('year')}
					>
						Год
					</CalendarButtons>
				</CalendarYearMonth>
			</CalendarNav>

			{viewMode === 'year' && <YearLine />}

			{viewMode === 'month' ? <MonthScroll /> : <YearScroll />}

			{viewMode === 'month' ? <MonthView /> : <YearView />}
		</CalendarBlock>
	);
};

const MonthView = () => (
	<>
		<DaysOfWeek>
			<DayOfWeek>пн</DayOfWeek>
			<DayOfWeek>вт</DayOfWeek>
			<DayOfWeek>ср</DayOfWeek>
			<DayOfWeek>чт</DayOfWeek>
			<DayOfWeek>пт</DayOfWeek>
			<DayOfWeek>сб</DayOfWeek>
			<DayOfWeek>вс</DayOfWeek>
		</DaysOfWeek>
		<MonthLine />
		<Month>
			<MonthTitle>Июль 2024</MonthTitle>
			<Days>
				<Day>1</Day>
				<Day>2</Day>
				<Day>3</Day>
				<Day>4</Day>
				<Day>5</Day>
				<Day>6</Day>
				<Day>7</Day>
				<Day>8</Day>
				<Day>9</Day>
				<DayChecked>10</DayChecked>
				<Day>11</Day>
				<Day>12</Day>
				<Day>13</Day>
				<Day>14</Day>
				<Day>15</Day>
				<Day>16</Day>
				<Day>17</Day>
				<Day>18</Day>
				<Day>19</Day>
				<Day>20</Day>
				<Day>21</Day>
				<Day>22</Day>
				<Day>23</Day>
				<Day>24</Day>
				<Day>25</Day>
				<Day>26</Day>
				<Day>27</Day>
				<Day>28</Day>
				<Day>29</Day>
				<Day>30</Day>
				<Day>31</Day>
			</Days>
		</Month>
		<Month>
			<MonthTitle>Август 2024</MonthTitle>
			<Days>
				<Day style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}></Day>
				<Day style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}></Day>
				<Day style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}></Day>
				<Day>1</Day>
				<Day>2</Day>
				<Day>3</Day>
				<Day>4</Day>
				<Day>5</Day>
				<Day>6</Day>
				<Day>7</Day>
				<Day>8</Day>
				<Day>9</Day>
				<Day>10</Day>
				<Day>11</Day>
			</Days>
		</Month>
	</>
);

const YearView = () => (
	<>
		<Year>
			<YearMonths>
				<MonthInYearChecked>Октябрь</MonthInYearChecked>
				<MonthInYearChecked>Ноябрь</MonthInYearChecked>
				<MonthInYearChecked>Декабрь</MonthInYearChecked>
			</YearMonths>
		</Year>
		<Year>
			<YearNumber>2025</YearNumber>
			<YearMonths>
				<MonthInYearChecked>Январь</MonthInYearChecked>
				<MonthInYearChecked>Февраль</MonthInYearChecked>
				<MonthInYearChecked>Март</MonthInYearChecked>
				<MonthInYearChecked>Апрель</MonthInYearChecked>
				<MonthInYearChecked>Май</MonthInYearChecked>
				<MonthInYear>Июнь</MonthInYear>
				<MonthInYear>Июль</MonthInYear>
				<MonthInYear>Август</MonthInYear>
				<MonthInYear>Сентябрь</MonthInYear>
				<MonthInYear>Октябрь</MonthInYear>
				<MonthInYear>Ноябрь</MonthInYear>
				<MonthInYear>Декабрь</MonthInYear>
			</YearMonths>
		</Year>
		<Year>
			<YearNumber>2026</YearNumber>
			<YearMonths>
				<MonthInYear>Январь</MonthInYear>
				<MonthInYear>Февраль</MonthInYear>
				<MonthInYear>Март</MonthInYear>
				<MonthInYear>Апрель</MonthInYear>
				<MonthInYear>Май</MonthInYear>
				<MonthInYear>Июнь</MonthInYear>
				<MonthInYear>Июль</MonthInYear>
				<MonthInYear>Август</MonthInYear>
				<MonthInYear>Сентябрь</MonthInYear>
				<MonthInYear>Октябрь</MonthInYear>
				<MonthInYear>Ноябрь</MonthInYear>
				<MonthInYear>Декабрь</MonthInYear>
			</YearMonths>
		</Year>
	</>
);
