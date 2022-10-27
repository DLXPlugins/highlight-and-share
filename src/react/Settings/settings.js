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



const Settings = () => {
	const getDefaultValues = () => {
		return {
			enableMobile: true,
			enablePostContent: true,
			enablePostExcerpt: true,
			quotePrefix: '',
			quoteSuffix: '',
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
	return (
		<>
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
			</div>

		</>
	);
};

export default Settings;