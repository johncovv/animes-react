import React from 'react';

import { Content } from './styles';

interface PopupAttr {
	children: React.ReactNode;
	className: string;
}

const Popup: React.FunctionComponent<PopupAttr> = ({
	children,
	className,
}: PopupAttr) => {
	return (
		<Content className={`popup__${className} hidden`}>
			<div className="popup__container">
				<div className="popup__container--inner">
					<div className="popup__items--container">{children}</div>
				</div>
			</div>
		</Content>
	);
};

export default Popup;
