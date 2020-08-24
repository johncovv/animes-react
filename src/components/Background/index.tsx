import React from 'react';

import { Content } from './styles';

const Background: React.FunctionComponent = ({ children }) => {
	return <Content className="primary__background">{children}</Content>;
};

export default Background;
