import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
// or 'photoswipe-dynamic-caption-plugin' if using package manager
import PhotoSwipeDynamicCaption from './photoswipe-caption';
import './photoswipe-caption.css';

const lightbox = new PhotoSwipeLightbox({
	gallery: '.has-admin-preview',
	children: 'li',
	showHideAnimationType: 'zoom',
	showAnimationDuration: 750,
	hideAnimationDuration: 750,
	imageClickAction: 'next',
  	tapAction: 'next',
	pswpModule: () => import('photoswipe')
  });
const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
	// Plugins options, for example:
	type: 'below',
	paddingFn: (viewportSize) => {
		return viewportSize.x < 700 ? smallScreenPadding : largeScreenPadding
	  },
});
lightbox.init();