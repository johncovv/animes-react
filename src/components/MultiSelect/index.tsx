import React, { useState, useCallback, useEffect } from 'react';

import { GrFormClose } from 'react-icons/gr';
import { TiArrowSortedUp } from 'react-icons/ti';

// styled components
import { SelectField, OptionField } from './styles';

interface ArrayDataType {
	id: number | string;
	label: string;
	value: unknown;
}

interface MultiSelectProps {
	fieldId: number;
	max?: number;
	defaultValue: string;
	arrayData: ArrayDataType[];
	target(data: ArrayDataType[]): void;
}

const MultiSelect: React.FunctionComponent<MultiSelectProps> = ({
	fieldId,
	max,
	arrayData,
	defaultValue,
	target,
}: MultiSelectProps) => {
	const [selected, setSelected] = useState<ArrayDataType[]>(
		[] as ArrayDataType[],
	);

	useEffect(() => {
		target(selected);
	}, [selected, target]);

	const handleSelectItem = useCallback(
		(data: ArrayDataType) => {
			const exist = selected.find((item) => item.id === data.id);

			if (exist) {
				setSelected(selected.filter((item) => item.id !== exist.id));
			} else {
				if (max) {
					if (selected.length === max) return;
				}
				setSelected([...selected, data]);
			}
		},
		[setSelected, selected, max],
	);

	const handleToggleSelectField = useCallback((id: number) => {
		const selectedElement = document.querySelector(
			`.select-field-${id}`,
		) as HTMLDivElement;

		const restOfElements = document.querySelectorAll(
			`div:not(.select-field-${id})`,
		) as NodeListOf<HTMLDivElement>;

		if (selectedElement && restOfElements) {
			selectedElement.classList.toggle('hidde');

			restOfElements.forEach((i) => {
				i.classList.add('hidde');
			});
		}
	}, []);

	const checkSelectedStatus = useCallback(
		(id): boolean => {
			const exist = selected.find((i) => i.id === id);

			return !!exist;
		},
		[selected],
	);

	return (
		<SelectField
			onClick={() => handleToggleSelectField(fieldId)}
			className={`select-field-${fieldId} select-field hidde ${
				max && max > 1 ? 'multiselect' : ''
			}`}
		>
			<p>
				{(selected.length > 0 &&
					selected.map(({ id, label }) => (
						<span key={id} className="selected-option">
							{label}
						</span>
					))) || <span className="default-option">{defaultValue}</span>}
			</p>
			<span className="arrow">
				<TiArrowSortedUp size={20} />
			</span>
			<div className="container-options">
				<div className="options">
					{arrayData &&
						arrayData.map(({ id, label, value }) => (
							<OptionField
								key={id}
								onClick={(e) => {
									e.stopPropagation();
									handleSelectItem({ id, label, value });
								}}
								className={checkSelectedStatus(id) ? 'selected' : ''}
							>
								{label}
								{checkSelectedStatus(id) && <GrFormClose size={20} />}
							</OptionField>
						))}
				</div>
			</div>
		</SelectField>
	);
};

export default MultiSelect;
