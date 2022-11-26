import React, { useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { __ } from '@wordpress/i18n';
import Appearance from './appearance';
import SocialNetworksContext from '../Contexts/SocialNetworksContext';
import { useAsyncResource } from 'use-async-resource';
import ErrorBoundary from '../Components/ErrorBoundary';
import Loader from '../Components/Loader';
import sendCommand from '../Utils/SendCommand';

const retrieveDefaults = () => {
	return sendCommand( 'has_retrieve_appearance_settings_context', {
		nonce: hasAppearanceAdmin.retrieveNonce,
	} );
};

const Wrapper = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveDefaults, [] );
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load appearance options.', 'quotes-dlx' ) }
					<br />
					<a
						href="https://dlxplugins.com/support/"
						target="_blank"
						rel="noopener noreferrer"
					>
						DLX Plugins Support
					</a>
				</p>
			}
		>
			<Suspense
				fallback={
					<div className="has-admin-container-body__content">
						<Loader
							title={ __( 'Appearance and Theme Settings', 'highlight-and-share' ) }
							label={ __( 'Loading…', 'highlight-and-share' ) }
							color="var(--wp-admin-theme-color)"
						/>
					</div>
				}
			>
				<Interface defaults={ defaults } { ...props } />
			</Suspense>
		</ErrorBoundary>
	);
};

const container = document.getElementById( 'has-appearance-admin-settings' );
const root = createRoot( container );

const Interface = ( props ) => {
	const { defaults } = props;
	const response = defaults();
	const { data, success } = response.data;
	const [ socialNetworks, setSocialNetworks ] = useState(
		data.socialNetworks
	);
	const [ theme, setTheme ] = useState( data.themeOptionsCustom.theme );
	const [ appearanceThemeData, setAppearanceThemeData ] = useState( data.themeOptionsCustom );
	const [ hasIconsOnly, setHasIconsOnly ] = useState(
		data.themeOptionsCustom.icons_only
	);
	const [ socialNetworkColors, setSocialNetworkColors ] = useState(
		data.themeOptionsCustom.icon_colors
	);
	const [ mainSettings ] = useState( data.settings );

	return (
		<SocialNetworksContext.Provider
			value={ {
				socialNetworks,
				setSocialNetworks,
				theme,
				setTheme,
				appearanceThemeData,
				setAppearanceThemeData,
				hasIconsOnly,
				setHasIconsOnly,
				socialNetworkColors,
				setSocialNetworkColors,
				mainSettings,
			} }
		>
			<Appearance />
		</SocialNetworksContext.Provider>
	);
};
root.render(
	<React.StrictMode>
		<Wrapper />
	</React.StrictMode>
);
