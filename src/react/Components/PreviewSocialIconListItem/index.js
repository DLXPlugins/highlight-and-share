/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import classNames from 'classnames';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';

const PreviewSocialIconListItem = ( { listItemKey, className, icon, label } ) => {
	const { theme, hasIconsOnly, socialNetworkColors, appearanceThemeData } = useContext( SocialNetworksContext );
	const classes = classNames( className, `has_${ listItemKey }` );

	let iconStyles = '';
	if ( ! appearanceThemeData.groupIcons && 'custom' === theme ) {
		iconStyles = `
			.has_${ listItemKey } a {
				color: ${ socialNetworkColors[ listItemKey ].icon_color } !important;
				background: ${ socialNetworkColors[ listItemKey ].background } !important;
			}
			.has_${ listItemKey } a:hover {
				color: ${ socialNetworkColors[ listItemKey ].icon_color_hover } !important;
				background: ${ socialNetworkColors[ listItemKey ].background_hover } !important;
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
