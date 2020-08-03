import React, { useState, useCallback } from 'react';

import { NavLink, Link, useHistory } from 'react-router-dom';

import { FiHeart, FiArchive, FiSearch, FiMenu } from 'react-icons/fi';
import { HeaderTag } from './styles';

const Header: React.FunctionComponent = () => {
	const [searchInput, setSearchInput] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const history = useHistory();

	const handleMenuMobile = useCallback(() => {
		setIsOpen(!isOpen);
	}, [setIsOpen, isOpen]);

	const handleCloseMenuMobile = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	const handleSearchRequest = useCallback(
		(event, searchButton) => {
			const { key } = event;

			if (key === 'Enter' || searchButton) {
				if (searchInput.trim().length > 0) {
					const search = encodeURIComponent(`${searchInput}`);

					history.push(`/filtrar/${search}`);

					setSearchInput('');
				}
			}
		},
		[history, searchInput],
	);

	return (
		<HeaderTag>
			<Link id="header__logo" to="/" onClick={handleCloseMenuMobile}>
				AnimesReact
			</Link>

			<div className="header__container">
				<nav className={`mobile__menu ${isOpen ? 'menu__open' : ''}`}>
					<NavLink
						to="/"
						exact
						className="navlink__recent"
						activeClassName="navlink__active"
						onClick={handleCloseMenuMobile}
					>
						Recentes
					</NavLink>

					<NavLink
						to="/temporada"
						className="navlink__season"
						activeClassName="navlink__active"
						onClick={handleCloseMenuMobile}
					>
						Temporada
					</NavLink>

					<NavLink
						to="/filtrar"
						className="navlink__categories"
						activeClassName="navlink__active"
						onClick={handleCloseMenuMobile}
					>
						Categorias
					</NavLink>
				</nav>
				<div className="search__input">
					<Link to="/filtrar" className="search__icon-mobile">
						<FiSearch size={24} onClick={handleCloseMenuMobile} />
					</Link>

					<FiSearch
						className="search__icon"
						size={20}
						onClick={() => handleSearchRequest(false, true)}
					/>
					<input
						type="text"
						name="search-anime"
						id="search-input"
						placeholder="Pesquisar anime..."
						value={searchInput}
						onChange={(event) => setSearchInput(event.target.value)}
						onKeyPress={(e) => handleSearchRequest(e, false)}
					/>
				</div>
				<div className="header__buttons">
					<FiArchive
						className="history__popup"
						size={24}
						onClick={handleCloseMenuMobile}
					/>
					<FiHeart
						className="saves__popup"
						size={24}
						onClick={handleCloseMenuMobile}
					/>
					<FiMenu
						className="menu__mobile"
						size={24}
						onClick={handleMenuMobile}
					/>
				</div>
			</div>
		</HeaderTag>
	);
};

export default Header;
