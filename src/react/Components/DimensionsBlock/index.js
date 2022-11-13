/**
 * Dimensions Component.
 * Credit: Forked from @GenerateBlocks
 */
import React, { useEffect, useState } from 'react';

/**
 * External dependencies
 */
import './editor.scss';
import UnitPicker from '../unit-picker';

import { __, sprintf, _x } from '@wordpress/i18n';
import { Button, Tooltip, TextControl } from '@wordpress/components';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { geHierarchicalPlaceholderValue, getHierarchicalValueUnit, getHierarchicalValueUnitSync } from '../../Utils/DimensionsHelper';

const DimensionsControlBlock = ( props ) => {
	const [ screenSize, setScreenSize ] = useState( 'desktop' );

	const getDefaultValues = () => {
		return {
			mobile: {
				top: props.values.mobile.top,
				right: props.values.mobile.right,
				bottom: props.values.mobile.bottom,
				left: props.values.mobile.left,
				unit: props.values.mobile.unit,
				unitSync: props.values.mobile.unitSync,
			},
			tablet: {
				top: props.values.tablet.top,
				right: props.values.tablet.right,
				bottom: props.values.tablet.bottom,
				left: props.values.tablet.left,
				unit: props.values.tablet.unit,
				unitSync: props.values.tablet.unitSync,
			},
			desktop: {
				top: props.values.desktop.top,
				right: props.values.desktop.right,
				bottom: props.values.desktop.bottom,
				left: props.values.desktop.left,
				unit: props.values.desktop.unit,
				unitSync: props.values.desktop.unitSync,
			},
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

	useEffect( () =>{
		setScreenSize( props.screenSize.toLowerCase() );
		setValue( props.screenSize.toLowerCase(), getValues( props.screenSize.toLowerCase() ) );
	}, [ props.screenSize ] );
	/**
	 * Change the all values in parent.
	 *
	 * @param {number} value Value to change to.
	 */
	const changeAllValues = ( value ) => {
		const values = getValues( screenSize );
		values.top = value;
		values.right = value;
		values.bottom = value;
		values.left = value;
		setValue( screenSize, values );
	};

	/**
	 * When the sync value is selected, sync all values to the maximum number.
	 */
	const syncUnits = () => {
		// Toggle unit sync value.
		const values = getValues( screenSize );
		values.unitSync = ! values.unitSync;
		setValue( screenSize, values );

		// If we're syncing, set all values to the maximum.
		if ( values.unitSync ) {
			const numbers = [
				getValues( screenSize ).top,
				getValues( screenSize ).right,
				getValues( screenSize ).bottom,
				getValues( screenSize ).left,
			];
			const syncValue = Math.max.apply( null, numbers );
			changeAllValues( syncValue );
		}
	};

	/**
	 * Change the units.
	 *
	 * @param {string} value Unit changing (px, em, rem, vh).
	 */
	const onChangeUnits = ( value ) => {
		const values = getValues( screenSize );
		values.unit = value;
		setValue( screenSize, values );
	};

	const onDimensionChange = ( value ) => {
		if ( getHierarchicalValueUnitSync( props.values, screenSize, getValues( screenSize ).unitSync ) ) {
			changeAllValues( value );
		}
	};

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
					name={ `${ screenSize }.unit` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<UnitPicker
							label={ label }
							value={ getHierarchicalValueUnit( props.values, screenSize, getValues( screenSize ).unit ) }
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
						name={ `${ screenSize }.top` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								value={ getValues( screenSize ).top }
								type="text"
								label={ labelTop }
								className={ classNames( 'components-has-dimensions-control__number' ) }
								onChange={ ( newValue ) => {
									onDimensionChange( parseFloat( newValue ) );
									onChange( parseFloat( newValue ) );
								} }
								min={ 0 }
								placeholder={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).top, 'top' ) }
							/>
						) }
					/>
					<Controller
						name={ `${ screenSize }.right` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								value={ getValues( screenSize ).right }
								type="text"
								label={ labelRight }
								className={ classNames( 'components-has-dimensions-control__number' ) }
								onChange={ ( newValue ) => {
									onDimensionChange( parseFloat( newValue ) );
									onChange( parseFloat( newValue ) );
								} }
								min={ 0 }
								placeholder={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).right, 'right' ) }
							/>
						) }
					/>
					<Controller
						name={ `${ screenSize }.bottom` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								value={ getValues( screenSize ).bottom }
								type="text"
								label={ labelBottom }
								className={ classNames( 'components-has-dimensions-control__number' ) }
								onChange={ ( newValue ) => {
									onDimensionChange( parseFloat( newValue ) );
									onChange( parseFloat( newValue ) );
								} }
								min={ 0 }
								placeholder={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).bottom, 'bottom' ) }
							/>
						) }
					/>
					<Controller
						name={ `${ screenSize }.left` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								value={ getValues( screenSize ).left }
								type="text"
								label={ labelLeft }
								className={ classNames( 'components-has-dimensions-control__number' ) }
								onChange={ ( newValue ) => {
									onDimensionChange( parseFloat( newValue ) );
									onChange( parseFloat( newValue ) );
								} }
								min={ 0 }
								placeholder={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).left, 'left' ) }
							/>
						) }
					/>
					<Tooltip
						text={
							!! getValues( screenSize ).unitSync
								? __( 'Unsync', 'highlight-and-share' )
								: __( 'Sync', 'highlight-and-share' )
						}
					>
						<Button
							className="components-has-dimensions-control_sync"
							aria-label={ __( 'Sync Units', 'generateblocks' ) }
							isPrimary={
								getHierarchicalValueUnitSync( props.values, screenSize, getValues( screenSize ).unitSync )
							}
							aria-pressed={
								getHierarchicalValueUnitSync( props.values, screenSize, getValues( screenSize ).unitSync )
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

export default DimensionsControlBlock;
