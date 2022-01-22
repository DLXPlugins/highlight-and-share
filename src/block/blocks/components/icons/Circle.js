import PropTypes from 'prop-types'; // ES6
const IconCircle = ( props ) => (
	<svg
		viewBox="0 0 398 398"
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		style={ {
			fillRule: 'evenodd',
			clipRule: 'evenodd',
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
			strokeMiterlimit: 1.5,
		} }
		width={ props.width }
		height={ props.height }
		className={ props.className }
	>
		<circle
			cx={ 1186.81 }
			cy={ 972.734 }
			r={ 198.415 }
			style={ {
				fill: props.hexColor,
				stroke: props.hexColorStroke,
				strokeWidth: 1,
			} }
			transform="translate(-987.894 -773.819)"
		/>
	</svg>
);

IconCircle.defaultProps = {
	stroke: '#000',
	width: 16,
	height: 16,
};

IconCircle.propTypes = {
	hexColor: PropTypes.string,
	stroke: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	className: PropTypes.string,
};

export default IconCircle;
