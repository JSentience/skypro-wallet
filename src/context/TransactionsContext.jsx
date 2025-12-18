import { createContext, useCallback, useState } from 'react';

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Метод для установки всех транзакций (используется при первичной загрузке)
	const setAllTransactions = useCallback((newTransactions) => {
		setTransactions(Array.isArray(newTransactions) ? newTransactions : []);
	}, []);

	// Метод для добавления новой транзакции
	const addTransaction = useCallback((newTransaction) => {
		setTransactions((prev) => [newTransaction, ...prev]);
	}, []);

	// Метод для обновления существующей транзакции
	const updateTransaction = useCallback((id, updatedTransaction) => {
		setTransactions((prev) =>
			prev.map((t) => (t._id === id ? { ...t, ...updatedTransaction } : t)),
		);
	}, []);

	// Метод для удаления транзакции
	const deleteTransaction = useCallback((id) => {
		setTransactions((prev) => prev.filter((t) => t._id !== id));
	}, []);

	return (
		<TransactionsContext.Provider
			value={{
				transactions,
				loading,
				error,
				setLoading,
				setError,
				setAllTransactions,
				addTransaction,
				updateTransaction,
				deleteTransaction,
			}}
		>
			{children}
		</TransactionsContext.Provider>
	);
};

export { TransactionsContext };
