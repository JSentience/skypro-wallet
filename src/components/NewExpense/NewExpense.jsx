import * as S from './NewExpense.styled';

export const NewExpense = ({ isEditing, editingExpense, onSave }) => {
	return (
		<div>
			<S.Container>
				<S.Content>
					<S.Title>{isEditing ? 'Редактирование' : 'Новый расход'}</S.Title>

					<S.InputGroup>
						<S.InputLabel>Описание</S.InputLabel>
						<S.Input
							type="text"
							defaultValue={isEditing ? editingExpense?.description : ''}
						/>
					</S.InputGroup>

					<S.CategorySection>
						<S.InputLabel>Категория</S.InputLabel>
						<S.CategoryGrid>
							<S.CategoryItem $active>
								<S.CategoryIcon src="/bag.svg" alt="" />
								<S.CategoryText $active>Еда</S.CategoryText>
							</S.CategoryItem>
							<S.CategoryItem>
								<S.CategoryIcon src="/car.svg" alt="" />
								<S.CategoryText>Транспорт</S.CategoryText>
							</S.CategoryItem>
							<S.CategoryItem>
								<S.CategoryIcon src="/house.svg" alt="" />
								<S.CategoryText>Жилье</S.CategoryText>
							</S.CategoryItem>
							<S.CategoryItem>
								<S.CategoryIcon src="/gameboy.svg" alt="" />
								<S.CategoryText>Развлечения</S.CategoryText>
							</S.CategoryItem>
							<S.CategoryItem>
								<S.CategoryIcon src="/vuesax_bold_teacher.svg" alt="" />
								<S.CategoryText>Образование</S.CategoryText>
							</S.CategoryItem>
							<S.CategoryItem>
								<S.CategoryIcon src="/message-text.svg" alt="" />
								<S.CategoryText>Другое</S.CategoryText>
							</S.CategoryItem>
						</S.CategoryGrid>
					</S.CategorySection>

					<S.InputGroup>
						<S.InputLabel>Дата</S.InputLabel>
						<S.Input
							type="text"
							defaultValue={isEditing ? editingExpense?.date : ''}
						/>
					</S.InputGroup>

					<S.InputGroup>
						<S.InputLabel>Сумма</S.InputLabel>
						<S.Input
							type="text"
							defaultValue={isEditing ? editingExpense?.amount : ''}
						/>
					</S.InputGroup>

					<S.Button onClick={onSave}>
						<S.ButtonText>
							{isEditing ? 'Сохранить редактирование' : 'Добавить новый расход'}
						</S.ButtonText>
					</S.Button>
				</S.Content>
			</S.Container>
		</div>
	);
};

export default NewExpense;
