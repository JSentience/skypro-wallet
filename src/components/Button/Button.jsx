import { Button } from './Button.styled';

export const MainButton = ({ children, ...props }) => {
	return <Button {...props}>{children}</Button>;
};
