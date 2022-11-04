/**
 * Dimensions Component.
 * Credit: Forked from @GenerateBlocks
 */
 import React, { useEffect } from 'react';

/**
 * External dependencies
 */
import './editor.scss';
import UnitPicker from '../unit-picker';

import { __, sprintf, _x } from '@wordpress/i18n';
import { Button, Tooltip, TextControl } from '@wordpress/components';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';


const DimensionsControl = ( props ) => {

	const getDefaultValues = () => {
		return {
			attrTop: props.attrTop,
			attrRight: props.attrRight,
			attrBottom: props.attrBottom,
			attrLeft: props.attrLeft,
			attrSyncUnits: props.attrSyncUnits,
			attrUnit: props.attrUnit,
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
	const {
		label = __( 'Padding', 'highlight-and-share' ),
		labelTop = __( 'Top', 'highlight-and-share' ),
		labelRight = __( 'Right', 'highlight-and-share' ),
		labelBottom = __( 'Bottom', 'highlight-and-share' ),
		labelLeft = __( 'Left', 'highlight-and-share' ),
		units,
		onValuesChange,
	} = props;

	useEffect( () => {
		onValuesChange( formValues );
	}, [ formValues ] );

	/**
	 * Change the all values in parent.
	 *
	 * @param {number} value Value to change to.
	 */
	const changeAllValues = ( value ) => {
		setValue( 'attrBottom', value );
		setValue( 'attrLeft', value );
		setValue( 'attrRight', value );
		setValue( 'attrTop', value );
	};

	/**
	 * When the sync value is selected, sync all values to the maximum number.
	 */
	const syncUnits = () => {
		const numbers = [
			getValues( 'attrTop' ),
			getValues( 'attrRight' ),
			getValues( 'attrBottom' ),
			getValues( 'attrLeft' )
		];
		const syncValue = Math.max.apply( null, numbers );
		setValue( 'attrSyncUnits', ! getValues( 'attrSyncUnits' ) );
		changeAllValues( syncValue.toString() );
	};

	/**
	 * Change the units.
	 *
	 * @param {string} value Unit changing (px, em, rem, vh).
	 */
	const onChangeUnits = ( value ) => {
		setValue( 'attrUnit', value );
	};

	const onDimensionChange = ( value ) => {
		if ( getValues( 'attrSyncUnits' ) ) {
			changeAllValues( value );
		}
	}

	const syncIcon = (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fad"
			data-icon="sync"
			className="svg-inline--fa fa-sync fa-w-16"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
		>
			<g className="fa-group">
				<path
					className="fa-secondary"
					fill="currentColor"
					d="M0 500V299.67a12 12 0 0 1 12-12h200.33a12 12 0 0 1 12 12v47.41a12 12 0 0 1-12.57 12l-101.87-4.88a176.07 176.07 0 0 0 317.25-56.94 12 12 0 0 1 11.67-9.26h49.09a12 12 0 0 1 11.8 14.18C478.07 417.08 377.19 504 256 504a247.43 247.43 0 0 1-188.76-87.17l4.13 82.57a12 12 0 0 1-12 12.6H12a12 12 0 0 1-12-12z"
					opacity="0.4"
				></path>
				<path
					className="fa-primary"
					fill="currentColor"
					d="M12.3 209.82C33.93 94.92 134.81 8 256 8a247.4 247.4 0 0 1 188.9 87.34l-4-82.77A12 12 0 0 1 452.92 0h47.41a12 12 0 0 1 12 12v200.33a12 12 0 0 1-12 12H300a12 12 0 0 1-12-12v-47.41a12 12 0 0 1 12.57-12l101.53 4.88a176.07 176.07 0 0 0-317.24 56.94A12 12 0 0 1 73.19 224H24.1a12 12 0 0 1-11.8-14.18z"
				></path>
			</g>
		</svg>
	);

	return (
		<>
			<div className="components-base-control components-has-dimensions-control">
				<Controller
					name="attrUnit"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<UnitPicker
							label={ label }
							value={ value }
							units={ units }
							onClick={ ( newValue ) => {
								onChange( newValue );
								onChangeUnits( newValue );
							} }
						/>
						) }
					/>

				<div className="components-has-dimensions-control__inputs">
					<Controller
						name="attrTop"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								value={ value }
								type="number"
								label={ labelTop }
								className={ classNames( 'components-has-dimensions-control__number' ) }
								onChange={ ( newValue ) => {
									onDimensionChange( newValue );
									onChange( newValue );
								} }
								min={ 0 }
							/>
						) }
					/>
					<Controller
						name="attrRight"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								value={ value }
								type="number"
								label={ labelRight }
								className={ classNames( 'components-has-dimensions-control__number' ) }
								onChange={ ( newValue ) => {
									onDimensionChange( newValue );
									onChange( newValue );
								} }
								min={ 0 }
							/>
						) }
					/>
					<Controller
						name="attrBottom"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								value={ value }
								type="number"
								label={ labelBottom }
								className={ classNames( 'components-has-dimensions-control__number' ) }
								onChange={ ( newValue ) => {
									onDimensionChange( newValue );
									onChange( newValue );
								} }
								min={ 0 }
							/>
						) }
					/>
					<Controller
						name="attrLeft"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								value={ value }
								type="number"
								label={ labelLeft }
								className={ classNames( 'components-has-dimensions-control__number' ) }
								onChange={ ( newValue ) => {
									onDimensionChange( newValue );
									onChange( newValue );
								} }
								min={ 0 }
							/>
						) }
					/>
					<Tooltip
						text={
							!! getValues( 'attrSyncUnits' )
								? __( 'Unsync', 'highlight-and-share' )
								: __( 'Sync', 'highlight-and-share' )
						}
					>
						<Button
							className="components-has-dimensions-control_sync"
							aria-label={ __( 'Sync Units', 'generateblocks' ) }
							isPrimary={
								getValues( 'attrSyncUnits' ) ? true : false
							}
							aria-pressed={
								getValues( 'attrSyncUnits' ) ? true : false
							}
							// eslint-disable-next-line no-unused-vars
							onClick={ ( value ) => syncUnits() }
							isSmall
						>
							{ syncIcon }
						</Button>
					</Tooltip>
				</div>

				<div className="components-has-dimensions-control__input-labels">
					<span className="components-has-dimensions-control__number-label">
						{ labelTop }
					</span>
					<span className="components-has-dimensions-control__number-label">
						{ labelRight }
					</span>
					<span className="components-has-dimensions-control__number-label">
						{ labelBottom }
					</span>
					<span className="components-has-dimensions-control__number-label">
						{ labelLeft }
					</span>
					<span className="components-has-dimensions-control__number-label"></span>
				</div>
			</div>
		</>
	);
};

export default DimensionsControl;
