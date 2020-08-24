import React, { useState, useCallback, useEffect } from 'react';

import { GrSearch } from 'react-icons/gr';

import { RiCloseLine } from 'react-icons/ri';

import { Content } from './styles';

interface InputProps {
	placeHolder: string;
	target(value: string): void;
	searchRequest(): void;
	clearOnRequest?: boolean;
	defaultValue?: string;
}

const Input: React.FunctionComponent<InputProps> = ({
	target,
	searchRequest,
	clearOnRequest,
	placeHolder,
	defaultValue,
}: InputProps) => {
	const [dataInput, setDataInput] = useState('');

	const setSearchInput = useCallback(
		(value: string) => {
			setDataInput(value);
		},
		[setDataInput],
	);

	const handleKeyPress = useCallback(
		(event) => {
			const { key } = event;

			if (key === 'Enter') {
				searchRequest();
				if (clearOnRequest) setDataInput('');
			}
		},
		[searchRequest, setDataInput, clearOnRequest],
	);

	useEffect(() => {
		target(dataInput);
	}, [dataInput, target]);

	useEffect(() => {
		if (defaultValue && defaultValue.length > 0) {
			setDataInput(defaultValue);
		}
	}, [defaultValue, setSearchInput]);

	return (
		<Content>
			<GrSearch
				className="search__icon"
				size={20}
				onClick={() => {
					searchRequest();
					if (clearOnRequest) setDataInput('');
				}}
			/>
			{dataInput.length > 0 && (
				<RiCloseLine
					className="clean__icon"
					size={20}
					onClick={() => setDataInput('')}
				/>
			)}
			<input
				type="text"
				placeholder={placeHolder}
				value={dataInput}
				onChange={(event) => setSearchInput(event.target.value)}
				onKeyPress={(e) => {
					e.stopPropagation();
					handleKeyPress(e);
				}}
			/>
		</Content>
	);
};

export default Input;
