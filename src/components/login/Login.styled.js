import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	background: #f4f5f6;
	height: 870px;
`;
export const LoginContainer = styled.div`
	display: inline-flex;
	padding: 32px 34px 32px 32px;
	justify-content: center;
	align-items: center;
	border-radius: 30px;
	background: #ffffff;
	box-shadow: 0 20px 67px -12px rgba(0, 0, 0, 0.13);
`;
export const LoginWrapper = styled.div`
	display: flex;
	width: 313px;
	flex-direction: column;
	gap: 24px;
	justify-content: center;
	align-items: center;
`;

export const LoginTitle = styled.h3`
	color: #000;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;
export const InputForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
	align-self: stretch;
`;

export const InputEmail = styled.input`
	display: flex;
	height: 39px;
	padding: 12px;
	align-items: center;
	gap: 12px;
	align-self: stretch;
	border-radius: 6px;
	border: 0.5px solid #999;
	&:focus {
		border-radius: 6px;
		border: 0.5px solid #1fa46c;
		background: #dbffe9;
	}
`;
export const InputPassword = styled.input`
	display: flex;
	padding: 12px;
	align-items: center;
	gap: 12px;
	align-self: stretch;
	border-radius: 6px;
	border: 0.5px solid #999;
	&:focus {
		border-radius: 6px;
		border: 0.5px solid #1fa46c;
		background: #dbffe9;
	}
`;

export const InputName = styled.input`
	display: flex;
	padding: 12px;
	align-items: center;
	gap: 12px;
	align-self: stretch;
	border-radius: 6px;
	border: 0.5px solid #999;

	&:focus {
		border-radius: 6px;
		border: 0.5px solid #1fa46c;
		background: #dbffe9;
	}
`;
export const ChangeForm = styled.div`
	display: flex;
	max-width: 314px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 4px;
`;
export const ChangeFormText = styled.p`
	color: #999;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%; /* 18px */
`;
export const ChangeFormLink = styled.a`
	color: #999;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%; /* 18px */
	cursor: pointer;
	text-decoration: underline;
`;
