declare namespace ApiRequest {
	export interface Anime {
		id: number;
		title: string;
		description: string;
		status: boolean;
		thumbnail: string;
		year: string;
		genres: string;
		views: number;
	}

	export interface EpiList {
		id: number;
		title: string;
		date?: string;
	}

	export interface EpiOption {
		id: number;
		title: string;
		url: string;
	}
}
