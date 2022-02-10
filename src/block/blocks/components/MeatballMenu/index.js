import PropTypes from 'prop-types'; // ES6
import classnames from 'classnames';

const { useEffect, useState } = wp.element;
const { _n, __ } = wp.i18n;

const maxChars = 280;
const minChars = 35;

const MeatballMenu = ( props ) => {
	const { chars } = props;

	const [ menuOpen, setMenuOpen ] = useState( false );

	const getButton = () => {
		return (
			<>
				<div className="has-ctt-meatball-menu">
					<div className="has-ctt-meatball-content">
							<input
								type="checkbox"
								aria-label={ __( 'Open menu options', 'highlight-and-share' ) }
							/>
							<ul>
								<li>Test</li>
							</ul>
							<div className="has-ctt-meatball-icon-wrapper" aria-hidden="true">
								<span>asdf</span>
							</div>
						
						
						
					</div>
				</div>
			</>
		);
	};
	return <>{ getButton() }</>;
};

// LineCount.defaultProps = {
// 	chars: 0,
// };

// LineCount.propTypes = {
// 	chars: PropTypes.number,
// };

export default MeatballMenu;
