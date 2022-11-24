import React, { useState, Suspense, useContext } from 'react';
import { __, _x } from '@wordpress/i18n';
import { escapeAttribute, escapeEditableHTML } from '@wordpress/escape-html';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import SocialIcons from '../Components/SocialIcons';
import {
	TextControl,
	Button,
	RangeControl,
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
	return sendCommand( 'has_retrieve_emails_tab', {
		nonce: hasEmailsAdmin.retrieveNonce,
	} );
};

const Emails = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveDefaults, [] );

	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Emails Tab.', 'highlight-and-share' ) }
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
							title={ __( 'Email Settings', 'highlight-and-share' ) }
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
			akismetEnabled: data.values.akismetEnabled,
			recaptchaEnabled: data.values.recaptchaEnabled,
			recaptchaSiteKey: data.values.recaptchaSiteKey,
			recaptchaSecretKey: data.values.recaptcahSecretKey,
			recaptchaScoreThreshold: data.values.recaptchaScoreThreshold,
		};
	};
	const { control, handleSubmit, getValues, reset } = useForm( {
		defaultValues: getDefaultValues(),
	} );
	const formValues = useWatch( { control } );
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
		<>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<div className="has-admin-container-body__content">
					<div className="has-admin-content-wrapper">
						<div className="has-admin-content-panel">
							<div className="has-admin-content-heading">
								<h1>
									<span className="has-admin-content-heading-text">
										{ __( 'Email Settings', 'highlight-and-share' ) }
									</span>
								</h1>
								<p className="description">
									{ __(
										'On this screen, you can set the email options such as spam protection when sharing via email.',
										'highlight-and-share'
									) }
								</p>
							</div>
							<div className="has-admin-content-body">
								<h2 className="has-admin-content-subheading">
									{ __( 'Akismet Spam Protection', 'highlight-and-share' ) }
								</h2>
								<p className="description">{ __( 'Akismet is a spam protection service that is very effective in determining if a particular email is spammy.', 'highlight-and-share' ) }</p>
								<div className="has-admin-component-row">
									<Controller
										name="akismetEnabled"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable Akismet Spam Protection',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'If you have Akismet enabled, it is recommended to enable Akismet protection',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
							</div>
							<div className="has-admin-content-body">
								<h2 className="has-admin-content-subheading">
									{ __( 'Google reCAPTCHA 3 Settings', 'highlight-and-share' ) }
								</h2>
								<p className="description">{ __( 'reCAPTCHA 3 is an invisible captcha and is the least obtrusive option for keeping bots out of your email section.', 'highlight-and-share' ) }</p>
								<div className="has-admin-component-row">
									<Controller
										name="recaptchaEnabled"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable reCAPTCHA 3',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Enable reCAPTCHA 3 to silently discard spammy emails.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								{ getValues( 'recaptchaEnabled' ) && (
									<>
										<Controller
											name="recaptchaSiteKey"
											control={ control }
											rules={ { required: true } }
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'Recaptcha 3 Site Key', 'highlight-and-share' ) }
													{ ...field }
													className={ classNames( 'has-admin__text-control', {
														'has-error': 'required' === errors.recaptchaSiteKey?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Enter your Recaptcha 3 Site Key',
														'comment-edit-pro'
													) }
													aria-required="true"
												/>
											) }
										/>
										{ 'required' === errors.recaptchaSiteKey?.type && (
											<Notice
												message={ __( 'This field is a required field.' ) }
												status="error"
												politeness="assertive"
												inline={ true }
												icon={ CircularExclamationIcon }
											/>
										) }
										<Controller
											name="recaptchaSecretKey"
											control={ control }
											rules={ { required: true } }
											render={ ( { field } ) => (
												<TextControl
													label={ __( 'Recaptcha 3 Secret Key', 'highlight-and-share' ) }
													{ ...field }
													className={ classNames( 'has-admin__text-control', {
														'has-error': 'required' === errors.recaptchaSiteKey?.type,
														'is-required': true,
													} ) }
													help={ __(
														'Enter your Recaptcha 3 Secret Key',
														'comment-edit-pro'
													) }
													aria-required="true"
												/>
											) }
										/>
										{ 'required' === errors.recaptchaSecretKey?.type && (
											<Notice
												message={ __( 'This field is a required field.' ) }
												status="error"
												politeness="assertive"
												inline={ true }
												icon={ CircularExclamationIcon }
											/>
										) }
										<Controller
											name="recaptchaScoreThreshold"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<>
													<RangeControl
														label={ __( 'Set reCAPTCHA Minimum Threshold', 'comment-edit-pro' ) }
														step={ 0.05 }
														value={ value }
														max={ 1 }
														min={ 0 }
														currentInput={ value }
														initialPosition={ value }
														allowReset={ true }
														className="has-admin__range-control"
														onChange={ ( recaptchaThreshold ) => {
															onChange( recaptchaThreshold );
														} }
														help={ __(
															'The threshold score is between 0 and 1. The higher the score, the higher the chance of a successful reCAPTCHA challenge. The default value is 0.5. Meaning that the reCAPTCHA challenge will succeed if the score is greater than or equal to 0.5.',
															'comment-edit-pro'
														) }
														trackColor="#4F4F4F"
														railColor="#CECECE"
													/>
												</>
											) }
										/>
									</>
								) }
							</div>
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
											: __( 'Save Email Settings', 'highlight-and-share' )
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
											: __( 'Reset Email Settings', 'highlight-and-share' )
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
									'There are form validation errors. Please correct them above.', 'highlight-and-share'
								) }
								status="error"
								politeness="polite"
							/>
						) }
						{ isSaved && (
							<Notice
								message={ __( 'Your settings have been saved.', 'highlight-and-share' ) }
								status="success"
								politeness="assertive"
							/>
						) }
						{ isReset && (
							<Notice
								message={ __( 'Your settings have been reset to defaults.', 'highlight-and-share' ) }
								status="success"
								politeness="assertive"
							/>
						) }
					</div>
				</div>
			</form>
		</>
	);
};

export default Emails;
