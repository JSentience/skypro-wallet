import styled from 'styled-components';

export const Button = styled.button`
	color: #fff;
	text-align: center;
	font-size: 12px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	display: flex;
	padding: 12px;
	justify-content: center;
	align-items: center;
	gap: 12px;
	align-self: stretch;
	border-radius: 6px;
	background: #1fa46c;
	max-width: 100%;
	border: none;
	cursor: pointer;

	&:disabled {
		background-color: #999;
		cursor: not-allowed;
	}
`;
