import React, { useState, useEffect, useCallback } from 'react';
import { GrSearch, GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useParams } from 'react-router-dom';
import Pagination from 'react-paginate';

// components, hooks
import Grid from '../../components/AnimeGrid';
import MultiSelect from '../../components/MultiSelect';
import Input from '../../components/Input';
import { useLoadingHook } from '../../hooks/loading';

// assets
import backgroundImage from '../../assets/img/background/filter.png';
import CategoriesJson from '../../assets/categories.json';

// utils, services
import api from '../../services/api.client';
import { FilterAnime } from '../../utils/filter-request-data';
import CreateQuery from '../../utils/categories-filter-format';

// styles
import GlobalFilters from '../../styles/page.styles';
import { FiltersContainer, ResultContainer } from './styles';

interface CategoriesParams {
	search: string;
}

interface OptionDataType {
	id: number | string;
	label: string;
	value: unknown;
}

const Categories: React.FunctionComponent = () => {
	const { search } = useParams<CategoriesParams>();

	const { handleSetStatus } = useLoadingHook();

	const [pagination, setPagination] = useState<number | undefined>(undefined);

	const [gridData, setGridData] = useState<ApiRequest.Anime[]>(
		[] as ApiRequest.Anime[],
	);

	const [genresSelected, setGenresSelected] = useState<OptionDataType[]>(
		[] as OptionDataType[],
	);

	const [yearSelected, setYearSelected] = useState<OptionDataType[]>(
		[] as OptionDataType[],
	);

	const [animeTitle, setAnimeTitle] = useState('');

	const [resultsLength, setResultsLength] = useState(0);
	const [query, setQuery] = useState('');

	const requestData = useCallback(async (): Promise<void> => {
		setGridData([] as ApiRequest.Anime[]);
		const response = await api.get(
			`/odata/Animesdb?$select=Id,Categoria,Nome,Imagem,Ano,Rank,Desc,Status&$orderby=Nome&$inlinecount=allpages&$top=50${
				pagination ? `&$skip=${pagination * 50}` : ''
			}${query}${
				query.length === 0 && search
					? `&$filter=substringof('${search}', Nome)`
					: ''
			}`,
		);

		const { data } = response;

		const filtered = await FilterAnime(data.value);
		setResultsLength(parseInt(data['odata.count'], 10));
		setGridData(filtered);
		handleSetStatus(false);
	}, [pagination, query, search, handleSetStatus]);

	const handleSearchRequest = useCallback(() => {
		const formatedQuery = CreateQuery({
			genres: genresSelected,
			year: yearSelected[0],
			search: animeTitle,
		});

		setQuery(formatedQuery);
		setPagination(0);
	}, [animeTitle, yearSelected, genresSelected]);

	const handleAnimeTitleRequest = useCallback(() => {
		handleSearchRequest();
	}, [handleSearchRequest]);

	useEffect(() => {
		requestData();
	}, [requestData]);

	const [yearsRange, setYearsRange] = useState<OptionDataType[]>(
		[] as OptionDataType[],
	);

	useEffect(() => {
		const currentYear = new Date().getFullYear();
		const latestAnime = 1990;

		setYearsRange(
			Array.from(Array(currentYear - latestAnime + 1), (_, i) => ({
				id: i,
				label: (i + latestAnime).toString(),
				value: i + latestAnime,
			})).reverse(),
		);
	}, [setYearsRange]);

	return (
		<>
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
					<div className="form-group">
						{search && (
							<div className="form-group--row active__filter">
								<p>
									Filtro ativo: <span>{search}</span>
								</p>
								<a href="/filtrar" target="_self">
									Limpar Filtros
								</a>
							</div>
						)}
						<div className="form-group--row">
							<Input
								target={(value) => setAnimeTitle(value)}
								placeHolder="Título do anime..."
								searchRequest={() => handleAnimeTitleRequest()}
								defaultValue={search}
							/>
						</div>
						<div className="form-group--row cols-2">
							<MultiSelect
								fieldId={1}
								defaultValue="Selecione até 4 gêneros."
								arrayData={CategoriesJson}
								max={4}
								target={(value) => setGenresSelected(value)}
							/>
							<MultiSelect
								fieldId={2}
								defaultValue="Selecione um ano de lançamento"
								arrayData={yearsRange}
								max={1}
								target={(value) => setYearSelected(value)}
							/>
						</div>
						<div className="form-group--row">
							<button type="button" onClick={handleSearchRequest}>
								<GrSearch size={20} />
								<p>Pesquisar animes</p>
							</button>
						</div>
					</div>
				</form>
			</FiltersContainer>
			<ResultContainer>
				{/* top pagination */}
				<Pagination
					forcePage={pagination}
					pageCount={Math.ceil(resultsLength / 50)}
					containerClassName="pagination pagination-top"
					marginPagesDisplayed={1}
					pageRangeDisplayed={1}
					previousLabel={<GrFormPrevious size={20} />}
					nextLabel={<GrFormNext size={20} />}
					onPageChange={(value) => setPagination(value.selected)}
				/>

				<p className="results-title">{resultsLength} Animes encontrados.</p>
				<Grid data={gridData} />

				{/* bottom pagination */}
				<Pagination
					forcePage={pagination}
					pageCount={Math.ceil(resultsLength / 50)}
					containerClassName="pagination pagination-bottom"
					marginPagesDisplayed={1}
					pageRangeDisplayed={1}
					previousLabel={<GrFormPrevious size={20} />}
					nextLabel={<GrFormNext size={20} />}
					onPageChange={(value) => setPagination(value.selected)}
				/>
			</ResultContainer>

			<GlobalFilters backgroundImage={backgroundImage} varRoot="filter" />
		</>
	);
};

export default Categories;
