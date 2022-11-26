import React, { useState, lazy, Suspense } from 'react';
import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import {
	TextControl,
	Button,
	ToggleControl,
} from '@wordpress/components';
import ErrorBoundary from '../Components/ErrorBoundary';
import Notice from '../Components/Notice';
import CircularInfoIcon from '../Components/Icons/CircularInfo';
import CircularExclamationIcon from '../Components/Icons/CircularExplanation';
import Spinner from '../Components/Icons/Spinner';
import sendCommand from '../Utils/SendCommand';
import Loader from '../Components/Loader';
import HASColorPicker from '../Components/ColorPicker';

const retrieveDefaults = () => {
	return sendCommand( 'has_retrieve_block_editor_tab', {
		nonce: hasBlockEditorAdmin.retrieveNonce,
	} );
};

const BlockEditor = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveDefaults, [] );

	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Block Editor options.', 'highlight-and-share' ) }
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
							title={ __( 'Block Editor Settings', 'highlight-and-share' ) }
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

	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );
	const [ refreshingFonts, setRefreshingFonts ] = useState( false );

	const getDefaultValues = () => {
		return {
			enableBlocks: data.enableBlocks,
			enableAdobeFonts: data.enableAdobeFonts,
			adobeFonts: data.adobeFonts,
			adobeProjectId: data.adobeProjectId,
			enableInlineHighlighting: data.enableInlineHighlighting,
			inlineHighlightBackgroundColor: data.inlineHighlightBackgroundColor,
			inlineHighlightBackgroundColorHover: data.inlineHighlightBackgroundColorHover,
			inlineHighlightTextColor: data.inlineHighlightTextColor,
			inlineHighlightTextColorHover: data.inlineHighlightTextColorHover,
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
		setError,
		clearErrors,
	} = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		setSaving( true );

		sendCommand( 'has_save_block_editor_options', {
			nonce: hasBlockEditorAdmin.saveNonce,
			formData,
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
					const { message } = ajaxData[ 0 ];
					setValue( 'adobeFonts', [] );
					setError( 'adobeProjectId', { type: 'manual', message }, { shouldFocus: true } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setSaving( false );
			} );
	};
	const handleReset = ( e ) => {
		setResetting( true );
		sendCommand( 'has_reset_block_editor_options', {
			nonce: hasBlockEditorAdmin.resetNonce,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					console.log( ajaxData );
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

	const getAdobeFonts = () => {
		if ( errors.adobeProjectId ) {
			return null;
		}
		const hasAdobeFonts = getValues( 'enableAdobeFonts' );
		// eslint-disable-next-line @wordpress/no-unused-vars-before-return
		const adobeFontsList = getValues( 'adobeFonts' );
		if ( undefined === hasAdobeFonts || false === hasAdobeFonts || 0 === adobeFontsList.length ) {
			return <></>;
		}
		return (
			<>
				<div className="components-base-control">
					<label
						htmlFor="adobe-font-list"
						className="components-base-control__label"
					>
						{ __( 'Current Adobe Fonts', 'highlight-and-share' ) }
					</label>
					<ul
						className="has-adobe-font-list has-admin-list-ul"
						id="adobe-font-list"
					>
						{ adobeFontsList.map( ( font ) => {
							return <li key={ font.slug }>{ font.name }</li>;
						} ) }
					</ul>
				</div>
			</>
		);
	};

	const refreshAdobeFonts = () => {
		setRefreshingFonts( true );
		sendCommand( 'has_retrieve_remote_adobe_fonts', {
			nonce: hasBlockEditorAdmin.saveNonce,
			project_id: getValues( 'adobeProjectId' ),
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					setValue( 'adobeFonts', ajaxData );
				} else {
					const { message } = ajaxData[ 0 ];
					setValue( 'adobeFonts', [] );
					setError( 'adobeProjectId', { type: 'manual', message }, { shouldFocus: true } );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setRefreshingFonts( false );
			} );
	};

	const inlineHighlightColors = [
		{
			label: __( 'Inline Background Color Default', 'highlight-and-share' ),
			color: '#ffefb1',
			slug: 'inline-highlight-background-color',
		},
		{
			label: __( 'Inline Background Color Hover Default', 'highlight-and-share' ),
			color: '#fcd63c',
			slug: 'inline-highlight-background-color-hover',
		},
		{
			label: __( 'Inline Text Color Default', 'highlight-and-share' ),
			color: '#000000',
			slug: 'inline-highlight-text-color',
		},
		{
			label: __( 'White', 'highlight-and-share' ),
			color: '#FFFFFF',
			slug: 'inline-highlight-color-white',
		},
	];

	const getInlineHighlightingColorOptions = () => {
		if ( getValues( 'enableInlineHighlighting' ) ) {
			const styles = {
				color: formValues.inlineHighlightTextColor,
				backgroundColor: formValues.inlineHighlightBackgroundColor,
			};
			const hoverStyles = `
				.has-inline-text:hover {
					color: ${ formValues.inlineHighlightTextColorHover } !important;
					background-color: ${ formValues.inlineHighlightBackgroundColorHover } !important;
				}`;
			return (
				<>
					<style>{ hoverStyles }</style>
					<div className="has-admin-component-row">
						<Controller
							name="inlineHighlightBackgroundColor"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<HASColorPicker
									value={ value }
									onChange={ ( slug, newValue ) => {
										onChange( newValue );
									} }
									label={ __( 'Background Color', 'highlight-and-share' ) }
									defaultColors={ inlineHighlightColors }
									defaultColor={ '#ffefb1' }
									slug={ 'background_color' }
								/>
							) }
						/>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="inlineHighlightBackgroundColorHover"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<HASColorPicker
									value={ value }
									onChange={ ( slug, newValue ) => {
										onChange( newValue );
									} }
									label={ __( 'Background Color Hover', 'highlight-and-share' ) }
									defaultColors={ inlineHighlightColors }
									defaultColor={ '#fcd63c' }
									slug={ 'background_color_hover' }
								/>
							) }
						/>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="inlineHighlightTextColor"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<HASColorPicker
									value={ value }
									onChange={ ( slug, newValue ) => {
										onChange( newValue );
									} }
									label={ __( 'Text Color', 'highlight-and-share' ) }
									defaultColors={ inlineHighlightColors }
									defaultColor={ '#000000' }
									slug={ 'text_color' }
								/>
							) }
						/>
					</div>
					<div className="has-admin-component-row">
						<Controller
							name="inlineHighlightTextColorHover"
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<HASColorPicker
									value={ value }
									onChange={ ( slug, newValue ) => {
										onChange( newValue );
									} }
									label={ __( 'Text Color Hover', 'highlight-and-share' ) }
									defaultColors={ inlineHighlightColors }
									defaultColor={ '#000000' }
									slug={ 'text_color_hover' }
								/>
							) }
						/>
					</div>
					<div className="has-admin-component-row">
						<h4>{ __( 'Inline Highlighting Preview:', 'highlight-and-share' ) }</h4>
						<p>
							Lorem ipsum dolor sit amet, <span className="has-inline-text" style={ styles }>consectetur adipiscing elit. Morbi ut lacinia augue</span>. Nam convallis lacus at ex fringilla, a venenatis mi facilisis. Sed lobortis pharetra massa, sit amet dictum erat egestas in.
						</p>
					</div>
				</>
			);
		}
		return null;
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
										{ __( 'Block Editor Settings', 'highlight-and-share' ) }
									</span>
								</h1>
								<p className="description">
									{ __(
										'On this screen, you can set inline highlighting and also enable Adobe Fonts.',
										'highlight-and-share'
									) }
								</p>
							</div>
							<div className="has-admin-content-body">
								<h2 className="has-admin-content-subheading">
									{ __( 'Block Settings', 'highlight-and-share' ) }
								</h2>
								<p className="description">{ __( 'Set block editor options.', 'highlight-and-share' ) }</p>
								<div className="has-admin-component-row">
									<Controller
										name="enableBlocks"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable Blocks',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'If you are not using the Click to Share blocks, you can disable this option.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
							</div>
							<div className="has-admin-content-body">
								<h2 className="has-admin-content-subheading">
									{ __( 'Adobe Font Settings', 'highlight-and-share' ) }
								</h2>
								<p className="description">{ __( 'Enabling Adobe Fonts will show the fonts in the Block Editor.', 'highlight-and-share' ) }</p>
								<div className="has-admin-component-row">
									<Controller
										name="enableAdobeFonts"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable Adobe Fonts',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Enable Adobe Fonts in the block editor.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								{ getValues( 'enableAdobeFonts' ) && (
									<>
										<div className="has-admin-component-row">
											<Controller
												name="adobeProjectId"
												control={ control }
												rules={ {
													required: true,
													pattern: /^[a-z0-9]+$/i,
												} }
												render={ ( { field: { onChange, value } } ) => (
													<TextControl
														type="text"
														value={ value }
														onChange={ ( textValue ) => {
															clearErrors( 'adobeProjectId' );
															onChange( textValue );
														} }
														label={ __(
															'Adobe Fonts Project ID',
															'highlight-and-share'
														) }
														className={ classNames(
															'has-admin__text-control',
															{
																'has-error':
														'pattern' ===
															errors.adobeProjectId?.type ||
														'manual' ===
															errors.adobeProjectId?.type ||
														'required' ===
															errors.adobeProjectId?.type,
																'is-required': true,
															}
														) }
														aria-required="true"
														help={ __(
															'Enter the Adobe Project ID of the web project in order to load Adobe Fonts.',
															'highlight-and-share'
														) }
													/>
												) }
											/>

											{ 'required' === errors.adobeProjectId?.type && (
												<Notice
													message={ __( 'This field is a required field.', 'highlight-and-share' ) }
													status="error"
													politeness="assertive"
													inline={ false }
													icon={ CircularExclamationIcon }
												/>
											) }
											{ 'pattern' === errors.adobeProjectId?.type && (
												<Notice
													message={ __(
														'Please use only lowercase letters and numbers.'
														, 'highlight-and-share' ) }
													status="error"
													politeness="assertive"
													inline={ false }
													icon={ CircularExclamationIcon }
												/>
											) }
											{ 'manual' === errors.adobeProjectId?.type && (
												<Notice
													message={ errors.adobeProjectId.message }
													status="error"
													politeness="assertive"
													inline={ false }
													icon={ CircularExclamationIcon }
												/>
											) }
											{ false !== getValues( 'enableAdobeFonts' ) && <>{ getAdobeFonts() }</> }
										</div>
										<div className="has-admin__tabs--content-actions-inline">
											<Button
												className={ classNames(
													'has__btn has__btn-secondary has__btn--icon-right has__btn-accent',
													{ 'has-error': hasErrors() },
													{ 'has-icon': refreshingFonts },
													{ 'is-saving': { refreshingFonts } }
												) }
												type="button"
												text={
													saving
														? __( 'Getting Fonts…', 'highlight-and-share' )
														: __( 'Refresh Fonts', 'highlight-and-share' )
												}
												icon={ refreshingFonts ? Spinner : false }
												iconSize="18"
												iconPosition="right"
												disabled={ refreshingFonts || resetting }
												onClick={ async() => {
													const result = await trigger(
														'adobeProjectId'
													);
													if ( result ) {
														refreshAdobeFonts();
													}
												} }
											/>
										</div>
									</>
								) }
							</div>
							<div className="has-admin-content-body">
								<h2 className="has-admin-content-subheading">
									{ __( 'Inline Highlighting Settings', 'highlight-and-share' ) }
								</h2>
								<p className="description">{ __( 'Set inline highlighting behavior and colors.', 'highlight-and-share' ) }</p>
								<Notice
									message={ __(
										'Inline highlighting is enabled by using the formatting options in the Block Editor or by wrapping the text with the [has-inline-text] CSS class.',
										'highlight-and-share'
									) }
									status="info"
									politeness="polite"
									inline={ false }
									icon={ CircularInfoIcon }
								/>
								<div className="has-admin-component-row">
									<Controller
										name="enableInlineHighlighting"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable Inline Highlighting',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Disabling this option will disable inline highlighting throughout the site.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								{ getInlineHighlightingColorOptions() }
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
											: __( 'Save Block Editor Options', 'highlight-and-share' )
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
											: __( 'Reset Block Editor Settings', 'highlight-and-share' )
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

export default BlockEditor;
