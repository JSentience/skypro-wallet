import { createContext, useEffect, useState, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('walletToken');
		const userName = localStorage.getItem('userName');
		const userLogin = localStorage.getItem('userLogin');
		if (token) {
			setIsAuthenticated(true);
			setUser({ token, name: userName, login: userLogin });
		}
		setLoading(false);
	}, []);

	// Мемоизация user объекта для предотвращения ненужных рендеров
	const memoizedUser = useMemo(() => user, [user]);

	const login = (userData) => {
		const { token, name, login } = userData;
		localStorage.setItem('walletToken', token);
		localStorage.setItem('userName', name);
		localStorage.setItem('userLogin', login);
		setIsAuthenticated(true);
		setUser({ token, name, login });
	};

	const logout = () => {
		localStorage.removeItem('walletToken');
		localStorage.removeItem('userName');
		localStorage.removeItem('userLogin');
		setIsAuthenticated(false);
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{ user: memoizedUser, isAuthenticated, loading, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext };
