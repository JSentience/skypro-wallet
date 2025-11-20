import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { Wrapper } from '../Wrapper.styled';

export const PrivatePage = () => {
	const { auth } = useAuth();

	return auth ? (
		<Wrapper>
			<Header />
			<Hero />
		</Wrapper>
	) : (
		<Navigate to="/signin" replace />
	);
};
