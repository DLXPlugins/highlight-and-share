import React, { useState, Suspense, useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { escapeAttribute } from '@wordpress/escape-html';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import {
	TextControl,
	Button,
	ButtonGroup,
	RadioControl,
	SelectControl,
	ToggleControl,
	RangeControl,
} from '@wordpress/components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ErrorBoundary from '../Components/ErrorBoundary';
import Notice from '../Components/Notice';
import CircularInfoIcon from '../Components/Icons/CircularInfo';
import CircularExclamationIcon from '../Components/Icons/CircularExplanation';
import Spinner from '../Components/Icons/Spinner';
import sendCommand from '../Utils/SendCommand';
import Loader from '../Components/Loader';
import SocialIconList from '../Components/SocialIconList';
import PreviewSocialIconList from '../Components/PreviewSocialIconList';
import ThemeCustomizer from '../Components/ThemeCustomizer';

const retrieveDefaults = () => {
	return sendCommand( 'has_retrieve_settings_tab', {
		nonce: hasAppearanceAdmin.retrieveNonce,
	} );
};

const ThemesTemp = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveDefaults, [] );

	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load advanced options.', 'quotes-dlx' ) }
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
					<Loader
						title={ __( 'Welcome to Highlight and Share', 'highlight-and-share' ) }
						label={ __( 'Loading…', 'highlight-and-share' ) }
						color="var(--wp-admin-theme-color)"
					/>
				}
			>
				<Interface defaults={ defaults } { ...props } />
			</Suspense>
		</ErrorBoundary>
	);
};

const Appearance = ( props ) => {
	// Get retrieved data.
	// const { defaults } = props;
	// const response = defaults();
	// const { data, success } = response.data;

	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );

	const [ socialNetworks, setSocialNetworks ] = useState( hasAppearanceAdmin.socialNetworks );

	const getDefaultValues = () => {
		return {
			enableMobile: '',
			enableContent: '',
			enableExcerpt: '',
			sharingPrefix: '',
			sharingSuffix: '',
			showTwitter: '',
			twitter: '',
			enableHashtags: '',
			showFacebook: '',
			showWhatsApp: '',
			whatsAppApiEndpoint: '',
			showReddit: '',
			showTelegram: '',
			showLinkedin: '',
			showXing: '',
			showCopy: '',
			enableEmails: '',
			shortlinks: '',
			jsContent: '',
			elementContent: '',
			idContent: '',
		};
	};
	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,
		trigger,
	} = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		setSaving( true );

		sendCommand( 'has_save_settings_tab', {
			nonce: hasAppearanceAdmin.saveNonce,
			form_data: formData,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					// Reset count.
					reset( ajaxData );
					setIsSaved( true );
					setTimeout( () => {
						setIsSaved( false );
					}, 3000 );
				} else {
					// Error stuff.
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setSaving( false );
			} );
	};
	const handleReset = ( e ) => {
		setResetting( true );
		sendCommand( 'has_reset_settings_tab', {
			nonce: hasAppearanceAdmin.resetNonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					// Clear form dirty.
					reset( ajaxData );

					setIsReset( true );
					setTimeout( () => {
						setIsReset( false );
					}, 3000 );
				} else {
					// Error stuff.
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setResetting( false );
			} );
	};
	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	const getIcons = () => {
		// Now return component with icons.
		return (
			<DndProvider backend={ HTML5Backend }>
				<SocialIconList />
			</DndProvider>
		);
	};

	const getPreview = () => {
		// Now return component with icons.
		return (
			<>
				<PreviewSocialIconList />
			</>
		);
	};

	return (
		<>
			<div className="has-admin-container-body__content">
				<div className="has-admin-content-wrapper">
					<div className="has-admin-content-panel">
						<div className="has-admin-content-heading">
							<h1>
								<span className="has-admin-content-heading-text">
									{ __( 'Appearance and Theme Settings', 'quotes-dlx' ) }
								</span>
							</h1>
							<p className="description">
								{ __(
									'On this screen, you can customize the look of Highlight and Share, and reorder the sharing buttons.',
									'quotes-dlx'
								) }
							</p>
						</div>
						<div className="has-admin-content-body">
							<h2 className="has-admin-content-subheading">
								{ __( 'Reorder Sharing Networks', 'highlight-and-share' ) }
							</h2>
							<p className="description">{ __( 'All available social icons are shown in the event more are enabled/disabled later.', 'highlight-and-share' ) }</p>
							<div className="has-admin-component-row">{ getIcons() }</div>
						</div>
					</div>
				</div>
			</div>
			<div className="has-admin-container-body__content">
				<div className="has-admin-content-wrapper">
					<div className="has-admin-content-panel">
						<div className="has-admin-content-body">
							<h2 className="has-admin-content-subheading">
								{ __( 'Theme Selection and Customizer', 'highlight-and-share' ) }
							</h2>
							<p className="description">{ __( 'Select a theme to use for Highlight and Share, or choose custom and manually configure a theme.', 'highlight-and-share' ) }</p>
							<ThemeCustomizer />
						</div>
					</div>
				</div>
			</div>
			<div className="has-admin-container-body__content">
				<div className="has-admin-content-wrapper">
					<div className="has-admin-content-panel">
						<div className="has-admin-content-body">
							<h2 className="has-admin-content-subheading">
								{ __( 'Theme Preview', 'highlight-and-share' ) }
							</h2>
							<p className="description">{ __( 'Please use this section to see a preview of how Highlight and Share will look on the frontend.', 'highlight-and-share' ) }</p>
							<div className="has-admin-component-row">
								{ getPreview() }
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Appearance;
