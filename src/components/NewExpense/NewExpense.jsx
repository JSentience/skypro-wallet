import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import * as S from './NewExpense.styled';
import { createTransaction, updateTransaction } from '../../api/expensesApi';
import { breakpoints } from '../../breakpoints';

const CATEGORY_MAPPING = {
	Еда: 'food',
	Транспорт: 'transport',
	Жилье: 'housing',
	Развлечения: 'joy',
	Образование: 'education',
	Другое: 'others',
};

const REVERSE_CATEGORY_MAPPING = {
	food: 'Еда',
	transport: 'Транспорт',
	housing: 'Жилье',
	joy: 'Развлечения',
	education: 'Образование',
	others: 'Другое',
};

export const NewExpense = ({ isEditing, editingExpense, onSave }) => {
	const navigate = useNavigate();
	const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });

	const [formData, setFormData] = useState({
		description: '',
		category: '',
		date: '',
		sum: '',
	});
	const [selectedCategory, setSelectedCategory] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [fieldErrors, setFieldErrors] = useState({
		description: '',
		category: '',
		date: '',
		sum: '',
	});
	const dateInputRef = useRef(null);

	// Инициализация формы при редактировании
	useEffect(() => {
		if (isEditing && editingExpense) {
			const categoryName =
				REVERSE_CATEGORY_MAPPING[editingExpense.category] || '';

			setFormData({
				description: editingExpense.description || '',
				category: editingExpense.category || '',
				date: formatDateForInput(editingExpense.date) || '',
				sum: formatSumForDisplay(editingExpense.sum?.toString()) || '',
			});
			setSelectedCategory(categoryName);
		} else {
			// Сброс формы для нового расхода
			setFormData({
				description: '',
				category: '',
				date: '',
				sum: '',
			});
			setSelectedCategory('');
		}
		setFieldErrors({
			description: '',
			category: '',
			date: '',
			sum: '',
		});
		setError('');
	}, [isEditing, editingExpense]);

	// Функция для форматирования суммы для отображения (2 500)
	const formatSumForDisplay = (sumString) => {
		if (!sumString) return '';

		// Убираем все не цифровые символы (кроме точек для десятичных, но у нас целые числа)
		const numbers = sumString.replace(/\D/g, '');

		if (!numbers) return '';

		// Форматируем с пробелами как тысячи
		return parseInt(numbers, 10).toLocaleString('ru-RU');
	};

	// Функция для преобразования отформатированной суммы в число (убираем пробелы)
	const parseSumToNumber = (formattedSum) => {
		if (!formattedSum) return 0;

		// Убираем все пробелы и преобразуем в число
		return parseInt(formattedSum.replace(/\s/g, ''), 10);
	};

	// Функция для применения маски суммы при вводе
	const applySumMask = (value) => {
		// Удаляем все не цифровые символы
		let numbers = value.replace(/\D/g, '');

		// Ограничиваем максимальную длину (например, 9 цифр = 999 999 999)
		if (numbers.length > 9) {
			numbers = numbers.substring(0, 9);
		}

		if (!numbers) return '';

		// Форматируем с пробелами
		return parseInt(numbers, 10).toLocaleString('ru-RU');
	};

	// Функция для форматирования даты из API в формат дд.мм.гггг
	const formatDateForInput = (dateString) => {
		if (!dateString) return '';

		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		return `${day}.${month}.${year}`;
	};

	// Функция для конвертации даты из дд.мм.гггг в М-Д-ГГГГ
	const convertDateToServerFormat = (dateString) => {
		if (!dateString) return '';

		// Разбиваем строку по точкам
		const parts = dateString.split('.');
		if (parts.length !== 3) {
			throw new Error('Неверный формат даты. Используйте формат дд.мм.гггг');
		}

		const day = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10);
		const year = parseInt(parts[2], 10);

		// Проверяем валидность даты
		if (isNaN(day) || isNaN(month) || isNaN(year)) {
			throw new Error('Неверный формат даты. Используйте формат дд.мм.гггг');
		}

		if (month < 1 || month > 12) {
			throw new Error('Месяц должен быть от 1 до 12');
		}

		if (day < 1 || day > 31) {
			throw new Error('День должен быть от 1 до 31');
		}

		if (year < 2000 || year > 2100) {
			throw new Error('Год должен быть между 2000 и 2100');
		}

		// Возвращаем в формате М-Д-ГГГГ
		return `${month}-${day}-${year}`;
	};

	// Функция для применения маски даты дд.мм.гггг
	const applyDateMask = (value) => {
		// Удаляем все не цифровые символы
		let numbers = value.replace(/\D/g, '');

		// Ограничиваем длину
		if (numbers.length > 8) {
			numbers = numbers.substring(0, 8);
		}

		// Применяем маску дд.мм.гггг
		let formatted = '';
		if (numbers.length > 0) {
			formatted = numbers.substring(0, 2);
		}
		if (numbers.length >= 3) {
			formatted += '.' + numbers.substring(2, 4);
		}
		if (numbers.length >= 5) {
			formatted += '.' + numbers.substring(4, 8);
		}

		return formatted;
	};

	// Обработчик ввода в поле даты
	const handleDateInput = (e) => {
		const value = e.target.value;
		const maskedValue = applyDateMask(value);

		setFormData((prev) => ({
			...prev,
			date: maskedValue,
		}));
		setFieldErrors((prev) => ({ ...prev, date: '' }));
		setError('');
	};

	// Обработчик ввода в поле суммы
	const handleSumInput = (e) => {
		const value = e.target.value;
		const maskedValue = applySumMask(value);

		setFormData((prev) => ({
			...prev,
			sum: maskedValue,
		}));
		setFieldErrors((prev) => ({ ...prev, sum: '' }));
		setError('');
	};

	const handleInputChange = (field, value) => {
		if (field === 'date') {
			const maskedValue = applyDateMask(value);
			setFormData((prev) => ({
				...prev,
				[field]: maskedValue,
			}));
		} else if (field === 'sum') {
			const maskedValue = applySumMask(value);
			setFormData((prev) => ({
				...prev,
				[field]: maskedValue,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[field]: value,
			}));
		}
		setFieldErrors((prev) => ({ ...prev, [field]: '' }));
		setError('');
	};

	const handleCategorySelect = (categoryName) => {
		setSelectedCategory(categoryName);
		setFormData((prev) => ({
			...prev,
			category: CATEGORY_MAPPING[categoryName],
		}));
		setFieldErrors((prev) => ({ ...prev, category: '' }));
		setError('');
	};

	const validateForm = () => {
		const errors = {
			description: '',
			category: '',
			date: '',
			sum: '',
		};
		let isValid = true;

		// Валидация описания
		if (!formData.description) {
			errors.description = 'Описание обязательно для заполнения';
			isValid = false;
		} else if (formData.description.length < 4) {
			errors.description = 'Описание должно содержать минимум 4 символа';
			isValid = false;
		}

		// Валидация суммы
		const sumValue = parseSumToNumber(formData.sum);
		if (!formData.sum) {
			errors.sum = 'Сумма обязательна для заполнения';
			isValid = false;
		} else if (isNaN(sumValue) || sumValue <= 0) {
			errors.sum = 'Введите корректную сумму';
			isValid = false;
		}

		// Валидация даты
		if (!formData.date) {
			errors.date = 'Дата обязательна для заполнения';
			isValid = false;
		} else if (formData.date.length !== 10) {
			errors.date = 'Дата должна быть в формате дд.мм.гггг';
			isValid = false;
		}

		// Валидация категории
		if (!formData.category) {
			errors.category = 'Выберите категорию';
			isValid = false;
		}

		setFieldErrors(errors);
		return isValid;
	};

	const handleSave = async () => {
		try {
			setLoading(true);
			setError('');

			// Валидация формы
			if (!validateForm()) {
				return;
			}

			// Конвертируем дату из дд.мм.гггг в М-Д-ГГГГ
			const serverDate = convertDateToServerFormat(formData.date);

			// Преобразуем отформатированную сумму в число (убираем пробелы)
			const sumValue = parseSumToNumber(formData.sum);

			const transactionData = {
				description: formData.description,
				sum: sumValue,
				category: formData.category,
				date: serverDate,
			};

			let updatedTransactions;

			if (isEditing && editingExpense) {
				// Редактирование существующей транзакции
				updatedTransactions = await updateTransaction(
					editingExpense._id,
					transactionData,
				);
			} else {
				// Создание новой транзакции
				updatedTransactions = await createTransaction(transactionData);
			}

			// Вызываем колбэк с обновленными данными
			if (onSave) {
				onSave(updatedTransactions);
			}

			// Сброс формы после успешного сохранения
			if (!isEditing) {
				setFormData({
					description: '',
					category: '',
					date: '',
					sum: '',
				});
				setSelectedCategory('');
				setFieldErrors({
					description: '',
					category: '',
					date: '',
					sum: '',
				});
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleBackClick = () => {
		navigate('/expenses');
	};

	const categories = [
		{ name: 'Еда', icon: '/bag.svg' },
		{ name: 'Транспорт', icon: '/car.svg' },
		{ name: 'Жилье', icon: '/house.svg' },
		{ name: 'Развлечения', icon: '/gameboy.svg' },
		{ name: 'Образование', icon: '/vuesax_bold_teacher.svg' },
		{ name: 'Другое', icon: '/message-text.svg' },
	];

	return (
		<>
			<S.Container>
				<S.Content>
					<S.TitleContainer>
						{isMobile && (
							<S.BackButton onClick={handleBackClick}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 14 14"
									fill="none"
								>
									<path
										d="M9.44413 1.16675H4.55579C2.43246 1.16675 1.16663 2.43258 1.16663 4.55591V9.43841C1.16663 11.5676 2.43246 12.8334 4.55579 12.8334H9.43829C11.5616 12.8334 12.8275 11.5676 12.8275 9.44425V4.55591C12.8333 2.43258 11.5675 1.16675 9.44413 1.16675ZM10.5 7.43758H4.55579L6.31163 9.19341C6.48079 9.36258 6.48079 9.64258 6.31163 9.81175C6.22413 9.89925 6.11329 9.94008 6.00246 9.94008C5.89163 9.94008 5.78079 9.89925 5.69329 9.81175L3.19079 7.30925C3.10913 7.22758 3.06246 7.11675 3.06246 7.00008C3.06246 6.88341 3.10913 6.77258 3.19079 6.69091L5.69329 4.18841C5.86246 4.01925 6.14246 4.01925 6.31163 4.18841C6.48079 4.35758 6.48079 4.63758 6.31163 4.80675L4.55579 6.56258H10.5C10.7391 6.56258 10.9375 6.76091 10.9375 7.00008C10.9375 7.23925 10.7391 7.43758 10.5 7.43758Z"
										fill="#999999"
									/>
								</svg>
								Мои расходы
							</S.BackButton>
						)}
						<S.Title>{isEditing ? 'Редактирование' : 'Новый расход'}</S.Title>
					</S.TitleContainer>

					{error && <S.ErrorMessage>{error}</S.ErrorMessage>}

					<S.InputGroup>
						<S.InputLabel>Описание</S.InputLabel>
						<S.Input
							type="text"
							value={formData.description}
							onChange={(e) => handleInputChange('description', e.target.value)}
							placeholder="Введите описание расхода (минимум 4 символа)"
							disabled={loading}
							$error={!!fieldErrors.description}
							$filled={!!formData.description}
						/>
						{fieldErrors.description && (
							<S.FieldError>{fieldErrors.description}</S.FieldError>
						)}
					</S.InputGroup>

					<S.CategorySection>
						<S.InputLabel>Категория</S.InputLabel>
						<S.CategoryGrid>
							{categories.map((category) => (
								<S.CategoryItem
									key={category.name}
									$active={selectedCategory === category.name}
									onClick={() =>
										!loading && handleCategorySelect(category.name)
									}
								>
									<S.CategoryIcon src={category.icon} alt={category.name} />
									<S.CategoryText $active={selectedCategory === category.name}>
										{category.name}
									</S.CategoryText>
								</S.CategoryItem>
							))}
						</S.CategoryGrid>
						{fieldErrors.category && (
							<S.FieldError>{fieldErrors.category}</S.FieldError>
						)}
					</S.CategorySection>

					<S.InputGroup>
						<S.InputLabel>Дата</S.InputLabel>
						<S.Input
							ref={dateInputRef}
							type="text"
							value={formData.date}
							onChange={handleDateInput}
							placeholder="Введите дату"
							disabled={loading}
							$error={!!fieldErrors.date}
							$filled={!!formData.date}
						/>
						{fieldErrors.date && (
							<S.FieldError>{fieldErrors.date}</S.FieldError>
						)}
					</S.InputGroup>

					<S.InputGroup>
						<S.InputLabel>Сумма</S.InputLabel>
						<S.SumInput
							type="text"
							inputMode="numeric"
							value={formData.sum}
							onChange={handleSumInput}
							placeholder="Введите сумму"
							disabled={loading}
							$error={!!fieldErrors.sum}
							$filled={!!formData.sum}
						/>
						{fieldErrors.sum && <S.FieldError>{fieldErrors.sum}</S.FieldError>}
					</S.InputGroup>

					<S.ButtonContainer>
						<S.Button onClick={handleSave} disabled={loading}>
							<S.ButtonText>
								{loading
									? 'Сохранение...'
									: isEditing
										? 'Сохранить редактирование'
										: 'Добавить новый расход'}
							</S.ButtonText>
						</S.Button>
					</S.ButtonContainer>
				</S.Content>
			</S.Container>
		</>
	);
};
