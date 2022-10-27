import React from 'react';
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
import ErrorBoundary from '../Components/ErrorBoundary';
import Notice from '../Components/Notice';
import CircularInfoIcon from '../Components/Icons/CircularInfo';

const Settings = () => {
	const getDefaultValues = () => {
		return {
			enableMobile: true,
			enablePostContent: true,
			enablePostExcerpt: true,
			quotePrefix: '',
			quoteSuffix: '',
			enableTwitter: true,
			twitterUsername: '',
			enableTwitterHashtags: true,
			enableFacebook: true,
			enableWhatsApp: false,
			whatsAppEndpoint: 'app',
			enableReddit: false,
			enableTelegram: false,
			enableLinkedin: false,
			enableXing: false,
			enableCopy: false,
			enableEmails: false,
			enableShortlinks: false,
			classSelectors: '',
			elementSelectors: '',
			idSelectors: '',
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
	};
	console.log( getValues() );
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
							{
								__( 'On this screen, you can control where Highlight and Share will show up, which social networks to enable, and whether to enable shortlinks.', 'quotes-dlx' )
							}
						</p>
					</div>
					<div className="has-admin-content-body">
						<h2 className="has-admin-content-subheading">{ __( 'Display', 'highlight-and-share' ) }</h2>
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
								name="enablePostContent"
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
								name="enablePostExcerpt"
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
					<h2 className="has-admin-content-subheading">{ __( 'Text Settings', 'highlight-and-share' ) }</h2>
					<div className="has-admin-component-row">
						<Controller
							name="quotePrefix"
							control={ control }
							render={ ( { field } ) => (
								<TextControl
									{ ...field }
									type="text"
									label={ __(
										'Sharing Text Before',
										'highlight-and-share'
									) }
									id="search-qdlx-no-autofill"
									className={ classNames(
										'has-admin__text-control'
									) }
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
							name="quoteSuffix"
							control={ control }
							render={ ( { field } ) => (
								<TextControl
									{ ...field }
									type="text"
									label={ __(
										'Sharing Text After',
										'highlight-and-share'
									) }
									id="search-qdlx-no-autofill"
									className={ classNames(
										'has-admin__text-control'
									) }
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
					<h2 className="has-admin-content-subheading">{ __( 'Social Networks', 'highlight-and-share' ) }</h2>
					<h3>{ __( 'Twitter Options', 'highlight-and-share' ) }</h3>
					<div className="has-admin-component-row">
						<Controller
							name="enableTwitter"
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
					{ getValues( 'enableTwitter' ) && (
						<>
							<div className="has-admin-component-row">
								<Controller
									name="enableTwitterHashtags"
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
												'Hashtags can be set on a post or page in the sidebar options.',
												'highlight-and-share'
											) }
										/>
									) }
								/>
							</div>
							<div className="has-admin-component-row">
								<Controller
									name="twitterUsername"
									control={ control }
									render={ ( { field } ) => (
										<TextControl
											{ ...field }
											type="text"
											label={ __(
												'Twitter Username',
												'highlight-and-share'
											) }
											id="search-qdlx-no-autofill"
											className={ classNames(
												'has-admin__text-control'
											) }
											help={ __(
												'Enter Your Twitter Username without the @ symbol.',
												'highlight-and-share'
											) }
										/>
									) }
								/>
							</div>
						</>
					) }
				</div>
				<h3>{ __( 'Facebook Options', 'highlight-and-share' ) }</h3>
				<div className="has-admin-component-row">
					<Controller
						name="enableFacebook"
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
				<h3>{ __( 'WhatsApp Options', 'highlight-and-share' ) }</h3>
				<div className="has-admin-component-row">
					<Controller
						name="enableWhatsApp"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __(
									'Enable WhatsApp',
									'highlight-and-share'
								) }
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
				{ getValues( 'enableWhatsApp' ) && (
					<div className="has-admin-component-row">
						<Controller
							name="whatsAppEndpoint"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<RadioControl
									label="WhatsApp Endpoint"
									help={ __( 'Select the endpoint to use.', 'highlight-and-share' ) }
									selected={ value }
									options={ [
										{ label: __( 'Use the WhatsApp Web Endpoint' ), value: 'web' },
										{ label: __( 'Use the WhatsApp App Endpoint' ), value: 'app' },
									] }
									onChange={ ( radioValue ) => onChange( radioValue ) }
								/>
							) }
						/>
					</div>
				) }
				<h3>{ __( 'Other Social Options', 'highlight-and-share' ) }</h3>
				<div className="has-admin-component-row">
					<Controller
						name="enableReddit"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __(
									'Enable Reddit',
									'highlight-and-share'
								) }
								className="has-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Reddit allows URL sharing.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>
				<div className="has-admin-component-row">
					<Controller
						name="enableTelegram"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __(
									'Enable Telegram',
									'highlight-and-share'
								) }
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
				<div className="has-admin-component-row">
					<Controller
						name="enableLinkedin"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __(
									'Enable LinkedIn',
									'highlight-and-share'
								) }
								className="has-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'LinkedIn allows URL sharing.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>
				<div className="has-admin-component-row">
					<Controller
						name="enableXing"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __(
									'Enable Xing',
									'highlight-and-share'
								) }
								className="has-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Xing allows URL sharing.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>
				<div className="has-admin-component-row">
					<Controller
						name="enableEmails"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __(
									'Enable Emails',
									'highlight-and-share'
								) }
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
				<div className="has-admin-component-row">
					<Controller
						name="enableCopy"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __(
									'Enable Copy',
									'highlight-and-share'
								) }
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
							message={ __( 'A third-party URL shortening service must be installed for URL shortening to work.', 'highlight-and-share' ) }
							status="info"
							politeness="polite"
							inline={ false }
							icon={ CircularInfoIcon }
						/>
						<Controller
							name="enableShortlinks"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<ToggleControl
									label={ __(
										'Enable Shortlinks',
										'highlight-and-share'
									) }
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
			</div>
		</form>
	);
};

export default Settings;
