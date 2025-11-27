import { useState, useEffect, useRef } from 'react';
import * as S from './NewExpense.styled';
import { createTransaction, updateTransaction } from '../../api/expensesApi';

// Маппинг категорий с русскими названиями на английские
const CATEGORY_MAPPING = {
	Еда: 'food',
	Транспорт: 'transport',
	Жилье: 'housing',
	Развлечения: 'joy',
	Образование: 'education',
	Другое: 'others',
};

// Обратный маппинг для отображения
const REVERSE_CATEGORY_MAPPING = {
	food: 'Еда',
	transport: 'Транспорт',
	housing: 'Жилье',
	joy: 'Развлечения',
	education: 'Образование',
	others: 'Другое',
};

export const NewExpense = ({ isEditing, editingExpense, onSave }) => {
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
				sum: editingExpense.sum?.toString() || '',
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
		// Удаляем все нецифровые символы
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

	const handleInputChange = (field, value) => {
		if (field === 'date') {
			const maskedValue = applyDateMask(value);
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
		if (!formData.sum) {
			errors.sum = 'Сумма обязательна для заполнения';
			isValid = false;
		} else if (isNaN(formData.sum) || Number(formData.sum) <= 0) {
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

			const transactionData = {
				description: formData.description,
				sum: Number(formData.sum),
				category: formData.category,
				date: serverDate,
			};

			console.log('Отправка данных на сервер:', transactionData);

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
			console.error('Ошибка при сохранении:', err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
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
		<div>
			<S.Container>
				<S.Content>
					<S.Title>{isEditing ? 'Редактирование' : 'Новый расход'}</S.Title>

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
						<S.Input
							type="number"
							value={formData.sum}
							onChange={(e) => handleInputChange('sum', e.target.value)}
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
		</div>
	);
};

export default NewExpense;
