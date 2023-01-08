import React, { useContext } from 'react';
import classNames from 'classnames';
import PreviewSocialIconListItem from '../PreviewSocialIconListItem';
// Import all the social media icons.
import SocialIcons from '../SocialIcons';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';

const PreviewSocialIconList = () => {
	const { theme, appearanceThemeData } = useContext( SocialNetworksContext );
	const { getSocialIcons } = SocialIcons();
	const networks = getSocialIcons();

	// Make sure appearance theme data is present.
	let appearanceEmpty = true;
	if ( Object.keys( appearanceThemeData ).length > 0 ) {
		appearanceEmpty = false;
	}

	let themeStyles = ''; // placeholder for custom styles.
	// If appearance theme data is present, and the theme is custom, then add custom styles.
	if ( 'custom' === appearanceThemeData.theme && ! appearanceEmpty ) {
		if ( appearanceThemeData.group_icons ) {
			themeStyles += `
				.has-admin-theme-preview-list.highlight-and-share-wrapper {
					background-color: ${ appearanceThemeData.background_color } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
					color: ${ appearanceThemeData.icon_colors_group } !important;
					background-color: ${ appearanceThemeData.background_color } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a:hover {
					color: ${ appearanceThemeData.icon_colors_group_hover } !important;
					background-color: ${ appearanceThemeData.background_color_hover } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div:first-child a {
					border-top-left-radius: ${ appearanceThemeData.border_radius_group.attrTop + appearanceThemeData.border_radius_group.attrUnit } !important;
					border-bottom-left-radius: ${ appearanceThemeData.border_radius_group.attrTop + appearanceThemeData.border_radius_group.attrUnit } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div:last-child a {
					border-bottom-right-radius: ${ appearanceThemeData.border_radius_group.attrTop + appearanceThemeData.border_radius_group.attrUnit } !important;
					border-top-right-radius: ${ appearanceThemeData.border_radius_group.attrTop + appearanceThemeData.border_radius_group.attrUnit } !important;
				}
			`;
			// Get border radius values.
			if ( appearanceThemeData.border_radius_group.attrSyncUnits ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper,
					.has-admin-theme-preview-list.highlight-and-share-wrapper:not(.icons-grouped) a {
						border-radius: ${ appearanceThemeData.border_radius_group.attrTop }${ appearanceThemeData.border_radius_group.attrUnit } !important;
					}
				`;
			} else {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper,
					.has-admin-theme-preview-list.highlight-and-share-wrapper a {
						border-top-left-radius: ${ appearanceThemeData.border_radius_group.attrTop }${ appearanceThemeData.border_radius_group.attrUnit } !important;
						border-top-right-radius: ${ appearanceThemeData.border_radius_group.attrRight }${ appearanceThemeData.border_radius_group.attrUnit } !important;
						border-bottom-right-radius: ${ appearanceThemeData.border_radius_group.attrBottom }${ appearanceThemeData.border_radius_group.attrUnit } !important;
						border-bottom-left-radius: ${ appearanceThemeData.border_radius_group.attrLeft }${ appearanceThemeData.border_radius_group.attrUnit } !important;
					}
				`;
			}
		}
		if ( ! appearanceThemeData.group_icons ) {
			if ( appearanceThemeData.icon_border_radius.attrSyncUnits ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
						border-radius: ${ appearanceThemeData.icon_border_radius.attrTop }${ appearanceThemeData.icon_border_radius.attrUnit } !important;
					}
				`;
			} else {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
						border-top-left-radius: ${ appearanceThemeData.icon_border_radius.attrTop }${ appearanceThemeData.icon_border_radius.attrUnit } !important;
						border-top-right-radius: ${ appearanceThemeData.icon_border_radius.attrRight }${ appearanceThemeData.icon_border_radius.attrUnit } !important;
						border-bottom-right-radius: ${ appearanceThemeData.icon_border_radius.attrBottom }${ appearanceThemeData.icon_border_radius.attrUnit } !important;
						border-bottom-left-radius: ${ appearanceThemeData.icon_border_radius.attrLeft }${ appearanceThemeData.icon_border_radius.attrUnit } !important;
					}
				`;
			}
		}
	}
	// Set padding.
	if ( ! appearanceEmpty && 'custom' === appearanceThemeData.theme ) {
		// Get padding values.
		if ( appearanceThemeData.icon_padding.attrSyncUnits ) {
			themeStyles += `
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
					padding: ${ appearanceThemeData.icon_padding.attrTop }${ appearanceThemeData.icon_padding.attrUnit } !important;
				}
			`;
		} else {
			themeStyles += `
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
					padding-top: ${ appearanceThemeData.icon_padding.attrTop }${ appearanceThemeData.icon_padding.attrUnit } !important;
					padding-right: ${ appearanceThemeData.icon_padding.attrRight }${ appearanceThemeData.icon_padding.attrUnit } !important;
					padding-bottom: ${ appearanceThemeData.icon_padding.attrBottom }${ appearanceThemeData.icon_padding.attrUnit } !important;
					padding-left: ${ appearanceThemeData.icon_padding.attrLeft }${ appearanceThemeData.icon_padding.attrUnit } !important;
				}
			`;
		}
	}

	// Set icon size.
	if ( ! appearanceEmpty ) {
		themeStyles += `
			.has-admin-theme-preview-list.highlight-and-share-wrapper div a .has-icon {
				width: ${ appearanceThemeData.icon_size }px !important;
				height: ${ appearanceThemeData.icon_size }px !important;
			}
		`;
	}

	// Set font size.
	if ( ! appearanceEmpty ) {
		themeStyles += `
			.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
				font-size: ${ appearanceThemeData.font_size }px !important;
			}
		`;
	}

	// Set the icon gap.
	if ( ! appearanceEmpty ) {
		if ( ! appearanceThemeData.group_icons ) {
			if ( appearanceThemeData.orientation === 'horizontal' && 'custom' === theme ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div {
						margin-right: ${ appearanceThemeData.icon_gap }px !important;
					}
					.has-admin-theme-preview-list.highlight-and-share-wrapper div:last-child {
						margin-right: 0 !important;
					}
				`;
			} else if ( appearanceThemeData.orientation === 'vertical' && 'custom' === theme ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div {
						margin-bottom: ${ appearanceThemeData.icon_gap }px !important;
					}
					.has-admin-theme-preview-list.highlight-and-share-wrapper div:last-child {
						margin-bottom: 0 !important;
					}
				`;
			}
		}
	}

	// Set the tooltip background and color.
	themeStyles += `
		.has-admin-theme-preview-list.highlight-and-share-wrapper > div.has-tooltip:hover:after {
			background-color: ${ appearanceThemeData.tooltips_background_color } !important;
			color: ${ appearanceThemeData.tooltips_text_color } !important;
		}
	`;

	return (
		<>
			<style>
				{ themeStyles }
			</style>
			<div
				className={ classNames(
					'has-admin-theme-preview-list highlight-and-share-wrapper',
					`theme-${ appearanceThemeData.theme }`,
					{ 'icons-grouped': appearanceThemeData.group_icons },
					{ 'icons-ungrouped': ! appearanceThemeData.group_icons },
					{ 'orientation-horizontal': appearanceThemeData.orientation === 'horizontal' },
					{ 'orientation-vertical': appearanceThemeData.orientation === 'vertical' },
					{ 'has-label': ! appearanceThemeData.icons_only },
				) }
			>
				{ networks.map( ( network, index ) => {
					if ( network.enabled ) {
						return (
							<PreviewSocialIconListItem
								key={ network.key }
								listItemKey={ network.key }
								className={ network.className }
								icon={ network.icon }
								index={ index }
								label={ network.label }
								theme={ `theme-${ appearanceThemeData.theme }` }
							/>
						);
					}
					return null;
				} ) }
			</div>
		</>
	);
};

export default PreviewSocialIconList;
