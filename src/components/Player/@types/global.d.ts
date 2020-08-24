export declare global {
	interface Document {
		pictureInPictureElement: boolean;
		exitPictureInPicture(): () => {};
	}

	interface HTMLVideoElement {
		requestPictureInPicture(): () => {};
	}
}
