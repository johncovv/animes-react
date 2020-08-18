import React, { useState, useCallback } from 'react';

import { useParams } from 'react-router-dom';

import { TiArrowSortedUp } from 'react-icons/ti';
import { GrFormClose } from 'react-icons/gr';

import backgroundImage from '../../assets/img/background/filter.png';

import GlobalFilters from '../../styles/page.styles';

import { FiltersContainer, SelectField, OptionField } from './styles';

import CategoriesJson from '../../assets/categories.json';

interface CategoriesParams {
	search: string;
}

interface GenresJsonType {
	name: string;
	options: [];
}

const Categories: React.FunctionComponent = () => {
	const { search } = useParams<CategoriesParams>();

	const [selected, setSelected] = useState<GenresJsonType[]>(
		[] as GenresJsonType[],
	);

	const [genresJson] = useState<GenresJsonType[]>(() => {
		return CategoriesJson as GenresJsonType[];
	});

	const handleToggleSelectField = useCallback((el: number) => {
		const selectedElement = document.querySelector(
			`#select-field-${el}`,
		) as HTMLDivElement;

		const restOfElements = document.querySelectorAll(
			`div:not(#select-field-${el})`,
		) as NodeListOf<HTMLDivElement>;

		if (selectedElement && restOfElements) {
			selectedElement.classList.toggle('hidde');

			restOfElements.forEach((i) => {
				i.classList.add('hidde');
			});
		}
	}, []);

	const handleSelectGenre = useCallback(
		({ name, options }: GenresJsonType) => {
			const exist = selected.find((i) => i.name === name);

			if (exist) {
				setSelected(selected.filter((i) => i.name !== exist.name));
			} else if (selected.length < 4) {
				setSelected([...selected, { name, options }]);
			}
		},
		[selected],
	);

	const checkSelectedStatus = useCallback(
		(name): boolean => {
			return !!selected.find((i) => i.name === name);
		},
		[selected],
	);

	return (
		<>
			{search && <h1>{search}</h1>}
			<FiltersContainer className="filters-container">
				<div className="explain">
					<h1 className="title">Filtrar Animes</h1>
					<p>Nesta página é possível fazer uma pesquisa mais precisa.</p>
					<p>
						Nos filtros é possível buscas animes pelo título, não é necessário
						começar pelo início, a pesquisa busca qualquer título que tenha a
						palavra digitada.
					</p>
					<p>
						Também é possível adicionar até 4(quatro) gêneros e definir o ano do
						anime.
					</p>
				</div>
				<form className="form" onSubmit={(e) => e.preventDefault()}>
					{/* <label htmlFor="search-anime">
						<input type="text" name="search-anime" id="search-anime" />
					</label> */}
					<div className="form-group">
						<div className="form-group--row">
							<SelectField
								className="select-field hidde"
								onClick={() => handleToggleSelectField(1)}
								id="select-field-1"
							>
								<p>
									{(selected.length > 0 &&
										selected.map(({ name }) => (
											<span key={name} className="selected-option">
												{name}
											</span>
										))) || (
										<span className="default-option">
											Selecione até 4 gêneros.
										</span>
									)}
								</p>
								<span className="arrow">
									<TiArrowSortedUp size={20} />
								</span>

								<div className="container-options">
									<div className="options">
										{genresJson &&
											genresJson.map(({ name, options }) => (
												<OptionField
													key={name}
													onClick={(e) => {
														e.stopPropagation();
														handleSelectGenre({ name, options });
													}}
													className={
														checkSelectedStatus(name) ? 'selected' : ''
													}
												>
													{name}
													{checkSelectedStatus(name) && (
														<GrFormClose size={20} />
													)}
												</OptionField>
											))}
									</div>
								</div>
							</SelectField>
						</div>
					</div>
				</form>
			</FiltersContainer>

			<GlobalFilters backgroundImage={backgroundImage} varRoot="filter" />
		</>
	);
};

export default Categories;
