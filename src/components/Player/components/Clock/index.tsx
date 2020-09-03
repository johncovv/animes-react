import React, { useCallback } from 'react';

import { Content } from './styles';

interface ClockAttr {
	duration: number;
	currentTime: number;
}

const Clock: React.FunctionComponent<ClockAttr> = ({
	duration,
	currentTime,
}: ClockAttr) => {
	const handleTimeFormat = useCallback((seconds: number): string => {
		const formated = new Date((seconds || 0) * 1000)
			.toISOString()
			.substr(11, 8);

		const splited = formated.split(':');

		if (splited[0] === '00') {
			splited.shift();
		}

		return splited.join(':');
	}, []);

	return <Content>{handleTimeFormat(duration - currentTime)}</Content>;
};

export default Clock;
