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
			getValues( 'attrLeft' ),
		];
		const syncValue = Math.max.apply( null, numbers );
		setValue( 'attrSyncUnits', ! getValues( 'attrSyncUnits' ) );
		changeAllValues( syncValue );
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
	};

	const syncIcon = (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="37.5" height="30">
			<path
				fill="currentColor"
				d="M580.2 267.3c56.2-56.2 56.2-147.4 0-203.6s-147.4-56.3-203.6 0L365.3 75l45.3 45.3 11.3-11.3c31.2-31.2 81.9-31.2 113.1 0s31.2 81.9 0 113.1L421.8 335.2c-31.2 31.2-81.9 31.2-113.1 0-25.6-25.6-30.3-64.3-13.8-94.6 1.8-3.4 3.9-6.7 6.3-9.8L250 192.4c-4.3 5.7-8.1 11.6-11.4 17.8-29.5 54.6-21.3 124.2 24.9 170.3 56.2 56.2 147.4 56.2 203.6 0l113.1-113.2zM59.8 244.7c-56.2 56.2-56.2 147.4 0 203.6s147.4 56.2 203.6 0l11.3-11.3-45.3-45.3-11.3 11.3c-31.2 31.2-81.9 31.2-113.1 0s-31.2-81.9 0-113.1l113.2-113.1c31.2-31.2 81.9-31.2 113.1 0 25.6 25.6 30.3 64.3 13.8 94.6-1.8 3.4-3.9 6.7-6.3 9.8l51.2 38.4c4.3-5.7 8.1-11.6 11.4-17.8 29.5-54.6 21.3-124.2-24.9-170.3-56.2-56.2-147.4-56.2-203.6 0L59.8 244.7z"
			/>
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
							<div
								className="components-has-dimensions-control__input"
								data-tooltip={ labelTop }
							>
								<TextControl
									value={ value }
									type="number"
									label={ labelTop }
									className={ classNames(
										'components-has-dimensions-control__number'
									) }
									onChange={ ( newValue ) => {
										onDimensionChange( newValue );
										onChange( newValue );
									} }
									min={ 0 }
								/>
							</div>
						) }
					/>
					<Controller
						name="attrRight"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<div
								className="components-has-dimensions-control__input"
								data-tooltip={ labelRight }
							>
								<TextControl
									value={ value }
									type="number"
									label={ labelRight }
									className={ classNames(
										'components-has-dimensions-control__number'
									) }
									onChange={ ( newValue ) => {
										onDimensionChange( newValue );
										onChange( newValue );
									} }
									min={ 0 }
								/>
							</div>
						) }
					/>
					<Controller
						name="attrBottom"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<div
								className="components-has-dimensions-control__input"
								data-tooltip={ labelBottom }
							>
								<TextControl
									value={ value }
									type="number"
									label={ labelBottom }
									className={ classNames(
										'components-has-dimensions-control__number'
									) }
									onChange={ ( newValue ) => {
										onDimensionChange( newValue );
										onChange( newValue );
									} }
									min={ 0 }
								/>
							</div>
						) }
					/>
					<Controller
						name="attrLeft"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<div
								className="components-has-dimensions-control__input"
								data-tooltip={ labelLeft }
							>
								<TextControl
									value={ value }
									type="number"
									label={ labelLeft }
									className={ classNames(
										'components-has-dimensions-control__number'
									) }
									onChange={ ( newValue ) => {
										onDimensionChange( newValue );
										onChange( newValue );
									} }
									min={ 0 }
								/>
							</div>
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
							isPrimary={ getValues( 'attrSyncUnits' ) ? true : false }
							aria-pressed={ getValues( 'attrSyncUnits' ) ? true : false }
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
