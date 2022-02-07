// From: https://itnext.io/how-to-create-a-twitter-inspired-character-counter-with-an-svg-progress-ring-react-js-352f3c8eefbc

import PropTypes from 'prop-types'; // ES6

const baseColor = '#4F8A10';
const preWarningColor = '#99cc33';
const warningColor = '#ffae42';
const preErrorColor = '#ff9966';
const errorColor = '#cc3300';

const CircularCount = ( props ) => {
	const { chars } = props;

	const r = 15;
	const circleLength = 2 * Math.PI * r;

	const status = ( circleLength * chars ) / 280;
	const colorDefault = circleLength - status > 0 ? circleLength - status : 0;

	/**
	 *
	 * @param { int } characters Number of characters.
	 * @return { string } hex code for error color.
	 */
	const getColor = ( characters ) => {
		if ( characters >= 280 ) {
			return errorColor;
		}
		if ( characters >= 260 ) {
			return preErrorColor;
		}
		if ( characters >= 220 ) {
			return warningColor;
		}
		if ( characters >= 180 ) {
			return preWarningColor;
		}
		return baseColor;
	};
	const ringStyle = {
		stroke:
			getColor( chars ),
		strokeDasharray: `${ status }  ${ colorDefault }`,
	};

	return (
		<div className="has-circular-count">
			<svg>
				<circle className="default" cx="50%" cy="50%" r="15"></circle>
				<circle
					className="status"
					cx="50%"
					cy="50%"
					r="15"
					style={ ringStyle }
				></circle>
			</svg>
		</div>
	);
};

CircularCount.defaultProps = {
	chars: 0,
};

CircularCount.propTypes = {
	chars: PropTypes.number,
};

export default CircularCount;
