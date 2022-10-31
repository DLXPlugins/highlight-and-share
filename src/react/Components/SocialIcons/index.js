import React, { useContext } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Return fontawesome icons for the social networks.
import { faTwitter as TwitterIcon } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faFacebook as FacebookIcon } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faWhatsapp as WhatsappIcon } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faLinkedin as LinkedinIcon } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faReddit as RedditIcon } from '@fortawesome/free-brands-svg-icons/faReddit';
import { faXing as XingIcon } from '@fortawesome/free-brands-svg-icons/faXing';
import { faCopy as CopyIcon } from '@fortawesome/free-solid-svg-icons/faCopy';
import { faAt as EmailIcon } from '@fortawesome/free-solid-svg-icons/faAt';
import { faTelegram as TelegramIcon } from '@fortawesome/free-brands-svg-icons/faTelegram';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';
const SocialIcons = () => {
	const { socialNetworks } = useContext( SocialNetworksContext );
	const getSocialIcons = () => {
		const socialIcons = [];
		let socialIconCount = 0;
		for ( const [ key, value ] of Object.entries( socialNetworks ) ) {
			const classes = classNames( ( value.slug ?? value.key ), {
				'is-disabled': ! value.enabled,
				'is-custom': value.custom,
			} );

			// Set styles for the icon.
			let styles = {};
			if ( ! value.custom ) {
				if ( value.styles ) {
					styles = value.styles;
				} else {
					styles = {
						color: value.color,
						background: value.background,
					};
				}
			}
			let icon = null;
			let fontAwesomeIcon = null;
			const keyValue = value.slug ?? value.key;
			switch ( keyValue ) {
				case 'twitter':
					icon = TwitterIcon;
					break;
				case 'facebook':
					icon = FacebookIcon;
					break;
				case 'whatsapp':
					icon = WhatsappIcon;
					break;
				case 'reddit':
					icon = RedditIcon;
					break;
				case 'telegram':
					icon = TelegramIcon;
					break;
				case 'linkedin':
					icon = LinkedinIcon;
					break;
				case 'xing':
					icon = XingIcon;
					break;
				case 'copy':
					icon = CopyIcon;
					break;
				case 'email':
					icon = EmailIcon;
					break;
				default:
					icon = <></>;
			}
			fontAwesomeIcon = <FontAwesomeIcon size={ '1x' } icon={ icon } className={ `has-${ keyValue }` } />;
			socialIcons.push( {
				key: ( value.slug ?? value.key ),
				listItemKey: ( value.slug ?? value.key ),
				className: classes,
				styles,
				icon: fontAwesomeIcon,
				index: socialIconCount,
				enabled: value.enabled,
				custom: value.custom,
			} );
			socialIconCount++;
		}
		return socialIcons;
	};
	return { getSocialIcons };
};

export default SocialIcons;
