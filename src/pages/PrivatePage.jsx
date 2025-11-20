import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { Wrapper } from '../Wrapper.styled';

export const PrivatePage = () => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>; // or null
	}

	return isAuthenticated ? (
		<Wrapper>
			<Header />
			<Hero>
				<Outlet />
			</Hero>
		</Wrapper>
	) : (
		<Navigate to="/signin" replace />
	);
};
