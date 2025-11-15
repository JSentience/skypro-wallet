import styled from 'styled-components';

export const Button = styled.button`
color: #FFF;
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
	background: #7334ea;
	max-width: 100%;

	${props => props.disabled ?
		'opacity: 0.5;' : ''}

`;
