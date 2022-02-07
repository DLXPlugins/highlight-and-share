import PropTypes from 'prop-types'; // ES6
const { useEffect, useState } = wp.element;

import './editor.scss';

const baseColor = '#99cc33';
const preWarningColor = '#4F8A10';
const warningColor = '#ffae42';
const preErrorColor = '#ff9966';
const errorColor = '#cc3300';

const maxChars = 280;

const LineCount = ( props ) => {
	const { chars } = props;

	const [ lineStyle, setLineStyle ] = useState( {
		width: '0',
		backgroundColor: baseColor,
	} );

	useEffect( () => {
		setLineStyle( {
			width: getPercentage(),
			backgroundColor: getColor( chars ),
		} );
	}, [ chars ] );

	/**
	 *
	 * @param { number } characters Number of characters.
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

	const getPercentage = () => {
		if ( chars >= maxChars ) {
			return '100%';
		}
		const percentage = Math.round( ( chars / maxChars ) * 100 );
		return percentage + '%';
	};

	return (
		<div className="has-line-count">
			<span className="has-line-count-characters" style={ { display: 'none' } }>
				60
			</span>
			<span className="has-line-count-progress" style={ lineStyle }></span>
		</div>
	);
};

LineCount.defaultProps = {
	chars: 0,
};

LineCount.propTypes = {
	chars: PropTypes.number,
};

export default LineCount;
