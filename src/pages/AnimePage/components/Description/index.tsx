import React, { useCallback } from 'react';

// assets
import thumbProportion from '../../../../assets/img/thumb-grid-proportion.png';
import descriptionThumbnailError from '../../../../assets/img/thumb-not-found.png';

// styles
import { Content, Thumbnail, Details } from './styles';

interface DescriptionProps {
	animeDescription: ApiRequest.Anime;
}

const AnimeDescription: React.FunctionComponent<DescriptionProps> = ({
	animeDescription,
}: DescriptionProps) => {
	const hadleDescriptionThumbnailError = useCallback((e) => {
		const element = e.target as HTMLImageElement;

		element.src = descriptionThumbnailError;
	}, []);

	return (
		<Content>
			{animeDescription && (
				<>
					<Thumbnail className="poster">
						<div className="background">
							<div className="container">
								<img
									className="thumbnail"
									src={animeDescription.thumbnail}
									onError={(e) => hadleDescriptionThumbnailError(e)}
									alt={`${animeDescription.title?.toLowerCase()} thumbnail`}
								/>
								<img
									className="proportion"
									src={thumbProportion}
									alt={`${animeDescription.title?.toLowerCase()} thumbnail`}
								/>
							</div>
						</div>
					</Thumbnail>
					<Details className="details">
						<p className="title">{animeDescription.title}</p>
						<p>
							Status:{' '}
							<span>{!animeDescription.status ? 'Completo' : 'Ativo'}</span>
						</p>
						<p>
							Lançamento: <span>{animeDescription.year}</span>
						</p>
						<p>
							Gêneros: <span>{animeDescription.genres}.</span>
						</p>
						<div>
							<p>Descrição:</p>
							<span>{animeDescription.description}</span>
						</div>
					</Details>
				</>
			)}
		</Content>
	);
};

export default AnimeDescription;
