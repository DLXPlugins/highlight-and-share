/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import {
	TextControl,
	Button,
} from '@wordpress/components';
import { escapeAttribute, escapeEditableHTML } from '@wordpress/escape-html';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import Notice from '../Components/Notice';
import CircularExclamationIcon from '../Components/Icons/CircularExplanation';
import Loader from '../Components/Loader';
import sendCommand from '../Utils/SendCommand';

// Get URL Query Parameter: type
const urlParams = new URLSearchParams( window.location.search );
const emailShareType = urlParams.get( 'type' ); // can be highlight, quote, selection.

const View = () => {
	const [ isSent, setIsSent ] = useState( false );
	const [ isSending, setIsSending ] = useState( false );
	const [ formErrors, setFormErrors ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState( false );
	const [ firstNameFieldFocus, setFirstNameFieldFocus ] = useState( false );
	const firstNameField = useRef( null );

	/**
	 * Get a title for the email modal.
	 *
	 * @return {string} The title of the modal.
	 */
	const getModalTitle = () => {
		switch ( emailShareType ) {
			case 'highlight':
				return __( 'Email this Highlight', 'highlight-and-share' );
			case 'quote':
				return __( 'Email this Quote', 'highlight-and-share' );
			case 'selection':
				return __( 'Email this Selection', 'highlight-and-share' );
			default:
				return __( 'Email this Page', 'highlight-and-share' );
		}
	};

	/**
	 * Select first name field upon first load.
	 */
	const selectFirstNameField = () => {
		if ( firstNameField.current && ! firstNameFieldFocus ) {
			firstNameField.current.focus();
			setFirstNameFieldFocus( true );
		}
	};

	useEffect( () => {
		selectFirstNameField();
	}, [] );

	/**
	 * Get a title for the email modal.
	 *
	 * @return {string} The title of the modal.
	 */
	const getEmailSubject = () => {
		switch ( emailShareType ) {
			case 'highlight':
				return __( 'Check out this Highlight from {sitename}', 'highlight-and-share' );
			case 'quote':
				return __( 'Check out this Quote from {sitename}', 'highlight-and-share' );
			case 'selection':
				return __( 'Check out this Text Selection from {sitename}', 'highlight-and-share' );
			default:
				return __( 'Check out this page I found from {sitename}', 'highlight-and-share' );
		}
	};

	const getDefaultValues = () => {
		return {
			toEmail: '',
			fromEmail: '',
			fromName: '',
			subject: getEmailSubject(),
			recaptchaToken: '',
			nonce: hasEmailModal.nonce,
			permalink: hasEmailModal.permalink,
			shareText: hasEmailModal.share_text,
			postId: hasEmailModal.post_id,
		};
	};
	const { control, handleSubmit, setValue } =
		useForm( {
			defaultValues: getDefaultValues(),
		} );

	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		setIsSending( true );
		setFormErrors( false );
		setErrorMessage( '' );

		// Save stuff here.
		sendCommand( 'has_email_form_submission', {
			formData,
		}, hasEmailModal.ajaxurl ).then( ( ajaxResponse ) => {
			const ajaxData = ajaxResponse.data.data;
			const ajaxSuccess = ajaxResponse.data.success;

			if ( ajaxSuccess ) {
				setIsSent( true );
				setTimeout(
					() => {
						window.parent.window.highlightShareFancy.close(); // See frontendjs/highlight-and-share.js for this variable.
					},
					3000
				);
			} else {
				setFormErrors( true );
				setErrorMessage( ajaxData.message );
			}
		} )
			.catch( ( ajaxResponse ) => { } )
			.then( ( ajaxResponse ) => {
				setIsSending( false );
			} );
	};

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	const validateEmail = ( email ) => {
		// From: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
		const regex =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if ( regex.test( email ) ) {
			return true;
		}
		return false;
	};

	// If the email is sent, show a success message.
	if ( isSent ) {
		return (
			<section className="has-email--content-wrap">
				<div className="has-email-control-row">
					<Notice
						message={ __( 'The email has been sent.' ) }
						status="success"
						politeness="assertive"
					/>
				</div>
			</section>
		);
	}

	return (
		<section className="has-email--content-wrap">
			<h2>{ getModalTitle() }</h2>
			<form id="has-email-quote-form" onSubmit={ handleSubmit( onSubmit ) }>
				<div className="has-email-control-row">
					<Controller
						name="fromName"
						control={ control }
						rules={ {
							required: true,
						} }
						render={ ( { field } ) => (
							<TextControl
								{ ...field }
								label={ __( 'Your Name:', 'highlight-and-share' ) }
								className={ classNames( 'has-admin__text-control', {
									'has-error': 'required' === errors.fromName?.type,
									'is-required': true,
								} ) }
								register="fromName"
								help={ __( 'Please enter your name.', 'highlight-and-share' ) }
								ref={ firstNameField }
							/>
						) }
					/>
					{ 'required' === errors.fromName?.type && (
						<Notice
							message={ __( 'This is a required field.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
				</div>
				<div className="has-email-control-row">
					<Controller
						name="fromEmail"
						control={ control }
						rules={ {
							validate: ( value ) => {
								if ( validateEmail( value ) ) {
									return true;
								}
								return false;
							},
							required: true,
						} }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								type="text"
								value={ escapeEditableHTML( value ) }
								onChange={ onChange }
								label={ __( 'From (email):', 'highlight-and-share' ) }
								className={ classNames( 'search-has-admin-text-control has-admin__text-control', {
									'has-error': 'required' === errors.fromEmail?.type,
									'is-required': true,
								} ) }
								register="fromEmail"
								placeholder="you@yourdomain.com"
								help={ __(
									'Please add in your email address.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
					{ 'validate' === errors.fromEmail?.type && (
						<Notice
							message={ __( 'The Email is Invalid.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
					{ 'required' === errors.fromEmail?.type && (
						<Notice
							message={ __( 'This is a required field.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
				</div>
				<div className="has-email-control-row">
					<Controller
						name="toEmail"
						control={ control }
						rules={ {
							validate: ( value ) => {
								if ( validateEmail( value ) ) {
									return true;
								}
								return false;
							},
							required: true,
						} }
						render={ ( { field } ) => (
							<TextControl
								{ ...field }
								label={ __( 'To (email):', 'highlight-and-share' ) }
								className={ classNames( 'search-has-admin has-admin__text-control', {
									'has-error': 'required' === errors.toEmail?.type,
									'is-required': true,
								} ) }
								register="toEmail"
								placeholder="yourcolleague@friends.com"
								help={ __(
									'Please select who you would like to email.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
					{ 'validate' === errors.toEmail?.type && (
						<Notice
							message={ __( 'The Email is Invalid.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
					{ 'required' === errors.toEmail?.type && (
						<Notice
							message={ __( 'This is a required field.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
				</div>
				<div className="has-email-control-row">
					<Controller
						name="subject"
						control={ control }
						rules={ {
							required: true,
						} }
						render={ ( { field } ) => (
							<TextControl
								{ ...field }
								label={ __( 'Subject:', 'highlight-and-share' ) }
								className={ classNames( 'search-has-admin has-admin__text-control', {
									'has-error': 'required' === errors.subject?.type,
									'is-required': true,
								} ) }
								register="subject"
								help={ __(
									'Please enter the subject of the email.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
					{ 'required' === errors.subject?.type && (
						<Notice
							message={ __( 'This is a required field.' ) }
							status="error"
							politeness="assertive"
							inline={ true }
							icon={ CircularExclamationIcon }
						/>
					) }
					<Controller
						name="recaptchaToken"
						control={ control }
						render={ ( { field } ) => (
							<TextControl { ...field } type="hidden" register="recaptchaToken" />
						) }
					/>
					<Controller
						name="postId"
						control={ control }
						render={ ( { field } ) => (
							<TextControl { ...field } type="hidden" register="postId" />
						) }
					/>
					<Controller
						name="nonce"
						control={ control }
						render={ ( { field } ) => (
							<TextControl { ...field } type="hidden" register="nonce" />
						) }
					/>
					<Controller
						name="permalink"
						control={ control }
						render={ ( { field } ) => (
							<TextControl { ...field } type="hidden" register="permalink" />
						) }
					/>
					<Controller
						name="shareText"
						control={ control }
						render={ ( { field } ) => (
							<TextControl { ...field } type="hidden" register="shareText" />
						) }
					/>
				</div>
				<div className="has-admin__tabs--content-actions">
					<Button
						id="has-recaptcha-submit"
						className={ classNames(
							'qdlx__btn qdlx__btn-primary qdlx__btn--icon-right g-recaptcha',
							{ 'has-error': hasErrors() },
							{ 'has-icon': isSending },
							{ 'is-saving': { isSending } }
						) }
						type="button"
						text={
							isSending
								? __( 'Sending…', 'highlight-and-share' )
								: __( 'Send', 'highlight-and-share' )
						}
						iconSize="18"
						iconPosition="right"
						disabled={ isSending || isSent }
						onClick={ ( e ) => {
							// eslint-disable-next-line no-undef
							if (
								hasEmailModal.recaptcha_enabled &&
								typeof grecaptcha !== 'undefined'
							) {
								grecaptcha.ready( function() {
									grecaptcha
										.execute( hasEmailModal.recaptcha_site_key, {
											action: 'submit',
										} )
										.then( function( token ) {
											setValue( 'recaptchaToken', token );
											e.target.form.dispatchEvent(
												new Event( 'submit', { cancelable: true, bubbles: true } )
											);
										} );
								} );
							} else {
								// This force submits the form.
								e.target.form.dispatchEvent(
									new Event( 'submit', { cancelable: true, bubbles: true } )
								);
							}
						} }
					/>
					<Button
						className={ classNames(
							'qdlx__btn qdlx__btn-secondary qdlx__btn--icon-right'
						) }
						type="button"
						text={
							isSent ? __( 'Close', 'highlight-and-share' ) : __( 'Cancel', 'highlight-and-share' )
						}
						disabled={ isSending }
						onClick={ () => {
							window.parent.window.highlightShareFancy.close(); // See frontendjs/highlight-and-share.js for this variable.
						} }
					/>
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
				{ formErrors && (
					<Notice
						message={ errorMessage }
						status="error"
						politeness="polite"
					/>
				) }
				{ isSent && (
					<Notice
						message={ __( 'The email has been sent.' ) }
						status="success"
						politeness="assertive"
					/>
				) }
			</form>
		</section>
	);
};
export default View;