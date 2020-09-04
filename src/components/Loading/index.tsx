import React from 'react';

import { useLoadingHook } from '../../hooks/loading';

import { Content, Container, Logo, ReactIcon } from './styles';

const Loading: React.FunctionComponent = () => {
	const { status } = useLoadingHook();

	return (
		<>
			{status && (
				<Content>
					<Container>
						<Logo />
						<ReactIcon />
					</Container>
				</Content>
			)}
		</>
	);
};

export default Loading;
