/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import classNames from 'classnames';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';

const PreviewSocialIconListItem = ( { listItemKey, className, icon, label } ) => {
	const { theme, hasIconsOnly, socialNetworkColors, appearanceThemeData } = useContext( SocialNetworksContext );
	const classes = classNames( className, `has_${ listItemKey }` );

	let iconStyles = '';
	if ( ! appearanceThemeData.groupIcons && 'custom' === theme ) {
		const iconColor = socialNetworkColors[ listItemKey ].icon_color;
		const iconColorHover = socialNetworkColors[ listItemKey ].icon_color_hover;
		const backgroundColor = socialNetworkColors[ listItemKey ].background;
		const backgroundColorHover = socialNetworkColors[ listItemKey ].background_hover;

		iconStyles = `
			.has_${ listItemKey } a {
				color: ${ iconColor } !important;
				background: ${ backgroundColor } !important;
			}
			.has_${ listItemKey } a:hover {
				color: ${ iconColorHover } !important;
				background: ${ backgroundColorHover } !important;
			}
		`;
	}

	return (
		<div key={ listItemKey } className={ classes }>
			<>
				{ iconStyles && <style>{ iconStyles }</style> }
				<a
					href="#"
					onClick={ ( e ) => {
						e.preventDefault();
					} }
				>
					{ icon }
					{ ( 'default' === appearanceThemeData.theme || ( 'custom' === appearanceThemeData.theme && ! appearanceThemeData.icons_only ) ) && (
						<>
							<span className="has-icon-label">{ `${ label }` }</span>
						</>
					)}
				</a>
			</>
		</div>
	);
};

export default PreviewSocialIconListItem;
