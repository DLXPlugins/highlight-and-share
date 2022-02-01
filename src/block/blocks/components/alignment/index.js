/**
 * Alignment Group (Left|Center|Right) with a label and button icons.
 *
 * Pass onClick prop to propagate up to parent. Values are (left|center|right).
 */
 import PropTypes from 'prop-types'; 

const { __, _x } = wp.i18n;

const { Button, ButtonGroup } = wp.components;

const AlignmentGroup = ( props ) => {
	const {
		alignment,
		label,
		alignLeftLabel,
		alignCenterLabel,
		alignRightLabel,
		leftOn,
		centerOn,
		rightOn,
	} = props;

	return (
		<div className="has-alignment-component-base">
			<span className="has-alignment-component-label">{ label }</span>
			<ButtonGroup>
				<>
				{ leftOn &&
					<Button
						isPressed={ 'left' === alignment ? true : false }
						isSecondary
						icon="editor-alignleft"
						label={ alignLeftLabel }
						onClick={ () => {
							props.onClick( 'left' );
						} }
					/>
				}
				{ centerOn &&
					<Button
						isPressed={ 'center' === alignment ? true : false }
						isSecondary
						icon="editor-aligncenter"
						label={ alignCenterLabel }
						onClick={ () => {
							props.onClick( 'center' );
						} }
					/>
				}
				{ rightOn &&
					<Button
						isPressed={ 'right' === alignment ? true : false }
						isSecondary
						icon="editor-alignright"
						label={ alignRightLabel }
						onClick={ () => {
							props.onClick( 'right' );
						} }
					/>
				}
				
				
			</>

			</ButtonGroup>
		</div>
	);
};

AlignmentGroup.defaultProps = {
	alignment: 'left',
	label: __( 'Change Alignment', 'highlight-and-share' ),
	alignLeftLabel: _x(
		'Align Left',
		'Align items left',
		'highlight-and-share'
	),
	alignCenterLabel: _x(
		'Align Center',
		'Align items center/middle',
		'highlight-and-share'
	),
	alignRightLabel: _x(
		'Align Right',
		'Align items right',
		'highlight-and-share'
	),
	leftOn: true,
	centerOn: true,
	rightOn: true,
};

AlignmentGroup.propTypes = {
	alignment: PropTypes.string,
	label: PropTypes.string,
	alignLeftLabel: PropTypes.number,
	alignCenterLabel: PropTypes.number,
	alignRightLabel: PropTypes.string,
	leftOn: PropTypes.bool,
	centerOn: PropTypes.bool,
	rightOn: PropTypes.bool,
};

export default AlignmentGroup;
