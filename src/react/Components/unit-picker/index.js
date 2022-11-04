/**
 * Unit Picker Component.
 * Credit: Forked from @GenerateBlocks
 */
import React from 'react';

import { __, sprintf, _x } from '@wordpress/i18n';
import './editor.scss';

import { ButtonGroup, Button, Tooltip } from '@wordpress/components';

const UnitChooser = ( props ) => {
	const { label, value, onClick, units } = props;

	return (
		<div className="components-has-units-control-header__units">
			<div className="components-has-units-control-label__units">{ label }</div>

			<div className="components-has-control__units">
				<ButtonGroup
					className="components-has-control-buttons__units"
					aria-label={ __( 'Select Units', 'highlight-and-share' ) }
				>
					{ units.map( ( unit ) => {
						let unitName = unit;

						if ( 'px' === unit ) {
							unitName = _x(
								'Pixel',
								'A size unit for CSS markup',
								'highlight-and-share'
							);
						}

						if ( 'em' === unit ) {
							unitName = _x(
								'Em',
								'A size unit for CSS markup',
								'highlight-and-share'
							);
						}

						if ( '%' === unit ) {
							unitName = _x(
								'Percentage',
								'A size unit for CSS markup',
								'highlight-and-share'
							);
						}

						if ( 'vw' === unit ) {
							unitName = _x(
								'View Width',
								'A size unit for CSS markup',
								'highlight-and-share'
							);
						}

						if ( 'rem' === unit ) {
							unitName = _x(
								'Rem',
								'A size unit for CSS markup',
								'highlight-and-share'
							);
						}

						if ( 'deg' === unit ) {
							unitName = _x(
								'Degree',
								'A size unit for CSS markup',
								'highlight-and-share'
							);
						}

						return (
							<Tooltip
								text={ sprintf(
									/* translators: Unit type (px, em, %) */
									__( '%s Units', 'highlight-and-share' ),
									unitName
								) }
								key={ unit }
							>
								<Button
									key={ unit }
									className={ 'components-has-control-button__units--' + unit }
									isSmall
									isPrimary={ value === unit }
									aria-pressed={ value === unit }
									aria-label={ sprintf(
										/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
										__( '%s Units', 'highlight-and-share' ),
										unitName
									) }
									onClick={ () => onClick( unit ) }
								>
									{ unit }
								</Button>
							</Tooltip>
						);
					} ) }
				</ButtonGroup>
			</div>
		</div>
	);
};

export default UnitChooser;
