import React, { useState, Suspense, useContext } from 'react';
import { __, _x } from '@wordpress/i18n';
import { escapeAttribute } from '@wordpress/escape-html';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import SocialIcons from './../Components/SocialIcons';
import {
	TextControl,
	Button,
	RadioControl,
	ToggleControl,
} from '@wordpress/components';
import ErrorBoundary from '../Components/ErrorBoundary';
import Notice from '../Components/Notice';
import CircularInfoIcon from '../Components/Icons/CircularInfo';
import CircularExclamationIcon from '../Components/Icons/CircularExplanation';
import Spinner from '../Components/Icons/Spinner';
import sendCommand from '../Utils/SendCommand';
import Loader from '../Components/Loader';
import twttr from '../Validation/twitter';

const retrieveDefaults = () => {
	return sendCommand( 'has_retrieve_settings_tab', {
		nonce: hasSettingsAdmin.retrieveNonce,
	} );
};

const Settings = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveDefaults, [] );

	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load advanced.', 'quotes-dlx' ) }
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

const Interface = ( props ) => {
	// Get retrieved data.
	const { defaults } = props;
	const response = defaults();
	const { data, success } = response.data;
	const { getSocialIcon } = SocialIcons( data.socialNetworks );

	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );

	const getDefaultValues = () => {
		return {
			enableMobile: data.values.enableMobile,
			enableContent: data.values.enableContent,
			enableExcerpt: data.values.enableExcerpt,
			sharingPrefix: data.values.sharingPrefix,
			sharingSuffix: data.values.sharingSuffix,
			showTwitter: data.values.showTwitter,
			twitter: data.values.twitter,
			enableHashtags: data.values.enableHashtags,
			showFacebook: data.values.showFacebook,
			showWhatsApp: data.values.showWhatsApp,
			whatsAppApiEndpoint: data.values.whatsappApiEndpoint,
			showReddit: data.values.showReddit,
			showTelegram: data.values.showTelegram,
			showLinkedin: data.values.showLinkedin,
			showXing: data.values.showXing,
			showCopy: data.values.showCopy,
			enableEmails: data.values.enableEmails,
			shortlinks: data.values.shortlinks,
			jsContent: data.values.jsContent,
			elementContent: data.values.elementContent,
			idContent: data.values.idContent,
			twitterLabel: data.values.twitterLabel,
			twitterTooltip: data.values.twitterTooltip,
			facebookLabel: data.values.facebookLabel,
			facebookTooltip: data.values.facebookTooltip,
			whatsappLabel: data.values.whatsappLabel,
			whatsappTooltip: data.values.whatsappTooltip,
			redditLabel: data.values.redditLabel,
			redditTooltip: data.values.redditTooltip,
			telegramLabel: data.values.telegramLabel,
			telegramTooltip: data.values.telegramTooltip,
			linkedinLabel: data.values.linkedinLabel,
			linkedinTooltip: data.values.linkedinTooltip,
			xingLabel: data.values.xingLabel,
			xingTooltip: data.values.xingTooltip,
			copyLabel: data.values.copyLabel,
			copyTooltip: data.values.copyTooltip,
			emailLabel: data.values.emailLabel,
			emailTooltip: data.values.emailTooltip,
		};
	};
	const { control, handleSubmit, getValues, reset } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		setSaving( true );

		sendCommand( 'has_save_settings_tab', {
			nonce: hasSettingsAdmin.saveNonce,
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
			nonce: hasSettingsAdmin.resetNonce,
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

	return (
		<form onSubmit={ handleSubmit( onSubmit ) }>
			<div className="has-admin-content-wrapper">
				<div className="has-admin-content-panel">
					<div className="has-admin-content-heading">
						<h1>
							<span className="has-admin-content-heading-text">
								{ __( 'Welcome to Highlight and Share', 'quotes-dlx' ) }
							</span>
						</h1>
						<p className="description">
							{ __(
								'On this screen, you can control where Highlight and Share will show up, which social networks to enable, and whether to enable shortlinks.',
								'quotes-dlx'
							) }
						</p>
					</div>
					<div className="has-admin-content-body">
						<h2 className="has-admin-content-subheading">
							{ __( 'Display', 'highlight-and-share' ) }
						</h2>
						<div className="has-admin-component-row">
							<Controller
								name="enableMobile"
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<ToggleControl
										label={ __(
											'Enable on Mobile Devices',
											'highlight-and-share'
										) }
										className="has-admin__toggle-control"
										checked={ value }
										onChange={ ( boolValue ) => {
											onChange( boolValue );
										} }
										help={ __(
											'Most mobile devices have limited screen real estate. Enable this option to show the Highlight and Share buttons on mobile devices.',
											'highlight-and-share'
										) }
									/>
								) }
							/>
						</div>
						<div className="has-admin-component-row">
							<Controller
								name="enableContent"
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<ToggleControl
										label={ __(
											'Enable on the Post Content',
											'highlight-and-share'
										) }
										className="has-admin__toggle-control"
										checked={ value }
										onChange={ ( boolValue ) => {
											onChange( boolValue );
										} }
										help={ __(
											'Enabling this option will show the Highlight and Share buttons when users highlight post content.',
											'highlight-and-share'
										) }
									/>
								) }
							/>
						</div>
						<div className="has-admin-component-row">
							<Controller
								name="enableExcerpt"
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<ToggleControl
										label={ __(
											'Enable on the Post Excerpt',
											'highlight-and-share'
										) }
										className="has-admin__toggle-control"
										checked={ value }
										onChange={ ( boolValue ) => {
											onChange( boolValue );
										} }
										help={ __(
											'Enabling this option will show the Highlight and Share buttons when users highlight a post excerpt.',
											'highlight-and-share'
										) }
									/>
								) }
							/>
						</div>
					</div>
				</div>
				<div className="has-admin-content-body">
					<h2 className="has-admin-content-subheading">
						{ __( 'Text Settings', 'highlight-and-share' ) }
					</h2>
					<div className="has-admin-component-row">
						<Controller
							name="sharingPrefix"
							control={ control }
							render={ ( { field } ) => (
								<TextControl
									{ ...field }
									type="text"
									label={ __( 'Sharing Text Before', 'highlight-and-share' ) }
									className={ classNames( 'has-admin__text-control' ) }
									help={ __(
										'Choose a prefix to go before the sharing text such as a quote.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="sharingSuffix"
							control={ control }
							render={ ( { field } ) => (
								<TextControl
									{ ...field }
									type="text"
									label={ __( 'Sharing Text After', 'highlight-and-share' ) }
									className={ classNames( 'has-admin__text-control' ) }
									help={ __(
										'Choose a suffix to go after the sharing text such as a quote.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</div>
				</div>
				<div className="has-admin-content-body">
					<h2 className="has-admin-content-subheading">
						{ __( 'Social Networks', 'highlight-and-share' ) }
					</h2>
					<h3 className="has-icon-heading">
						{ getSocialIcon( 'twitter' ) } { __( 'Twitter', 'highlight-and-share' ) }
					</h3>
					<div className="has-admin-component-row">
						<Controller
							name="showTwitter"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<ToggleControl
									label={ __(
										'Enable the Twitter Social Network',
										'highlight-and-share'
									) }
									className="has-admin__toggle-control"
									checked={ value }
									onChange={ ( boolValue ) => {
										onChange( boolValue );
									} }
									help={ __(
										'Twitter allows text sharing.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</div>
					{ getValues( 'showTwitter' ) && (
						<>
							<div className="has-admin-component-row">
								<Controller
									name="twitterLabel"
									control={ control }
									rules={ { required: true } }
									render={ ( { field } ) => (
										<>
											<TextControl
												{ ...field }
												type="text"
												label={ __( 'Twitter Label', 'highlight-and-share' ) }
												className={ classNames( 'has-admin__text-control', {
													'is-required': true,
													'has-error': 'required' === errors.twitterLabel?.type,
												} ) }
												help={ __(
													'Choose a label for the Twitter button.',
													'highlight-and-share'
												) }
												aria-required="true"
											/>
											{ 'required' === errors.twitterLabel?.type && (
												<Notice
													message={ __( 'This field is a required field.' ) }
													status="error"
													politeness="assertive"
													inline={ false }
													icon={ CircularExclamationIcon }
												/>
											) }
										</>
									) }
								/>
							</div>
							<div className="has-admin-component-row">
								<Controller
									name="twitterTooltip"
									control={ control }
									rules={ { required: true } }
									render={ ( { field } ) => (
										<>
											<TextControl
												{ ...field }
												type="text"
												label={ __( 'Twitter Tooltip', 'highlight-and-share' ) }
												className={ classNames( 'has-admin__text-control', {
													'is-required': true,
													'has-error': 'required' === errors.twitterTooltip?.type,
												} ) }
												help={ __(
													'Choose a label for the Twitter button.',
													'highlight-and-share'
												) }
												aria-required="true"
											/>
											{ 'required' === errors.twitterTooltip?.type && (
												<Notice
													message={ __( 'This field is a required field.' ) }
													status="error"
													politeness="assertive"
													inline={ false }
													icon={ CircularExclamationIcon }
												/>
											) }
										</>
									) }
								/>
							</div>
							<div className="has-admin-component-row">
								<Controller
									name="enableHashtags"
									control={ control }
									render={ ( { field: { onChange, value } } ) => (
										<ToggleControl
											label={ __(
												'Enable Twitter Hashtags',
												'highlight-and-share'
											) }
											className="has-admin__toggle-control"
											checked={ value }
											onChange={ ( boolValue ) => {
												onChange( boolValue );
											} }
											help={ __(
												'Hashtags can be set on a post or page in the sidebar.',
												'highlight-and-share'
											) }
										/>
									) }
								/>
							</div>
							<div className="has-admin-component-row">
								<Controller
									name="twitter"
									control={ control }
									rules={ {
										validate: ( value ) => {
											if ( value.length === 0 ) {
												return true;
											}
											return twttr.txt.isValidUsername( '@' + value );
										},
									} }
									render={ ( { field: { onChange, value } } ) => (
										<>
											<TextControl
												value={ value }
												type="text"
												label={ __( 'Twitter Username', 'highlight-and-share' ) }
												className={ classNames( 'has-admin__text-control', { 
													'has-error': errors.twitter,
												} ) }
												help={ __(
													'Enter Your Twitter Username without the @ symbol.',
													'highlight-and-share'
												) }
												onChange={ ( currentValue ) => {
													let twitterUsername = '';
													if ( currentValue.length > 0 ) {
														const replacement = currentValue.replace( '@', '' ); // Strip @ symbol.
														if ( currentValue.length > 0 ) {
															const usernames = twttr.txt.extractMentions(
																'@' + replacement
															);
															if ( typeof usernames[ 0 ] !== 'undefined' ) {
																twitterUsername = usernames[ 0 ];
															} else {
																twitterUsername = replacement;
															}
														}
													}
													onChange( twitterUsername );
												} }
											/>
											{ 'validate' === errors.twitter?.type && (
												<Notice
													message={ __(
														'The Twitter Username is Invalid.',
														'highlight-and-share'
													) }
													status="error"
													politeness="assertive"
													inline={ false }
													icon={ CircularExclamationIcon }
												/>
											) }
										</>
									) }
								/>
							</div>
						</>
					) }
				</div>
				<h3 className="has-icon-heading">
					{ getSocialIcon( 'facebook' ) } { __( 'Facebook', 'highlight-and-share' ) }
				</h3>
				<div className="has-admin-component-row">
					<Controller
						name="showFacebook"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __(
									'Enable the Facebook Social Network',
									'highlight-and-share'
								) }
								className="has-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Facebook only allows URL sharing.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>
				<h3 className="has-icon-heading">
					{ getSocialIcon( 'whatsapp' ) } { __( 'WhatsApp', 'highlight-and-share' ) }
				</h3>
				<div className="has-admin-component-row">
					<Controller
						name="showWhatsApp"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable WhatsApp', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'WhatsApp allows text sharing.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>
				{ getValues( 'showWhatsApp' ) && (
					<div className="has-admin-component-row">
						<Controller
							name="whatsAppApiEndpoint"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<RadioControl
									label="WhatsApp Endpoint"
									help={ __(
										'Select the endpoint to use.',
										'highlight-and-share'
									) }
									selected={ value }
									options={ [
										{
											label: __( 'Use the WhatsApp Web Endpoint' ),
											value: 'web',
										},
										{
											label: __( 'Use the WhatsApp App Endpoint' ),
											value: 'app',
										},
									] }
									onChange={ ( radioValue ) => onChange( radioValue ) }
								/>
							) }
						/>
					</div>
				) }
				<h3 className="has-icon-heading">
					{ getSocialIcon( 'reddit' ) }{ ' ' }
					{ _x( 'Reddit', 'Reddit Social Network', 'highlight-and-share' ) }
				</h3>
				<div className="has-admin-component-row">
					<Controller
						name="showReddit"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Reddit', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __( 'Reddit allows URL sharing.', 'highlight-and-share' ) }
							/>
						) }
					/>
				</div>
				<h3 className="has-icon-heading">
					{ getSocialIcon( 'telegram' ) }{ ' ' }
					{ _x( 'Telegram', 'Telegram Social Network', 'highlight-and-share' ) }
				</h3>
				<div className="has-admin-component-row">
					<Controller
						name="showTelegram"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Telegram', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Telegram allows text sharing.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>
				<h3 className="has-icon-heading">
					{ getSocialIcon( 'linkedin' ) }{ ' ' }
					{ _x( 'LinkedIn', 'LinkedIn Social Network', 'highlight-and-share' ) }
				</h3>
				<div className="has-admin-component-row">
					<Controller
						name="showLinkedin"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable LinkedIn', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __( 'LinkedIn allows URL sharing.', 'highlight-and-share' ) }
							/>
						) }
					/>
				</div>
				<h3 className="has-icon-heading">
					{ getSocialIcon( 'xing' ) }{ ' ' }
					{ _x( 'Xing', 'Xing Social Network', 'highlight-and-share' ) }
				</h3>
				<div className="has-admin-component-row">
					<Controller
						name="showXing"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Xing', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __( 'Xing allows URL sharing.', 'highlight-and-share' ) }
							/>
						) }
					/>
				</div>
				<h3 className="has-icon-heading">
					{ getSocialIcon( 'email' ) }{ ' ' }
					{ _x( 'Email', 'Email Social Network', 'highlight-and-share' ) }
				</h3>
				<div className="has-admin-component-row">
					<Controller
						name="enableEmails"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Emails', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Users will be able to send an email when highlighting text.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>
				<h3 className="has-icon-heading">
					{ getSocialIcon( 'copy' ) }{ ' ' }
					{ _x( 'Copy', 'Copy Social Network', 'highlight-and-share' ) }
				</h3>
				<div className="has-admin-component-row">
					<Controller
						name="showCopy"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Enable Copy', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Users will be able to copy the selected text when highlighting content.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>
				<h3>{ __( 'Shortlinks', 'highlight-and-share' ) }</h3>
				<div className="has-admin-component-row">
					<>
						<Notice
							message={ __(
								'A third-party URL shortening service must be installed for URL shortening to work.',
								'highlight-and-share'
							) }
							status="info"
							politeness="polite"
							inline={ false }
							icon={ CircularInfoIcon }
						/>
						<Controller
							name="shortlinks"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<ToggleControl
									label={ __( 'Enable Shortlinks', 'highlight-and-share' ) }
									className="has-admin__toggle-control"
									checked={ value }
									onChange={ ( boolValue ) => {
										onChange( boolValue );
									} }
									help={ __(
										'Shortlinks allow you to condence a post URL. You must have a URL shortener enabled to see shortlinks.',
										'highlight-and-share'
									) }
								/>
							) }
						/>
					</>
				</div>
				<h2 className="has-admin-content-subheading">
					{ __( 'Advanced', 'highlight-and-share' ) }
				</h2>
				<p className="description">
					{ __(
						'These advanced settings allow Highlight and Share to work with your theme, particularly if you are using a page builder.',
						'highlight-and-share'
					) }
				</p>
				<div className="has-admin-component-row">
					<>
						<Controller
							name="jsContent"
							control={ control }
							rules={ {
								pattern: /^\.?[-_,A-Za-z0-9]+$/i,
							} }
							render={ ( { field } ) => (
								<>
									<TextControl
										{ ...field }
										type="text"
										label={ __( 'CSS Class Selectors', 'highlight-and-share' ) }
										className={ classNames( 'has-admin__text-control' ) }
										help={ __(
											'Separate each class with commas.',
											'highlight-and-share'
										) }
									/>
									{ 'pattern' === errors.jsContent?.type && (
										<Notice
											message={ __( 'There are invalid characters.' ) }
											status="error"
											politeness="assertive"
											inline={ true }
											icon={ CircularExclamationIcon }
										/>
									) }
								</>
							) }
						/>
					</>
				</div>
				<div className="has-admin-component-row">
					<>
						<Controller
							name="idContent"
							control={ control }
							rules={ {
								pattern: /^\#?[-_,A-Za-z0-9]+$/i,
							} }
							render={ ( { field } ) => (
								<>
									<TextControl
										{ ...field }
										type="text"
										label={ __( 'CSS ID Selectors', 'highlight-and-share' ) }
										className={ classNames( 'has-admin__text-control' ) }
										help={ __(
											'Separate each ID with commas.',
											'highlight-and-share'
										) }
									/>
									{ 'pattern' === errors.jsContent?.type && (
										<Notice
											message={ __( 'There are invalid characters.' ) }
											status="error"
											politeness="assertive"
											inline={ true }
											icon={ CircularExclamationIcon }
										/>
									) }
								</>
							) }
						/>
					</>
				</div>
				<div className="has-admin-component-row">
					<>
						<Controller
							name="elementContent"
							control={ control }
							rules={ {
								pattern: /^[,A-Za-z0-9]+$/i,
							} }
							render={ ( { field } ) => (
								<>
									<TextControl
										{ ...field }
										type="text"
										label={ __( 'HTML Element Selectors', 'highlight-and-share' ) }
										className={ classNames( 'has-admin__text-control' ) }
										help={ __(
											'Separate each element with commas.',
											'highlight-and-share'
										) }
									/>
									{ 'pattern' === errors.elementContent?.type && (
										<Notice
											message={ __( 'There are invalid characters.' ) }
											status="error"
											politeness="assertive"
											inline={ true }
											icon={ CircularExclamationIcon }
										/>
									) }
								</>
							) }
						/>
					</>
				</div>
				<div className="has-admin__tabs--content-actions">
					<div className="has-admin__tabs--content-actions--left">
						<Button
							className={ classNames(
								'has__btn has__btn-primary has__btn--icon-right',
								{ 'has-error': hasErrors() },
								{ 'has-icon': saving },
								{ 'is-saving': { saving } }
							) }
							type="submit"
							text={
								saving
									? __( 'Saving…', 'highlight-and-share' )
									: __( 'Save Settings', 'highlight-and-share' )
							}
							icon={ saving ? Spinner : false }
							iconSize="18"
							iconPosition="right"
							disabled={ saving || resetting }
						/>
					</div>
					<div className="has-admin__tabs--content-actions--right">
						<Button
							className={ classNames(
								'has__btn has__btn-danger has__btn--icon-right',
								{ 'has-icon': resetting },
								{ 'is-resetting': { resetting } }
							) }
							type="button"
							text={
								resetting
									? __( 'Resetting…', 'highlight-and-share' )
									: __( 'Reset Settings', 'highlight-and-share' )
							}
							icon={ resetting ? Spinner : false }
							iconSize="18"
							iconPosition="right"
							disabled={ saving || resetting }
							onClick={ ( e ) => {
								setResetting( true );
								handleReset( e );
							} }
						/>
					</div>
				</div>
				{ hasErrors() && (
					<Notice
						message={ __(
							'There are form validation errors. Please correct them above.'
						) }
						status="error"
						politeness="polite"
					/>
				) }
				{ isSaved && (
					<Notice
						message={ __( 'Your settings have been saved.' ) }
						status="success"
						politeness="assertive"
					/>
				) }
				{ isReset && (
					<Notice
						message={ __( 'Your settings have been reset to defaults.' ) }
						status="success"
						politeness="assertive"
					/>
				) }
			</div>
		</form>
	);
};

export default Settings;
